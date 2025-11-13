# Human-in-the-Loop

Summary
- Human-in-the-Loop incorporates human judgment for tasks that require oversight, personalization, or where automation risk is high.

When to use
- High-stakes decisions, ambiguous content, or when legal/regulatory compliance requires human review.

How it works
- Route decisions or flagged outputs to humans, collect feedback, and use it to improve models or policies.

Example
- Escalate moderation decisions to a human reviewer when confidence is low.

Real example (Customer support with personalization & escalation)
The ADK example defines a `technical_support_specialist` agent that:
- Reads `state['customer_info']['support_history']` for personalization
- Calls `troubleshoot_issue` and `create_ticket` tools
- Uses `escalate_to_human` for complex issues

It also shows a `personalization_callback` that injects customer context as a system message into LLM requests so the agent responds with personalized tone and references.

```python
technical_support_agent = Agent(name="technical_support_specialist", tools=[troubleshoot_issue, create_ticket, escalate_to_human])
def personalization_callback(callback_context, llm_request):
	customer_info = callback_context.state.get('customer_info')
	if customer_info:
		# insert personalization into llm_request
		pass
```

This pattern combines automated handling with clear escalation paths and personalization for better UX.

Pitfalls
- Latency and cost of human review; designing good UI/UX for reviewers is critical.

Related patterns
- Evaluation and Monitoring, Guardrails/Safety

