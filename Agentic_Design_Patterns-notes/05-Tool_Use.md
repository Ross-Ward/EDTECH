# Tool Use

Summary
- Tool Use enables agents to call external tools (search, code execution, databases) as part of reasoning.

When to use
- When the model needs external data, code execution, or side-effects beyond text generation.

How it works
- Define tool interfaces, validate inputs/outputs, and orchestrate calls from within prompts or agent code.

Example
- Use a search tool to fetch facts, then summarize.

Real example (CrewAI function-calling)
The book includes a CrewAI example where the agent calls a typed Python tool `get_stock_price(ticker)` that returns a float or raises an error. The tool is annotated with `@tool` and the agent uses it to answer a task.

```python
@tool("Stock Price Lookup Tool")
def get_stock_price(ticker: str) -> float:
	simulated_prices = {"AAPL": 178.15, "GOOGL": 1750.30}
	price = simulated_prices.get(ticker.upper())
	if price is None:
		raise ValueError(f"Simulated price for '{ticker}' not found.")
	return price
```

This demonstrates defining safe, typed tools and letting agents call them instead of asking the LLM to hallucinate numeric data.

Pitfalls
- Tool misusage and security concerns (unsafe commands).
- Complex error handling and retries required.

Related patterns
- Guardrails/Safety, Memory Management

