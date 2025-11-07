---
persona: "Performance & Optimization Learner"
archetype: performance-optimization
age_range: "20-35"
skill_level: intermediate-advanced
study_role: elective-or-capstone
tags: [performance, profiling, optimization, ADP-mapping]
---

Profile
-------
Students focused on performance engineering: profiling, algorithmic optimisation, memory and latency tuning. They require scaffolds that connect measured performance to code hotspots and suggest targeted optimisations.

Goals
-----
- Identify hotspots, apply targeted optimisations, and measure impact.
- Learn to justify trade-offs between speed, memory, readability, and maintainability.

Challenges
----------
- Difficulty relating profiling outputs to concrete code changes.
- Tendency to over-optimise premature hotspots.

Preferred Scaffolds
-------------------
- Guided profiling tools with annotated hotspot-to-code mapping
- Suggest optimisations with rationale and estimated impact
- Before/after measurement templates for documenting changes

ADP Mapping (For / Against)
---------------------------
- Hotspot-to-Code Mapping
  - Concrete scaffold: Link profiler samples to source lines and offer short explanation of probable cause.
  - Why apply: Reduces cognitive overhead in locating performance issues.
  - Why not: Profilers can be noisy; highlight confidence and require repeated runs.

- Optimisation Suggestion Prompts
  - Concrete scaffold: Suggest micro-optimisations (e.g., algorithmic change, data structure swap) with expected complexity impacts.
  - Why apply: Provides actionable guidance and teaches trade-offs.
  - Why not: May encourage premature optimisation; prompt for measurement-based justification.

- Before/After Measurement Templates
  - Concrete scaffold: Provide a small template to record baseline, modification, and measured impact with environment details.
  - Why apply: Encourages empirical validation and reproducibility.
  - Why not: Additional documentation overhead; keep concise.

Interaction Example
-------------------
System: "Profiler: heavy allocation in function X at line 42. Suggest checking data structure choice or caching. Show quick refactor options? [Yes / No]"

Research Questions
------------------
1. Do hotspot-to-code mappings reduce time-to-diagnose and increase successful fixes for performance issues?
2. How often do optimisation suggestions lead to measurable improvements versus regressions?
3. Does mandated before/after measurement improve students’ justification quality for optimisations?

Data & Validation Measures
--------------------------
- Time-to-first-fix for profiled issues, optimisation acceptance rates, and measured performance deltas.
- Frequency of regressions after suggested optimisations.
- Quality of before/after documentation and reproducibility of measurement.

Implementation Notes
--------------------
- Encourage multiple profiler runs and controlled input sizes to reduce noise.
- Provide sandboxed measurement harnesses to make comparisons reliable.
