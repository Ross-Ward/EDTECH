---
persona: "ML Reproducibility-Focused Learner"
archetype: ml-reproducibility
age_range: "21-35"
skill_level: advanced
study_role: researcher-or-final-year
tags: [reproducibility, experiments, workflows, ADP-mapping]
---

Profile
-------
Learners prioritising reproducible ML experiments—often preparing for publication or capstone deliverables. They need strict logging, environment capture, and packaging scaffolds.

Goals
-----
- Produce reproducible experiments with traceable artefacts and shareable pipelines.
- Learn and apply best practices for experiment management.

Challenges
----------
- Environment drift, unlogged hyperparameters, and brittle pipelines.
- Difficulty packaging experiments for others to run.

Preferred Scaffolds
-------------------
- Auto-environment snapshots, containerisation helpers, and data versioning prompts
- Reproducibility templates for paper-ready experiments
- Lightweight provenance visualisations

ADP Mapping (For / Against)
---------------------------
- Environment Snapshot Prompts
  - Concrete scaffold: Offer a one-click environment snapshot (container, pip freeze, OS info) when running experiments.
  - Why apply: Eliminates common reproducibility pain points and supports reproducible artefacts.
  - Why not: Creates storage overhead; prune snapshots or compress.

- Data Versioning Prompts
  - Concrete scaffold: When dataset changes occur, prompt to checkpoint dataset version and record transformation steps.
  - Why apply: Ensures exact inputs can be re-run for replication.
  - Why not: Extra friction for quick exploratory analysis; allow opt-in behavior.

- Provenance Visualisations
  - Concrete scaffold: Visual timeline of code, data, and hyperparameter changes linked to results.
  - Why apply: Clarifies who changed what and why results differ across runs.
  - Why not: Can be complex to present; offer summarised views.

Interaction Example
-------------------
System: "Before saving results, snapshot environment and dataset. This creates a reproducible package (recommended). Save snapshot? [Yes / No]"

Research Questions
------------------
1. Do single-click environment snapshots increase reproducibility rates among student researchers?
2. How does integrated data-versioning influence error rates from dataset drift in coursework?
3. What level of provenance detail is most useful and least burdensome for student teams?

Data & Validation Measures
--------------------------
- Snapshot uptake, successful replication count from archived snapshots.
- Incidence of dataset-drift related failures and frequency of re-runs.
- Qualitative feedback from peer re-runners on reproducibility ease.

Implementation Notes
--------------------
- Provide compression and retention policies for snapshots to limit storage.
- Offer integration with lightweight tooling (Docker, Poetry, DVC) and export formats for repositories.
