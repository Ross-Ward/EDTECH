# Personalizing Large Language Models with LoRe: Low-Rank Reward Modeling

## Authors
The research paper *"LoRe: Personalizing LLMs via Low-Rank Reward Modeling"* (April 22, 2025) is authored by:
- **Avinandan Bose** (FAIR at Meta, University of Washington): Corresponding author, likely leading the research. His work focuses on machine learning, reinforcement learning, and personalization in AI systems.
- **Zhihan Xiong** (University of Washington): Contributes to the technical development, possibly in algorithm design or implementation.
- **Yuejie Chi** (Carnegie Mellon University): A prominent researcher in statistical signal processing and machine learning, likely providing theoretical insights.
- **Simon Shaolei Du** (University of Washington): Known for work in reinforcement learning and representation learning, contributing to the low-rank modeling approach.
- **Lin Xiao** (FAIR at Meta): Likely involved in practical implementation and alignment with Meta’s AI goals.
- **Maryam Fazel** (University of Washington): Expert in optimization and control, probably guiding the low-rank optimization framework.

These authors are affiliated with prestigious institutions and Meta’s FAIR (Facebook AI Research), indicating a blend of academic rigor and industry application in advancing personalized AI.

## Introduction
The LoRe framework addresses the challenge of aligning Large Language Models (LLMs) with diverse user preferences. Traditional Reinforcement Learning from Human Feedback (RLHF) uses monolithic reward models, which struggle to capture individual variability. LoRe introduces low-rank reward modeling, representing user preferences as weighted combinations of shared basis reward functions, enabling efficient, scalable, and few-shot personalization.

This document provides an overview of LoRe, its contributions, a Python implementation, and a discussion on potential dangers and ethical considerations.

## LoRe Framework Overview

### Problem Context
RLHF employs the Bradley-Terry (BT) model to learn a reward function from pairwise preference data:

\[
\mathrm{P}(y_c \succ y_r \mid x) = \frac{1}{1 + \exp \left( -(r_\phi(x, y_c) - r_\phi(x, y_r)) \right)}
\]

A single reward function \( r_\phi \) often fails to accommodate diverse user preferences, limiting personalization.

### LoRe Approach
LoRe uses a low-rank decomposition:
- **Reward Basis**: \( \mathbf{R}_\phi: \mathcal{X} \times \mathcal{Y} \rightarrow \mathbb{R}^B \), outputting \( B \)-dimensional latent rewards.
- **User Preferences**: \( \mathbf{p}_i(x, y) = \mathbf{w}_i^\top \mathbf{R}_\phi(x, y) \), where \( \mathbf{w}_i \in \Delta^{B-1} \) is a user-specific weight vector.

This enables:
1. Learning a shared reward basis from multiple users.
2. Few-shot adaptation for new users by estimating \( \mathbf{w}_i \).

### Key Contributions
1. **Latent Basis Reward Functions**: Flexible personalization without predefined categories.
2. **Decoupled Learning**: Efficient few-shot adaptation by separating \( \mathbf{R}_\phi \) and \( \mathbf{w}_i \).
3. **Scalability**: Low-rank structure reduces computational overhead.
4. **Multi-Objective Alignment**: Supports personalized response generation.
5. **Generalization**: Superior performance on unseen users (e.g., 71.0% accuracy on PRISM vs. 58.2% for VPL).

### Workflow
1. **Data Collection**: Preference data \( \mathcal{D}_i = \{(x, y_c, y_r)\} \) from seen users \( \mathcal{U}_{\text{seen}} \).
2. **Joint Learning**:

\[
\min_{\phi, \{\mathbf{w}_i\}} \sum_{i \in \mathcal{U}_{\text{seen}}} \frac{1}{|\mathcal{D}_i|} \sum_{(x, y_c, y_r) \in \mathcal{D}_i} \ell\left( \mathbf{w}_i^\top \left( \mathbf{R}_\phi(x, y_c) - \mathbf{R}_\phi(x, y_r) \right) \right)
\]

3. **Few-Shot Adaptation**:

\[
\mathbf{w}_{\text{new}} = \underset{\mathbf{w}}{\operatorname{argmin}} \sum_{(x, y_c, y_r) \in \mathcal{D}_i} \ell\left( \mathbf{w}^\top \left( \mathbf{R}_\phi(x, y_c) - \mathbf{R}_\phi(x, y_r) \right) \right)
\]

4. **Response Generation**: Use \( \mathbf{w}_i^\top \mathbf{R}_\phi \) for personalized outputs.

## Dangers and Ethical Considerations
### Potential Dangers
1. **Bias Amplification**:
   - LoRe relies on user preference data, which may encode biases (e.g., cultural, demographic). If the training data overrepresents certain groups, the reward basis may favor dominant preferences, marginalizing minority users.
   - Few-shot adaptation could exacerbate biases if initial user interactions reinforce skewed preferences.

2. **Privacy Risks**:
   - Collecting and storing user preference data (e.g., \( \mathcal{D}_i \)) raises concerns about data security and potential misuse. User weights \( \mathbf{w}_i \) could inadvertently reveal sensitive information about individual preferences.

3. **Over-Personalization**:
   - Hyper-personalized LLMs might create echo chambers, reinforcing users’ existing beliefs or preferences, potentially reducing exposure to diverse perspectives.
   - In extreme cases, this could manipulate user behavior by overly tailoring responses to inferred preferences.

4. **Scalability vs. Fairness**:
   - While LoRe scales efficiently, its low-rank structure might oversimplify complex user preferences, potentially failing to capture nuanced or outlier preferences, leading to unfair treatment of atypical users.

5. **Misuse Potential**:
   - Personalized LLMs could be exploited for targeted misinformation or persuasion, especially if adversaries manipulate preference data to steer model outputs.

### Ethical (Edtech) View
In educational technology (edtech), LoRe’s personalization could enhance learning by tailoring content to individual student needs, improving engagement and outcomes. However, ethical considerations include:
1. **Equity in Access**:
   - Personalization requires sufficient user data, which may disadvantage students with limited access to technology or those who provide less feedback, potentially widening educational gaps.
2. **Transparency**:
   - Students and educators should understand how preferences are modeled and used. Opaque personalization could erode trust in edtech platforms.
3. **Bias in Educational Content**:
   - If LoRe’s reward basis is trained on biased educational data (e.g., favoring certain learning styles), it could perpetuate inequities in content delivery.
4. **Data Consent**:
   - Students, especially minors, must have clear consent mechanisms for data collection. Edtech platforms using LoRe should comply with regulations like GDPR or COPPA.
5. **Balancing Personalization and Diversity**:
   - Over-personalization might limit exposure to challenging or diverse materials, hindering critical thinking. LoRe should balance tailored content with broad educational goals.

To mitigate these risks, developers should:
- Use diverse, representative training data.
- Implement robust privacy protections (e.g., differential privacy for user weights).
- Provide transparency in how preferences are modeled.
- Regularly audit models for bias and fairness.
- Allow users to opt out or adjust personalization levels.

## Implementation
The provided Python code implements LoRe’s reward modeling (Example 1: linear transformation on pre-trained embeddings).

### Code Structure
- **PreTrainedEmbeddingModel**: Placeholder for frozen embeddings (\( D = 4096 \)).
- **PreferenceDataset**: Handles preference triples \( (x, y_c, y_r) \).
- **LoReRewardModel**:
  - Reward basis: \( \mathbf{R}_\phi(x, y) = \mathbf{A} \mathbf{e}(x, y) \).
  - Personalized reward: \( \mathbf{p}_i(x, y) = \mathbf{w}_i^\top \mathbf{R}_\phi(x, y) \).
  - BT loss: \( \ell(z) = \log(1 + \exp(-z)) \).
- **Training Functions**:
  - `train_basis_and_weights`: Optimizes \( \mathbf{A} \) and \( \mathbf{W} \).
  - `few_shot_learn_new_user_weights`: Learns \( \mathbf{w}_{\text{new}} \).
- **Inference**: Computes preference probabilities.

### Code Example
```python
# -*- coding: utf-8 -*-
import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import Dataset, DataLoader

# --- Configuration ---
EMBEDDING_DIM = 4096
RANK_B = 10
LEARNING_RATE_BASIS = 0.0005
LEARNING_RATE_FEWSHOT = 0.01
NUM_SEEN_USERS = 100
NUM_UNSEEN_USERS = 10
EPOCHS_BASIS = 5
EPOCHS_FEWSHOT = 10

# --- Placeholder Components ---
class PreTrainedEmbeddingModel(nn.Module):
    def __init__(self, embedding_dim):
        super().__init__()
        self.embedding_dim = embedding_dim
        print(f"Initialized Placeholder Embedding Model (Dim: {self.embedding_dim})")

    def forward(self, prompt_response_pair):
        batch_size = len(prompt_response_pair)
        return torch.randn(batch_size, self.embedding_dim)

class PreferenceDataset(Dataset):
    def __init__(self, user_data):
        self.data = user_data
        print(f"Initialized Placeholder Dataset with {len(self.data)} samples.")

    def __len__(self):
        return len(self.data)

    def __getitem__(self, idx):
        prompt, yc, yr = self.data[idx]
        return (prompt, yc), (prompt, yr)

# --- LoRe Model Definition ---
class LoReRewardModel(nn.Module):
    def __init__(self, embedding_model, embedding_dim, rank_b, num_seen_users):
        super().__init__()
        self.embedding_model = embedding_model
        for param in self.embedding_model.parameters():
            param.requires_grad = False
        self.reward_basis_projection = nn.Linear(embedding_dim, rank_b, bias=False)
        self.user_weights = nn.Parameter(torch.randn(num_seen_users, rank_b))
        print(f"Initialized LoRe Model (Rank B={rank_b}, Seen Users={num_seen_users})")

    def get_reward_basis_output(self, prompt_response_pair):
        with torch.no_grad():
            embeddings = self.embedding_model(prompt_response_pair)
        basis_output = self.reward_basis_projection(embeddings)
        return basis_output

    def get_personalized_reward(self, prompt_response_pair, user_id_or_weights_param):
        basis_output = self.get_reward_basis_output(prompt_response_pair)
        if isinstance(user_id_or_weights_param, int):
            user_w = self.user_weights[user_id_or_weights_param]
        elif isinstance(user_id_or_weights_param, nn.Parameter):
            user_w = user_id_or_weights_param
        elif isinstance(user_id_or_weights_param, torch.Tensor):
            user_w = user_id_or_weights_param
        else:
            raise ValueError("Provide user_id (int), user_weights (nn.Parameter or Tensor)")
        if user_w.dim() == 1:
            user_w = user_w.unsqueeze(0)
        personalized_reward = torch.sum(basis_output * user_w, dim=1)
        return personalized_reward

    def forward(self, chosen_pair, rejected_pair, user_id_or_weights_param):
        reward_chosen = self.get_personalized_reward(chosen_pair, user_id_or_weights_param)
        reward_rejected = self.get_personalized_reward(rejected_pair, user_id_or_weights_param)
        return reward_chosen - reward_rejected

# --- Loss Function ---
def logistic_loss(reward_diff):
    return torch.log(1 + torch.exp(-reward_diff))

# --- Training Functions ---
def train_basis_and_weights(model, seen_user_dataloaders, optimizer, epochs):
    model.train()
    num_users = len(seen_user_dataloaders)
    print(f"\n--- Starting Joint Training (Basis A and {num_users} User Weights W) ---")
    for epoch in range(epochs):
        total_loss = 0
        num_samples = 0
        for user_id, dataloader in enumerate(seen_user_dataloaders):
            user_epoch_loss = 0
            user_samples = 0
            for batch_idx, (chosen_pair_batch, rejected_pair_batch) in enumerate(dataloader):
                optimizer.zero_grad()
                reward_differences = model(chosen_pair_batch, rejected_pair_batch, user_id)
                loss = logistic_loss(reward_differences).mean()
                loss.backward()
                optimizer.step()
                user_epoch_loss += loss.item() * len(chosen_pair_batch)
                user_samples += len(chosen_pair_batch)
            total_loss += user_epoch_loss
            num_samples += user_samples
        if num_samples > 0:
            avg_epoch_loss = total_loss / num_samples
            print(f"Epoch {epoch+1}/{epochs} - Overall Avg Loss: {avg_epoch_loss:.4f}")
        else:
            print(f"Epoch {epoch+1}/{epochs} - No samples processed.")
    print("--- Joint Training Finished ---")

def few_shot_learn_new_user_weights(model, new_user_weights_param, few_shot_dataloader, optimizer_fewshot, epochs):
    model.train()
    for param in model.reward_basis_projection.parameters():
        param.requires_grad = False
    if hasattr(model, 'user_weights'):
        model.user_weights.requires_grad_(False)
    new_user_weights_param.requires_grad_(True)
    print("\n--- Starting Few-Shot Adaptation for New User ---")
    for epoch in range(epochs):
        epoch_loss = 0
        num_samples = 0
        for batch_idx, (chosen_pair_batch, rejected_pair_batch) in enumerate(few_shot_dataloader):
            optimizer_fewshot.zero_grad()
            reward_differences = model(chosen_pair_batch, rejected_pair_batch, new_user_weights_param)
            loss = logistic_loss(reward_differences).mean()
            loss.backward()
            optimizer_fewshot.step()
            epoch_loss += loss.item() * len(chosen_pair_batch)
            num_samples += len(chosen_pair_batch)
        if num_samples > 0:
            avg_epoch_loss = epoch_loss / num_samples
            print(f"  Epoch {epoch+1}/{epochs} - Few-Shot Avg Loss: {avg_epoch_loss:.4f}")
        else:
            print(f"Epoch {epoch+1}/{epochs} - No few-shot samples processed.")
    print("--- Few-Shot Adaptation Finished ---")
    for param in model.reward_basis_projection.parameters():
        param.requires_grad = True
    if hasattr(model, 'user_weights'):
        model.user_weights.requires_grad_(True)
    learned_weights = new_user_weights_param.data.detach().clone()
    return learned_weights

# --- Example Usage ---
embedding_model = PreTrainedEmbeddingModel(EMBEDDING_DIM)
lore_model = LoReRewardModel(embedding_model, EMBEDDING_DIM, RANK_B, NUM_SEEN_USERS)
optimizer_basis = optim.Adam(
    [
        {'params': lore_model.reward_basis_projection.parameters()},
        {'params': lore_model.user_weights}
    ],
    lr=LEARNING_RATE_BASIS
)
seen_user_datasets = [
    PreferenceDataset([("prompt1", "good_respA", "bad_respB"), ("prompt2", "good_respC", "bad_respD")])
    for _ in range(NUM_SEEN_USERS)
]
seen_user_dataloaders = [DataLoader(ds, batch_size=2) for ds in seen_user_datasets]
train_basis_and_weights(lore_model, seen_user_dataloaders, optimizer_basis, EPOCHS_BASIS)
few_shot_data = PreferenceDataset([
    ("new_prompt1", "unseen_good1", "unseen_bad1"),
    ("new_prompt2", "unseen_good2", "unseen_bad2"),
    ("new_prompt3", "unseen_good3", "unseen_bad3")
])
few_shot_dataloader = DataLoader(few_shot_data, batch_size=2)
new_user_weights_param = nn.Parameter(torch.randn(1, RANK_B))
optimizer_fewshot = optim.Adam([new_user_weights_param], lr=LEARNING_RATE_FEWSHOT)
new_user_learned_weights = few_shot_learn_new_user_weights(
    model=lore_model,
    new_user_weights_param=new_user_weights_param,
    few_shot_dataloader=few_shot_dataloader,
    optimizer_fewshot=optimizer_fewshot,
    epochs=EPOCHS_FEWSHOT
)
print(f"\nLearned weights for new user: {new_user_learned_weights.numpy()}")
lore_model.eval()
with torch.no_grad():
    test_pair_chosen = [("test_prompt", "candidate_response1")]
    test_pair_rejected = [("test_prompt", "candidate_response2")]
    reward_diff_new_user = lore_model(test_pair_chosen, test_pair_rejected, new_user_learned_weights)
    prob_chosen_preferred = 1 / (1 + torch.exp(-reward_diff_new_user))
    print(f"\nPrediction for New User on Test Pair:")
    print(f"  Reward Difference (r_chosen - r_rejected): {reward_diff_new_user.item():.4f}")
    print(f"  P(Chosen > Rejected): {prob_chosen_preferred.item():.4f}")
    reward_diff_seen_user = lore_model(test_pair_chosen, test_pair_rejected, 0)
    prob_chosen_preferred_seen = 1 / (1 + torch.exp(-reward_diff_seen_user))
    print(f"\nPrediction for Seen User 0 on Test Pair:")
    print(f"  Reward Difference (r_chosen - r_rejected): {reward_diff_seen_user.item():.4f}")
    print(f"  P(Chosen > Rejected): {prob_chosen_preferred_seen.item():.4f}")
```

### Implementation Notes
- **Embedding Model**: Placeholder returning random embeddings; replace with a real model (e.g., Liu et al., 2024).
- **Dataset**: Uses dummy data; real datasets like PersonalLLM provide actual preference triples.
- **Hyperparameters**: Aligned with the paper (learning rates 0.0005 for basis, 0.01 for few-shot; \( B \) via cross-validation).
- **Efficiency**: Linear projection \( \mathbf{A} \) and weights \( \mathbf{W} \) reduce parameters compared to PAL and VPL (Table 6).

## Experimental Results
Evaluated on PersonalLLM and PRISM, LoRe outperforms:
- **Reference Model**: Pre-trained reward model.
- **BT**: Monolithic model.
- **VPL**: Variational Preference Learning.
- **PAL**: Pluralistic Alignment.

### Key Findings
- **Unseen Accuracy**: 71.0% on PRISM (vs. 58.2% VPL, 59.0% PAL, Table 3).
- **Few-Shot Performance**: Improves with more samples (Figure 2).
- **Scalability**: Efficient parameter scaling (Figure 3).

## Conclusion
LoRe provides a scalable, efficient solution for personalizing LLMs, overcoming limitations of traditional RLHF. Its low-rank approach enables robust adaptation to diverse users, but careful consideration of biases, privacy, and fairness is essential, especially in sensitive domains like edtech.

## Future Work
- Online RLHF with explorative data collection.
- Direct policy learning for response generation (Appendix A).
- Larger \( B \) values or complex transformations (e.g., MLP, LoRA).