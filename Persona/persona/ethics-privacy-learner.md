---
persona: "Ethics & Privacy-Focused Learner"
archetype: ethics-privacy
age_range: "18-35"
skill_level: varied
study_role: course-or-thesis
tags: [ethics, privacy, responsible-ai, ADP-mapping]
---

Profile
-------
Students prioritising ethical, legal, and privacy considerations in system design—especially relevant for AI/ML and data-heavy projects. They need scaffolds to surface potential harms and mitigation strategies.

Goals
-----
- Identify potential ethical risks, privacy leaks, and fairness concerns in projects.
- Apply mitigation techniques and document decisions for assessment and compliance.

Challenges
----------
- Difficulty translating abstract ethical principles into concrete design changes.
- Underappreciation of hidden data leakage or bias sources.

Preferred Scaffolds
-------------------
- Ethical impact checklists and mitigation templates
- Data provenance and sensitive-attribute detectors
- Documentation templates for ethical reflections and decisions

ADP Mapping (For / Against)
---------------------------
- Ethical Impact Prompts
  - Concrete scaffold: At project milestones, prompt students to fill a short impact assessment (data used, potential harms, stakeholders affected).
  - Why apply: Forces explicit consideration and creates audit trails for assessment.
  - Why not: Could be seen as perfunctory if students just fill forms; combine with graded reflection.

- Sensitive-Attribute Detectors
  - Concrete scaffold: Warn when models or datasets include sensitive attributes and suggest fairness checks.
  - Why apply: Helps identify risks early and recommend corrective analyses.
  - Why not: Flagging can be noisy; require careful thresholds and clear guidance on remediation.

- Ethics Documentation Templates
  - Concrete scaffold: Provide structured templates for documenting decisions (rationale, mitigation, residual risk).
  - Why apply: Supports reproducibility and accountability in student projects.
  - Why not: Overly bureaucratic templates can be off-putting; keep them concise and integrated into workflows.

Interaction Example
-------------------
System: "Your dataset includes a ‘location’ field. Potential privacy risk: re-identification. Would you like suggestions to anonymise or remove? [Suggest / Ignore]"

Research Questions
------------------
1. Do milestone ethics prompts increase concreteness and quality of ethical mitigation in student projects?
2. How effective are automatic sensitive-attribute detectors at surfacing meaningful fairness issues in course datasets?
3. What documentation formats best support both student reflection and instructor assessment of ethical reasoning?

Data & Validation Measures
--------------------------
- Uptake of mitigation suggestions and changes to datasets/annotations.
- Quality of ethical documentation as rated by instructors or external auditors.
- Incidence of flagged sensitive attributes and follow-up remediation actions.

Implementation Notes
--------------------
- Provide concrete remediation examples and links to legal/ethical resources.
- Make ethics scaffolds non-punitive and formative; pair with instructor guidance.
