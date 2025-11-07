import os
import json
from datetime import datetime, timezone
import subprocess
from typing import List

from git import Repo, GitCommandError


class GitRepo:
    def __init__(self, path: str):
        self.path = path
        try:
            self.repo = Repo(path, search_parent_directories=True)
        except Exception:
            self.repo = None

    def get_changed_files(self) -> List[str]:
        """Return list of staged and unstaged changed file paths relative to repo root."""
        if not self.repo:
            return []
        root = self.repo.working_tree_dir
        changed = set()
        try:
            # use porcelain status
            git = self.repo.git
            status = git.status('--porcelain')
            for line in status.splitlines():
                if not line:
                    continue
                path = line[3:]
                changed.add(os.path.join(root, path))
        except GitCommandError:
            pass
        return list(changed)

    def get_commits_since(self, since_date: datetime):
        if not self.repo:
            return []
        commits = []
        for commit in self.repo.iter_commits('--all'):
            committed_dt = datetime.fromtimestamp(commit.committed_date, tz=timezone.utc)
            if committed_dt >= since_date:
                commits.append({
                    'hexsha': commit.hexsha,
                    'message': commit.message.strip(),
                    'date': committed_dt.isoformat(),
                })
        return commits

    def load_profile(self):
        # look for semex_profile.json in repo root
        root = self.repo.working_tree_dir if self.repo else self.path
        p = os.path.join(root, 'semex_profile.json')
        if os.path.exists(p):
            try:
                with open(p, 'r', encoding='utf-8') as f:
                    return json.load(f)
            except Exception:
                return {}
        return {}

    def stage_and_commit(self, paths: List[str], message: str):
        if not self.repo:
            return False
        try:
            self.repo.index.add(paths)
            if self.repo.index.diff('HEAD') or self.repo.index.entries:
                self.repo.index.commit(message)
            return True
        except Exception:
            return False

    def push(self):
        if not self.repo:
            return False
        try:
            origin = self.repo.remote(name='origin')
            origin.push()
            return True
        except Exception:
            return False
