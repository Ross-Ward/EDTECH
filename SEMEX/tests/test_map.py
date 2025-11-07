import os
from semex.map import generate_map


def test_generate_map(tmp_path):
    entities = [
        {'type': 'concept', 'id': 'binary-search', 'content': 'binary-search'},
        {'type': 'function', 'id': 'binary_search', 'content': 'uses binary-search'},
    ]
    out = tmp_path / 'map.html'
    generate_map(entities, str(out))
    assert out.exists()
    txt = out.read_text(encoding='utf-8')
    assert 'Semex Concept Map' in txt
