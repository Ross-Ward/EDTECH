"""Simple LLM interface and a mock local synthesizer.

This module provides a pluggable interface for future LLM integrations and a
mock implementation that synthesizes journal text from heuristics. It is
designed to be offline-first and privacy-preserving by default.
"""
from typing import List, Dict
from datetime import date
import shutil
import subprocess
import shlex
from .config import load_config


class LLMInterface:
    def synthesize(self, *, profile: Dict, entities: List[Dict], commits: List[Dict], journal_date: date) -> Dict:
        """Return a dict with enhanced sections: 'why', 'prompt', 'confidence', 'explanation'."""
        raise NotImplementedError()


class MockLLM(LLMInterface):
    def synthesize(self, *, profile: Dict, entities: List[Dict], commits: List[Dict], journal_date: date) -> Dict:
        # Heuristic synthesis: summarize top items and produce a reflective prompt
        top = entities[:5]
        built_lines = []
        for e in top:
            p = e.get('metadata', {}).get('path', '') or e.get('id')
            built_lines.append(f"{e.get('type')} `{e.get('id')}` from {p}")

        why = "Today I transformed small artifacts into connected knowledge by identifying core concepts and linking them to practice."
        if built_lines:
            why += " Notably: " + "; ".join(built_lines[:3]) + "."

        # pick a simple prompt based on detected questions or TODOs
        todo_qs = [e for e in entities if e.get('type') == 'question']
        if todo_qs:
            prompt = f"Address one open question: {todo_qs[0].get('content')}. What concrete next step will you take?"
        else:
            prompt = "Choose one concept above and write a short example that uses it in a new context."

        # confidence heuristic: more entities -> higher confidence
        confidence = min(95, 40 + len(entities) * 8)

        explanation = f"Synthesized from {len(entities)} entities and {len(commits)} recent commits; tone adapted to '{profile.get('level','intro')}'."

        return {
            'why': why,
            'prompt': prompt,
            'confidence': confidence,
            'explanation': explanation,
        }


def get_default_llm() -> LLMInterface:
    # Prefer a local Ollama installation if available and a model is specified.
    cfg = load_config()
    model = cfg.get('llm_model')
    if not model:
        model = cfg.get('model')

    ollama_path = shutil.which('ollama')
    if ollama_path:
        # If no model configured, try to list local Ollama models and pick the first
        if not model:
            try:
                proc = subprocess.run([ollama_path, 'list'], capture_output=True, text=True, timeout=5)
                out = proc.stdout.strip()
                # parse first word of first non-empty line as model name
                for line in out.splitlines():
                    ln = line.strip()
                    if not ln:
                        continue
                    model = ln.split()[0]
                    break
            except Exception:
                model = None

    if ollama_path and model:
        try:
            return OllamaLLM(model=model, ollama_path=ollama_path)
        except Exception:
            return MockLLM()
    return MockLLM()


class OllamaLLM(LLMInterface):
    """Simple Ollama CLI integration. Uses `ollama run <model> --prompt '<prompt>'`.

    This is a best-effort local-first integration. If the Ollama CLI or the
    specified model is not available the code will fall back to the mock LLM.
    """
    def __init__(self, model: str, ollama_path: str = 'ollama'):
        self.model = model
        self.ollama = ollama_path

    def _build_prompt(self, profile: Dict, entities: List[Dict], commits: List[Dict], journal_date: date) -> str:
        # Build a compact, structured prompt based on the system template in build.md
        parts = [
            "You are a master CS1 tutor. The student is in their first year.",
            f"Date: {journal_date.isoformat()}",
        ]
        if profile:
            parts.append(f"Student profile: {profile}")
        if commits:
            parts.append(f"Recent commits: {len(commits)} items. Latest: {commits[0].get('message','')[:200]}")
        if entities:
            sample = []
            for e in entities[:10]:
                sample.append(f"{e.get('type')}:{e.get('id')}")
            parts.append(f"Artifacts: {', '.join(sample)}")

        parts.append("Generate: 1) A markdown journal entry (What, Why, Connections). 2) One metacognitive prompt for tomorrow. 3) A concise but meaningful Git commit message.")
        parts.append("Use simple language, explain jargon, encourage insight.")
        return "\n\n".join(parts)

    def synthesize(self, *, profile: Dict, entities: List[Dict], commits: List[Dict], journal_date: date) -> Dict:
        prompt = self._build_prompt(profile, entities, commits, journal_date)
        # Call ollama CLI
        try:
            cmd = f"{shlex.quote(self.ollama)} run {shlex.quote(self.model)} --prompt {shlex.quote(prompt)}"
            proc = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=20)
            if proc.returncode == 0 and proc.stdout:
                # For safety, parse simple sections heuristically from the LLM output
                out = proc.stdout.strip()
                # best-effort split: take first paragraph as 'why' and last lines as prompt
                paras = [p.strip() for p in out.split('\n\n') if p.strip()]
                why = paras[0] if paras else ''
                prompt_text = paras[1] if len(paras) > 1 else "Choose one concept above and write a short example that uses it in a new context."
                confidence = 90
                explanation = f"Generated by local Ollama model {self.model}."
                return {'why': why, 'prompt': prompt_text, 'confidence': confidence, 'explanation': explanation}
        except Exception:
            pass
        # Fallback to mock if anything goes wrong
        return MockLLM().synthesize(profile=profile, entities=entities, commits=commits, journal_date=journal_date)
