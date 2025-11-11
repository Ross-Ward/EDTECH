import numpy as np
import torch
from transformers import BertTokenizer, BertModel, XLMRobertaTokenizer, XLMRobertaModel
from scipy.spatial import distance
from scipy.stats import ttest_ind
from statsmodels.stats.multitest import multipletests
import matplotlib.pyplot as plt

# Load models
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')
model.eval()
ml_tokenizer = XLMRobertaTokenizer.from_pretrained('xlm-roberta-base')
ml_model = XLMRobertaModel.from_pretrained('xlm-roberta-base')
ml_model.eval()

# Multilingual dataset
sentences = [
    "The bank near the river was flooded.",  # English
    "An banc in aice leis an abhainn a bhí faoi uisce.",  # Gaelige
    "El banco cerca del río se inundó.",  # Spanish
    "河边的银行被洪水淹没了。",  # Chinese
    # Additional sentences for "bank", "river", "code"
]
target_tokens = ["bank", "banc", "banco", "银行", ...]
n_tokens = len(target_tokens)

def get_bert_embeddings(sentences, target_tokens, use_multilingual=False):
    embeddings = []
    tokenizer = ml_tokenizer if use_multilingual else tokenizer
    model = ml_model if use_multilingual else model
    for sentence, target in zip(sentences, target_tokens):
        inputs = tokenizer(sentence, return_tensors='pt', padding=True, truncation=True)
        with torch.no_grad():
            outputs = model(**inputs)
        hidden_states = outputs.last_hidden_state[0].numpy()
        tokens = tokenizer.tokenize(sentence)
        target_idx = tokens.index(target)
        embedding = hidden_states[target_idx + 1]
        embeddings.append(embedding)
    return np.array(embeddings)

def compute_distances(embeddings, token_idx):
    x = embeddings[token_idx]
    distances = distance.cdist([x], embeddings, 'euclidean')[0]
    return np.sort(distances)

def compute_nx_r(distances, r_values):
    return np.array([np.sum(distances <= r) for r in r_values])

def estimate_slopes(log_r, log_nx_r):
    slopes = np.zeros(len(log_r))
    for i in range(1, len(log_r) - 1):
        slopes[i] = (log_nx_r[i + 1] - log_nx_r[i - 1]) / (log_r[i + 1] - log_r[i - 1])
    slopes[0] = slopes[1]
    slopes[-1] = slopes[-2]
    return slopes

def detect_slope_changes(slopes, window_size=10, alpha=0.05):
    changes = []
    p_values = []
    for i in range(window_size, len(slopes) - window_size):
        before = slopes[i - window_size:i]
        after = slopes[i:i + window_size]
        t_stat, p_val = ttest_ind(before, after, equal_var=False)
        if p_val < alpha and np.mean(after) > np.mean(before):
            changes.append(i)
            p_values.append(p_val)
    return changes, p_values

def test_fiber_bundle_hypothesis(embeddings, r_min=0.01, r_max=20.0, n_r=200, alpha=0.05, window_size=10):
    r_values = np.linspace(r_min, r_max, n_r)
    log_r = np.log(r_values)
    results = []
    all_p_values = []
    dimensions = []

    for token_idx in range(len(embeddings)):
        distances = compute_distances(embeddings, token_idx)
        nx_r = compute_nx_r(distances, r_values)
        log_nx_r = np.log(nx_r + 1e-10)
        slopes = estimate_slopes(log_r, log_nx_r)
        changes, p_vals = detect_slope_changes(slopes, window_size=window_size, alpha=alpha)
        all_p_values.extend(p_vals)

        if changes:
            results.append((token_idx, "Reject"))
            change_idx = changes[0]
            base_dim = np.mean(slopes[:change_idx]) if change_idx > 0 else 0
            fiber_dim = np.mean(slopes[change_idx:change_idx + window_size])
            dimensions.append((base_dim, fiber_dim))
        else:
            results.append((token_idx, "Fail to Reject"))
            dimensions.append((None, None))

        if token_idx < 3:
            plt.figure(figsize=(12, 5))
            plt.subplot(1, 2, 1)
            plt.plot(log_r, log_nx_r, label="log N_x(r) vs log r")
            plt.xlabel("log r")
            plt.ylabel("log N_x(r)")
            plt.title(f"Log-Log Plot (Token {token_idx})")
            plt.legend()
            plt.subplot(1, 2, 2)
            plt.plot(log_r, slopes, label="Slopes")
            for change in changes:
                plt.axvline(log_r[change], color='r', linestyle='--')
            plt.xlabel("log r")
            plt.ylabel("Slope")
            plt.title(f"Slopes with Changes (Token {token_idx})")
            plt.legend()
            plt.tight_layout()
            plt.savefig(f'token_{token_idx}_plot.png')
            plt.close()

    if all_p_values:
        corrected = multipletests(all_p_values, alpha=alpha, method='holm')[1]
    return results, dimensions

# Run the test
E_vecs = get_bert_embeddings(sentences, target_tokens, use_multilingual=True)
results, dimensions = test_fiber_bundle_hypothesis(E_vecs)