---
persona: "Research Thesis Student"
archetype: research-thesis
age_range: "22-35"
skill_level: advanced
study_role: honours-or-masters-thesis
tags: [thesis, research, literature, ADP-mapping]
---

Profile
-------
Students undertaking an independent research thesis who must review literature, design studies, collect data, and write up findings. They require scaffolds for method selection, literature mapping, and reproducible analysis.

Goals
-----
- Produce a defensible, well-documented thesis with reproducible experiments and clear contributions.
- Learn research practices: literature review, experimental design, ethical approvals, and dissemination.

Challenges
----------
- Scope creep, difficulty locating relevant literature, and maintaining reproducible pipelines over long periods.

Preferred Scaffolds
-------------------
- Literature-mapping helpers (suggest related work and citation templates)
- Study-design checklists and preregistration templates
- Longitudinal experiment capture and paper-ready export

ADP Mapping (For / Against)
---------------------------
- Literature Mapping Prompts
  - Concrete scaffold: Suggest related papers and outline gaps based on the student’s research statement.
  - Why apply: Accelerates discovery of relevant work and improves literature grounding.
  - Why not: Suggestions must be precise and transparent to avoid biasing review; present as starting points.

- Study Design & Preregistration Templates
  - Concrete scaffold: Provide templates for hypotheses, variables, procedures, and planned analyses.
  - Why apply: Encourages rigorous design and reduces p-hacking.
  - Why not: Not all exploratory work fits preregistration; allow flexible modes.

- Longitudinal Experiment Capture
  - Concrete scaffold: Auto-log experimental scripts, analysis code, and dataset snapshots for inclusion in appendices.
  - Why apply: Simplifies reproducible reporting and assessment.
  - Why not: Data privacy concerns; require clear consent and anonymisation steps.

Interaction Example
-------------------
System: "Draft preregistration: hypothesis X, variable Y, planned analysis Z. Save preregistration and snapshot code? [Save / Edit]"

Research Questions
------------------
1. Do preregistration templates improve the methodological transparency and replicability of student theses?
2. How helpful are automated literature-mapping prompts for identifying key gaps and seminal works?
3. What barriers do students face when maintaining reproducible pipelines over multi-month projects?

Data & Validation Measures
--------------------------
- Use of preregistration templates, successful replication by external assessors, and inclusion of reproducible artefacts in appendices.
- Citation overlap with instructor/peer curated readings and temporal patterns of code snapshots.
- Ethics and consent logs for data used in theses.

Implementation Notes
--------------------
- Provide exportable Appendix bundles (code, data, environment snapshots) and clear consent workflows.
- Integrate literature suggestions with credible bibliographic sources and let students vet results.
