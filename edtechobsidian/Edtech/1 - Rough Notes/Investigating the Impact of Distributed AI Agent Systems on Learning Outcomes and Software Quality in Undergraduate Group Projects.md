# **Research Proposal: Investigating the Impact of Distributed AI Agent Systems on Learning Outcomes and Software Quality in Undergraduate Group Projects**

---

## **1. Introduction**

This proposal advocates for an _evolutionary_ rather than _revolutionary_ change in software engineering education, recognizing the need to build on what currently works rather than overhauling pedagogical systems entirely. Large Language Models (LLMs) and AI assistants are already present in student workflows; this intervention seeks to structure their use deliberately rather than prohibit or ignore them.

The intervention is grounded in **Distributed Cognition Theory** (Hutchins, 1995), which demonstrates that cognitive processes need not reside solely within individual minds but can be distributed across people, tools, and artifacts. In Hutchins' classic study of ship navigation, no single sailor possessed complete knowledge of the ship's position—yet the system as a whole successfully navigated. Similarly, this study investigates whether distributing specialized AI agents across team members, where each student is responsible for prompting and managing one domain-specific agent, can produce better learning outcomes and higher-quality software than traditional general-purpose AI access.

Our hypothesis is that by structuring AI assistance to mirror specialized team roles (backend, frontend, DevOps, testing), students will develop deeper domain expertise, produce higher-quality integrated systems, and experience reduced cognitive load—transforming AI from a generic helper into a structured cognitive partner within a distributed system.

---

## **2. Problem Statement**

AI-powered coding assistants such as ChatGPT, GitHub Copilot, and Claude are now ubiquitous in software engineering education. However, their adoption has been largely unstructured: students use these tools without pedagogical guidance, often relying on them for surface-level code generation rather than deep learning. This creates several key issues:

1. **Lack of Role Specialization:** In team projects, all students have access to the same general-purpose AI, leading to shallow engagement across multiple domains rather than deep expertise in one.
2. **Unclear Cognitive Distribution:** Traditional AI access does not deliberately structure how cognitive work is distributed across team members and tools, missing the pedagogical benefits of intentional specialization.
3. **Assessment Challenges:** Educators struggle to evaluate individual learning when AI contributions are undifferentiated from student work.
4. **Missed Opportunity for Transactive Memory Systems:** Teams fail to develop clear "who knows what" structures, which research shows improves team performance (Wegner, 1987).

The issue lies in a gap between tool adoption and measurable improvements in both individual learning depth and collective software quality. This project seeks to intervene by deliberately structuring AI agent access according to team role specialization, transforming unstructured AI use into a pedagogically intentional distributed cognitive system.

---

## **3. Importance of the Problem**

This issue is important because AI tools are fundamentally reshaping software engineering practice and education. Without proper pedagogical frameworks, universities risk producing graduates who depend on AI superficially rather than developing genuine expertise. Research shows that the _mere presence_ of technology does not guarantee effective learning outcomes (Koehler & Mishra, 2009).

Furthermore, industry increasingly values **T-shaped professionals**—individuals with deep expertise in one area and broad collaborative capabilities. Current unstructured AI use may produce students who are shallow generalists rather than deep specialists who can collaborate effectively.

From a theoretical standpoint, this research extends Distributed Cognition Theory into the realm of AI-human collaboration in educational settings—a largely unexplored domain. If successful, it provides empirical evidence for how to structure AI tools to maximize both individual learning and team performance.

---

## **4. Literature Review**

### **4.1 Distributed Cognition Theory**

Hutchins' (1995) seminal work on ship navigation demonstrated that cognitive processes can be distributed across people, artifacts, and time. On a naval vessel, no single crew member holds complete navigational knowledge; instead, the system collectively fixes the ship's position through distributed labor with specialized tools. This framework has been applied to cockpit aviation (Hutchins & Klausen, 1996), medical teams (Nemeth et al., 2004), and collaborative problem-solving—but rarely to AI-augmented educational teams.

**Key Principle:** Cognitive work distributed across specialized agents (human or artificial) with clear interfaces can produce system-level intelligence exceeding individual capabilities.

### **4.2 Transactive Memory Systems (TMS)**

Wegner (1987) introduced the concept of transactive memory in groups: team members develop shared knowledge of "who knows what," enabling efficient information retrieval and coordination. Research shows that teams with strong TMS outperform teams without it (Lewis, 2003).

**Application:** Assigning each student a specialized AI agent creates explicit TMS structure—each student becomes the recognized expert for their domain, supported by their agent.

### **4.3 Cognitive Load Theory**

Sweller's (1988) Cognitive Load Theory posits that learning is optimized when extraneous cognitive load is minimized, allowing working memory to focus on germane load (schema construction). Research in programming education shows that students often experience cognitive overload when managing full-stack complexity simultaneously (Lister et al., 2004).

**Application:** Specialized agents handle domain-specific complexity, reducing extraneous load and allowing students to develop deeper schemas within their assigned domain.

### **4.4 AI in Software Engineering Education**

Recent studies show mixed results for AI coding assistants. [**FILL IN: 2-3 recent studies on GitHub Copilot, ChatGPT in CS education - cite specific findings on learning outcomes, dependency issues, and assessment challenges**].

Notably, most existing research examines **individual** AI use rather than **team-based structured distribution** of AI capabilities—a significant gap this study addresses.

### **4.5 Role Specialization in Software Teams**

Research on Agile and DevOps teams demonstrates that role clarity improves both productivity and code quality (Hoda et al., 2012). However, educational group projects often lack clear role structures, leading to social loafing and uneven learning outcomes (Oakley et al., 2004).

**Application:** Distributing specialized agents enforces role boundaries while maintaining collaborative integration through boundary objects (APIs, documentation).

---

## **5. Proposed Intervention**

This study implements a **Distributed AI Agent System** in undergraduate software engineering group projects. The intervention divides 4-person teams into specialized roles, with each student assigned ONE domain-specific AI agent they are exclusively responsible for prompting and managing:

### **Agent Role Distribution:**

|Role|Student Responsibility|Agent Specialization|
|---|---|---|
|**Backend Engineer**|Server logic, databases, APIs|API design, query optimization, authentication, data modeling|
|**Frontend Engineer**|UI/UX, client-side logic|Component design, state management, accessibility, responsive layouts|
|**DevOps Engineer**|Deployment, CI/CD, infrastructure|Docker, pipelines, monitoring, environment configuration|
|**QA Engineer**|Testing, debugging, quality assurance|Test strategies, edge cases, integration testing, code review|

### **Technical Implementation:**

- **Control Group:** Teams have shared access to general-purpose ChatGPT/Claude with no restrictions
- **Experimental Group:** Each student receives a custom GPT/Claude Project with:
    - System prompt constraining responses to their domain
    - [**FILL IN: Specific technical setup - API keys, prompt engineering details, access controls**]
    - Logging of all prompts/responses for analysis
    - **Technical constraint:** Students cannot access other agents during the project period

### **Project Specification:**

Teams will build [**FILL IN: Specific software project description - e.g., "a full-stack task management application with user authentication, real-time updates, automated deployment, and comprehensive test coverage"**].

**Duration:** [**FILL IN: Number of weeks - recommend 5-6 weeks**]

**Deliverables:**

- Working software application
- API documentation
- Test suite
- Deployment pipeline
- Individual reflection on agent interaction

---

## **6. How Does My Intervention Address the Issue?**

### **Makes the Issue Visible:**

- Prompt logging reveals exactly how students engage with AI
- Git analysis shows who contributes what and where integration breaks occur
- Pre/post-tests expose learning depth vs. breadth trade-offs

### **Fixes the Problem:**

- **Enforces specialization:** Students cannot avoid deep engagement with their domain
- **Creates accountability:** Each student is the recognized expert for their component
- **Structures coordination:** Forces explicit interface design and documentation
- **Reduces cognitive overload:** Agent handles domain complexity, student focuses on learning

### **Promotes Informed Decision-Making:**

- Provides empirical evidence for structuring AI in team contexts
- Shows whether specialization + AI produces better learning than general AI access
- Generates data on optimal AI-human collaboration patterns in education

---

## **7. Theoretical Framework**

This study is grounded in multiple complementary theoretical frameworks:

### **Primary: Distributed Cognition Theory (Hutchins, 1995)**

- Cognitive processes distributed across people (students), artifacts (code, documentation), and tools (specialized agents)
- System-level intelligence emerges from coordinated specialized components
- No single student possesses complete system knowledge; the team collectively does

### **Supporting Frameworks:**

**Transactive Memory Systems (Wegner, 1987)**

- Agent assignment creates explicit "who knows what" structure
- Specialization improves information retrieval efficiency
- Agent serves as external memory system for domain knowledge

**Cognitive Load Theory (Sweller, 1988)**

- Specialization reduces extraneous cognitive load
- Agent handles domain-specific complexity
- Student working memory freed for deeper learning (germane load)

**Activity Theory (Vygotsky, 1978; Engeström, 1987)**

- Agent = mediating tool between student and learning objective
- Tool shapes the nature of the activity
- Different tool structures → different learning outcomes

**Boundary Objects Theory (Star & Griesemer, 1989)**

- APIs and documentation serve as boundary objects
- Enable coordination across specialized domains260000000
- Require negotiation and shared understanding

---

## **8. Research Questions**

### **Primary Research Question:**

**RQ1:** In undergraduate software engineering group projects, does distributing specialized AI agents across team members (where each student manages one domain-specific agent) result in superior learning outcomes and software quality compared to shared access to general-purpose AI assistants?

### **Secondary Research Questions:**

**RQ2:** How does agent specialization affect individual learning depth within assigned domains compared to breadth across the full stack?

**RQ3:** What is the impact of distributed AI agents on team coordination patterns, as measured by git activity and communication logs?

**RQ4:** How does cognitive load differ between students using specialized agents versus general-purpose AI?

**RQ5:** What prompting patterns emerge when students interact with domain-specific versus general-purpose agents?

---

## **9. Hypotheses**

**H1 (Learning Depth):** Students with specialized agents will score significantly higher on post-tests measuring domain-specific knowledge compared to control students.

**H2 (Software Quality):** Teams using distributed specialized agents will produce higher-quality software artifacts (as measured by rubric scores) compared to control teams.

**H3 (Cognitive Load):** Students with specialized agents will report lower cognitive load (NASA-TLX scores) than students with general-purpose AI access.

**H4 (Coordination):** Teams with distributed agents will exhibit fewer merge conflicts and clearer boundary communication in git logs and team communications.

**H5 (Specialization Trade-off):** Students with specialized agents will demonstrate deeper domain knowledge but potentially narrower breadth across the full technology stack compared to control students.

---

## **10. Methodology**

### **10.1 Research Design**

This study employs a **mixed-methods quasi-experimental design** comparing two conditions over [**FILL IN: number of weeks**]:

- **Control Group (n = [FILL IN]):** Teams with shared access to general-purpose ChatGPT/Claude
- **Experimental Group (n = [FILL IN]):** Teams with distributed specialized agents (one per role)

**Assignment:** [**FILL IN: Random assignment OR matched pairs based on prior GPA/experience**]

### **10.2 Participants**

**Population:** [**FILL IN: e.g., "Third-year undergraduate students enrolled in CS 3401: Software Engineering at [University Name]"**]

**Sample Size:** [**FILL IN: Target number of students - recommend minimum 32 students (8 teams of 4) for statistical power**]

**Inclusion Criteria:**

- Enrolled in [**FILL IN: specific course**]
- Completed prerequisite courses in [**FILL IN: e.g., data structures, web development**]
- No prior professional software development experience

**Exclusion Criteria:** [**FILL IN: if any**]

### **10.3 Materials**

**Software Project Specification:** [**FILL IN: Detailed project requirements - recommend full-stack application requiring all four roles**]

**Specialized Agent System Prompts:** [**FILL IN: Specific system prompts for each agent role - will need careful prompt engineering**]

**Example Backend Agent Prompt:**

```
You are a specialized backend development assistant for a student learning server-side engineering. Your expertise includes:
- RESTful API design and implementation
- Database schema design and query optimization
- Authentication and authorization patterns
- Server-side validation and error handling

You will ONLY respond to questions about backend development. If asked about frontend, DevOps, or testing concerns, politely redirect the student to consult with their teammate responsible for that domain.

Focus your responses on:
1. Teaching underlying concepts, not just providing code
2. Asking clarifying questions about requirements
3. Suggesting best practices and trade-offs
4. Encouraging the student to think through design decisions
```

[**FILL IN: Similar prompts for Frontend, DevOps, and QA agents**]

---

## **11. Data Collection Plan**

This study will collect both **quantitative** and **qualitative** data across multiple dimensions:

### **11.1 Quantitative Data**

|Data Type|Instrument|When Collected|Purpose|
|---|---|---|---|
|**Domain Knowledge**|Pre/post-test (20-30 items per domain)|Week 1, Week [FILL IN]|Measure learning gains H1, H5|
|**Software Quality**|Performance rubric (0-100 scale)|Week [FILL IN]|Measure artifact quality H2|
|**Cognitive Load**|NASA-TLX survey|Week [FILL IN]|Measure mental demand H3|
|**Time-on-Task**|Git commit timestamps|Continuous|Measure effort distribution|
|**Coordination Quality**|Git merge conflicts, cross-boundary commits|Continuous|Measure team coordination H4|
|**Agent Interaction**|Prompt/response logs|Continuous|Analyze usage patterns RQ5|

### **11.2 Qualitative Data**

|Data Type|Method|When Collected|Purpose|
|---|---|---|---|
|**Learning Experience**|Reflection survey (5-7 open-ended questions)|Week [FILL IN]|Understand student perceptions|
|**Team Dynamics**|Semi-structured interviews (30-45 min)|Week [FILL IN]|Explore coordination experiences|
|**Agent Effectiveness**|Focus groups (6-8 students, 60 min)|Week [FILL IN]|Gather feedback on agent design|
|**Prompting Strategies**|Thematic coding of prompt logs|Post-study|Identify effective interaction patterns RQ5|

### **11.3 Specific Instruments**

**Domain Knowledge Pre/Post-Test:** [**FILL IN: Sample items for each domain - e.g.,**

- Backend: "Explain the difference between PUT and PATCH in RESTful API design"
- Frontend: "Describe three strategies for state management in React applications"
- DevOps: "What is the purpose of container orchestration tools like Kubernetes?"
- QA: "Differentiate between unit, integration, and end-to-end testing"]

**Software Quality Rubric (adapted from [CITE]):**

|Criterion|Weight|0-25 (Poor)|26-50 (Fair)|51-75 (Good)|76-100 (Excellent)|
|---|---|---|---|---|---|
|**Functionality**|25%|[FILL IN descriptors]||||
|**Code Quality**|20%|[FILL IN descriptors]||||
|**Integration Quality**|20%|[FILL IN descriptors]||||
|**Documentation**|15%|[FILL IN descriptors]||||
|**Testing Coverage**|20%|[FILL IN descriptors]||||

**NASA-TLX Cognitive Load Survey:** [**Standard NASA-TLX - 6 subscales: Mental Demand, Physical Demand, Temporal Demand, Performance, Effort, Frustration**]

**Reflection Survey Questions:**

1. [**FILL IN: 5-7 open-ended questions about learning experience, agent usefulness, specialization impact**]

---

## **12. Study Timeline**

|Week|Activity|Data Collected|
|---|---|---|
|**Week 1**|- Pre-test administration<br>- Team formation<br>- Role assignment<br>- Agent setup & training|Pre-test scores|
|**Weeks 2-[FILL IN]**|- Project development<br>- Weekly integration checkpoints<br>- Continuous monitoring|- Git logs<br>- Prompt logs<br>- Communication logs|
|**Week [FILL IN]**|- Project submission<br>- Post-test administration<br>- NASA-TLX survey<br>- Reflection survey|- Post-test scores<br>- NASA-TLX data<br>- Reflections<br>- Final artifacts|
|**Week [FILL IN]**|- Rubric scoring (2 independent evaluators)<br>- Semi-structured interviews<br>- Focus groups|- Quality scores<br>- Interview transcripts|
|**Weeks [FILL IN]**|- Data cleaning & analysis<br>- Qualitative coding<br>- Statistical testing|Analysis outputs|

**Total Duration:** [**FILL IN: e.g., 8-10 weeks**]

---

## **13. How Will I Measure Impact?**

### **13.1 Learning Outcomes (H1, H5)**

**Metric:** Pre/post-test score changes within assigned domains

**Analysis:**

- **Paired t-test** (within-group): Pre vs. post scores for each student
- **Independent t-test** (between-group): Experimental vs. control post-test scores
- **Cohen's d** effect size calculation
- **Domain specificity analysis:** Compare experimental students' scores on their assigned domain vs. other domains to test specialization hypothesis (H5)

**Expected Result:** Experimental students show significantly higher gains in their assigned domain compared to control students (H1), but potentially lower breadth scores across non-assigned domains (H5).

---

### **13.2 Software Quality (H2)**

**Metric:** Rubric scores (0-100) from two independent evaluators

**Analysis:**

- **Inter-rater reliability:** Cohen's κ or Krippendorff's α
- **Independent t-test:** Compare mean rubric scores between groups
- **Subscale analysis:** Examine which quality dimensions (functionality, code quality, integration, documentation, testing) show greatest differences
- **Effect size:** Cohen's d

**Expected Result:** Experimental teams score significantly higher on overall quality and particularly on integration quality metrics.

---

### **13.3 Cognitive Load (H3)**

**Metric:** NASA-TLX scores (0-100, lower = less load)

**Analysis:**

- **Independent t-test:** Compare overall NASA-TLX scores between groups
- **Subscale analysis:** Examine which dimensions (mental demand, effort, frustration) differ most
- **Correlation analysis:** Examine relationship between cognitive load and performance

**Expected Result:** Experimental students report significantly lower mental demand and frustration scores.

---

### **13.4 Team Coordination (H4)**

**Metrics:**

- Git merge conflicts (count)
- Cross-boundary commits (commits modifying another student's domain)
- Communication clarity (coded qualitatively)

**Analysis:**

- **Mann-Whitney U test:** Compare merge conflict counts (likely non-normal distribution)
- **Content analysis:** Code communication logs for boundary negotiation patterns
- **Social network analysis** (optional): Map communication patterns between roles

**Expected Result:** Experimental teams show fewer merge conflicts and clearer boundary communication patterns.

---

### **13.5 Prompting Patterns (RQ5)**

**Metric:** Qualitative analysis of prompt logs

**Analysis:** **Thematic Analysis (Braun & Clarke, 2006)**

1. **Familiarization:** Read through prompt logs
2. **Initial coding:** Identify prompt types (debugging, conceptual questions, code generation, etc.)
3. **Theme development:** Group codes into higher-level themes
4. **Review:** Check themes against data
5. **Define:** Name and describe final themes
6. **Report:** Present with exemplar quotes

**Expected Themes:**

- Evolution from surface-level to deep conceptual questions
- Domain-specific terminology usage
- Iterative refinement patterns
- Metacognitive prompting (asking agent to explain reasoning)

---

## **14. Analysis Plan**

### **14.1 Quantitative Analysis**

**Software:** [**FILL IN: e.g., R, SPSS, Python (scipy/pandas)**]

**Statistical Tests:**

|Research Question|Primary Test|Assumptions Checked|Effect Size|
|---|---|---|---|
|H1: Learning gains|Paired t-test, Independent t-test|Shapiro-Wilk (normality), Levene's (homogeneity)|Cohen's d|
|H2: Software quality|Independent t-test|Shapiro-Wilk, Levene's|Cohen's d|
|H3: Cognitive load|Independent t-test|Shapiro-Wilk, Levene's|Cohen's d|
|H4: Coordination|Mann-Whitney U (merge conflicts)|Non-parametric|Rank-biserial correlation|
|Correlations|Pearson's r or Spearman's ρ|Linearity, normality|r or ρ|

**Significance Level:** α = 0.05 (two-tailed)

**Power Analysis:** [**FILL IN: Target power = 0.80, calculate required sample size for expected effect sizes**]

**Handling Missing Data:** [**FILL IN: e.g., Listwise deletion, multiple imputation - depends on missingness pattern**]

---

### **14.2 Qualitative Analysis**

**Software:** [**FILL IN: e.g., NVivo, Atlas.ti, MAXQDA, or manual coding**]

**Approach: Thematic Analysis (Braun & Clarke, 2006)**

**Data Sources:**

- Reflection survey responses
- Interview transcripts
- Focus group transcripts
- Prompt logs

**Coding Process:**

1. **Initial coding:** [**FILL IN: Single coder or dual coding?**]
2. **Code refinement:** Regular meetings to discuss emerging codes
3. **Theme development:** Group codes into coherent themes
4. **Member checking (optional):** Share preliminary findings with participants
5. **Audit trail:** Document all coding decisions

**Expected Themes** (provisional):

- Perceived learning depth vs. breadth
- Agent as cognitive partner vs. tool
- Role identity and expertise development
- Coordination challenges and solutions
- Frustrations with domain constraints
- Confidence in specialized domain

---

### **14.3 Mixed Methods Integration**

**Triangulation Strategy:**

- Compare quantitative performance data with qualitative experience reports
- Use qualitative data to explain unexpected quantitative findings
- Identify convergence and divergence across data sources

**Example:** If experimental students score higher on post-tests (quantitative) AND report feeling more confident in their domain (qualitative), this strengthens the conclusion.

---

## **15. Validation & Reliability**

### **15.1 Instrument Validation**

**Pre/Post-Test:**

- **Content validity:** Expert review by [FILL IN: number] software engineering faculty
- **Pilot testing:** Administer to [FILL IN: number] students not in study sample
- **Item analysis:** Remove items with poor discrimination or difficulty indices
- **Test-retest reliability** (optional): Administer twice to small sample with 1-week interval

**Rubric:**

- **Expert review:** [FILL IN: number] experienced software engineering instructors validate criteria
- **Pilot scoring:** Score [FILL IN: number] sample projects to refine descriptors
- **Inter-rater reliability:** Train evaluators until Cohen's κ > 0.70

---

### **15.2 Internal Validity Threats**

|Threat|Mitigation Strategy|
|---|---|
|**Selection bias**|[FILL IN: Random assignment OR matched pairs on prior GPA]|
|**History effects**|Collect data within single semester; both groups experience same external events|
|**Maturation**|Control group provides baseline for natural learning over time|
|**Testing effects**|Use parallel forms for pre/post-tests (if feasible)|
|**Instrumentation**|Standardize rubric training; blind evaluators to group assignment|
|**Hawthorne effect**|Both groups use AI tools (novelty controlled); emphasize normal grading|

---

### **15.3 External Validity**

**Generalizability Considerations:**

- **Population:** Findings may not generalize beyond [FILL IN: institution type, student demographics]
- **Setting:** Single course context; may differ in industry or other courses
- **Tools:** Results specific to LLM-based agents (GPT-4, Claude); may not apply to other AI architectures
- **Temporal:** Rapid AI evolution may limit longitudinal applicability

**Enhancing Generalizability:**

- Detailed description of context for replication
- Theoretical grounding allows transferability
- [FILL IN: Consider multi-site study if feasible]

---

## **16. Ethical Considerations**

### **16.1 IRB Approval**

[**FILL IN: Institution-specific IRB process**]

- Submit protocol with all instruments
- Obtain approval before recruitment
- Maintain documentation of consent

### **16.2 Informed Consent**

**Participants will be informed:**

- Study purpose and procedures
- Voluntary participation; no grade penalty for declining
- Data confidentiality and anonymization
- Right to withdraw at any time
- How data will be used and stored

**Special Considerations:**

- Students may feel coerced if instructor is researcher → [FILL IN: Mitigation strategy, e.g., separate recruiter, delayed consent]
- Ensure students not in study receive equivalent learning opportunities

### **16.3 Data Privacy & Security**

- **Anonymization:** Assign participant IDs; remove identifying information
- **Storage:** Secure server with password protection and encryption
- **Access:** Limited to research team members
- **Retention:** [FILL IN: e.g., 5 years per institutional policy]
- **Prompt logs:** May contain sensitive information; reviewed only by research team

### **16.4 Fairness & Equity**

- **Equal access:** Ensure all students have necessary technology (laptops, internet)
- **Accommodation:** Provide alternative formats for students with disabilities
- **Post-study access:** Offer control group students access to specialized agents after study concludes
- **Grading:** Ensure rubric applied fairly regardless of group assignment

---

## **17. Expected Outcomes & Contributions**

### **17.1 Anticipated Findings**

Based on literature and theoretical framework, we anticipate:

1. **Experimental students will demonstrate significantly deeper learning** in their assigned domain (H1 supported)
2. **Experimental teams will produce higher-quality integrated software** due to clearer role boundaries and reduced coordination errors (H2 supported)
3. **Experimental students will experience lower cognitive load** because agents handle domain-specific complexity (H3 supported)
4. **Experimental teams will show fewer merge conflicts** and clearer boundary communication (H4 supported)
5. **Experimental students may score lower on breadth measures** across non-assigned domains, confirming specialization trade-off (H5 supported)

### **17.2 Theoretical Contributions**

1. **Extends Distributed Cognition Theory** to AI-human educational teams—a novel application
2. **Empirically tests Transactive Memory Systems** with artificial agents as memory components
3. **Advances understanding** of how tool structure shapes learning outcomes (Activity Theory)
4. **Provides evidence** for Cognitive Load Theory in AI-augmented contexts

### **17.3 Practical Contributions**

1. **Pedagogical Framework:** Provides replicable model for structuring AI in team-based courses
2. **Assessment Strategy:** Demonstrates how to evaluate individual learning in AI-augmented group work
3. **Tool Design Principles:** Informs development of role-specific AI assistants for education
4. **Curriculum Guidance:** Helps educators decide when specialization vs. breadth is appropriate

### **17.4 Potential Impact**

- **For Educators:** Evidence-based approach to integrating AI tools deliberately rather than reactively
- **For Students:** Clearer role identity, deeper learning, reduced cognitive overwhelm
- **For Institutions:** Framework for updating curriculum to prepare students for AI-augmented workplace
- **For Industry:** Graduates trained in effective AI collaboration patterns from day one

---

## **18. Limitations**

### **18.1 Study Limitations**

1. **Sample Size:** [FILL IN: If small sample] Limited statistical power; findings should be interpreted cautiously
2. **Duration:** [FILL IN: If short] Single project may not capture long-term effects
3. **Context:** Single institution, single course—limits generalizability
4. **Novelty Effects:** Both AI use and role specialization may be novel; effects may diminish over time
5. **Agent Quality:** Specialized agents depend on prompt engineering quality; variations may affect outcomes
6. **Self-Selection Bias:** [FILL IN: If not random assignment] Students who volunteer may differ from broader population

### **18.2 Methodological Limitations**

1. **Pre/Post-Test Design:** Cannot fully isolate agent effect from general project-based learning
2. **Rubric Subjectivity:** Despite training, evaluator interpretation may introduce variance
3. **Self-Report Bias:** NASA-TLX and surveys subject to social desirability bias
4. **Prompt Log Analysis:** Time-intensive qualitative coding; intercoder reliability critical
5. **Coordination Metrics:** Git logs capture technical but not all social coordination

### **18.3 Technological Limitations**

1. **LLM Variability:** Model updates during study could affect agent responses
2. **Access Control:** Technical enforcement of agent restrictions may not be perfect
3. **Prompt Logging:** Privacy concerns may limit depth of analysis
4. **Platform Dependence:** Results tied to specific LLM capabilities (GPT-4, Claude)

---

## **19. Future Directions**

### **19.1 Immediate Extensions**

1. **Larger Sample:** Replicate with multiple course sections or institutions
2. **Longitudinal Study:** Track students across multiple projects to examine adaptation
3. **Alternative Roles:** Test different role configurations (e.g., 3-person or 5-person teams)
4. **Discipline Transfer:** Apply framework to other team-based disciplines (e.g., digital humanities, data science)

### **19.2 Advanced Research Questions**

1. **Optimal Specialization Level:** How granular should agent specialization be?
2. **Role Rotation:** What happens if students rotate roles/agents across projects?
3. **Agent-Agent Communication:** What if agents could also coordinate with each other?
4. **Adaptive Agents:** Can agents learn individual student patterns and adapt over time?
5. **Hybrid Models:** What's the optimal balance between specialized and general-purpose access?

### **19.3 Tool Development**

Based on findings, develop:

- **Open-source specialized agent framework** for educators
- **Dashboard for monitoring** distributed agent usage in real-time
- **Automated assessment tools** leveraging prompt log analysis
- **Curriculum modules** for teaching effective AI collaboration

---

## **20. Has It Made a Difference?**

The intervention's success will be determined by multiple convergent indicators:

### **20.1 Quantitative Success Criteria**

✅ **Experimental students score ≥ 10% higher** on domain-specific post-tests (H1)  
✅ **Experimental teams score ≥ 8 points higher** on software quality rubric (0-100 scale) (H2)  
✅ **Experimental students report ≥ 15% lower** cognitive load scores (H3)  
✅ **Experimental teams show ≥ 30% fewer** merge conflicts (H4)

### **20.2 Qualitative Success Indicators**

✅ Students report **feeling more confident and expert** in their specialized domain  
✅ Students describe agents as **cognitive partners** rather than just code generators  
✅ Teams articulate **clear coordination strategies** around role boundaries  
✅ Prompt logs show **progression toward deeper conceptual questions** over time

### **20.3 Practical Success Indicators**

✅ **Educators can replicate** the intervention in their own courses  
✅ **Students request** continued use of specialized agents in future courses  
✅ Framework is **adaptable** to other team-based educational contexts  
✅ Findings **inform institutional policy** on AI tool integration

### **20.4 Evidence of Sustainable Change**

- **Institutional Adoption:** [FILL IN: University] incorporates framework into official software engineering curriculum
- **Student Persistence:** Graduates report continuing to use role-based AI collaboration strategies in internships/jobs
- **Educator Network:** Community of practice forms around distributed agent pedagogy
- **Tool Ecosystem:** Third-party developers create educational agent platforms based on principles

---

## **21. Generalization to Future Projects**

This model can be replicated or adapted in future educational research and practice by:

### **21.1 Replication in Other Contexts**

**Other Software Engineering Topics:**

- Mobile app development (iOS dev, Android dev, backend, QA)
- Data science projects (data collection, cleaning, modeling, visualization)
- Game development (gameplay, graphics, audio, testing)

## **Other Disciplines:**