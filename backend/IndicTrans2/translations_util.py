import torch
from IndicTransToolkit.processor import IndicProcessor
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# Load model and tokenizer once
tokenizer = AutoTokenizer.from_pretrained("ai4bharat/indictrans2-en-indic-dist-200M", trust_remote_code=True)
model = AutoModelForSeq2SeqLM.from_pretrained("ai4bharat/indictrans2-en-indic-dist-200M", trust_remote_code=True)
processor = IndicProcessor(inference=True)

def translate_to_english(text, src_lang):
    batch = processor.preprocess_batch([text], src_lang=src_lang, tgt_lang="eng_Latn", visualize=False)
    batch = tokenizer(batch, padding="longest", truncation=True, max_length=256, return_tensors="pt")
    with torch.inference_mode():
        outputs = model.generate(**batch, num_beams=5, num_return_sequences=1, max_length=256)
    with tokenizer.as_target_tokenizer():
        translated = tokenizer.batch_decode(outputs, skip_special_tokens=True, clean_up_tokenization_spaces=True)
    return processor.postprocess_batch(translated, lang="eng_Latn")[0]

def translate_from_english(text, tgt_lang):
    batch = processor.preprocess_batch([text], src_lang="eng_Latn", tgt_lang=tgt_lang, visualize=False)
    batch = tokenizer(batch, padding="longest", truncation=True, max_length=256, return_tensors="pt")
    with torch.inference_mode():
        outputs = model.generate(**batch, num_beams=5, num_return_sequences=1, max_length=256)
    with tokenizer.as_target_tokenizer():
        translated = tokenizer.batch_decode(outputs, skip_special_tokens=True, clean_up_tokenization_spaces=True)
    return processor.postprocess_batch(translated, lang=tgt_lang)[0]
