# Reflection

Summary
- Reflection has agents inspect and critique their own outputs, iteratively improving results.

When to use
- When initial answers may be incomplete or require self-correction.

How it works
- Generate an initial response, then ask an agent or the model to review for errors, missing steps, or alternative approaches, and revise.

Example
- Ask the model to list potential mistakes in its prior answer and update.

Real example (Draft + Reviewer pipeline)
The book shows a SequentialAgent where a `DraftWriter` LLM produces an initial paragraph and a `FactChecker` LLM critiques it. The reviewer returns a structured dictionary with a status and reasoning so the system can decide whether to accept or regenerate the draft.

```python
generator = LlmAgent(name="DraftWriter", instruction="Write a short, informative paragraph...", output_key="draft_text")
reviewer = LlmAgent(name="FactChecker", instruction="Verify factual accuracy and return {'status','reasoning'}", output_key="review_output")

review_pipeline = SequentialAgent(sub_agents=[generator, reviewer])
```

This pattern enforces self-critique before finalizing outputs and can trigger regeneration or human escalation when the reviewer marks the draft as INACCURATE.

Pitfalls
- Risk of reinforcing mistakes if the reviewer repeats the same bias.
- Extra cost and latency.

Related patterns
- Prompt Chaining, Exception Handling

