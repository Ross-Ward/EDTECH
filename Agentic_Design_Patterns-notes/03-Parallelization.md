# Parallelization

Summary
- Parallelization runs independent subtasks concurrently to reduce total latency.

When to use
- Independent data fetches, scoring multiple options, ensemble evaluations.

How it works
- Identify independent subtasks.
- Dispatch concurrently to agents or model instances and aggregate results.

Example
- Send the same prompt to different models or run multiple retrievals in parallel and merge results.

Real example (Google ADK parallel research)
The book shows a ParallelAgent that runs three researcher sub-agents concurrently (RenewableEnergyResearcher, EVResearcher, CarbonCaptureResearcher).
Each researcher runs a search tool and stores a short summary in session state. A Merger agent runs after the parallel agents to synthesize the summaries into a single structured report.

```python
# Define researcher agents that run in parallel
researcher_agent_1 = LlmAgent(name="RenewableEnergyResearcher", instruction="Research renewable energy...", output_key="renewable_energy_result")
researcher_agent_2 = LlmAgent(name="EVResearcher", instruction="Research EV tech...", output_key="ev_technology_result")
researcher_agent_3 = LlmAgent(name="CarbonCaptureResearcher", instruction="Research carbon capture...", output_key="carbon_capture_result")

parallel_research_agent = ParallelAgent(sub_agents=[researcher_agent_1, researcher_agent_2, researcher_agent_3])

# Merger synthesizes only from the collected summaries
merger_agent = LlmAgent(name="SynthesisAgent", instruction="Synthesize the provided summaries only.")

sequential_pipeline_agent = SequentialAgent(sub_agents=[parallel_research_agent, merger_agent])
```

This pattern reduces total time by gathering independent results concurrently and then producing a coherent, grounded synthesis.

Pitfalls
- Overhead from concurrency management.
- Throttling or rate limits on models/services.

Related patterns
- Routing, Multi-Agent Collaboration

