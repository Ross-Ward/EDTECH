# Prompt Chaining

Summary
- Prompt Chaining breaks a large task into sequential prompts where each step's output feeds the next.

When to use
- Multi-step transforms (e.g., extract -> normalize -> summarize).
- Complex reasoning where intermediate structure helps.

How it works
- Define sub-tasks and order.
- Create prompts for each sub-task and pass structured outputs.

Example
- Step 1: extract facts; Step 2: classify facts; Step 3: generate final text using classified facts.

Real example (from Chapter 1 code example)
The book provides a simple LangChain-style prompt chaining example where the model first extracts specifications
from free text and then transforms them into JSON. The chain composes two prompts and two LLM calls.

```python
import os
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = ChatOpenAI(temperature=0)

# Prompt 1: extract free-text specifications
prompt_extract = ChatPromptTemplate.from_template(
	"Extract the technical specifications from the following text:\n\n{text_input}"
)

# Prompt 2: convert the extracted specs to JSON
prompt_transform = ChatPromptTemplate.from_template(
	"Transform the following specifications into a JSON object with 'cpu', 'memory', and 'storage' as keys:\n\n{specifications}"
)

extraction_chain = prompt_extract | llm | StrOutputParser()

full_chain = (
	{"specifications": extraction_chain}
	| prompt_transform
	| llm
	| StrOutputParser()
)

input_text = "The new laptop model features a 3.5 GHz octa-core processor, 16GB of RAM, and a 1TB NVMe SSD."
final_result = full_chain.invoke({"text_input": input_text})
print("\n--- Final JSON Output ---")
print(final_result)
```

This produces a cleaned, structured JSON result by chaining extraction and transformation steps.

Pitfalls
- Error propagation between steps.
- Latency increases with each chained call.

Related patterns
- Reflection, Planning, Routing

