import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import json
from embedchain import App
from translations_util import translate_to_english, translate_from_english

# Set HuggingFace token
os.environ["HUGGINGFACE_ACCESS_TOKEN"] = "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"

# Initialize Embedchain app
app_embedchain = App.from_config(
    "/Users/utkarshininarayan/Desktop/projects/intelli-waste-hub/backend/IndicTrans2/huggingface_interface/mistral.yaml"
)
# Add knowledge source
app_embedchain.add("https://en.wikipedia.org/wiki/Waste_management")

# Initialize Flask
flask_app = Flask(__name__)
flask_app.secret_key = 'secret!'
CORS(flask_app)

# Language codes and display names
languages = {
    "asm_Beng": "Assamese", "kas_Arab": "Kashmiri (Arabic)", "pan_Guru": "Punjabi",
    "ben_Beng": "Bengali", "kas_Deva": "Kashmiri (Devanagari)", "san_Deva": "Sanskrit",
    "brx_Deva": "Bodo", "mai_Deva": "Maithili", "sat_Olck": "Santali",
    "doi_Deva": "Dogri", "mal_Mlym": "Malayalam", "snd_Arab": "Sindhi (Arabic)",
    "eng_Latn": "English", "mar_Deva": "Marathi", "snd_Deva": "Sindhi (Devanagari)",
    "gom_Deva": "Konkani", "mni_Beng": "Manipuri (Bengali)", "tam_Taml": "Tamil",
    "guj_Gujr": "Gujarati", "mni_Mtei": "Manipuri (Meitei)", "tel_Telu": "Telugu",
    "hin_Deva": "Hindi", "npi_Deva": "Nepali", "urd_Arab": "Urdu",
    "kan_Knda": "Kannada"
}

@flask_app.route('/languages', methods=['GET'])
def get_languages():
    return jsonify(languages)

@flask_app.route('/multilingual', methods=['POST'])
def multilingual():
    try:
        data = request.get_json() or {}
        input_text = data.get('input_text', '')
        lang = data.get('lang', 'eng_Latn')

        if not input_text.strip():
            return jsonify({"result": "Please enter a valid question."}), 400

        # Translate input to English if necessary
        if lang != "eng_Latn":
            input_text = translate_to_english(input_text, lang)

        # Query using Embedchain
        mistral_result = app_embedchain.query(input_text)

        # Extract meaningful response
        if "Answer:" in mistral_result:
            generated_response = mistral_result.split("Answer:")[1].strip()
        else:
            generated_response = mistral_result.strip()

        # Translate response back to original language if needed
        if lang != "eng_Latn":
            generated_response = translate_from_english(generated_response, lang)

        response = {"result": generated_response}
        return Response(json.dumps(response, ensure_ascii=False), content_type='application/json; charset=utf-8')

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    flask_app.run(debug=True, port=5003)
