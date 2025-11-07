##### Hierarchical Spherical Hashing

- **Description**: A hierarchical approach learning hyper spherical hashing functions by partitioning vectors and optimizing in subspaces, from a 2015 IEEE paper ([Hierarchical Spherical Hashing for Compressing High Dimensional Vectors | IEEE Conference Publication](https://ieeexplore.ieee.org/document/7045934/)). It offers high compression ratios (e.g., 512:1) and is experimental for intent vectors.
- **Latest Research**: While from 2015, its principles align with recent hashing trends. No specific 2024-2025 updates found, but its performance on large datasets (e.g., ILSVRC2010) suggests relevance.
- **Speed Results**: Faster than standard hashing due to hierarchical structure, but specific benchmarks are outdated. Likely faster than neural hashing for inference due to simpler computations.
- **Scalability**: Suitable for large-scale datasets, as shown in 128,000D tests, but codebook maintenance may scale poorly with diverse user behaviors.
- **Information Preservation**: Outperforms state-of-the-art at high compression ratios, but may lose nuance compared to neural methods.
- **LLM Compatibility**: Similar to neural hashing, binary codes may need decoding for LLM use, limiting direct integration.