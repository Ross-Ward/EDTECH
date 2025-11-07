---
persona: "CSSE Theory Integrator"
archetype: csse-theory-integrator
age_range: "18-30"
skill_level: intermediate-advanced
study_role: lecture-participant
tags: [theory, models, concept-application, ADP-mapping]
---

Profile
-------
Students who excel at abstract reasoning but struggle to connect algorithms, complexity, and models to concrete code and engineering trade-offs. They need scaffolds that help translate theory into practice.

Goals
-----
- Apply theoretical concepts (algorithms, complexity, design patterns) to real coding tasks.
- Understand trade-offs and when to use particular approaches.

Challenges
----------
- Disconnection between lecture content and programming assignments.
- Difficulty in mapping asymptotic analysis to practical implementations.

Preferred Scaffolds
-------------------
- Worked case studies mapping theory → code → performance
- Complexity visualisations and empirical measurement prompts
- Guided experiments to test theoretical predictions on sample inputs

ADP Mapping (For / Against)
---------------------------
- Case Studies (theory-to-code)
  - Concrete scaffold: Provide annotated case studies showing algorithmic choices and performance implications with runnable examples.
  - Why apply: Makes abstract concepts concrete and supports transfer.
  - Why not: Risk of oversimplifying complex proofs; maintain rigor and references.

- Empirical Complexity Checks
  - Concrete scaffold: Encourage students to run experiments measuring runtime/space on varying inputs with suggested test harnesses.
  - Why apply: Helps reconcile asymptotic theory with empirical behaviour.
  - Why not: Time-consuming; provide sample datasets and automation.

- Guided Hypothesis Testing
  - Concrete scaffold: Pose small experiments (e.g., measure sort times with different inputs) and provide analytic scaffolds.
  - Why apply: Promotes scientific approach and deeper understanding.
  - Why not: May be challenging for students with limited tooling skills; embed easy-to-run scripts.

Interaction Example
-------------------
System: "Hypothesis: QuickSort will outperform BubbleSort on N>100. Run the provided harness with N=100,500,1000. Want to run now? [Yes / No]"

Research Questions
------------------
1. Does guided empirical testing improve students’ ability to predict algorithm behaviour in code?
2. How effective are case studies in promoting transfer from theory to engineering decisions?
3. Which visualisations best communicate performance trade-offs to mid-level students?

Data & Validation Measures
--------------------------
- Use of empirical test harnesses and correlation with improved analytic predictions.
- Quality of explanations in post-experiment reflections.
- Assignment performance on tasks requiring theoretical justification.

Implementation Notes
--------------------
- Provide ready-to-run harnesses and small datasets to reduce setup burden.
- Link to formal proofs for students who want deeper theoretical grounding.
