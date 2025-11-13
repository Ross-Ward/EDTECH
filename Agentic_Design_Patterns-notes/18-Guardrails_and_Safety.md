# Guardrails & Safety

Summary
- Guardrails enforce policies and safety constraints (e.g., content filters, input validation, output validators) to reduce harm.

When to use
- Any public-facing agent, high-risk or regulated domains.

How it works
- Implement validation pipelines, safety prompts, external checkers, and human escalation for edge cases.

Example
- Use a classifier to detect toxic outputs and reroute or redact before user delivery.

Real example (Tool-parameter validation callback)
The ADK example defines a `validate_tool_params` callback that inspects tool arguments against session state (e.g., user IDs) and blocks the tool by returning an error dictionary when validation fails. Agents register this callback as `before_tool_callback` to enforce policies at runtime.

```python
def validate_tool_params(tool, args, tool_context):
	expected_user_id = tool_context.state.get("session_user_id")
	if args.get("user_id_param") != expected_user_id:
		return {"status":"error","error_message":"Tool call blocked: User ID validation failed."}
	return None

root_agent = Agent(..., before_tool_callback=validate_tool_params)
```

This enforces security and safety checks centrally before any tool executes.

Pitfalls
- Overly strict guards block useful content; overly loose guards miss hazards.

Related patterns
- Exception Handling, Human-in-the-Loop

