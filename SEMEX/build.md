You are a Masters Research software and educational technology Engineer tasked with writing a comprehensive, language-agnostic technical specification for **Semex** — a *semantic journaling engine* that transforms raw student development activity (code, notes, diagrams) into structured, reflective, and pedagogically rich daily learning artifacts.

Describe **Semex** in full detail, including:

---

### 1. **Core Purpose**
- Transform ephemeral coding and note-taking into **durable, interconnected knowledge**.
- Enable **metacognitive reflection**, **concept progression tracking**, and **long-term retention** for introductory engineering students.
- Operate as a **cognitive scaffold** that mirrors the structure of expert learning.

---

### 2. **System Behavior (User Flow)**
When the user runs `semex journal`:
1. Ingest all unstaged and staged changes in the Git repository.
2. Parse supported artifacts:
   - Source code (any language)
   - Markdown notes
   - Diagrams (Excalidraw, Mermaid, SVG)
   - Jupyter notebooks
3. Extract **semantic entities**: functions, algorithms, definitions, questions, sketches.
4. Build a **local context window**:
   - Last 7 days of commits
   - Student profile (year, course, goals, struggles)
   - Detected learning trajectory
5. Generate:
   - A **daily journal entry** in Markdown (`journal/YYYY-MM-DD.md`)
   - A **reflective prompt** for tomorrow
   - A **Git commit message** with pedagogical depth
6. Auto-stage, commit, and push.

---

### 3. **Key Outputs (Structure)**

#### `journal/2025-11-06.md`
```markdown
# Daily Reflection – November 6, 2025

## What I Built
- `binary_search.py`: Iterative implementation with edge cases
- `notes/searching.md`: Comparison of time complexities
- `diagrams/binary-search.mmd`: Flowchart of divide-and-conquer

## Why It Matters
[Clear, plain-English explanation linking to real-world use]

## Concepts Connected
- **Input**: Arrays, loops (Week 2)
- **Core**: Logarithmic time, invariants
- **Output**: Foundation for merge sort, binary trees

## Tomorrow’s Prompt
> “Draw binary search on a sorted list of 16 names. Label the midpoint at each step. What pattern emerges?”

## Confidence: 92% (code + notes + diagram alignment)
```

---

### 4. **Design Patterns (Language-Agnostic)**

| Pattern | Role in Semex |
|-------|---------------|
| **Pipeline** | `Ingest → Parse → Enrich → Synthesize → Render → Persist` |
| **Observer** | Watch Git working tree; trigger on relevant changes |
| **Strategy** | Pluggable parsers per file type (`.py`, `.md`, `.excalidraw`) |
| **Factory** | Create semantic entities from ASTs, Markdown ASTs, diagram JSON |
| **Repository** | Abstract storage: local embeddings, journal files, Git |
| **Mediator** | Coordinate between Git, LLM, profile, and knowledge graph |
| **Decorator** | Enhance commit messages with metadata badges (concept tags, confidence) |
| **Chain of Responsibility** | Route prompts: local LLM → cloud fallback → cache |
| **Memento** | Versioned student profile and learning state |
| **Visitor** | Traverse semantic graph to generate concept maps |

---

### 5. **Core Abstractions (Interfaces)**

```ts
// Pseudocode – language agnostic
interface ArtifactParser {
  supports(file: File): boolean;
  parse(file: File): SemanticEntity[];
}

interface SemanticEntity {
  type: "function" | "concept" | "question" | "diagram";
  id: string;
  content: string;
  metadata: Map<string, any>;
  relations: Relation[];
}

interface JournalEntry {
  date: Date;
  summary: string;
  explanation: string;
  connections: ConceptLink[];
  prompt: ReflectionPrompt;
  confidence: number;
}

interface KnowledgeGraph {
  add(entity: SemanticEntity): void;
  query(concept: string): SemanticEntity[];
  path(from: string, to: string): ConceptLink[];
}
```

---

### 6. **AI Integration Model**

- **Primary**: Local LLM (default: `phi3`, `llama3.1:8b`) via Ollama
- **Prompt Strategy**: Structured, role-based, few-shot
- **Fallback Chain**: Local → Groq → Gemini → Cache
- **No external code sent without consent**

**System Prompt Template**:
```
You are a master CS1 tutor. The student is in their first year.
They just wrote [code snippet].
They added notes: [excerpt].
Prior context: [last 3 relevant commits].

Generate:
1. A markdown journal entry (What, Why, Connections)
2. One metacognitive prompt for tomorrow
3. A concise but meaningful Git commit message

Use simple language. Explain jargon. Encourage insight.
```

---

### 7. **Student Profile (Adaptive Layer)**

```json
{
  "level": "intro",
  "course": "CSSE1001",
  "goals": ["understand recursion", "build portfolio"],
  "struggles": ["pointers", "time complexity"],
  "style": "visual",
  "pace": "fast"
}
```
→ Influences tone, depth, diagram inclusion, prompt difficulty

---

### 8. **Extensibility Hooks**

- `semex map` → Interactive concept graph (HTML + D3)
- `semex week` → PDF summary with progress delta
- `semex teach` → Generate lesson from today’s work
- `semex quiz` → Auto-generate spaced retrieval questions

---

### 9. **Non-Functional Requirements**

- **Zero config to start** (auto-detect Ollama, create profile)
- **Offline-first**
- **Privacy by default** (no telemetry, no cloud unless opted)
- **< 3s** to generate journal on typical student diff
- **Idempotent** — safe to run multiple times

---

### 10. **Success Metrics (for Research)**

- **Retention**: % of concepts recalled after 2 weeks
- **Transfer**: Ability to apply today’s idea in new context
- **Metacognition**: Quality of answers to reflection prompts
- **Engagement**: Streak length, voluntary use of `semex map`

---

Write this specification in **clear, professional, pattern-rich prose** suitable for a senior engineer or academic researcher. Use **no specific programming language syntax** unless illustrating a design concept. Emphasize **modularity**, **extensibility**, and **pedagogical alignment**.

Do not mention implementation tools (Node.js, TypeScript, etc.) unless part of the pattern. Focus on **what it is**, **how it thinks**, and **why it works for learning**.