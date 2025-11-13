# Evaluation and Monitoring

Summary
- Evaluation and Monitoring measure agent performance, correctness, and drift over time.

When to use
- Production systems and any agent that learns or changes behavior.

How it works
- Define metrics (accuracy, latency, cost), run automated checks, use human judgements, and alert on regressions.

Example
- Automated tests that compare agent answers to a gold set and log deviations.
 - Set a goal to reduce a bug count by X; monitor weekly metrics and reprioritize tasks.

Real examples (accuracy, latency, token monitoring)

Simple accuracy check (exact match):

```python
def evaluate_response_accuracy(agent_output: str, expected_output: str) -> float:
	return 1.0 if agent_output.strip().lower() == expected_output.strip().lower() else 0.0
```

Timing measurement for agent actions:

```python
def timed_agent_action(agent_function, *args, **kwargs):
	start = time.perf_counter()
	result = agent_function(*args, **kwargs)
	latency_ms = (time.perf_counter() - start) * 1000
	return result, latency_ms
```

Token usage monitor (conceptual):

```python
class LLMInteractionMonitor:
	def __init__(self):
		self.total_input_tokens = 0
		self.total_output_tokens = 0
	def record_interaction(self, prompt, response):
		self.total_input_tokens += len(prompt.split())
		self.total_output_tokens += len(response.split())
```

These lightweight checks illustrate core evaluation vectors: correctness, latency, and cost (tokens).

Pitfalls
- Poor metrics that don't reflect true user value; noisy signals.

Related patterns
- Goal Setting and Monitoring, Adaptation

