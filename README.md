# EDTECH

Repository for EdTech collection and tools.

Contents:
- `books/` — a large collection of PDF books (ignored by .gitignore).
- `pdfs/` — assorted PDFs and papers (ignored).
- `Contextures/`, `tools/`, `TutorialGenerator/` — project scripts and utilities.
- `obsidian/`, `edtechobsidian/` — Obsidian application files and vault data (mostly ignored).

Notes:
- Many files are binary or large PDFs; the `.gitignore` excludes `books/` and `pdfs/` by default. If you want to track specific PDFs or move them into the repo, remove them from `.gitignore` or add explicit paths.
- To publish code only, consider moving large data files to a releases storage or a separate data repository.

How to push to GitHub (already attempted by automation in this session):

1. Initialize repository (if not already):
   git init
2. Add files and commit:
   git add .
   git commit -m "Initial commit"
3. Add remote and push:
   git remote add origin https://github.com/Ross-Ward/EDTECH.git
   git branch -M main
   git push -u origin main

If the push fails due to large files or remote restrictions, check `git status` and remove large files from the commit (or use Git LFS).
