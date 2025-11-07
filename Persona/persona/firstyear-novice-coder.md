---
persona: "First-Year Novice Coder"
archetype: first-year-novice-coder
age_range: "17-20"
skill_level: beginner
study_role: CS1 student
tags: [intro-programming, syntax, worked-examples, ADP-mapping]
---

Profile
-------
Typical first-year CS/SE student encountering programming for the first time. Eager but often overwhelmed by syntax, abstract concepts, and development workflows. Relies on concrete examples and rapid feedback to build confidence.

Goals
-----
- Successfully write, run, and debug simple programs.
- Understand fundamental control flow, data structures, and I/O.
- Gain confidence to attempt more complex assignments.

Challenges
----------
- Syntax errors and environment setup block progress frequently.
- Difficulty connecting conceptual explanations to code practice.
- Low tolerance for long error messages and opaque autograder feedback.

Preferred Scaffolds
-------------------
- Worked examples with line-by-line annotations
- Live coding snippets and executable playgrounds
- Clear, beginner-friendly autograder feedback with actionable hints

ADP Mapping (For / Against)
---------------------------
- Worked Examples
  - Concrete scaffold: Provide annotated code examples and 'fill-in-the-blank' exercises.
  - Why apply: Models correct patterns and reduces cognitive load when starting.
  - Why not: Overreliance can impair generative coding; fade examples over time.

- Immediate Autograder Feedback (explain errors)
  - Concrete scaffold: Show human-readable explanations for common compiler/runtime errors and suggest next steps.
  - Why apply: Helps novices resolve blocking issues quickly and learn error patterns.
  - Why not: Too much explanation may encourage trial-and-error rather than understanding; include links to concept pages.

- Interactive Playgrounds
  - Concrete scaffold: Embed runnable snippets with editable inputs and instant execution.
  - Why apply: Lowers friction for experimentation and learning-by-doing.
  - Why not: If exercises are too trivial, they may not promote transfer.

Interaction Example
-------------------
System: "Here’s an annotated example of a loop. Try changing the bound and run it in the playground. Need a hint? [Yes / No]"

Research Questions
------------------
1. How do line-by-line annotated examples plus a playground affect error-resolution time for novices?
2. Does human-readable autograder feedback reduce help-seeking latency compared to raw compiler messages?
3. How quickly do novices transition from using worked examples to attempting generative solutions when fading is applied?

Data & Validation Measures
--------------------------
- Error type logs, time-to-first-success, hint request frequency.
- Transition metrics from example-driven attempts to independent code submissions.
- Pre/post concept quizzes and confidence self-reports.

Implementation Notes
--------------------
- Provide progressive fading rules for worked examples.
- Keep autograder explanations concise and link to targeted learning resources.
