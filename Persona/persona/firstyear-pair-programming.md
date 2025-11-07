---
persona: "First-Year Pair-Programming Learner"
archetype: first-year-pair-programming
age_range: "17-21"
skill_level: beginner-intermediate
study_role: lab-participant
tags: [pair-programming, collaboration, scaffolds, ADP-mapping]
---

Profile
-------
First-year CS/SE students in lab or tutorial settings working in pairs. They vary in prior experience and need structured turn-taking, role guidance, and low-friction sharing tools.

Goals
-----
- Learn coding by explaining and writing code collaboratively.
- Develop communication about code and problem-solving approaches.

Challenges
----------
- Dominance by one partner or social loafing.
- Coordination overhead when switching roles or sharing code.

Preferred Scaffolds
-------------------
- Role prompts and explicit turn-taking scaffolds
- Shared editable playgrounds with quick sync and rewind
- Suggested conversation starters and debugging checklists

ADP Mapping (For / Against)
---------------------------
- Role Rotation Prompts
  - Concrete scaffold: System suggests driver/navigator roles and enforces timed switches.
  - Why apply: Ensures both partners engage in coding and reasoning.
  - Why not: Timeboxes should be adjustable to avoid disrupting productive flow.

- Shared Replay / Rewind
  - Concrete scaffold: Capture code history and allow short replay to restore context after role switch.
  - Why apply: Lowers cognitive cost of resuming and facilitates explanation.
  - Why not: Requires storage and UX care to be non-intrusive.

- Conversation Starters
  - Concrete scaffold: Provide sentence stems for explaining reasoning ("I think this does X because...").
  - Why apply: Helps students articulate reasoning and learn by teaching.
  - Why not: Overstructured scripts can feel artificial; offer optional prompts.

Interaction Example
-------------------
System: "Driver: type now (8 min). Navigator: observe and prepare questions. Switch when timer ends. Need a starter prompt? (Yes/No)"

Research Questions
------------------
1. Does enforced role rotation increase balanced participation and learning gains?
2. How useful is a short code-replay feature for preserving context across role switches?
3. Do sentence-stem prompts improve the quality of explanations and conceptual understanding?

Data & Validation Measures
--------------------------
- Participation logs (edits per student), role adherence and switch frequency.
- Quality of pair-produced solutions and post-pair individual transfer tasks.
- Surveys on perceived fairness and learning from explaining.

Implementation Notes
--------------------
- Allow teams to disable timed rotation if they prefer.
- Keep code replay short and privacy-considerate.
