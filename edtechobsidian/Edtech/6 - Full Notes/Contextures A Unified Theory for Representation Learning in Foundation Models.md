# Contextures: A Unified Theory for Representation Learning in Foundation Models

**Author**: Runtian Zhai  
**Affiliation**: Computer Science Department, Carnegie Mellon University, Pittsburgh, PA 15213  
**Date**: April 2025

## Abstract

> This dissertation establishes the contexture theory to mathematically characterize the mechanism of representation learning, also known as pretraining. Despite the remarkable empirical success of foundation models, it is not very clear what representations they learn, and why these representations are useful for various disparate downstream tasks. A scientific understanding of representation learning is critical, especially at this point when scaling up the model size is producing diminishing returns, and designing new pretraining methods is imperative for further progress. Prior work treated different representation learning methods quite differently, whereas the contexture theory provides a unified framework for delineating the representations these methods learn. The central argument is that a representation is learned from the association between the input X X X and a context variable A A A. We prove that if an encoder captures the maximum information of this association, in which case we say that the encoder learns the contexture, then it will be optimal on the class of tasks that are compatible with the context. We also show that a context is the most useful when the association between X X X and A A A is neither too strong nor too weak. The important implication of the contexture theory is that increasing the model size alone will achieve diminishing returns, and further advancements require better contexts. We demonstrate that lots of existing pretraining objectives can learn the contexture, including supervised learning, self-supervised learning, generative models, etc. Based on that, we introduce two general objectives—SVME and KISE, for learning the contexture. We also show how to mix multiple contexts together, which is an effortless way to create better contexts from existing ones. Then, we prove statistical learning bounds for representation learning, and extend the framework to spectrally transformed kernel regression for semi-supervised learning. Finally, we discuss the effect of the data distribution shift from pretraining to the downstream task.

**Keywords**: machine learning, representation learning, learning theory, foundation models, artificial intelligence

## 1. Introduction

The advent of foundation models since around 2018 has shifted the paradigm of machine learning (ML) from end-to-end deep learning to representation learning, or pretraining, followed by fine-tuning for downstream tasks. Foundation models, trained on vast datasets, have achieved remarkable success across domains such as computer vision, natural language processing, and tabular data [15, 23, 34, 66]. However, a critical question remains unanswered:

> What representations do foundation models learn, and why are these representations useful for a variety of downstream tasks?

Classical statistical learning theory assumes a clear mapping from input X X X to target Y Y Y, but in representation learning, the target is ambiguous. For instance, it is unclear why representations learned from masked token prediction in language models are effective for tasks like sentiment analysis. This lack of understanding hinders the design of new pretraining methods, especially as scaling model size yields diminishing returns [134]. Additionally, understanding representation learning is crucial for addressing AI safety concerns, as highlighted at the Paris AI summit in February 2025, where global leaders debated AI regulation amidst differing scientific opinions.

This paper introduces the **contexture theory**, a novel framework that mathematically characterizes representation learning by modeling representations as associations between an input X X X and a context variable A A A. The theory unifies various pretraining methods, resolves mysteries such as neural collapse and representational convergence, and provides actionable insights for improving foundation models beyond scaling.

## 2. Background and Related Work

Representation learning aims to train an encoder that simplifies downstream task predictors [9]. It is central to foundation models, which are pretrained on large datasets and fine-tuned via supervised fine-tuning (SFT) or reinforcement learning (RL) [110]. Despite extensive research, prior work has treated different pretraining methods (e.g., supervised learning, self-supervised learning, generative models) disparately, lacking a unified theoretical framework [5, 80, 123].

Key mysteries in representation learning include:

- **Neural collapse**: Representations from supervised learning, such as ImageNet-trained neural networks, collapse to a few clusters, yet remain effective [112].
- **Representational convergence**: Large neural networks trained with different objectives and architectures converge to similar representations [73, 89].
- **Scaling laws**: While scaling model size improves performance, diminishing returns suggest the need for better pretraining strategies [84, 154].

The contexture theory addresses these issues by providing a unified perspective, drawing on concepts from psychology (e.g., Kahneman’s two systems of thinking [83]) and spectral learning theory [10, 57].

## 3. The Contexture Theory

### 3.1 Central Theme: Representations from Association

The contexture theory posits that representations are learned from the association between an input X∈X X \in \mathcal{X} X∈X and a context variable A∈A A \in \mathcal{A} A∈A, termed the **contexture**, defined by their joint distribution P+(x,a) P^{+}(x, a) P+(x,a).

> The central argument of this theory is that representations are learned from the association between the input X X X and a context variable A A A. We refer to such an association as a contexture.

This association is captured by an encoder Φ:X→Rd \Phi: \mathcal{X} \rightarrow \mathbb{R}^d Φ:X→Rd, which is optimal if it learns the top singular functions of the expectation operator TP+ T_{P^{+}} TP+​, defined as:

(TP+g)(x)=∫g(a)P+(a∣x) da=E[g(A)∣x]for all g∈L2(PA).(T_{P^{+}} g)(x) = \int g(a) P^{+}(a \mid x) \, da = \mathbb{E}[g(A) \mid x] \quad \text{for all } g \in L^2(P_{\mathcal{A}}).(TP+​g)(x)=∫g(a)P+(a∣x)da=E[g(A)∣x]for all g∈L2(PA​).

The adjoint operator TP+∗ T_{P^{+}}^* TP+∗​ and the positive-pair kernel kA+ k_A^{+} kA+​ further characterize this association, with singular value decomposition (SVD) revealing the spectral properties of the context (Section 1.3 of the document).

### 3.2 Key Implications

The theory yields several critical insights:

- **Optimality**: An encoder that learns the contexture is optimal for tasks compatible with the context, as proven in Chapter 3.
- **Context Quality**: A context is most effective when the association between X X X and A A A is moderate, ensuring the singular values of TP+ T_{P^{+}} TP+​ decay neither too fast nor too slowly (Chapter 3).
- **Scaling Limitations**: Increasing model size aligns representations with top singular functions, but beyond a certain point, further scaling yields diminishing returns (Chapter 2).
- **Context Mixing**: Combining multiple contexts (via convolution, convex combination, or concatenation) can create better contexts from suboptimal ones (Chapter 4).
- **Statistical Guarantees**: The theory provides learning bounds, with context complexity controlling the trade-off between approximation and estimation errors (Chapter 5).
- **Distribution Shift**: Generalization under distribution shifts is challenging, and heuristic methods like reweighting often fail (Chapter 6).

### 3.3 Examples of Contexts

Table 1.1 from the document illustrates various contexts used in representation learning:

|Method|Input X X X|Context Variable A A A|
|---|---|---|
|Supervised learning on ImageNet|Image|Label of the object|
|Rotation prediction [46]|Image|Rotated image|
|BERT [34]: masked token prediction|Text|Masked text|
|CLIP [116]|Image|Text caption|
|K-nearest neighbors (KNN)|Sample|Nearest neighbor|
|Diffusion models|Image|Image plus noise|
|GPT [117]: next token prediction|Text|First k k k tokens|

These examples demonstrate the versatility of the contexture framework across supervised, self-supervised, and generative methods.

## 4. Methods

### 4.1 Variational Objectives: SVME and KISE

Chapter 2 introduces two general objectives for learning the contexture:

- **SVME (Singular Value Maximization Encoder)**: Optimizes the encoder to capture the top singular functions of TP+ T_{P^{+}} TP+​.
- **KISE (Kernel-based Information-preserving Spectral Encoder)**: Ensures the encoder preserves the spectral properties of the context.

These objectives unify existing methods, including supervised learning, self-supervised learning (e.g., contrastive learning [23], VICReg [6]), generative models (e.g., diffusion models [64]), and knowledge distillation [63]. The document proves that these objectives are optimized if and only if the encoder learns the contexture (Theorems 2.2–2.14).

### 4.2 Context Mixing

Chapter 4 proposes three operations for mixing contexts to enhance their quality:

- **Convolution**: Combines contexts by convolving their distributions.
- **Convex Combination**: Takes a weighted average of context distributions.
- **Concatenation**: Concatenates representations from multiple contexts.

These operations are tested on tabular datasets, outperforming state-of-the-art methods like XGBoost [22].

### 4.3 Statistical Learning Bounds

Chapter 5 establishes statistical guarantees using **context complexity**, which measures the smoothness of top singular functions. The framework extends to **spectrally transformed kernel regression (STKR)** for semi-supervised learning, providing bounds on approximation and estimation errors (Theorems 5.22–5.28).

### 4.4 Handling Distribution Shifts

Chapter 6 analyzes the impact of data distribution shifts from pretraining to downstream tasks, highlighting challenges such as sensitivity to outliers and the limitations of reweighting methods (Theorems 6.4–6.17).

## 5. Results

The document reports empirical validations of the contexture theory:

- **Intrinsic Evaluation**: Chapter 3 demonstrates that encoders learning the contexture are optimal for compatible tasks, with a proposed metric correlating with downstream performance on real datasets.
- **Context Mixing**: Algorithms for mixing contexts achieve higher performance than XGBoost on tabular datasets (Chapter 4).
- **Theoretical Guarantees**: Statistical bounds in Chapter 5 confirm the trade-off between approximation and estimation errors, influenced by context complexity.
- **Distribution Shift Analysis**: Chapter 6 provides theoretical insights into the challenges of robust generalization, supported by proofs (e.g., Theorem 6.10).

These results underscore the practical utility of the contexture theory in improving pretraining methods and understanding foundation model behavior.

## 6. Discussion

The contexture theory offers a unified framework that resolves longstanding mysteries in representation learning. By modeling representations as associations between X X X and A A A, it explains phenomena like neural collapse and representational convergence. The theory’s emphasis on context quality over model scaling aligns with recent observations of diminishing returns in pretraining [134]. Furthermore, its connection to psychological theories of associative thinking (System 1) suggests that representation learning excels at fast, automatic tasks, while logical reasoning (System 2) remains challenging [83, 155].

The implications for AI safety are significant. A deeper understanding of representation learning can inform AI regulation by clarifying the capabilities and limitations of foundation models, addressing concerns raised at the 2025 Paris AI summit.

### 6.1 Limitations and Future Work

While the contexture theory provides a robust framework, it assumes a fixed data distribution until Chapter 6, which may not fully capture real-world scenarios with significant distribution shifts. Future work could explore adaptive context selection and robust generalization strategies. Additionally, extending the theory to System 2 reasoning tasks, such as those requiring chain-of-thought prompting [155], could broaden its applicability.

## 7. Conclusion

The contexture theory revolutionizes our understanding of representation learning by providing a unified mathematical framework. It demonstrates that representations are learned from associations between inputs and contexts, with optimal performance achieved when these associations are moderately strong. By introducing objectives like SVME and KISE, methods for context mixing, and statistical guarantees, the theory paves the way for designing next-generation pretraining methods. As scaling yields diminishing returns, the contexture theory offers a path forward for sustainable progress in machine learning and informs critical discussions on AI safety and regulation.

## References

The following references are extracted from the document’s bibliography, focusing on key citations relevant to the contexture theory and representation learning:

1. Bengio, Y., Courville, A., & Vincent, P. (2013). Representation learning: A review and new perspectives. _IEEE Transactions on Pattern Analysis and Machine Intelligence, 35_(8), 1798–1828.
2. Bommasani, R., Hudson, D. A., Adeli, E., et al. (2021). On the opportunities and risks of foundation models. _arXiv preprint arXiv:2108.07258_.
3. Chen, T., Kornblith, S., Norouzi, M., & Hinton, G. (2020). A simple framework for contrastive learning of visual representations. _International Conference on Machine Learning_, 1597–1607.
4. Devlin, J., Chang, M.-W., Lee, K., & Toutanova, K. (2019). BERT: Pre-training of deep bidirectional transformers for language understanding. _Proceedings of the 2019 Conference of the North American Chapter of the Association for Computational Linguistics_, 4171–4186.
5. Kahneman, D. (2011). _Thinking, fast and slow_. Macmillan.
6. Kaplan, J., McCandlish, S., Henighan, T., et al. (2020). Scaling laws for neural language models. _arXiv preprint arXiv:2001.08361_.
7. Papyan, V., Han, X. Y., & Donoho, D. L. (2020). Prevalence of neural collapse during the terminal phase of deep learning training. _Proceedings of the National Academy of Sciences, 117_(40), 24652–24663.
8. Radford, A., Wu, J., Child, R., Luan, D., Amodei, D., & Sutskever, I. (2019). Language models are unsupervised multitask learners. _OpenAI blog_.
9. Sutskever, I. (2024). Test of time award talk: Sequence to sequence learning with neural networks. _Advances in Neural Information Processing Systems_.

(Additional references can be included as needed, up to the 152 cited in the original document.)

---

### Notes on Compilation

1. **Content Selection**: The paper extracts the abstract, introduction, key theoretical contributions (contexture theory, objectives, context mixing, statistical bounds), and empirical results from the document. Detailed proofs (e.g., Appendices A–E) are referenced but not included to keep the paper concise.
2. **Summarization**: Sections like the results and discussion summarize findings to fit a research paper format, while direct quotes are used for critical definitions and arguments to preserve the author’s intent.
3. **Structure**: The paper follows a standard research paper structure (Abstract, Introduction, Background, Methods, Results, Discussion, Conclusion, References) to ensure clarity and accessibility.
4. **Future Expansion**: If needed, specific theorems (e.g., Theorem 2.2 for SVME optimality) or empirical results (e.g., tabular dataset performance) can be expanded with more detail from the document.