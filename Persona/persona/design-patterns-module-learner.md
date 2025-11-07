---
persona: "Design-Patterns Module Learner"
archetype: design-patterns-module
age_range: "20-28"
skill_level: intermediate-advanced
study_role: course-student
tags: [design-patterns, abstraction, refactoring, ADP-mapping]
---

Profile
-------
Students taking a module focused on software design patterns, refactoring, and architectural thinking. They need scaffolds to recognise pattern applicability, implement patterns correctly, and evaluate trade-offs.

Goals
-----
- Identify appropriate design patterns for given problems and implement them correctly.
- Understand trade-offs, anti-patterns, and when not to apply a pattern.

Challenges
----------
- Overusing patterns or misapplying them (patternitis).
- Translating conceptual pattern descriptions into idiomatic code.

Preferred Scaffolds
-------------------
- Pattern recognition hints (when a pattern applies)
- Refactoring templates and interactive before/after examples
- Reflection prompts about trade-offs and complexity costs

ADP Mapping (For / Against)
---------------------------
- Pattern Recognition Nudges
  - Concrete scaffold: When a recurring code smell appears, suggest candidate patterns and show minimal example transformations.
  - Why apply: Helps link concept to code and reduces novice oversight.
  - Why not: May encourage premature refactoring; present as optional suggestions with rationale.

- Refactoring Templates
  - Concrete scaffold: Provide stepwise refactor templates (extract class, introduce interface) with automated code transforms in the IDE/playground.
  - Why apply: Lowers friction for correct application and teaches safe refactor steps.
  - Why not: Automated transforms can hide learning if used blindly; require learner review and explanation.

- Reflection Prompts on Trade-offs
  - Concrete scaffold: After refactoring, ask the learner to state benefits and costs (complexity, coupling, testability).
  - Why apply: Encourages conscious design decisions and metacognition.
  - Why not: If overused, it may slow down iterative development; keep concise.

Interaction Example
-------------------
System: "Detected repeated conditional branches across classes — consider Strategy pattern. Show minimal example and refactor suggestion? [Yes / No]"

Research Questions
------------------
1. How do pattern-recognition nudges affect correct pattern application and reduced anti-pattern usage?
2. Does using refactoring templates accelerate correct pattern implementation without reducing conceptual understanding?
3. Do trade-off reflection prompts improve long-term design judgement and pattern selection?

Data & Validation Measures
--------------------------
- Frequency of patterns suggested vs accepted, number of anti-pattern occurrences over time.
- Quality of refactor submissions and post-refactor explanations.
- Pre/post conceptual assessments on pattern comprehension.

Implementation Notes
--------------------
- Provide clear opt-in for automated transforms and require short rationale when applying a suggested pattern.
- Include examples in multiple languages or idioms as needed.
