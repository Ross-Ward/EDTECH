# Inter-Agent Communication

Summary
- Inter-Agent Communication defines protocols and message formats for agents to exchange data, requests, and status.

When to use
- Multi-agent systems that need structured collaboration, negotiation, or delegation.

How it works
- Define message schemas, transport (HTTP, message bus), and conversation patterns (request/response, publish/subscribe).

Example
- Agents use JSON-based messages over a message broker to coordinate a distributed workflow.

Real example (A2A AgentCard for a WeatherBot)
The book includes an AgentCard JSON describing a `WeatherBot` service with capabilities, authentication, and skills (`get_current_weather`, `get_forecast`). This AgentCard is a discoverable contract other agents can use to call the weather service.

```json
{
	"name": "WeatherBot",
	"description": "Provides accurate weather forecasts",
	"capabilities": {"streaming": true},
	"skills": [{"id":"get_current_weather","examples":["What's the weather in Paris?"]}]
}
```

AgentCards formalize interoperability: name, endpoint, capabilities, inputs/outputs and examples for other agents to consume.

Pitfalls
- Message versioning, ordering guarantees, and security/auth concerns.

Related patterns
- Multi-Agent Collaboration, MCP

Synchronous vs Streaming requests
- The notebooks show JSON-RPC style examples for a synchronous `sendTask` and a streaming `sendTaskSubscribe` request. The streaming variant lets callers subscribe to incremental events as the agent produces output.

Synchronous example (JSON-RPC):

```json
{ "jsonrpc": "2.0", "id": "1", "method": "sendTask", "params": { "message": {"parts":[{"type":"text","text":"What is the exchange rate from USD to EUR?"}] } } }
```

Streaming example (subscribe):

```json
{ "jsonrpc": "2.0", "id": "2", "method": "sendTaskSubscribe", "params": { "message": {"parts":[{"type":"text","text":"What's the exchange rate for JPY to GBP today?"}] } } }
```

Streaming is useful for long-running tasks or progressive outputs (e.g., stepwise reasoning).

