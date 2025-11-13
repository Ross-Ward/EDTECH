# Multi-Agent Collaboration

Summary
- Multiple specialized agents collaborate—either sequentially or in parallel—to solve larger problems.

When to use
- Problems that benefit from diverse skills or modular responsibilities (e.g., research + writing + fact-checking agents).

How it works
- Define agent roles, communication protocols, and coordination patterns (coordinator, peer-to-peer, blackboard).

Example
- Coordinator agent assigns sub-tasks to a researcher agent and an editor agent, then merges outputs.

Real example (ADK coordinator with custom agents)
The book demonstrates a parent `Coordinator` agent with two sub-agents: a `Greeter` LlmAgent and a custom `TaskExecutor` (non-LLM) agent. The coordinator delegates greeting requests to the Greeter and task executions to TaskExecutor.

```python
class TaskExecutor(BaseAgent):
	async def _run_async_impl(self, context):
		yield Event(author=self.name, content="Task finished successfully.")

greeter = LlmAgent(name="Greeter", model="gemini-2.0-flash-exp", instruction="You are a friendly greeter.")
task_doer = TaskExecutor()

coordinator = LlmAgent(name="Coordinator", sub_agents=[greeter, task_doer], instruction="Delegate greeting to Greeter; tasks to TaskExecutor.")
```

This pattern shows how to combine LLM-based and custom agents under a single coordinator for modular responsibility.

Pitfalls
- Coordination overhead, disagreement resolution, and more complex debugging.

Related patterns
- Inter-Agent Communication, Routing, Parallelization

