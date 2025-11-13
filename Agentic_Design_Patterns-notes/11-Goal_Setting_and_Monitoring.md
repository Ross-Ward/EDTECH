# Goal Setting and Monitoring

Summary
- Explicit goal setting gives agents clear, measurable objectives; monitoring tracks progress and triggers corrective actions.

When to use
- Long-running tasks, multi-step workflows, or when the agent's output must meet quantifiable targets.

How it works
- Define goals, metrics, checkpoints, and monitoring agents or processes that evaluate and steer execution.

Example
- Set a goal to reduce a bug count by X; monitor weekly metrics and reprioritize tasks.

Real example (Iterative code-generation with goal checks)
The book includes an iterative agent that generates code, asks the LLM to review it against a list of goals, and stops when the LLM judges the goals are met (True/False). This loop saves the final code to a file once goals are satisfied or max iterations are reached.

Key snippet:

```python
for i in range(max_iterations):
	code = llm.invoke(generate_prompt(...)).content
	feedback = llm.invoke(feedback_prompt)
	if goals_met(feedback.content, goals):
		break
	previous_code = code
final_code = add_comment_header(code, use_case)
save_code_to_file(final_code, use_case)
```

This demonstrates explicit goal definitions, automated monitoring (via LLM review), and controlled stopping criteria.

Pitfalls
- Poorly specified goals lead to gaming or unintended behavior.

Related patterns
- Planning, Evaluation and Monitoring

