from semex.parsers import parse_artifact


def test_parse_js_functions(tmp_path):
    p = tmp_path / 'sample.js'
    p.write_text('/**\n * Adds two numbers\n */\nfunction add(a,b){ return a+b }\nconst sub = (a,b) => a-b;\nclass C{}')
    ents = parse_artifact(str(p))
    ids = [e['id'] for e in ents]
    assert 'add' in ids
    assert 'sub' in ids or any(e for e in ents if e.get('content') == 'arrow')
