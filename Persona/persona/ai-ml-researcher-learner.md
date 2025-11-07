---
persona: "AI/ML Researcher Learner"
archetype: ai-ml-researcher
age_range: "21-35"
skill_level: advanced
study_role: grad-or-final-year-ml
tags: [ai, ml, research, experiments, ADP-mapping]
---

Profile
-------
Students focused on AI/ML who run experiments, tune models, and need scaffolds for reproducibility, experiment design, and result interpretation.

Goals
-----
- Design replicable experiments, select baselines appropriately, and interpret model behaviours.
- Build robust pipelines and document experiments for reproducibility.

Challenges
----------
- Tendency to iterate on models without rigorous experimental controls.
- Difficulty keeping track of hyperparameters, seeds, and dataset versions.

Preferred Scaffolds
-------------------
- Experiment templating and auto-capture of hyperparameters
- Reproducibility checklists and run notebooks
- Model explainability prompts and counterfactual probes

ADP Mapping (For / Against)
---------------------------
- Experiment Templates & Auto-Capture
  - Concrete scaffold: Predefined experiment templates that auto-log hyperparameters, dataset versions, random seeds, and environment details.
  - Why apply: Improves reproducibility and reduces accidental misconfiguration.
  - Why not: Templates can limit exploratory workflows; allow custom fields.

- Reproducibility Checks
  - Concrete scaffold: Before accepting results, prompt a checklist (seed fixed, dataset snapshot, baseline re-run).
  - Why apply: Encourages scientific rigour and reduces false positives.
  - Why not: Adds overhead; make checks lightweight and optional for exploratory runs.

- Explainability Prompts
  - Concrete scaffold: After model training, suggest interrogations (feature importance, partial dependence, counterfactuals).
  - Why apply: Supports deeper understanding and debugging of model behaviour.
  - Why not: Can be computationally expensive; provide sampling strategies.

Interaction Example
-------------------
System: "Experiment template ready. Auto-log hyperparameters and snapshot dataset? [Yes (recommended) / No]"

Research Questions
------------------
1. Do auto-captured experiment logs meaningfully improve reproducibility and reduce re-run friction?
2. How do lightweight reproducibility checks affect the rate of publishable or robust results?
3. Which explainability probes most help students diagnose model failure modes in coursework?

Data & Validation Measures
--------------------------
- Experiment metadata logs, seed variance analyses, replication success rates.
- Frequency of reproducibility checklist use and outcomes of re-runs.
- Usage of explainability tools and subsequent corrective actions.

Implementation Notes
--------------------
- Integrate with common ML tooling (notebooks, MLflow, DVC) where possible.
- Keep experiment capture lightweight and allow exportable logs for paper appendices.
