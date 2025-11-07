"""
Minimal Semex CLI implementation.

Usage:
    python -m semex.cli journal

This provides a simplified, offline-first journal generator per the spec in build.md.
"""
import sys
import os
import argparse
from datetime import datetime, timedelta, timezone

from .git_utils import GitRepo
from .parsers import parse_artifact
from .journal import Journal
from .llm import get_default_llm
from .map import generate_map


def collect_files(repo: GitRepo, scan_all: bool):
    if scan_all or not repo.repo:
        # walk repo root (cwd) and collect supported files
        root = os.getcwd()
        exts = {'.py', '.md', '.ipynb', '.mmd', '.excalidraw', '.svg', '.js', '.ts', '.java', '.c', '.cpp', '.cs'}
        files = []
        for dirpath, dirs, filenames in os.walk(root):
            # skip .git
            if '.git' in dirpath:
                continue
            for fn in filenames:
                if os.path.splitext(fn)[1].lower() in exts:
                    files.append(os.path.join(dirpath, fn))
        return files
    return repo.get_changed_files()


def run_journal(no_commit: bool = False, dry_run: bool = False, scan_all: bool = False):
    repo = GitRepo(os.getcwd())
    changed_files = collect_files(repo, scan_all)

    # Collect semantic entities
    entities = []
    for path in changed_files:
        try:
            ents = parse_artifact(path)
            entities.extend(ents)
        except Exception:
            # ignore parse errors for now
            pass

    # Build context: commits in last 7 days (timezone-aware UTC)
    since = datetime.now(timezone.utc) - timedelta(days=7)
    commits = repo.get_commits_since(since)

    profile = repo.load_profile()

    journal = Journal(date=datetime.now(timezone.utc).date(), profile=profile, entities=entities, commits=commits)

    # select best available LLM (Ollama if available)
    llm = get_default_llm()
    journal.enhance_with_llm(llm)

    if dry_run:
        print(journal.render())
        return

    out_path = journal.render_and_persist()

    if not no_commit:
        commit_msg = journal.compose_commit_message()
        repo.stage_and_commit([out_path], commit_msg)
        pushed = repo.push()
        print(f"Journal written and committed: {out_path}")
        if pushed:
            print("Changes pushed to remote.")
        else:
            print("Push skipped or failed; check remote settings.")
    else:
        print(f"Journal written (no commit): {out_path}")


def run_map(scan_all: bool = False):
    repo = GitRepo(os.getcwd())
    changed_files = collect_files(repo, scan_all)
    entities = []
    for path in changed_files:
        try:
            ents = parse_artifact(path)
            entities.extend(ents)
        except Exception:
            pass

    out = os.path.join(os.getcwd(), 'journal')
    os.makedirs(out, exist_ok=True)
    map_path = os.path.join(out, f"map-{datetime.now(timezone.utc).date().isoformat()}.html")
    generate_map(entities, map_path)
    print(f"Map generated: {map_path}")


def main():
    parser = argparse.ArgumentParser(prog='semex')
    sub = parser.add_subparsers(dest='cmd')

    p_j = sub.add_parser('journal')
    p_j.add_argument('--no-commit', action='store_true', help='Write journal but do not stage/commit/push')
    p_j.add_argument('--dry-run', action='store_true', help='Render journal to stdout and do not write file')
    p_j.add_argument('--scan-all', action='store_true', help='Scan all supported files in the repo instead of only git-changed files')

    p_m = sub.add_parser('map')
    p_m.add_argument('--scan-all', action='store_true', help='Scan all supported files in the repo')

    args = parser.parse_args()
    if args.cmd == 'journal':
        run_journal(no_commit=args.no_commit, dry_run=args.dry_run, scan_all=args.scan_all)
    elif args.cmd == 'map':
        run_map(scan_all=args.scan_all)
    else:
        parser.print_help()


if __name__ == "__main__":
    main()
