# Resource-Aware Optimization

Summary
- Resource-Aware Optimization adjusts agent behavior based on available compute, latency, or monetary cost constraints.

When to use
- Cost-sensitive production systems or devices with limited compute.

How it works
- Profile costs, choose cheaper model variants when appropriate, batch or cache requests, and trade quality vs cost dynamically.

Example
- Use smaller models for routine queries and larger models for high-value requests.

Real example (Model selection router)
The book shows a `QueryRouter` agent that measures query length (a proxy for complexity) and routes short queries to a cheaper `GeminiFlashAgent` and long/complex queries to a stronger `GeminiProAgent`.

```python
if query_length < 20:
	response = await gemini_flash_agent.run_async(context.current_message)
else:
	response = await gemini_pro_agent.run_async(context.current_message)
```

The notes also include a `CRITIC_SYSTEM_PROMPT` used by a Critic agent to QA researcher outputs, which helps allocate expensive verification only when needed.

This pattern balances cost, latency, and quality by dynamic model selection and selective QA.

Pitfalls
- Sudden quality drops if thresholds are misconfigured.

Related patterns
- Parallelization, Planning

