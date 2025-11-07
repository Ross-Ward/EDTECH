import os
from typing import List, Dict
import nbformat
import re
import ast


def parse_python(path: str) -> List[Dict]:
    """AST-based extraction for Python files: functions, classes, docstrings, imports, TODO comments."""
    entities: List[Dict] = []
    try:
        with open(path, 'r', encoding='utf-8') as f:
            source = f.read()
        tree = ast.parse(source)

        for node in ast.walk(tree):
            if isinstance(node, ast.FunctionDef):
                doc = ast.get_docstring(node) or ''
                entities.append({'type': 'function', 'id': node.name, 'content': doc or ast.get_source_segment(source, node) or '', 'metadata': {'path': path, 'lineno': node.lineno}})
            elif isinstance(node, ast.AsyncFunctionDef):
                doc = ast.get_docstring(node) or ''
                entities.append({'type': 'function', 'id': node.name, 'content': doc or '', 'metadata': {'path': path, 'lineno': node.lineno, 'async': True}})
            elif isinstance(node, ast.ClassDef):
                doc = ast.get_docstring(node) or ''
                entities.append({'type': 'class', 'id': node.name, 'content': doc or '', 'metadata': {'path': path, 'lineno': node.lineno}})

        # capture TODO comments as questions
        for m in re.finditer(r'#\s*TODO[:\s]*(.*)', source):
            entities.append({'type': 'question', 'id': f"todo-{m.start()}", 'content': m.group(1).strip(), 'metadata': {'path': path}})
    except Exception:
        pass
    return entities


def parse_markdown(path: str) -> List[Dict]:
    entities: List[Dict] = []
    try:
        with open(path, 'r', encoding='utf-8', errors='replace') as f:
            lines = f.readlines()
        for i, line in enumerate(lines):
            if line.startswith('#'):
                title = line.lstrip('#').strip()
                # normalize unicode so dashes and quotes render cleanly in journals
                try:
                    import unicodedata
                    title = unicodedata.normalize('NFC', title)
                except Exception:
                    pass
                entities.append({'type': 'concept', 'id': title.lower().replace(' ', '-'), 'content': title, 'metadata': {'path': path, 'lineno': i + 1}})
    except Exception:
        pass
    return entities


def parse_notebook(path: str) -> List[Dict]:
    entities: List[Dict] = []
    try:
        nb = nbformat.read(path, as_version=4)
        for i, cell in enumerate(nb.cells):
            if cell.cell_type == 'markdown':
                text = cell.source.strip().splitlines()[0] if cell.source else ''
                entities.append({'type': 'concept', 'id': f'nb-md-{i}', 'content': text, 'metadata': {'path': path, 'cell': i}})
            elif cell.cell_type == 'code':
                src = cell.source
                try:
                    tree = ast.parse(src)
                    for node in ast.walk(tree):
                        if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef, ast.ClassDef)):
                            name = getattr(node, 'name', f'cell-{i}')
                            entities.append({'type': 'function' if isinstance(node, (ast.FunctionDef, ast.AsyncFunctionDef)) else 'class', 'id': name, 'content': '', 'metadata': {'path': path, 'cell': i}})
                except Exception:
                    # fallback heuristics
                    for m in re.finditer(r'def\s+([A-Za-z0-9_]+)\s*\(', src):
                        entities.append({'type': 'function', 'id': m.group(1), 'content': '', 'metadata': {'path': path, 'cell': i}})
    except Exception:
        pass
    return entities


def parse_artifact(path: str) -> List[Dict]:
    if not os.path.exists(path):
        return []
    ext = os.path.splitext(path)[1].lower()
    if ext in ['.py']:
        return parse_python(path)
    if ext in ['.md', '.markdown']:
        return parse_markdown(path)
    if ext in ['.ipynb']:
        return parse_notebook(path)
    if ext in ['.mmd', '.excalidraw', '.svg']:
        # treat diagrams as a diagram entity
        return [{'type': 'diagram', 'id': os.path.basename(path), 'content': '', 'metadata': {'path': path}}]
    # fallback: code heuristics for many code file types (improved for JS/TS)
    if ext in ['.java', '.js', '.ts', '.cpp', '.c', '.cs']:
        entities: List[Dict] = []
        try:
            with open(path, 'r', encoding='utf-8') as f:
                text = f.read()
            # capture JS/TS function declarations, arrow functions, classes, and JSDoc
            for m in re.finditer(r'/\*\*([\s\S]*?)\*/\s*\n?\s*(?:function|class)?\s*([A-Za-z0-9_]+)?', text):
                jsdoc = m.group(1).strip()
                name = m.group(2) or None
                if name:
                    entities.append({'type': 'concept', 'id': name, 'content': jsdoc, 'metadata': {'path': path}})

            for m in re.finditer(r'function\s+([A-Za-z0-9_]+)\s*\(', text):
                entities.append({'type': 'function', 'id': m.group(1), 'content': '', 'metadata': {'path': path}})

            for m in re.finditer(r'([A-Za-z0-9_]+)\s*=\s*\([\s\S]*?\)\s*=>', text):
                entities.append({'type': 'function', 'id': m.group(1), 'content': 'arrow', 'metadata': {'path': path}})

            for m in re.finditer(r'class\s+([A-Za-z0-9_]+)', text):
                entities.append({'type': 'class', 'id': m.group(1), 'content': '', 'metadata': {'path': path}})
        except Exception:
            pass
        return entities
    return []
