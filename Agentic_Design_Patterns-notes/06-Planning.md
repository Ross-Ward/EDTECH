# Planning

Summary
- Planning has agents create a sequence of actions or subtasks to reach a goal before executing them.

When to use
- Complex tasks requiring multi-step strategies, dependencies, or resource planning.

How it works
- Agent generates a plan (steps, prerequisites), optionally refines via simulation or evaluation, then executes.

Example
- Plan a research outline: literature search -> extract findings -> synthesize.

Real example (Crew/Agent planning)
The book shows a Planner agent that first creates a bullet-point plan and then writes a summary according to that plan. This is implemented as a Crew with a sequential process ensuring the plan is produced before writing.

```python
llm = ChatOpenAI(model="gpt-4-turbo")
planner_writer_agent = Agent(role='Article Planner and Writer', goal='Plan and then write a concise summary', llm=llm)

topic = "The importance of Reinforcement Learning in AI"
high_level_task = Task(description=f"1. Create a bullet-point plan for '{topic}'.\n2. Write the summary based on your plan (~200 words).", agent=planner_writer_agent)

crew = Crew(agents=[planner_writer_agent], tasks=[high_level_task], process=Process.sequential)
result = crew.kickoff()
print(result)
```

This enforces an explicit planning phase so the final writing follows a verifiable structure.

Pitfalls
- Plans can be infeasible or overly optimistic.
- Need monitoring to handle failures or changed conditions.

Related patterns
- Goal Setting and Monitoring, Reflection

