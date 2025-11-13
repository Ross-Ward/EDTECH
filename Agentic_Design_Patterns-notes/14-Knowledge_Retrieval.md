# Knowledge Retrieval (RAG)

Summary
- Retrieval-Augmented Generation (RAG) supplements model context with external documents or knowledge stores to improve factuality and scope.

When to use
- Domain-specific Q&A, long-context tasks, and factual accuracy-critical applications.

How it works
- Retrieve relevant documents using embeddings or search, then condition generation on retrieved context.

Example
- Use vector search to find relevant docs, then prompt the model to synthesize answers grounded in those documents.

Real example (LangChain + Weaviate RAG)
The book shows a RAG pipeline: load text, split into chunks, embed with OpenAI embeddings, store in Weaviate, then retrieve and condition the LLM on retrieved context. The retriever's results are passed into a prompt template and then to the LLM.

Key steps (simplified):

```python
documents = TextLoader('./state_of_the_union.txt').load()
chunks = CharacterTextSplitter(chunk_size=500).split_documents(documents)
vectorstore = Weaviate.from_documents(client, chunks, embedding=OpenAIEmbeddings())
retriever = vectorstore.as_retriever()
context = "\n\n".join([doc.page_content for doc in retriever.invoke(question)])
generation = (ChatPromptTemplate.from_template(template) | llm | StrOutputParser()).invoke({"context": context, "question": question})
```

This approach grounds model answers in retrieved documents to reduce hallucination and support citations.

Pitfalls
- Retrieval noise, hallucination when model ignores sources, stale or misaligned documents.

Related patterns
- Memory Management, Guardrails/Safety

