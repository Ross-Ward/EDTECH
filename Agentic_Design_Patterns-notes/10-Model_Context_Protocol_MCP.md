# Model Context Protocol (MCP)

Summary
- MCP standardizes how agents and models share context and call patterns across interfaces (e.g., ADK's FastMCP server example).

When to use
- When building interoperable agents across services and tools that need a shared context contract.

How it works
- Define context envelopes, serialization, capabilities, and a transport protocol that supports streaming and sync requests.

Example
- An agent uses a FastMCP client to request context from a filesystem-based MCP server.

Real example (FastMCP server tool)
The book includes a FastMCP example exposing a Python `greet(name)` tool. The server auto-discovers `@tool` functions and serves a tools.json schema for client discovery.

```python
from fastmcp import FastMCP, tool

@tool()
def greet(name: str) -> str:
	return f"Hello, {name}! Nice to meet you."

mcp_server = FastMCP()
if __name__ == '__main__':
	mcp_server.run()
```

This shows a minimal MCP implementation that enables model-driven function discovery and invocation via a standardized interface.

Pitfalls
- Versioning and contract drift.

Related patterns
- Inter-Agent Communication, Tool Use

