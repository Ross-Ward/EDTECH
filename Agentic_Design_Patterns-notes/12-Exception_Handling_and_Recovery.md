# Exception Handling and Recovery

Summary
- Agents must detect failures and recover gracefully via fallbacks, retries, or human escalation.

When to use
- Any production agent where robustness is required.

How it works
- Classify error types, implement retry/backoff, provide fallback strategies, and surface critical issues to human operators.

Example
- If a tool call times out, switch to a cached result or a simpler heuristic.

Real example (Primary + Fallback handlers)
The ADK example shows a SequentialAgent with three agents: a `primary_handler` that calls a precise lookup tool, a `fallback_handler` that checks state and uses a more general tool if the primary failed, and a `response_agent` that formats the final state for the user.

```python
primary_handler = Agent(name="primary_handler", tools=[get_precise_location_info])
fallback_handler = Agent(name="fallback_handler", tools=[get_general_area_info])
response_agent = Agent(name="response_agent", tools=[])

robust_location_agent = SequentialAgent(sub_agents=[primary_handler, fallback_handler, response_agent])
```

This pattern ensures graceful recovery paths and explicit state checks to avoid silent failures.

Pitfalls
- Swallowing errors silently or creating cascading failures if fallbacks are inadequate.

Related patterns
- Guardrails/Safety, Planning

