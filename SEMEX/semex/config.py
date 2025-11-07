import os
import json


def load_config(root=None):
    root = root or os.getcwd()
    p = os.path.join(root, 'semex_config.json')
    if os.path.exists(p):
        try:
            with open(p, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            return {}
    return {}
