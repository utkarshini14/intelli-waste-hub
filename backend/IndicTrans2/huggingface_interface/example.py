import torch
from IndicTransToolkit.processor import IndicProcessor
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

# Initialize IndicProcessor
ip = IndicProcessor(inference=True)

# Load tokenizer and model
model_name = "ai4bharat/indictrans2-en-indic-dist-200M"
tokenizer = AutoTokenizer.from_pretrained(model_name, trust_remote_code=True)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name, trust_remote_code=True)

# Sample sentences
sentences = [
    "This is a test sentence.",
]

# Preprocess sentences
preprocessed_sentences = ip.preprocess_batch(sentences, src_lang="eng_Latn", tgt_lang="hin_Deva")

# Tokenize input
batch = tokenizer(
    preprocessed_sentences, 
    padding=True, 
    truncation=True, 
    max_length=256, 
    return_tensors="pt"
)

# Ensure model inputs are on the correct device
device = "cuda" if torch.cuda.is_available() else "cpu"
model.to(device)
batch = {k: v.to(device) for k, v in batch.items()}  # Move batch to the same device

# Generate translations
with torch.no_grad():
    outputs = model.generate(
        input_ids=batch["input_ids"],
        attention_mask=batch["attention_mask"],
        num_beams=5,
        num_return_sequences=1,
        max_length=256
    )

# Decode outputs
decoded_outputs = tokenizer.batch_decode(outputs, skip_special_tokens=True)

# Postprocess outputs
final_outputs = ip.postprocess_batch(decoded_outputs, lang="hin_Deva")

# Print translations
print(final_outputs)
