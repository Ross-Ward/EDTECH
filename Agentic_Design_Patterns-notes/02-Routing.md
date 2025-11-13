# Routing

Summary
- Routing sends user requests to the proper specialized agent or tool based on intent, domain, or resource needs.

When to use
- Heterogeneous toolsets or multi-agent systems where specialization improves accuracy and efficiency.

How it works
- Classify incoming requests and map to agent/service.
- Optionally use a router agent that maintains capabilities metadata.

Example
- A request about calendar events goes to the calendar agent; a code execution request goes to the code executor.

Real example (Google ADK coordinator)
The book includes a Google ADK example where a `Coordinator` agent delegates requests to specialized sub-agents (`Booker` and `Info`).
The coordinator inspects the incoming request and routes booking-related queries to the Booker agent and general questions to the Info agent.

```python
def booking_handler(request: str) -> str:
	return f"Booking action for '{request}' has been simulated."

def info_handler(request: str) -> str:
	return f"Information request for '{request}'. Result: Simulated information retrieval."

# Coordinator delegates to sub-agents with tools attached
# Example run:
# run_coordinator(runner, "Book me a hotel in Paris.")  -> handled by Booker
# run_coordinator(runner, "What is the highest mountain in the world?") -> handled by Info
```

This demonstrates an LLM-driven router that uses simple heuristics/instructions plus available sub-agents to delegate work.

Pitfalls
- Incorrect classification causes misrouting.
- Router becomes a single point of failure if not redundant.

Related patterns
- Parallelization, Multi-Agent Collaboration

