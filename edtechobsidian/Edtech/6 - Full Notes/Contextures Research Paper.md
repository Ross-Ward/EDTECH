## Abstract

> This dissertation establishes the contexture theory to mathematically characterize the mechanism of representation learning, also known as pretraining. Despite the remarkable empirical success of foundation models, it is not very clear what representations they learn, and why these representations are useful for various disparate downstream tasks. A scientific understanding of representation learning is critical, especially at this point when scaling up the model size is producing diminishing returns, and designing new pretraining methods is imperative for further progress. Prior work treated different representation learning methods quite differently, whereas the contexture theory provides a unified framework for delineating the representations these methods learn. The central argument is that a representation is learned from the association between the input \( X \) and a context variable \( A \). We prove that if an encoder captures the maximum information of this association, in which case we say that the encoder learns the contexture, then it will be optimal on the class of tasks that are compatible with the context. We also show that a context is the most useful when the association between \( X \) and \( A \) is neither too strong nor too weak. The important implication of the contexture theory is that increasing the model size alone will achieve diminishing returns, and further advancements require better contexts. We demonstrate that lots of existing pretraining objectives can learn the contexture, including supervised learning, self-supervised learning, generative models, etc. Based on that, we introduce two general objectives—SVME and KISE, for learning the contexture. We also show how to mix multiple contexts together, which is an effortless way to create better contexts from existing ones. Then, we prove statistical learning bounds for representation learning, and extend the framework to spectrally transformed kernel regression for semi-supervised learning. Finally, we discuss the effect of the data distribution shift from pretraining to the downstream task [Document, Page 2].

**Keywords**: machine learning, representation learning, learning theory, foundation models, artificial intelligence

## 1. Introduction

Since approximately 2018, machine learning (ML) has transitioned from end-to-end deep learning to a paradigm dominated by foundation models—large-scale models pretrained on vast datasets and fine-tuned for downstream tasks [Document, Page 5]. These models have achieved unprecedented success in domains such as computer vision (CV) [23], natural language processing (NLP) [34], and tabular data [66]. However, as noted in the document, a fundamental question remains unresolved:

> What representations do foundation models learn, and why are these representations useful for a variety of downstream tasks? [Document, Page 5]

In classical statistical learning, the goal is to learn a mapping from input \( X \) to target \( Y \). In contrast, representation learning lacks a clear target, making it challenging to understand why, for example, masked token prediction in BERT [34] aids tasks like sentiment analysis [Document, Page 5]. This gap in understanding is critical as scaling model size yields diminishing returns, a phenomenon highlighted by Ilya Sutskever’s remark at NeurIPS 2024: “pretraining as we know it will end” [134, Document, Page 6]. Moreover, the lack of a scientific framework for representation learning complicates AI safety discussions, as evidenced by the heated debates at the Paris AI summit on February 12, 2025 [Document, Page 6].

This paper introduces the **contexture theory**, a novel framework that mathematically characterizes representation learning as the process of capturing associations between an input \( X \in \mathcal{X} \) and a context variable \( A \in \mathcal{A} \), termed the **contexture** [Document, Page 7]. By unifying diverse pretraining methods and providing rigorous proofs, the theory addresses mysteries such as neural collapse [112] and representational convergence [73], and offers insights for designing next-generation pretraining methods. Additionally, we explore the theory’s implications for educational technology (EdTech), security, and military applications, where foundation models are increasingly deployed.

## 2. Background and Related Work

Representation learning, or pretraining, aims to train an encoder \( \Phi: \mathcal{X} \rightarrow \mathbb{R}^d \) that simplifies downstream task predictors [9, Document, Page 5]. Foundation models leverage this approach, using techniques like supervised fine-tuning (SFT) or reinforcement learning (RL) for alignment [110]. Prior work has analyzed specific methods—e.g., contrastive learning [23, 57], masked autoencoders [60], and generative models [64]—but lacks a unified theoretical framework [5, 80, 123, Document, Page 2].

Key phenomena in representation learning include:
- **Neural collapse**: Supervised learning representations, such as those from ImageNet-trained networks, collapse to a few clusters yet remain effective [112, Document, Page 6].
- **Representational convergence**: Large neural networks, despite different architectures and objectives, align to a common representation [73, 89, Document, Page 6].
- **Scaling laws**: While scaling improves performance, diminishing returns necessitate new pretraining strategies [84, 154, Document, Page 6].

The contexture theory builds on spectral learning [10, 57] and psychological theories of associative thinking [83], providing a unified perspective that resolves these issues.

## 3. The Contexture Theory

### 3.1 Central Theme: Representations from Association

The contexture theory asserts that representations are learned from the association between an input \( X \in \mathcal{X} \) and a context variable \( A \in \mathcal{A} \), defined by their joint distribution \( P^{+}(x, a) \), referred to as the **contexture** [Document, Page 7]. Mathematically, this association is captured by the **expectation operator** \( T_{P^{+}}: L^2(P_{\mathcal{A}}) \rightarrow L^2(P_{\mathcal{X}}) \), defined as:

\[
(T_{P^{+}} g)(x) = \int g(a) P^{+}(a \mid x) \, da = \mathbb{E}[g(A) \mid x], \quad \text{for all } g \in L^2(P_{\mathcal{A}}) [Document, Page 10].
\]

The adjoint operator \( T_{P^{+}}^*: L^2(P_{\mathcal{X}}) \rightarrow L^2(P_{\mathcal{A}}) \) is given by:

\[
(T_{P^{+}}^* f)(a) = \int f(x) \frac{P^{+}(a \mid x) P_{\mathcal{X}}(x)}{P_{\mathcal{A}}(a)} \, dx = \mathbb{E}[f(X) \mid a] [Document, Page 10].
\]

These operators induce positive-pair kernels \( k_A^{+} \) and \( k_X^{+} \), with integral operators \( T_{k_A^{+}} = T_{P^{+}} T_{P^{+}}^* \) and \( T_{k_X^{+}} = T_{P^{+}}^* T_{P^{+}} \), whose eigenvalues \( \lambda_i \) and eigenfunctions \( \nu_i, \mu_i \) form orthonormal bases for \( L^2(P_{\mathcal{A}}) \) and \( L^2(P_{\mathcal{X}}) \), respectively [Document, Page 11]. The singular value decomposition (SVD) of \( T_{P^{+}} \) connects these eigenfunctions via:

\[
\mu_i = \lambda_i^{-\frac{1}{2}} T_{P^{+}} \nu_i, \quad \nu_i = \lambda_i^{-\frac{1}{2}} T_{P^{+}}^* \mu_i, \quad \text{for } \lambda_i > 0 [Document, Page 11, Lemma 1.4].
\]

An encoder \( \Phi \) learns the contexture by aligning its embeddings with the top singular functions of \( T_{P^{+}} \), ensuring optimality for tasks compatible with the context [Document, Page 8].

### 3.2 Key Implications

The document outlines several implications, supported by rigorous proofs (Appendices A–E, Document, Page 4):
- **Optimality**: If an encoder learns the contexture, it is optimal for tasks where the target is predictable from \( A \), as proven in Theorem 3.2 [Document, Page 4].
- **Context Quality**: A context is most useful when the association between \( X \) and \( A \) is moderate, leading to singular values \( \lambda_i \) that decay neither too fast nor too slow (Chapter 3, Document, Page 8).
- **Scaling Limitations**: Scaling aligns representations with top singular functions, but further scaling yields diminishing returns once alignment is sufficient (Theorem 2.14, Document, Page 4).
- **Context Mixing**: Combining contexts via convolution, convex combination, or concatenation improves context quality (Chapter 4, Document, Page 8).
- **Statistical Guarantees**: Context complexity governs the trade-off between approximation and estimation errors (Theorem 5.22, Document, Page 4).
- **Distribution Shift**: Generalization under distribution shifts is challenging, with reweighting often failing (Theorem 6.10, Document, Page 4).

### 3.3 Examples of Contexts

The document provides a table of context examples (Table 1.1, Document, Page 9), illustrating the framework’s versatility:

| Method | Input \( X \) | Context Variable \( A \) |
|--------|--------------|-------------------------|
| Supervised learning on ImageNet | Image | Label of the object |
| Rotation prediction [46] | Image | Rotated image |
| BERT [34]: masked token prediction | Text | Masked text |
| CLIP [116] | Image | Text caption |
| K-nearest neighbors (KNN) | Sample | Nearest neighbor |
| Diffusion models | Image | Image plus noise |
| GPT [117]: next token prediction | Text | First \( k \) tokens |

## 4. Methods

### 4.1 Variational Objectives: SVME and KISE

Chapter 2 introduces two objectives for learning the contexture:
- **SVME (Singular Value Maximization Encoder)**: Maximizes the singular values of the expectation operator to align embeddings with top singular functions [Document, Page 8].
- **KISE (Kernel-based Information-preserving Spectral Encoder)**: Preserves the spectral properties of the context through kernel-based optimization [Document, Page 8].

These objectives unify methods like supervised learning, contrastive learning [23], VICReg [6], and diffusion models [64]. Theorems 2.2–2.14 prove that optimizing these objectives ensures the encoder learns the contexture [Document, Page 4].

### 4.2 Context Mixing

Chapter 4 proposes three operations for mixing contexts:
- **Convolution**: Convolves context distributions to blend associations.
- **Convex Combination**: Computes a weighted average of context distributions.
- **Concatenation**: Concatenates representations from multiple contexts [Document, Page 8].

These methods are tested on tabular datasets, outperforming XGBoost [22, Document, Page 8].

### 4.3 Statistical Learning Bounds

Chapter 5 defines **context complexity** as a measure of the smoothness of top singular functions, providing bounds on approximation and estimation errors. For an encoder \( \Phi \) with embedding dimension \( d \), the trade-off is governed by:

\[
\text{Error} = \text{Approximation Error} + \text{Estimation Error},
\]

where context complexity influences both terms (Theorem 5.22, Document, Page 4). The framework extends to **spectrally transformed kernel regression (STKR)** for semi-supervised learning [168, Document, Page 8].

### 4.4 Distribution Shifts

Chapter 6 analyzes distribution shifts using the conditional value at risk (CVaR):

\[
\operatorname{CVaR}_\alpha(\theta; P') \geq \frac{1}{3} \mathcal{R}_{\max}(\theta; P), \quad \text{for } \operatorname{TV}(P, P') \leq \frac{\epsilon}{1-\epsilon} [Document, Page 143].
\]

This result highlights the difficulty of robust generalization, with proofs in Theorems 6.4–6.17 [Document, Page 4].

## 5. Results

The document provides empirical and theoretical results:
- **Intrinsic Evaluation**: A metric for evaluating encoders correlates with downstream performance, with Theorem 3.2 proving optimality for compatible tasks [Document, Page 8].
- **Context Mixing**: Mixed contexts outperform XGBoost on tabular datasets, as tested in Chapter 4 [Document, Page 8].
- **Statistical Bounds**: Theorem 5.22 establishes finite-sample guarantees, with context complexity controlling error trade-offs [Document, Page 4].
- **Distribution Shift**: Theorem 6.10 quantifies the impact of outliers, showing that reweighting is often ineffective [Document, Page 4].

These findings validate the contexture theory’s practical and theoretical contributions.

## 6. Implications for EdTech, Security, and Military Applications

The contexture theory has profound implications for domains where foundation models are deployed, including educational technology (EdTech), security, and military applications.

### 6.1 Educational Technology (EdTech)

In EdTech, foundation models power personalized learning systems, intelligent tutoring, and automated assessment [98]. The contexture theory enhances these applications by enabling more effective pretraining strategies. For instance, contexts like student responses (\( X \)) and correct answers (\( A \)) can be used to pretrain models for adaptive learning, aligning with supervised learning contexts in Table 1.1 [Document, Page 9]. The theory’s emphasis on moderate associations suggests that pretraining on diverse educational datasets (e.g., combining text-based questions and visual diagrams) can improve generalization across subjects. Moreover, the SVME and KISE objectives can optimize encoders for tasks like question answering or skill assessment, reducing reliance on large labeled datasets [Document, Page 8]. However, distribution shifts between training (e.g., standardized tests) and real-world classroom data pose challenges, as noted in Chapter 6 [Document, Page 8], necessitating robust pretraining methods.

### 6.2 Security

In security applications, such as cybersecurity and fraud detection, foundation models analyze patterns in network traffic or financial transactions [55]. The contexture theory’s ability to mix contexts (e.g., combining network logs (\( X \)) with known attack signatures (\( A \))) can enhance anomaly detection by creating richer representations [Document, Page 8]. The theory’s statistical guarantees (Chapter 5) ensure reliable performance in data-scarce scenarios, critical for detecting rare threats [Document, Page 4]. However, the sensitivity to distribution shifts (Theorem 6.10) implies that models pretrained on historical data may struggle with evolving threats, requiring continuous context adaptation [Document, Page 4]. Additionally, the theory’s insights into AI safety (Section 1.1, Document, Page 6) are vital for ensuring that security models do not amplify biases or vulnerabilities.

### 6.3 Military Applications

Military applications of foundation models include autonomous systems, intelligence analysis, and battlefield decision-making [82]. The contexture theory’s framework for learning from diverse contexts (e.g., sensor data (\( X \)) and mission objectives (\( A \))) can improve situational awareness by pretraining models to capture relevant associations [Document, Page 9]. The ability to mix contexts (Chapter 4) is particularly valuable for integrating multimodal data (e.g., satellite imagery, radar, and text reports), enhancing robustness in dynamic environments [Document, Page 8]. The theory’s statistical bounds (Theorem 5.22) support reliable performance in mission-critical settings with limited labeled data [Document, Page 4]. However, distribution shifts in combat scenarios (Chapter 6) and the need for interpretable AI (Section 1.1, Document, Page 6) highlight the importance of developing contexture-based models that are both robust and transparent.

## 7. Discussion

The contexture theory unifies representation learning by modeling representations as associations between \( X \) and \( A \), resolving phenomena like neural collapse [112] and representational convergence [73]. Its emphasis on context quality over scaling aligns with the observed diminishing returns in pretraining [134, Document, Page 6]. The theory’s connection to Kahneman’s System 1 thinking [83] suggests that foundation models excel at associative tasks (e.g., image recognition, translation), while System 2 reasoning remains challenging [155, Document, Page 7].

For EdTech, security, and military applications, the theory offers a framework for designing robust, context-aware models. However, challenges like distribution shifts and the need for interpretable reasoning require further research. The theory’s implications for AI safety, highlighted at the 2025 Paris AI summit, underscore its role in informing regulation [Document, Page 6].

### 7.1 Limitations and Future Work

The theory assumes a fixed data distribution until Chapter 6, limiting its applicability in dynamic settings [Document, Page 8]. Future work should explore adaptive context selection and robust generalization strategies. Extending the framework to System 2 reasoning tasks, such as chain-of-thought prompting [155], could enhance its utility in complex domains like military decision-making.

## 8. Conclusion

The contexture theory provides a rigorous, unified framework for representation learning, demonstrating that representations are learned from associations between inputs and contexts. By introducing objectives like SVME and KISE, methods for context mixing, and statistical guarantees, it offers a path for advancing pretraining beyond scaling. Its implications for EdTech, security, and military applications highlight its potential to transform AI-driven systems, while its insights into AI safety inform critical regulatory discussions.

## References

1. Bengio, Y., Courville, A., & Vincent, P. (2013). Representation learning: A review and new perspectives. *IEEE Transactions on Pattern Analysis and Machine Intelligence, 35*(8), 1798–1828 [9, Document, Page 144].
2. Bommasani, R., Hudson, D. A., Adeli, E., et al. (2021). On the opportunities and risks of foundation models. *arXiv preprint arXiv:2108.07258* [15, Document, Page 144].
3. Chen, T., Kornblith, S., Norouzi, M., & Hinton, G. (2020). A simple framework for contrastive learning of visual representations. *International Conference on Machine Learning*, 1597–1607 [23, Document, Page 144].
4. Devlin, J., Chang, M.-W., Lee, K., & Toutanova, K. (2019). BERT: Pre-training of deep bidirectional transformers for language understanding. *Proceedings of the 2019 Conference of the North American Chapter of the Association for Computational Linguistics*, 4171–4186 [34, Document, Page 144].
5. Kahneman, D. (2011). *Thinking, fast and slow*. Macmillan [83, Document, Page 149].
6. Kaplan, J., McCandlish, S., Henighan, T., et al. (2020). Scaling laws for neural language models. *arXiv preprint arXiv:2001.08361* [84, Document, Page 149].
7. Papyan, V., Han, X. Y., & Donoho, D. L. (2020). Prevalence of neural collapse during the terminal phase of deep learning training. *Proceedings of the National Academy of Sciences, 117*(40), 24652–24663 [112, Document, Page 151].
8. Radford, A., Wu, J., Child, R., Luan, D., Amodei, D., & Sutskever, I. (2019). Language models are unsupervised multitask learners. *OpenAI blog* [117, Document, Page 152].
9. Sutskever, I. (2024). Test of time award talk: Sequence to sequence learning with neural networks. *Advances in Neural Information Processing Systems* [134, Document, Page 153].

(Additional references available in the original document’s bibliography, Pages 144–156.)