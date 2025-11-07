---
persona: "Final-Year Capstone Learner"
archetype: final-year-capstone
age_range: "21-26"
skill_level: advanced
study_role: capstone-student
tags: [capstone, project-management, integration, ADP-mapping]
---

Profile
-------
Final-year students working on large-scale capstone projects. They must integrate multiple technologies, manage team dynamics, meet deadlines, and produce a deliverable suitable for assessment and demonstration.

Goals
-----
- Deliver a working, well-documented project that demonstrates synthesis of CS/SE skills.
- Learn project planning, stakeholder communication, and professional development practices.

Challenges
----------
- Scope management and balancing feature creep vs polish.
- Coordinating distributed work, resolving architectural disagreements, and technical debt.

Preferred Scaffolds
-------------------
- Milestone scaffolds with acceptance criteria and timeboxing
- Version-control merge-help and CI triage prompts
- Advising prompts that recommend when to refactor vs ship

ADP Mapping (For / Against)
---------------------------
- Milestone Prompts & Acceptance Criteria
  - Concrete scaffold: Break project into measurable milestones and explicit acceptance tests.
  - Why apply: Explicit criteria reduce scope creep and provide shared understanding across team and supervisors.
  - Why not: Overly rigid milestones can block iterative discovery; keep them editable.

- Progress Prompts (weekly retrospectives)
  - Concrete scaffold: Weekly reflection prompts (What did we achieve? Blockers? Next actions?) with auto-generated issue suggestions.
  - Why apply: Supports team-level SRL and helps identify impediments early.
  - Why not: Excessive administrative burden if too frequent; keep summaries concise.

- Adaptive Advice (refactor vs ship)
  - Concrete scaffold: Based on test coverage and velocity, recommend reframing of scope (defer feature X, focus on core Y).
  - Why apply: Helps make pragmatic engineering trade-offs.
  - Why not: Automated advice can be context-blind; require human confirmation and justification.

Interaction Example
-------------------
System: "Sprint review: You completed 3/5 acceptance tests. Suggested next action: fix failing payment test or scope out payment as MVP and add mock. Apply suggestion? [Apply / Discuss]"

Research Questions
------------------
1. Do milestone scaffolds with acceptance criteria reduce scope creep and improve final project quality?
2. How effective are weekly progress prompts at surfacing latent blockers earlier compared to ad-hoc check-ins?
3. What is the impact of adaptive refactor/ship recommendations on student learning and project outcomes?

Data & Validation Measures
--------------------------
- Issue/commit cadence, acceptance-test pass rates, time-to-resolution for blockers.
- Team retrospectives (structured responses) and final rubric scores.
- Logs of accepted/declined system recommendations and subsequent outcomes.

Implementation Notes
--------------------
- Keep recommendations advisory and require short rationale when applied or rejected to support reflection.
- Preserve privacy of individual contributions while surfacing team-level metrics.
