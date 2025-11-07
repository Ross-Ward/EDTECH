import os
from datetime import date
from typing import List
import json
import unicodedata


def _clean_text(s: str) -> str:
    if not s:
        return ''
    # normalize unicode and strip excess whitespace
    s = unicodedata.normalize('NFC', s)
    s = s.replace('\r\n', '\n')
    return s.strip()


class Journal:
    def __init__(self, date: date, profile: dict, entities: List[dict], commits: List[dict]):
        self.date = date
        self.profile = profile or {}
        self.entities = entities or []
        self.commits = commits or []
        self.synthesis = None

    def enhance_with_llm(self, llm):
        try:
            self.synthesis = llm.synthesize(profile=self.profile, entities=self.entities, commits=self.commits, journal_date=self.date)
        except Exception:
            self.synthesis = None

    def _summary_sections(self):
        built = []
        for e in self.entities:
            p = e.get('metadata', {}).get('path', '')
            name = os.path.basename(p) if p else (e.get('id') or '')
            name = _clean_text(name)
            eid = _clean_text(str(e.get('id') or ''))
            built.append(f"- `{name}` — {e.get('type')}: {eid}")
        return built

    def render(self) -> str:
        lines = []
        lines.append(f"# Daily Reflection – {self.date.isoformat()}")
        lines.append("")
        lines.append("## What I Built")
        lines.extend(self._summary_sections() or ["- No artifacts detected"]) 
        lines.append("")
        lines.append("## Why It Matters")
        if self.synthesis and 'why' in self.synthesis:
            lines.append(_clean_text(self.synthesis['why']))
        else:
            lines.append("A concise explanation linking today's work to broader concepts and future topics.")
        lines.append("")
        lines.append("## Concepts Connected")
        concepts = [e for e in self.entities if e.get('type') in ('concept','function','class')]
        if concepts:
            for c in concepts:
                cid = _clean_text(str(c.get('id') or ''))
                cpath = c.get('metadata',{}).get('path')
                if cpath:
                    lines.append(f"- **{c.get('type')}**: `{os.path.basename(cpath)}` → {cid}")
                else:
                    lines.append(f"- **{c.get('type')}**: {cid}")
        else:
            lines.append("- No clear concepts detected")
        lines.append("")
        lines.append("## Tomorrow’s Prompt")
        if self.synthesis and 'prompt' in self.synthesis:
            lines.append(f"> {_clean_text(self.synthesis['prompt'])}")
        else:
            lines.append("> Reflect on one difficulty you encountered and list a concrete next step to resolve it.")
        lines.append("")
        conf = None
        if self.synthesis and 'confidence' in self.synthesis:
            conf = f"{self.synthesis['confidence']}% (synthesized)"
        else:
            conf = "80% (heuristic)"
        lines.append(f"## Confidence: {conf}")
        if self.synthesis and 'explanation' in self.synthesis:
            lines.append("")
            lines.append("<!-- synthesis: ")
            lines.append(_clean_text(self.synthesis['explanation']))
            lines.append(" -->")
        return "\n".join(lines)

    def render_and_persist(self) -> str:
        root = os.getcwd()
        journ_dir = os.path.join(root, 'journal')
        os.makedirs(journ_dir, exist_ok=True)
        fname = f"{self.date.isoformat()}.md"
        path = os.path.join(journ_dir, fname)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(self.render())
        return path

    def compose_commit_message(self) -> str:
        top_concepts = [e.get('id') for e in self.entities[:3]]
        msg = f"semex: journal {self.date.isoformat()} — concepts: {', '.join(top_concepts)}"
        return msg
