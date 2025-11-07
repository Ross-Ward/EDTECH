# FYP Plan

## Project Details
- **Topic:** Cognitive AI Tutors:
- **Title:** Personalizing Learning Pathways in STEM Education
- **Deadline:** 2026-05-12
- **Duration:** 50 weeks
- **Scope:** Software Development
- **Approach:** Technical
- **Objectives:** Key Objectives
Design an Intelligent Tutoring System (ITS)

Develop a prototype AI tutor focused on a STEM domain (e.g., introductory calculus or programming).

Tailor feedback and guidance based on individual learner performance and interaction history.

Model and Adapt to Student Knowledge States

Use ML to estimate learner knowledge levels (Bayesian knowledge tracing, deep knowledge tracing).

Adjust lesson difficulty and sequence dynamically.

Evaluate Cognitive and Engagement Impacts

Assess how personalized AI tutors affect motivation, retention, and comprehension.

Investigate how different feedback styles (hint-based, Socratic, direct) impact learning.

Ensure Inclusivity and Accessibility

Identify potential biases in AI recommendations or assessments.

Implement accessibility features for diverse learning needs (e.g., neurodiverse students).

Compare with Traditional Learning Approaches

Conduct controlled experiments or surveys comparing AI tutoring with human instruction or static e-learning.

 Technologies and Methods
AI/ML Techniques

Deep learning for modeling learning patterns (e.g., LSTM, transformers)

Reinforcement learning for curriculum adaptation

Recommendation systems for learning resources

NLP Tools

GPT-based models for question answering, hint generation

Sentence similarity and intent recognition (e.g., spaCy, BERT)

Educational Data Mining

Learning analytics from LMS logs and tutor interaction data

Visualization of student learning trajectories

User Feedback Collection

A/B testing interfaces

Eye-tracking or clickstream analysis (if resources available)

Platform Integration

Web-based tutoring platform (React + Flask/Django)

Integration with Google Classroom, Moodle, or standalone app

Ethical Considerations

Student data privacy compliance (GDPR/FERPA)

Bias detection and fairness evaluation in learning paths


- **Supervisor:** Supervisor Requirements
A suitable supervisor should ideally have expertise in the following areas:

Artificial Intelligence / Machine Learning

Deep learning, recommendation systems, reinforcement learning.

Cognitive Science / Educational Psychology

Understanding of learning theories, cognitive load, and personalized learning.

Education Technology

Experience with adaptive learning platforms and intelligent tutoring systems.

Natural Language Processing (NLP)

Techniques for analyzing student input and generating human-like responses.

Human-Computer Interaction (HCI)

Design of engaging, intuitive learning interfaces and feedback systems.
- **Level:** Undergraduate

## Resources
Okay, here's a breakdown of resources recommended for your FYP on Personalizing Learning Pathways in STEM Education using Cognitive AI Tutors, keeping in mind your objectives, timeline, and undergraduate level:

**1. Software Tools and Libraries:**

*   **Programming Languages:**
    *   **Python:**  The primary language for ML/AI development due to its extensive libraries and community support. (Beginner-friendly, large community)
*   **AI/ML Libraries/Frameworks:**
    *   **TensorFlow/Keras:** Deep learning frameworks for building and training neural networks, particularly useful for deep knowledge tracing and modeling learning patterns. (Good for complex models, requires some ML background)
    *   **PyTorch:** Another popular deep learning framework, known for its flexibility and dynamic computation graph. (Alternative to TensorFlow, good for research-oriented projects)
    *   **Scikit-learn:**  A general-purpose ML library with algorithms for classification, regression, clustering, and dimensionality reduction. Useful for simpler knowledge tracing models and recommendation systems. (Easy to use, good for prototyping)
    *   **Surprise:** Recommender system library built on top of scikit-learn. (Easy to use, good for prototyping)
*   **NLP Tools:**
    *   **spaCy:** A library for advanced Natural Language Processing, including tokenization, part-of-speech tagging, and named entity recognition.  Useful for analyzing student input and understanding intent. (Good for text analysis, requires some NLP knowledge)
    *   **NLTK (Natural Language Toolkit):**  A comprehensive library for NLP, offering a wide range of tools and resources. (Good for learning NLP concepts, may require more coding)
    *   **Transformers (Hugging Face):**  Library for using pre-trained transformer models like BERT, GPT, and others for question answering, text generation, and sentence similarity. (Powerful, but requires significant computational resources and familiarity with transformers)
*   **Web Development:**
    *   **Flask/Django (Python):** Web frameworks for building the tutoring platform's backend.  Flask is lightweight and good for smaller projects, while Django is more feature-rich and suitable for larger applications. (Flask for simplicity, Django for scalability)
    *   **React/Vue.js:** JavaScript libraries for building the user interface (frontend) of the tutoring platform.  React is widely used and has a large community, while Vue.js is known for its simplicity and ease of learning. (React for industry standard, Vue.js for easier learning)
*   **Data Visualization:**
    *   **Matplotlib/Seaborn (Python):** Libraries for creating visualizations of student learning trajectories and other data. (Good for basic plots, easy to learn)
    *   **Plotly/Dash (Python):**  Interactive visualization libraries for creating dashboards and engaging data displays. (Good for interactive visualizations, more complex)
*   **Database:**
    *   **SQLite:** A lightweight, file-based database suitable for smaller projects and prototypes. (Easy to set up, good for small datasets)
    *   **PostgreSQL:** A more robust and scalable relational database management system (RDBMS). (Good for larger datasets, requires more setup)

**2. Datasets and Data Sources:**

*   **Open Educational Resources (OER):**
    *   **Khan Academy:** Offers free educational videos and exercises covering a wide range of STEM topics. You can potentially use their content as a basis for your tutoring system.
    *   **MIT OpenCourseWare:** Provides access to course materials from MIT, including lecture notes, assignments, and exams.
*   **Publicly Available Datasets:**
    *   **UCI Machine Learning Repository:** A collection of datasets for machine learning research, including some educational datasets.
    *   **Kaggle Datasets:** Kaggle hosts a variety of datasets, including some related to education and student performance.
    *   **ASSISTments Data:**  Datasets from the ASSISTments online tutoring system, which include student interaction data and performance data.
*   **Synthetic Data:**
    *   If real-world datasets are limited, consider generating synthetic data to train and evaluate your models.  You can use Python libraries like `numpy` and `pandas` to create synthetic data.

**3. Hardware Requirements (If Applicable):**

*   **Basic Development Machine:**
    *   A standard laptop or desktop computer with sufficient RAM (at least 8GB, ideally 16GB) and a reasonably fast processor should be sufficient for development and testing.
*   **GPU (Optional but Recommended):**
    *   If you plan to use deep learning models, a GPU can significantly speed up training.  Consider using a cloud-based GPU service like Google Colab (free) or AWS SageMaker.
*   **Eye-Tracking Hardware (If Resources Available):**
    *   If your project scope includes eye-tracking analysis, you will need to acquire an eye-tracking device.  This is a more advanced requirement and may not be feasible for all undergraduate projects.

**4. Online Tutorials and Learning Resources:**

*   **Python:**
    *   **Official Python Tutorial:**  [https://docs.python.org/3/tutorial/](https://docs.python.org/3/tutorial/)
    *   **Codecademy:** [https://www.codecademy.com/learn/learn-python-3](https://www.codecademy.com/learn/learn-python-3)
*   **Machine Learning:**
    *   **Coursera/edX:** Online courses on machine learning from top universities (e.g., Andrew Ng's Machine Learning course on Coursera).
    *   **fast.ai:** Practical deep learning courses.
    *   **Google's Machine Learning Crash Course:** [https://developers.google.com/machine-learning/crash-course](https://developers.google.com/machine-learning/crash-course)
*   **TensorFlow/Keras:**
    *   **TensorFlow Tutorials:** [https://www.tensorflow.org/tutorials](https://www.tensorflow.org/tutorials)
    *   **Keras Documentation:** [https://keras.io/](https://keras.io/)
*   **PyTorch:**
    *   **PyTorch Tutorials:** [https://pytorch.org/tutorials/](https://pytorch.org/tutorials/)
*   **NLP:**
    *   **spaCy Documentation:** [https://spacy.io/](https://spacy.io/)
    *   **NLTK Book:** [http://www.nltk.org/book/](http://www.nltk.org/book/)
    *   **Hugging Face Transformers Documentation:** [https://huggingface.co/transformers/](https://huggingface.co/transformers/)
*   **Web Development:**
    *   **React Documentation:** [https://reactjs.org/](https://reactjs.org/)
    *   **Vue.js Documentation:** [https://vuejs.org/](https://vuejs.org/)
    *   **Flask Documentation:** [https://flask.palletsprojects.com/](https://flask.palletsprojects.com/)
    *   **Django Documentation:** [https://docs.djangoproject.com/](https://docs.djangoproject.com/)
*   **Educational Data Mining:**
    *   Read research papers in journals like the Journal of Educational Data Mining (JEDM).
*   **General Resources:**
    *   **Stack Overflow:** A Q&A website for programming questions.
    *   **GitHub:** A platform for sharing and collaborating on code.
    *   **Medium:** A platform for publishing articles on a variety of topics, including AI and education.

**Key Considerations for Your Project:**

*   **Start Simple:** Given the scope of your project and the undergraduate level, focus on implementing a basic ITS prototype with core functionalities.
*   **Prioritize Key Objectives:**  Concentrate on the most important objectives, such as knowledge tracing and personalized feedback.
*   **Iterative Development:** Develop your project in an iterative manner, starting with a simple version and gradually adding more features.
*   **Ethical Considerations:**  Address ethical considerations related to student data privacy and bias in AI recommendations from the beginning of your project.
*   **Supervisor Guidance:**  Work closely with your supervisor to get guidance and feedback throughout the project.

Good luck with your FYP!


## Timeline
Okay, here's a detailed project timeline for the "Personalizing Learning Pathways in STEM Education" FYP, based on the provided information.  This timeline is designed for a 50-week duration, assuming a start date shortly after project approval. I've broken it down into bi-weekly phases (approximately), focusing on key activities to ensure progress towards the project objectives.

**Project Timeline: Personalizing Learning Pathways in STEM Education**

**Project Start Date (Assumed):** 2025-06-02
**Project End Date:** 2026-05-12

**Phase 1: Project Setup and Literature Review (Weeks 1-4)**

*   **Week 1:**
    *   **Activities:** Initial meeting with supervisor, project scope refinement, setup development environment (Python, relevant libraries).
    *   **Time Allocation:** 10 hours
*   **Week 2:**
    *   **Activities:** Literature review on Intelligent Tutoring Systems (ITS), personalized learning, and relevant AI/ML techniques (Deep Learning, Bayesian/Deep Knowledge Tracing).
    *   **Time Allocation:** 15 hours
*   **Week 3:**
    *   **Activities:** Literature review on NLP tools (GPT models, spaCy, BERT) and educational data mining techniques. Start exploring potential STEM domain for tutor focus (e.g., introductory calculus, programming).
    *   **Time Allocation:** 15 hours
*   **Week 4:**
    *   **Activities:** Finalize STEM domain choice. Write initial literature review draft. Discuss domain choice and review findings with supervisor.
    *   **Time Allocation:** 10 hours

**Phase 2: System Design and Prototype Development (Weeks 5-14)**

*   **Week 5-6:**
    *   **Activities:** Design the overall architecture of the AI tutor. Define key components (knowledge representation, student model, pedagogical model, interface). Design the student model (Bayesian Knowledge Tracing or Deep Knowledge Tracing).
    *   **Time Allocation:** 20 hours
*   **Week 7-8:**
    *   **Activities:** Develop a basic prototype of the tutor's interface (e.g., using React, HTML/CSS). Implement basic question presentation and answer submission functionality.
    *   **Time Allocation:** 20 hours
*   **Week 9-10:**
    *   **Activities:** Implement the student model (Bayesian or Deep Knowledge Tracing). Integrate the student model with the prototype interface.
    *   **Time Allocation:** 20 hours
*   **Week 11-12:**
    *   **Activities:** Implement initial feedback and hint generation mechanisms. Explore using GPT models for hint generation.
    *   **Time Allocation:** 20 hours
*   **Week 13-14:**
    *   **Activities:** Implement basic curriculum sequencing logic. Allow the tutor to adjust lesson difficulty based on student performance.
    *   **Time Allocation:** 20 hours

**Phase 3: AI/ML Model Training and Refinement (Weeks 15-24)**

*   **Week 15-16:**
    *   **Activities:** Gather or generate a dataset of learning interactions (questions, answers, hints, etc.) for the chosen STEM domain.
    *   **Time Allocation:** 15 hours
*   **Week 17-18:**
    *   **Activities:** Train the student model (Bayesian or Deep Knowledge Tracing) using the collected dataset. Evaluate model performance.
    *   **Time Allocation:** 20 hours
*   **Week 19-20:**
    *   **Activities:** Fine-tune the feedback and hint generation mechanisms. Experiment with different feedback styles (hint-based, Socratic, direct).
    *   **Time Allocation:** 20 hours
*   **Week 21-22:**
    *   **Activities:** Implement reinforcement learning for curriculum adaptation (optional, depending on complexity and resources).
    *   **Time Allocation:** 20 hours
*   **Week 23-24:**
    *   **Activities:** Refine the overall AI tutor system based on model performance and initial testing.
    *   **Time Allocation:** 15 hours

**Phase 4: Evaluation and Comparison (Weeks 25-34)**

*   **Week 25-26:**
    *   **Activities:** Design a user study to evaluate the AI tutor. Define metrics for assessing learning outcomes, motivation, and engagement.
    *   **Time Allocation:** 15 hours
*   **Week 27-28:**
    *   **Activities:** Conduct user testing with a small group of participants. Collect data on student performance, feedback, and engagement.
    *   **Time Allocation:** 20 hours
*   **Week 29-30:**
    *   **Activities:** Analyze the data collected from the user study. Compare the performance of the AI tutor with traditional learning approaches (if possible).
    *   **Time Allocation:** 20 hours
*   **Week 31-32:**
    *   **Activities:** Implement improvements to the AI tutor based on the user study findings. Address any usability issues or bugs.
    *   **Time Allocation:** 20 hours
*   **Week 33-34:**
    *   **Activities:** Conduct a second round of user testing with a larger group of participants.
    *   **Time Allocation:** 20 hours

**Phase 5: Inclusivity, Accessibility, and Ethical Considerations (Weeks 35-38)**

*   **Week 35-36:**
    *   **Activities:** Identify potential biases in AI recommendations or assessments. Implement strategies to mitigate these biases.
    *   **Time Allocation:** 15 hours
*   **Week 37-38:**
    *   **Activities:** Implement accessibility features for diverse learning needs (e.g., neurodiverse students). Review and address ethical considerations related to student data privacy and compliance (GDPR/FERPA).
    *   **Time Allocation:** 15 hours

**Phase 6: Final Refinement and Report Writing (Weeks 39-50)**

*   **Week 39-40:**
    *   **Activities:** Final system testing and debugging.  Ensure all components are working correctly.
    *   **Time Allocation:** 15 hours
*   **Week 41-46:**
    *   **Activities:** Write the final FYP report.  Include a detailed description of the project, methodology, results, and conclusions.
    *   **Time Allocation:** 40 hours
*   **Week 47-48:**
    *   **Activities:** Prepare a presentation of the FYP project.
    *   **Time Allocation:** 15 hours
*   **Week 49-50:**
    *   **Activities:** Final report revisions based on supervisor feedback.  Practice the presentation. Submit the final report and presentation materials.
    *   **Time Allocation:** 15 hours

**Important Considerations:**

*   **Supervisor Meetings:** Schedule regular meetings with your supervisor throughout the project to discuss progress, challenges, and future directions.  Aim for at least bi-weekly meetings.
*   **Flexibility:** This timeline is a guideline. Be prepared to adjust it as needed based on the project's progress and any unforeseen challenges.
*   **Documentation:** Maintain thorough documentation of your code, experiments, and results.
*   **Ethical Approval:** If your project involves human subjects (user testing), ensure you obtain the necessary ethical approval from your university's ethics committee.
*   **Contingency:** Build in some buffer time for unexpected delays or challenges.

This timeline provides a structured framework for completing your FYP. Good luck!


## Milestones
Okay, here's a proposed milestone breakdown for your FYP, "Personalizing Learning Pathways in STEM Education" with the goal of creating a Cognitive AI Tutor. This is designed to be achievable within a 50-week timeframe, keeping in mind the resources and expertise available to an undergraduate student.

**FYP Milestones: Personalizing Learning Pathways in STEM Education**

1.  **Project Proposal & Literature Review (Deadline: 2024-07-15, Duration: 6 weeks)**

    *   **Description:**  Detailed project proposal outlining the scope, objectives, methodology, and expected outcomes. Comprehensive literature review covering existing Intelligent Tutoring Systems (ITS), personalized learning techniques, relevant AI/ML methods (Deep Learning, NLP), and educational data mining.  Identification of a specific STEM domain (e.g., introductory calculus, Python programming) for tutor development. Supervisor meeting.
    *   **Deliverables:** Project Proposal document (including problem statement, goals, methodology, timeline, and preliminary literature review). Annotated bibliography of key research papers. Domain choice confirmation.
    *   **Dependencies:**  Requires initial meetings with supervisor to refine project scope and direction.

2.  **System Design & Architecture (Deadline: 2024-08-26, Duration: 6 weeks)**

    *   **Description:**  Define the overall architecture of the AI tutor. Specify the modules (e.g., knowledge representation, student modeling, pedagogical engine, user interface).  Choose specific AI/ML techniques for student knowledge estimation (e.g., Bayesian Knowledge Tracing, Deep Knowledge Tracing), feedback generation (GPT-based models), and curriculum adaptation (Reinforcement Learning or rule-based). Design the database schema for storing student data, learning content, and interaction history. Plan the user interface (UI) and user experience (UX) for the tutoring platform.
    *   **Deliverables:** System architecture diagram. Module specifications. Database schema. UI/UX design mockups. Technology stack selection (React + Flask/Django).
    *   **Dependencies:** Requires completion of the project proposal and a solid understanding of the chosen STEM domain.

3.  **Prototype Development - Core Functionality (Deadline: 2024-10-14, Duration: 7 weeks)**

    *   **Description:** Implement the core components of the AI tutor. This includes building the student model, integrating the chosen AI/ML algorithms for knowledge tracing and personalized feedback, and developing the basic UI for student interaction.  Focus on a limited set of learning content within the chosen STEM domain. Implement basic question answering and hint generation functionality.
    *   **Deliverables:** Working prototype of the AI tutor with core functionality (student modeling, basic feedback, limited content). Code repository with well-documented code.
    *   **Dependencies:** Requires completion of the system design and architecture.

4.  **AI Model Training & Refinement (Deadline: 2024-12-02, Duration: 7 weeks)**

    *   **Description:** Train the AI/ML models used for student knowledge estimation, feedback generation, and curriculum adaptation. This may involve collecting or generating synthetic data for training purposes. Evaluate the performance of the AI models using appropriate metrics. Refine the models based on the evaluation results. Integrate NLP tools (spaCy, BERT) for improved question understanding and response generation.
    *   **Deliverables:** Trained AI/ML models. Evaluation reports. Refined model parameters. Integrated NLP components.
    *   **Dependencies:** Requires a working prototype and a dataset for training the AI models.

5.  **Content Integration & Feature Expansion (Deadline: 2025-01-20, Duration: 7 weeks)**

    *   **Description:** Expand the learning content within the chosen STEM domain. Implement additional features to enhance the tutoring experience, such as adaptive difficulty levels, personalized learning paths, and progress tracking. Integrate user feedback mechanisms (e.g., A/B testing interfaces). Address accessibility considerations.
    *   **Deliverables:** Expanded learning content. New features in the AI tutor. User feedback integration. Accessibility features.
    *   **Dependencies:** Requires trained AI models and a working prototype.

6.  **Usability Testing & Evaluation (Deadline: 2025-03-10, Duration: 7 weeks)**

    *   **Description:** Conduct usability testing with target users (students). Collect feedback on the user interface, learning content, and overall tutoring experience. Evaluate the effectiveness of the AI tutor in improving student learning outcomes. Compare the AI tutor with traditional learning approaches (if possible, given time constraints). Analyze student interaction data to identify areas for improvement.
    *   **Deliverables:** Usability testing reports. Evaluation reports. Analysis of student interaction data.
    *   **Dependencies:** Requires a functional AI tutor with sufficient content and features. Ethical approval if needed.

7.  **Final Report & Presentation (Deadline: 2025-04-28, Duration: 7 weeks)**

    *   **Description:** Write the final FYP report, documenting the project goals, methodology, implementation, results, and conclusions. Prepare a presentation summarizing the project. Address ethical considerations related to student data privacy and bias in AI recommendations.
    *   **Deliverables:** Final FYP report. Project presentation. Code repository.
    *   **Dependencies:** Requires completion of all previous milestones.

8.  **Final Submission (Deadline: 2026-05-12, Duration: 3 weeks)**
     *   **Description:** Making final changes and submitting.
         *   **Deliverables:** Final FYP report. Project presentation. Code repository.
    *   **Dependencies:** Requires completion of all previous milestones.

**Important Considerations:**

*   **Supervisor Meetings:** Schedule regular meetings with your supervisor to discuss progress, address challenges, and get feedback.
*   **Contingency Planning:** Build in buffer time for unexpected delays or challenges. Some AI/ML tasks can take longer than anticipated.
*   **Scope Management:** Be realistic about what you can achieve in 50 weeks. It's better to have a well-implemented, focused project than an overly ambitious one that falls short.
*   **Ethical Considerations:** Prioritize student data privacy and address potential biases in AI recommendations throughout the project.

This breakdown provides a solid framework for your FYP. Remember to stay organized, track your progress, and communicate effectively with your supervisor. Good luck!


## Tasks
Okay, I will break down the FYP "Personalizing Learning Pathways in STEM Education" into manageable tasks, considering the deadline, scope, approach, objectives, and supervisor requirements. I will provide task descriptions, assigned resources/tools, estimated duration, and priority.

Here's the task breakdown:

| Task # | Task Description | Deliverables | Assigned Resources/Tools | Estimated Duration | Priority | Notes |
|---|---|---|---|---|---|---|
| **Phase 1: Project Planning and Literature Review (Weeks 1-8)** |  |  |  |  |  |  |
| 1.1 | Define Project Scope & Objectives | Clearly defined and refined project scope, objectives, and research questions. | Project proposal template, supervisor meetings, relevant literature on cognitive AI tutors. | 1 week | High | Refine the initial project description based on initial research and supervisor feedback. |
| 1.2 | Literature Review: Intelligent Tutoring Systems (ITS) | Comprehensive literature review on existing ITS, focusing on personalization techniques. | Google Scholar, IEEE Xplore, ACM Digital Library, relevant journals, existing ITS research papers. | 2 weeks | High | Focus on identifying gaps and opportunities for innovation. |
| 1.3 | Literature Review: AI/ML in Education | Review of AI/ML techniques used in education, including deep learning, reinforcement learning, and recommendation systems. | Online courses (Coursera, edX), AI/ML research papers, tutorials, libraries (TensorFlow, PyTorch). | 2 weeks | High | Pay attention to applications in STEM education and adaptive learning. |
| 1.4 | Literature Review: Cognitive Science & Learning Theories |  Explore learning theories (e.g., constructivism, cognitivism) and cognitive principles relevant to personalized learning. | Educational psychology textbooks, cognitive science journals, research on cognitive load and motivation. | 2 weeks | High | Understand how to apply learning theories to the design of the AI tutor. |
| 1.5 | Initial System Design & Architecture | Develop a high-level system architecture for the AI tutor, outlining key components and their interactions. | UML diagrams, system design tools (Lucidchart, draw.io), software architecture patterns. | 1 week | High |  Consider modularity, scalability, and maintainability.  |
| **Phase 2: Prototype Development (Weeks 9-30)** |  |  |  |  |  |  |
| 2.1 | Choose STEM Domain & Curriculum | Select a specific STEM domain (e.g., introductory calculus, programming) and define the initial curriculum. | Textbooks, online course materials, educational resources, supervisor consultation. | 1 week | High | Choose a domain you are familiar with and has readily available learning resources. |
| 2.2 | Data Collection & Preprocessing | Gather or create datasets for training the AI models, including student interaction data and curriculum content. | Publicly available datasets (if applicable), data scraping tools, data cleaning and preprocessing libraries (Pandas, NumPy). | 3 weeks | Medium |  Ensure data quality and address potential biases. |
| 2.3 | Implement Knowledge Tracing Model | Develop an ML model (e.g., Bayesian Knowledge Tracing, Deep Knowledge Tracing) to estimate student knowledge levels. | Python, TensorFlow/PyTorch, relevant ML libraries, knowledge tracing research papers. | 4 weeks | High | Experiment with different models and evaluation metrics. |
| 2.4 | Develop Feedback & Hint Generation Module | Implement an NLP-based module for generating personalized feedback and hints. | GPT-based models, sentence similarity algorithms, NLP libraries (spaCy, NLTK), training data for question answering. | 5 weeks | High | Focus on generating helpful, relevant, and diverse feedback. |
| 2.5 | Design Learning Path Adaptation Algorithm | Implement an algorithm to dynamically adjust lesson difficulty and sequence based on student performance. | Reinforcement learning libraries, recommendation system algorithms, curriculum design principles. | 4 weeks | High | Consider exploration-exploitation trade-offs in curriculum adaptation. |
| 2.6 | Develop User Interface (UI) | Design and implement a user-friendly interface for the AI tutor. | React, HTML, CSS, UI/UX design principles, prototyping tools (Figma, Adobe XD). | 4 weeks | High |  Focus on usability, accessibility, and engagement. |
| **Phase 3: Evaluation & Refinement (Weeks 31-45)** |  |  |  |  |  |  |
| 3.1 | Pilot Testing & Data Collection | Conduct pilot testing with a small group of students to collect interaction data and feedback. | Recruitment materials, consent forms, data collection tools, pilot testing protocol. | 3 weeks | High | Ensure ethical considerations and data privacy compliance. |
| 3.2 | Evaluate Cognitive & Engagement Impacts | Analyze the collected data to assess the impact of the AI tutor on student learning outcomes, motivation, and engagement. | Statistical analysis tools (SPSS, R), data visualization libraries (Matplotlib, Seaborn), educational data mining techniques. | 4 weeks | High |  Use appropriate statistical tests and visualizations to draw meaningful conclusions. |
| 3.3 | Identify & Address Biases | Analyze the AI tutor's recommendations and assessments for potential biases and implement mitigation strategies. | Fairness evaluation metrics, bias detection tools, ethical guidelines for AI in education. | 3 weeks | Medium | Pay attention to biases related to gender, race, and learning style. |
| 3.4 | Refine AI Tutor Based on Feedback | Iterate on the AI tutor's design and functionality based on pilot testing results and feedback. | Version control system (Git), bug tracking system, development environment. | 3 weeks | High | Prioritize addressing critical issues and incorporating valuable suggestions. |
| 3.5 | Compare with Traditional Learning Approaches | Conduct a controlled experiment or survey comparing the AI tutor with human instruction or static e-learning. | Experimental design principles, survey design tools, statistical analysis tools. | 2 weeks | Medium | Ensure a fair comparison and control for confounding variables. |
| **Phase 4: Documentation & Presentation (Weeks 46-50)** |  |  |  |  |  |  |
| 4.1 | Write Final Report | Prepare a comprehensive final report documenting the project's objectives, methods, results, and conclusions. | Report template, writing tools, citation management software. | 3 weeks | High | Follow the university's guidelines for report writing and formatting. |
| 4.2 | Prepare Presentation | Create a presentation summarizing the project's key findings and demonstrating the AI tutor. | Presentation software (PowerPoint, Google Slides), demonstration materials, presentation skills. | 1 week | High |  Practice the presentation and prepare for questions. |
| 4.3 | Final Submission & Review | Submit the final report and presentation materials. | Submission guidelines, supervisor feedback. | 1 week | High | Ensure all requirements are met and address any remaining issues. |

**Explanation of Columns:**

*   **Task Description:** A clear and concise description of the task.
*   **Deliverables:** Tangible outputs of the task (e.g., document, code, data).
*   **Assigned Resources/Tools:** Software, libraries, datasets, or other resources needed to complete the task.
*   **Estimated Duration:** Approximate time (in weeks) required to complete the task.
*   **Priority:**  High, Medium, or Low, indicating the importance of the task for project success.
*   **Notes:** Additional context, considerations, or dependencies.

**Important Considerations:**

*   **Supervisor Meetings:** Schedule regular meetings with your supervisor to discuss progress, challenges, and next steps. This is crucial for staying on track and receiving guidance.
*   **Flexibility:** This is a plan, and plans often need to be adjusted. Be prepared to adapt the timeline and tasks as needed based on your progress and any unforeseen challenges.
*   **Dependencies:** Some tasks depend on others. Pay attention to these dependencies to avoid delays.
*   **Ethical Considerations:** Always keep ethical considerations in mind, especially regarding student data privacy and bias.
*   **Level of Detail:**  This breakdown provides a good level of detail. As you progress, you may need to further break down some of these tasks into even smaller sub-tasks.
*   **Coding:**  The code part is the main component of this project. So, allocate enough time and be flexible to make some change according to the outcome.
*   **Regular Check-ins:** Set up weekly or bi-weekly check-ins to review progress against the plan and make adjustments as needed.

This detailed task breakdown should provide a solid foundation for your FYP. Good luck!


## Supervisor Plan
## Supervisor Interaction Plan: FYP on Personalizing Learning Pathways in STEM Education

**Project Title:** Personalizing Learning Pathways in STEM Education
**Topic:** Cognitive AI Tutors
**Student Level:** Undergraduate
**Deadline:** 2026-05-12
**Duration:** 50 weeks
**Scope:** Software Development
**Approach:** Technical
**Supervisor Expertise Required:** AI/ML, Cognitive Science/Educational Psychology, EdTech, NLP, HCI

**Overall Goal:** To facilitate a productive and supportive supervisory relationship that guides the student to successfully complete their FYP.

**I. Meeting Schedule:**

*   **Frequency:** Bi-weekly (every two weeks)
*   **Timing:** [To be determined in consultation with the supervisor and student, but suggested times are either Monday or Friday afternoons.]
*   **Duration:** 1 hour per meeting (flexible depending on the agenda)
*   **Platform:** [To be determined in consultation with supervisor and student. Options include: In-person, Zoom, Google Meet, etc.]

**II. Deliverables and Meeting Agenda:**

**Phase 1: Project Definition and Literature Review (Weeks 1-8)**

*   **Meeting 1 (Week 1): Project Kick-off**
    *   **Deliverables:**
        *   Student: Initial project proposal (1-2 pages) outlining the problem, proposed solution, objectives, scope, and timeline.
        *   Student: List of potential research papers and resources.
    *   **Agenda:**
        *   Introduce project goals and objectives.
        *   Discuss the student's initial ideas and research interests.
        *   Review the proposed timeline and adjust as needed.
        *   Discuss supervisor expectations and communication guidelines.
        *   Confirm meeting schedule.
*   **Meeting 2 (Week 3): Literature Review Progress**
    *   **Deliverables:**
        *   Student: Annotated bibliography of key research papers (at least 5).
        *   Student: Refined project proposal based on initial literature review.
    *   **Agenda:**
        *   Review and discuss the annotated bibliography.
        *   Provide feedback on the refined project proposal.
        *   Discuss potential research gaps and opportunities.
        *   Address any challenges encountered during the literature review.
*   **Meeting 3 (Week 5): Problem Statement and Research Questions**
    *   **Deliverables:**
        *   Student: Draft problem statement and research questions.
        *   Student: Outline of literature review report.
    *   **Agenda:**
        *   Critically evaluate the problem statement and research questions.
        *   Provide guidance on refining the focus and scope of the research.
        *   Discuss the structure and content of the literature review report.
*   **Meeting 4 (Week 7): Literature Review Draft**
    *   **Deliverables:**
        *   Student: Draft literature review report (5-7 pages).
    *   **Agenda:**
        *   Provide detailed feedback on the draft literature review report (structure, content, clarity, and citations).
        *   Discuss potential areas for improvement and further research.
        *   Start brainstorming potential system architecture.

**Phase 2: Design and Implementation (Weeks 9-30)**

*   **Meeting 5 (Week 9): System Design Proposal**
    *   **Deliverables:**
        *   Student: Finalized literature review report.
        *   Student: System design proposal including architecture diagram, component descriptions, and technology stack.
    *   **Agenda:**
        *   Approve the finalized literature review.
        *   Critically evaluate the system design proposal (feasibility, scalability, and alignment with project objectives).
        *   Discuss potential challenges and alternative design options.
*   **Meeting 6 (Week 11): Prototype Development Plan**
    *   **Deliverables:**
        *   Student: Detailed plan for prototype development, including milestones, tasks, and resource allocation.
    *   **Agenda:**
        *   Review and refine the prototype development plan.
        *   Provide guidance on selecting appropriate AI/ML algorithms and NLP tools.
        *   Discuss potential ethical considerations related to data privacy and bias.
*   **Meetings 7-12 (Weeks 13-23): Progress Updates and Code Reviews**
    *   **Deliverables (for each meeting):**
        *   Student: Updated code repository (link to GitHub/GitLab).
        *   Student: Short progress report (1 page) outlining completed tasks, challenges encountered, and planned next steps.
    *   **Agenda (for each meeting):**
        *   Review the progress report and code repository.
        *   Provide feedback on code quality, functionality, and adherence to design specifications.
        *   Discuss any challenges encountered and brainstorm solutions.
        *   Ensure the student is on track to meet the project milestones.
*   **Meeting 13 (Week 25): Mid-Project Review**
    *   **Deliverables:**
        *   Student: Working prototype of the AI tutor.
        *   Student: Mid-project report summarizing progress, challenges, and future plans.
    *   **Agenda:**
        *   Evaluate the functionality and performance of the AI tutor prototype.
        *   Provide feedback on the mid-project report.
        *   Discuss any necessary adjustments to the project scope or timeline.

**Phase 3: Evaluation and Refinement (Weeks 31-42)**

*   **Meeting 14 (Week 31): Evaluation Plan**
    *   **Deliverables:**
        *   Student: Detailed plan for evaluating the AI tutor, including metrics, methodology (user studies, A/B testing), and data analysis techniques.
    *   **Agenda:**
        *   Review and refine the evaluation plan.
        *   Provide guidance on selecting appropriate evaluation metrics and statistical tests.
        *   Discuss ethical considerations related to user data collection and privacy.
*   **Meetings 15-17 (Weeks 33-37): Evaluation Data and Analysis**
    *   **Deliverables (for each meeting):**
        *   Student: Collected evaluation data (anonymized).
        *   Student: Preliminary analysis of the evaluation data.
    *   **Agenda (for each meeting):**
        *   Review the collected evaluation data.
        *   Provide guidance on data analysis techniques.
        *   Discuss the implications of the findings and identify areas for improvement.
*   **Meeting 18 (Week 39): System Refinement Plan**
    *   **Deliverables:**
        *   Student: Revised AI tutor prototype based on evaluation findings.
        *   Student: Plan for further system refinement and improvements.
    *   **Agenda:**
        *   Evaluate the improvements made to the AI tutor.
        *   Discuss the system refinement plan and prioritize future tasks.

**Phase 4: Report Writing and Finalization (Weeks 43-50)**

*   **Meeting 19 (Week 43): Report Outline**
    *   **Deliverables:**
        *   Student: Detailed outline of the final FYP report.
    *   **Agenda:**
        *   Review and refine the report outline.
        *   Provide guidance on structuring the report and presenting the findings.
*   **Meeting 20 (Week 45): Draft Chapters**
    *   **Deliverables:**
        *   Student: Draft chapters of the FYP report (introduction, methodology, results).
    *   **Agenda:**
        *   Provide detailed feedback on the draft chapters (structure, content, clarity, and writing style).
*   **Meeting 21 (Week 47): Complete Draft**
    *   **Deliverables:**
        *   Student: Complete draft of the FYP report.
    *   **Agenda:**
        *   Provide comprehensive feedback on the complete draft.
        *   Focus on overall coherence, argumentation, and presentation.
*   **Meeting 22 (Week 49): Final Review**
    *   **Deliverables:**
        *   Student: Final version of the FYP report.
    *   **Agenda:**
        *   Review the final version of the report.
        *   Address any remaining issues and provide final feedback.
        *   Discuss presentation preparation and potential future work.

**III. Communication Guidelines:**

*   **Preferred Communication Method:** [To be determined in consultation with supervisor and student. Options include: Email, Slack, Microsoft Teams, etc.]
*   **Response Time Expectation:** [Define reasonable response times for emails and other communication methods (e.g., within 24-48 hours during weekdays).]
*   **Meeting Preparation:** Students are expected to come prepared for each meeting with the required deliverables and a clear agenda of topics to discuss.
*   **Seeking Help:** Students should proactively seek help from the supervisor when facing challenges or uncertainties.
*   **Respectful Communication:** Maintain a professional and respectful tone in all communications.

**IV. Important Considerations:**

*   **Flexibility:** This plan is a guideline and should be adapted as needed based on the student's progress and the specific requirements of the project.
*   **Supervisor Availability:** Confirm the supervisor's availability and any potential conflicts well in advance.
*   **Student Initiative:** The student is expected to take ownership of the project and proactively manage their time and tasks.
*   **Documentation:** Encourage the student to maintain thorough documentation of their work, including code, data, and experimental results.

This plan provides a structured framework for supervisor interactions. By adhering to this plan and maintaining open communication, the student and supervisor can work together to achieve a successful and rewarding FYP experience.

