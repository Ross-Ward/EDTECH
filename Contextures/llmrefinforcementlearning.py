# Install required libraries (if not already installed)
# !pip install transformers torch datasets accelerate bitsandbytes scipy sentencepiece protobuf

import torch
import torch.nn.functional as F
from transformers import AutoModelForCausalLM, AutoTokenizer
from datasets import Dataset
import numpy as np
from tqdm import tqdm
import math
from torch.cuda.amp import autocast, GradScaler

# Set random seed for reproducibility
torch.manual_seed(0)
np.random.seed(0)

# Device setup
# 'accelerate' with device_map='auto' will handle device placement.
# We still might need this for moving specific tensors like rewards or inputs.
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

# --- Memory Optimization Settings ---
# No need to call torch.cuda.empty_cache() at the start
# torch.backends.cuda.enable_mem_efficient_sdp(False) # Keep commented unless needed for specific issues

# --- Model and Tokenizer Loading ---
model_name = "Qwen/Qwen2.5-Math-1.5B"
print(f"Loading tokenizer: {model_name}")
tokenizer = AutoTokenizer.from_pretrained(model_name)

# Set pad token if it doesn't exist
if tokenizer.pad_token is None:
    tokenizer.pad_token = tokenizer.eos_token
    print("Set tokenizer pad_token to eos_token")

print(f"Loading model: {model_name}")
# Load the main model with device_map='auto', gradient checkpointing, and float16
# device_map='auto' handles placing the model on available GPUs/CPU/disk
model = AutoModelForCausalLM.from_pretrained(
    model_name,
    device_map="auto", # Let accelerate handle device placement
    torch_dtype=torch.float16,
    trust_remote_code=True # Add if required by the specific model
)
model.gradient_checkpointing_enable() # Enable gradient checkpointing *after* loading
# DO NOT call model.to(device) here - device_map handles it.
print("Model loaded onto devices via device_map='auto'")

print("Loading reference model...")
# Load the reference model similarly
reference_model = AutoModelForCausalLM.from_pretrained(
    model_name,
    device_map="auto", # Let accelerate handle device placement
    torch_dtype=torch.float16,
    trust_remote_code=True # Add if required by the specific model
)
reference_model.eval() # Set reference model to evaluation mode
# DO NOT call reference_model.to(device) here - device_map handles it.
print("Reference model loaded.")


# --- Example Data ---
example = {
    "prompt": "The pressure \\( P \\) exerted by wind on a sail varies jointly as the area \\( A \\) of the sail and the cube of the wind’s velocity \\( V \\). When the velocity is \\( 8 \\) miles per hour, the pressure on a sail of \\( 2 \\) square feet is \\( 4 \\) pounds. Find the wind velocity when the pressure on \\( 4 \\) square feet of sail is \\( 32 \\) pounds. Let’s think step by step and output the final answer within \\boxed{}.",
    # Previous attempt at recalculating GT removed to fix syntax error.
    # Using the user's original GT string for consistency with the initial request.
    "ground_truth": "12.8"
}

# --- Dataset Preparation ---
# Reduced batch size for memory, effective batch size simulated with accumulation
batch_size = 4 # Significantly reduced for memory
effective_batch_size = 32 # Target effective batch size
accumulation_steps = max(1, effective_batch_size // batch_size) # Calculate accumulation steps
print(f"Physical Batch Size: {batch_size}, Accumulation Steps: {accumulation_steps}, Effective Batch Size: {batch_size * accumulation_steps}")

# Duplicate the single example to create a batch
data = [example] * (batch_size * accumulation_steps) # Create enough data for one effective batch
dataset = Dataset.from_dict({
    "prompt": [d["prompt"] for d in data],
    "ground_truth": [d["ground_truth"] for d in data]
})
# In a real scenario, you would load a larger, diverse dataset here.

# --- Hyperparameters ---
learning_rate = 1e-6
kl_coeff = 0.02 # Adjusted KL coefficient, often needs tuning
entropy_coeff = 0.001 # Entropy bonus to encourage exploration
rollout_temperature = 0.7 # Temperature for sampling responses
weight_decay = 0.01
max_prompt_length = 512 # Max length for input prompt tokens
# Adjust max_response_length based on expected output length and memory
# max_new_tokens will be max_total_length - prompt_length
max_total_length = 768 # Reduced total length (prompt + response)
num_steps = 200 # Reduced number of steps for quicker testing
samples_per_prompt = 2 # Reduced samples per prompt for memory

# --- Optimizer and Scaler ---
optimizer = torch.optim.AdamW(model.parameters(), lr=learning_rate, weight_decay=weight_decay)
scaler = GradScaler() # For mixed precision

# --- Reward Function ---
def compute_reward(response, ground_truth):
    """Binary reward: 1.0 if ground_truth is in response, 0.0 otherwise."""
    # Simple check, might need more sophisticated reward logic (e.g., parsing the boxed answer)
    # Check if the exact ground_truth string is present in the response.
    # A more robust check might involve parsing "\\boxed{...}"
    return 1.0 if ground_truth in response else 0.0

# --- GRPO Loss Function ---
# NOTE: This loss implementation is complex. KL divergence calculation between
# sequences of different lengths/origins needs careful handling of padding and alignment.
# This version attempts a more standard KL calculation but requires careful validation.
def compute_grpo_loss(policy_logits, policy_sampled_ids, policy_attention_mask,
                      ref_log_probs_generated, rewards, kl_coeff, entropy_coeff,
                      pad_token_id, prompt_length):
    """
    Computes the GRPO-like loss.

    Args:
        policy_logits: Logits from the policy model for generated tokens. Shape (B*S, GenLen, V)
        policy_sampled_ids: Full sequence IDs (prompt + generated). Shape (B*S, FullLen)
        policy_attention_mask: Attention mask for the full sequence. Shape (B*S, FullLen)
        ref_log_probs_generated: Log probabilities from reference model for generated tokens. Shape (B*S, GenLen)
        rewards: Scalar rewards for each sampled sequence. Shape (B*S,)
        kl_coeff: Coefficient for KL divergence term.
        entropy_coeff: Coefficient for entropy bonus term.
        pad_token_id: ID of the padding token.
        prompt_length: Length of the initial prompt sequence.

    Returns:
        Total loss tensor.
        Tuple containing (pg_loss, kl_loss, entropy_loss) for logging.
    """
    # Ensure rewards are on the correct device
    rewards_tensor = torch.tensor(rewards, dtype=policy_logits.dtype, device=policy_logits.device)

    # --- Policy Gradient Loss ---
    # Get log probs of the sampled actions (generated tokens) from the policy model
    policy_log_probs = F.log_softmax(policy_logits, dim=-1)
    generated_ids = policy_sampled_ids[:, prompt_length:]
    # Shape: (B*S, GenLen)
    sampled_log_probs = torch.gather(policy_log_probs, -1, generated_ids.unsqueeze(-1)).squeeze(-1)
    # Shape: (B*S, GenLen)

    # Create mask for generated tokens (excluding padding)
    gen_attention_mask = (generated_ids != pad_token_id).to(policy_logits.dtype)
    # Shape: (B*S, GenLen)

    # Calculate advantages (simple version: reward - mean_reward)
    advantages = rewards_tensor - rewards_tensor.mean()
    # Shape: (B*S,) - Broadcasts to (B*S, GenLen)

    # Calculate policy gradient loss (negative policy objective) per token, then average
    # Multiply by mask to zero out padding contributions
    pg_loss_per_token = -sampled_log_probs * advantages.unsqueeze(1) * gen_attention_mask
    # Average only over non-padded tokens
    pg_loss = pg_loss_per_token.sum() / gen_attention_mask.sum().clamp(min=1)

    # --- KL Divergence Loss ---
    # Compare policy's log probs for generated tokens with reference model's log probs
    # Note: ref_log_probs_generated should already be calculated and passed in.
    # We need the policy's log probs for the generated tokens (calculated above)

    # Element-wise KL divergence: sum(policy_prob * (policy_log_prob - ref_log_prob))
    # Using log probabilities directly: kl = policy_log_prob - ref_log_prob
    # Take the mean KL divergence per *token*

    # KL divergence calculated per token, KL(P || Q) = sum P * log(P/Q) = sum P * (logP - logQ)
    # Here P is policy, Q is reference. We often approximate with logP - logQ averaged.
    kl_div_per_token = (sampled_log_probs - ref_log_probs_generated) * gen_attention_mask
    # Average KL divergence over non-padded tokens
    mean_kl_div = kl_div_per_token.sum() / gen_attention_mask.sum().clamp(min=1)
    kl_loss = kl_coeff * mean_kl_div

    # --- Entropy Bonus ---
    # Encourage exploration by maximizing entropy of the policy's output distribution
    policy_probs = F.softmax(policy_logits, dim=-1) # Shape (B*S, GenLen, V)
    entropy_per_token = -torch.sum(policy_probs * policy_log_probs, dim=-1) # Shape (B*S, GenLen)
    # Average entropy over non-padded tokens
    mean_entropy = (entropy_per_token * gen_attention_mask).sum() / gen_attention_mask.sum().clamp(min=1)
    entropy_loss = -entropy_coeff * mean_entropy # Maximize entropy -> minimize negative entropy

    # --- Total Loss ---
    total_loss = pg_loss + kl_loss + entropy_loss

    return total_loss, (pg_loss.item(), kl_loss.item(), entropy_loss.item())


# --- Training Loop ---
model.train() # Set model to training mode
global_step = 0

print("\nStarting training...")
for step in range(num_steps):
    print(f"\n--- Step {step + 1} / {num_steps} ---")
    # In a real scenario, you'd sample *different* data for each effective batch
    # Here we reuse the same small dataset subset
    epoch_data = dataset.shuffle(seed=step)[:batch_size * accumulation_steps] # Get data for one effective batch

    # Accumulate gradients
    optimizer.zero_grad(set_to_none=True)
    total_loss_accum = 0.0
    avg_reward_accum = 0.0
    all_pg_loss, all_kl_loss, all_ent_loss = 0.0, 0.0, 0.0

    for accum_step in range(accumulation_steps):
        print(f"  Accumulation Step {accum_step + 1}/{accumulation_steps}")
        # --- Prepare Micro-Batch ---
        start_idx = accum_step * batch_size
        end_idx = (accum_step + 1) * batch_size
        batch = {
            "prompt": epoch_data["prompt"][start_idx:end_idx],
            "ground_truth": epoch_data["ground_truth"][start_idx:end_idx]
        }
        prompts = batch["prompt"]
        ground_truths = batch["ground_truth"]

        print("    Tokenizing prompts...")
        # Tokenize prompts for the micro-batch
        inputs = tokenizer(
            prompts,
            return_tensors="pt",
            max_length=max_prompt_length,
            truncation=True,
            padding="max_length", # Pad to max_prompt_length
            return_attention_mask=True
        )
        # Move tokenized inputs to the device model expects (handled by accelerate for model input)
        # However, we might need prompt length on CPU later, so keep a copy or note it.
        prompt_length = inputs.input_ids.shape[1]

        # Transfer inputs to the primary device if necessary for generation start
        # Although model layers might be elsewhere, generation often starts on rank 0
        # Let's try keeping them on CPU and see if accelerate handles transfer.
        # If errors occur, uncomment: inputs = {k: v.to(device) for k, v in inputs.items()}

        # Lists to store results across samples for this micro-batch
        micro_batch_rewards = []
        micro_batch_sampled_ids = []
        micro_batch_logits = []
        micro_batch_ref_log_probs = []
        micro_batch_policy_masks = []


        # --- Rollout Phase (Generate Samples) ---
        print(f"    Generating {samples_per_prompt} samples per prompt...")
        with torch.no_grad(): # No gradients needed for sampling / reference model
             # Mixed precision context for generation if beneficial (might not save much memory here)
            # with autocast(dtype=torch.float16):
                for i in range(batch_size): # Process each prompt individually
                    prompt_input_ids = inputs.input_ids[i:i+1] # Shape (1, prompt_length)
                    prompt_attention_mask = inputs.attention_mask[i:i+1] # Shape (1, prompt_length)

                    # Move single prompt data to the device where the first layer of the model resides
                    # This assumes the generate call needs initial input on a specific device.
                    # Accelerate should handle internal transfers for subsequent layers.
                    prompt_input_ids = prompt_input_ids.to(model.device)
                    prompt_attention_mask = prompt_attention_mask.to(model.device)

                    for _ in range(samples_per_prompt):
                         # Generate response from policy model
                        outputs = model.generate(
                            input_ids=prompt_input_ids,
                            attention_mask=prompt_attention_mask,
                            max_new_tokens=max_total_length - prompt_length,
                            do_sample=True,
                            temperature=rollout_temperature,
                            top_p=1.0, # Use top_p=1.0 for full sampling with temperature
                            pad_token_id=tokenizer.pad_token_id,
                            return_dict_in_generate=True,
                            output_scores=True # Get logits for loss calculation
                        )
                        # shape: (1, full_seq_length), includes prompt + generated + padding
                        sampled_ids = outputs.sequences
                        # tuple of logits per generated token, stack them
                        # shape: (1, generated_length, vocab_size)
                        logits = torch.stack(outputs.scores, dim=1)

                        # Decode response for reward calculation (move sampled_ids back to CPU)
                        decoded_response = tokenizer.decode(sampled_ids[0], skip_special_tokens=True)
                        reward = compute_reward(decoded_response, ground_truths[i])

                        # --- Calculate Reference Log Probs ---
                        # Need log probs from reference model for the *generated* tokens
                        # Create attention mask for the full generated sequence
                        full_attention_mask = (sampled_ids != tokenizer.pad_token_id).to(sampled_ids.device, dtype=torch.long)

                        # Run reference model on the *full* sequence (prompt + generated)
                        ref_outputs = reference_model(
                            input_ids=sampled_ids,
                            attention_mask=full_attention_mask
                        )
                        # Get reference logits for the entire sequence
                        # shape: (1, full_seq_length, vocab_size)
                        ref_logits_full = ref_outputs.logits

                        # Extract reference logits corresponding *only* to the generated tokens
                        # shape: (1, generated_length, vocab_size)
                        ref_logits_generated = ref_logits_full[:, prompt_length-1:-1, :] # Slice carefully

                        # Calculate log softmax for KL div
                        # shape: (1, generated_length, vocab_size)
                        ref_log_probs_full_vocab = F.log_softmax(ref_logits_generated, dim=-1)

                        # Gather the reference log_probs for the *actually sampled* generated tokens
                        generated_ids_only = sampled_ids[:, prompt_length:] # shape (1, generated_length)
                        ref_log_probs_sampled = torch.gather(
                            ref_log_probs_full_vocab, -1, generated_ids_only.unsqueeze(-1)
                        ).squeeze(-1) # shape (1, generated_length)


                        # Store results (move tensors to CPU to avoid accumulation on GPU)
                        micro_batch_rewards.append(reward)
                        micro_batch_sampled_ids.append(sampled_ids.cpu())
                        micro_batch_logits.append(logits.cpu()) # Logits for generated tokens
                        micro_batch_ref_log_probs.append(ref_log_probs_sampled.cpu()) # Ref log_probs for generated tokens
                        micro_batch_policy_masks.append(full_attention_mask.cpu()) # Mask for the full sequence


        # --- Loss Calculation Phase ---
        print("    Calculating loss...")
        # Check if any samples were generated
        if not micro_batch_logits:
            print("    WARNING: No samples generated in this micro-batch. Skipping loss calculation.")
            continue

        # Concatenate results from the micro-batch sampling
        # Move tensors back to the primary device for loss calculation
        try:
            policy_logits_mb = torch.cat(micro_batch_logits, dim=0).to(device, dtype=torch.float16) # B*S, GenLen, V
            policy_sampled_ids_mb = torch.cat(micro_batch_sampled_ids, dim=0).to(device)           # B*S, FullLen
            policy_attention_mask_mb = torch.cat(micro_batch_policy_masks, dim=0).to(device)       # B*S, FullLen
            ref_log_probs_generated_mb = torch.cat(micro_batch_ref_log_probs, dim=0).to(device, dtype=torch.float16) # B*S, GenLen
            rewards_mb = micro_batch_rewards # Keep as list or convert to tensor later if needed by loss function

        except RuntimeError as e:
             print(f"Error during tensor concatenation or moving: {e}")
             print(f"Shapes: Logits{[l.shape for l in micro_batch_logits]}, SampledIDs{[s.shape for s in micro_batch_sampled_ids]}, RefLogProbs{[r.shape for r in micro_batch_ref_log_probs]}")
             # Attempt to clean up memory before potentially crashing
             del micro_batch_logits, micro_batch_sampled_ids, micro_batch_ref_log_probs, micro_batch_policy_masks
             torch.cuda.empty_cache()
             raise e # Re-raise the error


        # Calculate loss for the micro-batch using mixed precision
        with autocast(dtype=torch.float16):
            loss, (pg, kl, ent) = compute_grpo_loss(
                policy_logits=policy_logits_mb,
                policy_sampled_ids=policy_sampled_ids_mb,
                policy_attention_mask=policy_attention_mask_mb,
                ref_log_probs_generated=ref_log_probs_generated_mb,
                rewards=rewards_mb,
                kl_coeff=kl_coeff,
                entropy_coeff=entropy_coeff,
                pad_token_id=tokenizer.pad_token_id,
                prompt_length=prompt_length
            )
            loss = loss / accumulation_steps # Scale loss for gradient accumulation

        print(f"    Micro-batch Loss: {loss.item():.4f} (PG: {pg:.4f}, KL: {kl:.4f}, Ent: {ent:.4f})")
        total_loss_accum += loss.item()
        avg_reward_accum += np.mean(rewards_mb)
        all_pg_loss += pg / accumulation_steps
        all_kl_loss += kl / accumulation_steps
        all_ent_loss += ent / accumulation_steps


        # --- Backpropagation ---
        # Use scaler for mixed precision backward pass
        scaler.scale(loss).backward()

        # --- Clean up tensors for this micro-batch ---
        del loss, policy_logits_mb, policy_sampled_ids_mb, policy_attention_mask_mb, ref_log_probs_generated_mb, rewards_mb
        del batch, inputs, outputs, sampled_ids, logits, ref_outputs, ref_logits_full, ref_logits_generated, ref_log_probs_full_vocab, ref_log_probs_sampled, full_attention_mask
        # It's crucial to delete intermediate tensors, especially before the next accumulation step or optimizer step
        torch.cuda.empty_cache() # Clear cache frequently within the loop if memory is tight

    # --- Optimizer Step ---
    # Perform optimizer step after accumulating gradients for `accumulation_steps`
    print(f"  Accumulation complete. Performing optimizer step...")
    # Optional: Gradient clipping (can help stability)
    # scaler.unscale_(optimizer) # Unscale gradients before clipping
    # torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)
    scaler.step(optimizer) # Optimizer step
    scaler.update() # Update scaler for next iteration
    optimizer.zero_grad(set_to_none=True) # Clear gradients for the next effective batch

    global_step += 1

    # --- Logging ---
    avg_reward_effective_batch = avg_reward_accum / accumulation_steps
    print(f"--- Step {step + 1} Completed ---")
    print(f"  Avg Loss (Effective Batch): {total_loss_accum:.4f}")
    print(f"  Avg Reward (Effective Batch): {avg_reward_effective_batch:.4f}")
    print(f"  Avg Components (PG: {all_pg_loss:.4f}, KL: {all_kl_loss:.4f}, Ent: {all_ent_loss:.4f})")


    # --- Checkpointing (Optional) ---
    if (step + 1) % 50 == 0: # Save less frequently if needed
        print(f"Saving checkpoint at step {step + 1}...")
        try:
            # Saving requires gathering the model state if using FSDP/DeepSpeed.
            # With device_map='auto', saving the state dict *should* work,
            # but might be slow if parts are on disk.
            checkpoint_path = f"grpo_checkpoint_step_{step + 1}.pt"
            # Ensure model is in eval mode or handle state dict saving appropriately for training mode if needed
            # model.save_pretrained(f"grpo_checkpoint_step_{step+1}_hf") # Alternative way to save
            torch.save(model.state_dict(), checkpoint_path)
            print(f"Checkpoint saved to {checkpoint_path}")
        except Exception as e:
            print(f"Error saving checkpoint: {e}")
        # Free memory after saving
        torch.cuda.empty_cache()


print("\nTraining finished.")

# --- Evaluation (Simplified Example) ---
def evaluate_model(model, tokenizer, prompt, ground_truth, max_prompt_len, max_total_len):
    print("\n--- Evaluating Model ---")
    model.eval() # Set model to evaluation mode
    correct = 0
    response_text = ""
    try:
        with torch.no_grad(), autocast(dtype=torch.float16): # Use autocast for eval if model expects it
            inputs = tokenizer(
                [prompt],
                return_tensors="pt",
                max_length=max_prompt_len,
                truncation=True,
                padding=True
            )
             # Move inputs to the model's device (usually the first device in device_map)
            inputs = {k: v.to(model.device) for k, v in inputs.items()}
            prompt_actual_length = inputs['input_ids'].shape[1]

            outputs = model.generate(
                **inputs,
                max_new_tokens=max_total_len - prompt_actual_length,
                temperature=0.0, # Use temperature 0 for deterministic output
                do_sample=False, # Disable sampling for evaluation
                pad_token_id=tokenizer.pad_token_id
            )
            response_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
            print(f"Prompt: {prompt}")
            print(f"Generated Response: {response_text}")
            correct = compute_reward(response_text, ground_truth)
    except Exception as e:
        print(f"Error during evaluation: {e}")
        correct = 0 # Mark as incorrect if error occurs
    finally:
        model.train() # Set model back to training mode
    return correct, response_text

# Evaluate on the single training example
correct, final_response = evaluate_model(
    model,
    tokenizer,
    example["prompt"],
    example["ground_truth"],
    max_prompt_length,
    max_total_length
)
print(f"\nEvaluation on training example: {'Correct' if correct else 'Incorrect'}")

# --- Optional: Save Final Model ---
# print("Saving final model...")
# model.save_pretrained("qwen_grpo_final")
# tokenizer.save_pretrained("qwen_grpo_final")
# print("Final model saved.")