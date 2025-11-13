# Exploration & Discovery

Summary
- Exploration and Discovery patterns let agents autonomously search, experiment, and gather knowledge to find new strategies or information.

When to use
- Research assistants, creative ideation, or when the solution space is unknown.

How it works
- Use stochastic policies, simulated trials, and logging to explore options; evaluate and narrow promising directions.

Notebook-derived example (Agent Laboratory)
- The Agent Laboratory notebooks use a group of specialized agents (e.g., Professors, Postdocs, Reviewers) that:
  1. Propose experimental plans and small runnable experiments.
  2. Execute experiments and generate a report (often as LaTeX or markdown).
  3. Run LLM-based reviewers that produce structured JSON reviews and scores.
  4. Aggregate reviewer output to decide next steps (keep, refine, or abandon).

Example (excerpt)
```python
# Simplified excerpt from the Agent Laboratory examples
class ReviewersAgent:
	def __init__(self, model="gpt-4o-mini", notes=None, openai_api_key=None):
		self.notes = notes or []
		self.model = model
		self.openai_api_key = openai_api_key

	def inference(self, plan, report):
		reviewer_1 = "You are a harsh but fair reviewer and expect good experiments that lead to insights for the research topic."
		review_1 = get_score(outlined_plan=plan, latex=report, reward_model_llm=self.model, reviewer_type=reviewer_1, openai_api_key=self.openai_api_key)

		reviewer_2 = "You are a harsh and critical but fair reviewer who is looking for an idea that would be impactful in the field."
		review_2 = get_score(outlined_plan=plan, latex=report, reward_model_llm=self.model, reviewer_type=reviewer_2, openai_api_key=self.openai_api_key)

		reviewer_3 = "You are a harsh but fair open-minded reviewer that is looking for novel ideas that have not been proposed before."
		review_3 = get_score(outlined_plan=plan, latex=report, reward_model_llm=self.model, reviewer_type=reviewer_3, openai_api_key=self.openai_api_key)

		return f"Reviewer #1:\n{review_1}, \nReviewer #2:\n{review_2}, \nReviewer #3:\n{review_3}"


def get_score(outlined_plan, latex, reward_model_llm, reviewer_type=None, attempts=3, openai_api_key=None):
	"""Run an LLM-based review prompt and parse a structured JSON review.
	The notebook uses an evaluation template that returns a THOUGHT section and a REVIEW JSON section (ratings, strengths, weaknesses, decision).
	"""
	# Implementation in the notebook calls the reward model with a long template
	# (omitted here). The key idea: produce structured JSON that downstream
	# code can parse to decide whether to keep/explore/abandon a line of work.


class ProfessorAgent(BaseAgent):
	def __init__(self, model="gpt4omini", notes=None, max_steps=100, openai_api_key=None):
		super().__init__(model, notes, max_steps, openai_api_key)
		self.phases = ["report writing"]

	def generate_readme(self):
		sys_prompt = f"""You are {self.role_description()} \n Here is the written paper \n{self.report}. Task instructions: Your goal is to integrate all of the knowledge, code, reports, and notes provided to you and generate a readme.md for a github repository."""
		history_str = "\n".join([_[1] for _ in self.history])
		prompt = (
			f"""History: {history_str}\n{'~' * 10}\n"""
			f"Please produce the readme below in markdown:\n")
		model_resp = query_model(model_str=self.model, system_prompt=sys_prompt, prompt=prompt, openai_api_key=self.openai_api_key)
		return model_resp.replace("```markdown", "")
```

Pitfalls
- LLM reviewers can be noisy; include multiple reviewers and aggregate scores.
- Running code or experiments at scale requires sandboxing and resource controls.

Related patterns
- Prioritization, Evaluation & Monitoring, Human-in-the-Loop

