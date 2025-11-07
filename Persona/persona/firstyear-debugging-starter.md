---
persona: "First-Year — Debugging Starter"
archetype: first-year-debugging
age_range: "17-21"
skill_level: beginner
study_role: CS1 student
tags: [debugging, traces, rubrics, ADP-mapping]
---

Profile
-------
First-year students who can write simple programs but struggle to diagnose and fix bugs. They often react to error messages without a systematic approach to debugging.

Goals
-----
- Learn a repeatable debugging workflow and apply it autonomously.
- Reduce time-to-fix and increase diagnostic accuracy.

Challenges
----------
- Jumping to random edits rather than forming hypotheses.
- Anxiety when faced with long stack traces and unfamiliar errors.

Preferred Scaffolds
-------------------
- Debugging checklists and hypothesis-driven prompts
- Step-through code tracers and variable inspectors
- Error explanation with example fixes and tests

ADP Mapping (For / Against)
---------------------------
- Debugging Checklists
  - Concrete scaffold: Prompt a 3-step checklist (replicate, isolate, test hypothesis) when many failed attempts detected.
  - Why apply: Encourages methodical debugging and reduces random edits.
  - Why not: Overuse may slow experienced debuggers; make it adaptive.

- Step-through Tracing Tools
  - Concrete scaffold: Provide inline tracing of variable states and step execution in small examples.
  - Why apply: Makes dynamic behaviour visible and reduces mystery of runtime errors.
  - Why not: Performance/resource cost; provide for short trace windows.

- Example Fixes (with explanation)
  - Concrete scaffold: Offer one or two anonymised example fixes for common errors with attachments to tests demonstrating the fix.
  - Why apply: Demonstrates corrective action and test-driven thinking.
  - Why not: Must avoid providing full solutions to graded work; limit to concept-level guidance.

Interaction Example
-------------------
System: "It looks like you ran the test 6 times with the same failure. Try the quick debugging checklist? (Replicate → Isolate → Test hypothesis)"

Research Questions
------------------
1. Does presenting a concise debugging checklist reduce the number of unstructured edits and lower time-to-fix?
2. How effective are inline tracers at improving novices’ mental models of program execution?
3. What is the impact of anonymised example fixes on learners’ ability to generalise repair strategies?

Data & Validation Measures
--------------------------
- Frequency of checklist use and subsequent success rates.
- Trace tool usage patterns and correlation with successful fixes.
- Error-type resolution rates and hint dependence over time.

Implementation Notes
--------------------
- Enable trace tools for limited problem sizes to manage resources.
- Make debugging scaffolds visible but optional — do not auto-solve graded tasks.
