# Adaptation

Summary
- Adaptation enables agents to change behavior over time based on feedback, new data, or evolving goals.

When to use
- Systems that must personalize or improve via interaction (tutors, recommender systems).

How it works
- Collect signals (explicit feedback, implicit engagement), update policies or prompt templates, and re-evaluate.

Example
- Tutor agent adjusts difficulty based on learner performance trends.

Real example (OpenEvolve program evolution)
The book shows using an `OpenEvolve` loop to iteratively improve a program or policy by running many evaluation iterations and selecting the best-performing variants.

```python
evolve = OpenEvolve(initial_program_path="path/to/initial_program.py", evaluation_file="path/to/evaluator.py")
best_program = await evolve.run(iterations=1000)
print(best_program.metrics)
```

This illustrates automated adaptation: the system searches program variations, evaluates them against a metric, and adapts by selecting better variants over time.

Pitfalls
- Catastrophic forgetting, unsafe drifting, and overfitting to transient signals.

Related patterns
- Memory Management, Evaluation and Monitoring

