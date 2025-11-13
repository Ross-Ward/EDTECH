# Memory Management

Summary
- Memory Management stores and retrieves context across interactions so agents can maintain state and personalization.

When to use
- Multi-turn conversations, personalization, session continuity.

How it works
- Implement short-term (session) and long-term memories, decide what to store, indexing and retrieval strategies.

Example
- Save user preferences and past decisions to inform future suggestions.

Real example (ADK Tool-based state updates)
The ADK example shows a `log_user_login(tool_context)` tool that updates the session state (login count, last login timestamp, task status) via the provided ToolContext. This encapsulates state changes and avoids scattering state logic throughout agent code.

```python
def log_user_login(tool_context: ToolContext) -> dict:
	state = tool_context.state
	login_count = state.get("user:login_count", 0) + 1
	state["user:login_count"] = login_count
	state["task_status"] = "active"
	state["user:last_login_ts"] = time.time()
	return {"status": "success", "message": f"User login tracked. Total logins: {login_count}."}
```

Using tools for state mutations centralizes logic and simplifies testing and auditing of memory changes.

Pitfalls
- Privacy and data retention concerns.
- Memory bloat and noisy retrievals.

Related patterns
- Knowledge Retrieval, Adaptation

