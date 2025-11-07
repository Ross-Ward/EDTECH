import os
from semex.parsers import parse_artifact


def test_parse_markdown(tmp_path):
    p = tmp_path / "notes.md"
    p.write_text("# Searching\nSome notes")
    ents = parse_artifact(str(p))
    assert any(e['type'] == 'concept' for e in ents)


def test_parse_python(tmp_path):
    p = tmp_path / "code.py"
    p.write_text("def foo():\n    pass\n# TODO: improve")
    ents = parse_artifact(str(p))
    assert any(e['type'] == 'function' for e in ents)
