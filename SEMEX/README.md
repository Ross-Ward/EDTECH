# Semex — minimal prototype

This repository contains a small, self-contained prototype of the Semex semantic journaling engine described in `build.md`.

Goals of this prototype
- Provide a command-line `semex journal` orchestration that:
  - Detects changed files in a Git working tree
  - Applies lightweight parsers to extract simple semantic entities
  - Builds a small daily journal in `journal/YYYY-MM-DD.md`
  - Stages, commits, and attempts to push the new journal file

How to run
1. Ensure you have Python 3.8+ installed.
2. (Optional) Create a virtual environment and install dependencies:

```powershell
python -m venv .venv; .\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

3. From the repository root run:

```powershell
python -m semex.cli journal
```

Notes and limitations
- This is a minimal, offline-first prototype with heuristic parsers. It does not use any LLM; it provides hooks where an LLM could be invoked.
- Git push will only succeed if a remote `origin` is configured and authentication is available.
- The implementation is intentionally conservative and designed as a foundation to extend toward the full specification in `build.md`.

Next steps (recommended)
- Add pluggable LLM integration for richer synthesis (local first, opt-in cloud)
- Improve entity extraction with language-specific AST parsing
- Add tests for parsing & journal generation
