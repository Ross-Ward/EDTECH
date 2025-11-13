# Reasoning Techniques

Summary
- Reasoning Techniques like Chain-of-Thought, self-consistency, and tool-augmented reasoning improve problem-solving and correctness.

When to use
- Complex reasoning tasks, multi-step math, or code generation.

How it works
- Use prompting strategies that elicit intermediate steps, run multiple chains for consensus, or invoke tools for deterministic subroutines.

Example
- Ask the model to show its work (CoT) or run candidate solutions and vote on the best.

Real example (Chain-of-Thought)
The book includes a prompting template that asks the agent to 'think step-by-step' and produce an internal CoT before answering. Example prompt instructs the agent to analyze the query, formulate search queries, simulate retrieval, synthesize, then review. The final answer is concise and grounded in the thought steps.

Real example (Self-correction Agent)
A Self-Correction agent inspects an initial draft against explicit requirements, lists weaknesses, proposes fixes, and produces a revised output (e.g., improving a short social media post to emphasize eco-friendliness and engagement).

Example revised output from the Self-Correction agent:

```
🌱 Discover GreenTech Gadgets! Our new eco-friendly line blends innovation with sustainability. Go green, go smart! Shop now! #EcoFriendly #GreenTech
```

These strategies (CoT and self-correction) increase transparency and often improve factuality and style by forcing explicit intermediate steps.

Pitfalls
- Longer outputs and higher cost; sometimes models fabricate intermediate steps.

Related patterns
- Reflection, Prompt Chaining, Tool Use

