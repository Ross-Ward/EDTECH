---
persona: "Software Architect Aspirant"
archetype: software-architect-aspirant
age_range: "22-35"
skill_level: advanced
study_role: capstone-or-elective
tags: [architecture, patterns, design-tradeoffs, ADP-mapping]
---

Profile
-------
Students aiming to develop higher-level architectural skills: system decomposition, API design, scalability, and team-level design decisions. They need scaffolds to evaluate architectural alternatives and reason about trade-offs.

Goals
-----
- Make informed architectural choices that balance performance, maintainability, and delivery timelines.
- Learn to document and justify architectural decisions.

Challenges
----------
- Limited practical experience with large-scale systems.
- Difficulty predicting emergent behaviour and integrating cross-cutting concerns.

Preferred Scaffolds
-------------------
- Architecture comparison templates and cost-benefit checklists
- Pattern catalogues with applicability heuristics and anti-pattern warnings
- Simulation or load-testing scaffolds for architecture validation

ADP Mapping (For / Against)
---------------------------
- Architecture Comparison Prompts
  - Concrete scaffold: Provide side-by-side cost/benefit templates (latency, complexity, maintainability) when multiple architectural choices are detected.
  - Why apply: Supports deliberate decision-making and articulating trade-offs for assessment.
  - Why not: Risk of analysis paralysis; present concise summaries.

- Pattern Catalogue Integration
  - Concrete scaffold: Link detected design elements to pattern catalogue entries with applicability notes and anti-pattern alerts.
  - Why apply: Helps identify established solutions and avoid common pitfalls.
  - Why not: Catalogues must be carefully curated to avoid over-prescription.

- Simulation / Load-Testing Prompts
  - Concrete scaffold: Recommend lightweight simulation scenarios to validate expected load and failure modes.
  - Why apply: Empirically validates architecture under reasonable scenarios.
  - Why not: Resource constraints; provide sampled scenarios and synthetic data.

Interaction Example
-------------------
System: "You’re choosing between microservices and modular monolith. See concise trade-off table (deploy complexity, testability, latency). Want to view? [Yes / No]"

Research Questions
------------------
1. Do architecture comparison templates improve the quality of design decisions and justification in student work?
2. How effective are pattern-catalogue links at reducing anti-pattern incidence in student projects?
3. Which lightweight simulation scaffolds best predict performance issues in student architectures?

Data & Validation Measures
--------------------------
- Documented architecture decisions and assessor rubric ratings.
- Incidence of anti-patterns and post-deployment issues in capstone projects.
- Simulation usage and predictive validity against observed performance measurements.

Implementation Notes
--------------------
- Provide concise trade-off summaries to avoid overwhelming students.
- Encourage explicit rationale logging for decisions to support assessment and reflection.
