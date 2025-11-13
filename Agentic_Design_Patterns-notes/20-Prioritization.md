# Prioritization

Summary
- Prioritization ranks tasks or resources so agents tackle high-impact items first.

When to use
- When workload exceeds resources or when deadlines matter.

How it works
- Score tasks by value, urgency, and cost; schedule or allocate resources accordingly.

Example
- A project manager agent orders bug fixes by user impact and regression risk.

Real example (SuperSimplePM)
The book provides a minimal in-memory task manager and a Project Manager agent with tools: `create_new_task`, `assign_priority_to_task`, `assign_task_to_worker`, and `list_all_tasks`. The PM agent follows a prompt template to create tasks first, then set priority and assignee based on the user's request.

Key tool flow:

```python
task = task_manager.create_task("Implement new login system")
pm_tools: create_new_task -> assign_priority_to_task -> assign_task_to_worker -> list_all_tasks
```

This pattern shows how agents can use structured tools to maintain consistent prioritization workflows.

Pitfalls
- Mis-specified scoring can prioritize the wrong tasks.

Related patterns
- Planning, Resource-Aware Optimization

