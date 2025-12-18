# backend/model_rnn.py

import tensorflow as tf
from tensorflow import keras
import numpy as np

# --- Dummy fungsi penerjemah Morse ke teks ---
def translate_morse(morse_code):
    morse_dict = {
        '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E',
        '..-.': 'F', '--.': 'G', '....': 'H', '..': 'I', '.---': 'J',
        '-.-': 'K', '.-..': 'L', '--': 'M', '-.': 'N', '---': 'O',
        '.--.': 'P', '--.-': 'Q', '.-.': 'R', '...': 'S', '-': 'T',
        '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X', '-.--': 'Y',
        '--..': 'Z', '-----': '0', '.----': '1', '..---': '2',
        '...--': '3', '....-': '4', '.....': '5', '-....': '6',
        '--...': '7', '---..': '8', '----.': '9'
    }

    words = morse_code.strip().split(" / ")
    translated_words = []

    for word in words:
        letters = word.split(" ")
        translated_word = "".join([morse_dict.get(letter, '?') for letter in letters])
        translated_words.append(translated_word)

    return " ".join(translated_words)
