# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from model_rnn import translate_morse


app = Flask(__name__)
CORS(app) 

@app.route("/translate", methods=["POST"])
def translate():
    data = request.get_json()
    morse_code = data.get("morse", "")
    translation = translate_morse(morse_code)
    return jsonify({"translation": translation})

import os

if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=int(os.environ.get("PORT", 5000))
    )

