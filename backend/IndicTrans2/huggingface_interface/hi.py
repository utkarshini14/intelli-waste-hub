from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import os
import json
import torch
from embedchain import App
from IndicTransToolkit.processor import IndicProcessor
from transformers import AutoModelForSeq2SeqLM, AutoTokenizer

# Initialize Flask app
flask_app = Flask(__name__)
flask_app.secret_key = 'secret!'
CORS(flask_app)

# Set Hugging Face token
os.environ["HUGGINGFACE_ACCESS_TOKEN"] = "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"

# Load Embedchain app
app_embedchain = App.from_config("/Users/utkarshininarayan/Desktop/IndicTrans2/huggingface_interface/mistral.yaml")
app_embedchain.add("https://en.wikipedia.org/wiki/Waste_management")

# Load IndicTrans2 model and tokenizer
tokenizer = AutoTokenizer.from_pretrained("ai4bharat/indictrans2-en-indic-dist-200M", trust_remote_code=True)
ip = IndicProcessor(inference=True)
model = AutoModelForSeq2SeqLM.from_pretrained("ai4bharat/indictrans2-en-indic-dist-200M", trust_remote_code=True)

# Define supported languages
languages = {
    "asm_Beng": "Assamese", "kas_Arab": "Kashmiri (Arabic)", "pan_Guru": "Punjabi",
    "ben_Beng": "Bengali", "kas_Deva": "Kashmiri (Devanagari)", "san_Deva": "Sanskrit",
    "brx_Deva": "Bodo", "mai_Deva": "Maithili", "sat_Olck": "Santali",
    "doi_Deva": "Dogri", "mal_Mlym": "Malayalam", "snd_Arab": "Sindhi (Arabic)",
    "eng_Latn": "English", "mar_Deva": "Marathi", "snd_Deva": "Sindhi (Devanagari)",
    "gom_Deva": "Konkani", "mni_Beng": "Manipuri (Bengali)", "tam_Taml": "Tamil",
    "guj_Gujr": "Gujarati", "mni_Mtei": "Manipuri (Meitei)", "tel_Telu": "Telugu",
    "hin_Deva": "Hindi", "npi_Deva": "Nepali", "urd_Arab": "Urdu",
    "kan_Knda": "Kannada", "ory_Orya": "Odia"
}

@flask_app.route('/languages', methods=['GET'])
def get_languages():
    return jsonify(languages)

def translate_text(text, src_lang, tgt_lang):
    """Helper function for translation between languages"""
    batch = ip.preprocess_batch([text], src_lang=src_lang, tgt_lang=tgt_lang, visualize=False)
    batch = tokenizer(batch, padding="longest", truncation=True, max_length=256, return_tensors="pt")
    
    with torch.inference_mode():
        outputs = model.generate(**batch, num_beams=5, num_return_sequences=1, max_length=256)
    
    with tokenizer.as_target_tokenizer():
        translated_text = tokenizer.batch_decode(outputs, skip_special_tokens=True, clean_up_tokenization_spaces=True)
    
    return ip.postprocess_batch(translated_text, lang=tgt_lang)[0]

@flask_app.route('/chatbot', methods=['POST'])
def chatbot():
    try:
        data = request.get_json()
        input_text = data.get('input_text', '')
        lang = data.get('lang', 'eng_Latn')

        if not input_text:
            return Response(
                json.dumps({"error": "Input text is required"}, ensure_ascii=False),
                mimetype='application/json; charset=utf-8',
                status=400
            )

        # Translate to English if needed
        if lang != "eng_Latn":
            input_text = translate_text(input_text, src_lang=lang, tgt_lang="eng_Latn")

        # Query Embedchain chatbot
        mistral_result = app_embedchain.query(input_text)
        answer_index = mistral_result.find("Answer: ")
        generated_response = mistral_result[answer_index + len("Answer: "):] if answer_index != -1 else mistral_result

        # Translate back to target language if needed
        if lang != "eng_Latn":
            generated_response = translate_text(generated_response, src_lang="eng_Latn", tgt_lang=lang)

        return Response(
            json.dumps({"result": generated_response}, ensure_ascii=False),
            mimetype='application/json; charset=utf-8'
        )

    except Exception as e:
        return Response(
            json.dumps({"error": str(e)}, ensure_ascii=False),
            mimetype='application/json; charset=utf-8',
            status=500
        )

if __name__ == '__main__':
    flask_app.run(debug=True)