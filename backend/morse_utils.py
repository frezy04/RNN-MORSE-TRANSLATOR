# backend/morse_utils.py

morse_dict = {
    # Huruf
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..',
    'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
    'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..',

    # Angka
    '0': '-----', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....',
    '7': '--...', '8': '---..', '9': '----.',

    # Tanda baca
    '.': '.-.-.-',
    ',': '--..--',
    '?': '..--..',
    '!': '-.-.--',
    ':': '---...',
    '=': '-...-',
    '/': '-..-.',
    '(': '-.--.',
    ')': '-.--.-',
    '-': '-....-',
    '+': '.-.-.',

    ' ': '/'
}

reverse_dict = {v: k for k, v in morse_dict.items()}

def morse_to_text(morse_code):
    words = morse_code.strip().split(' / ')
    decoded = []

    for word in words:
        chars = [reverse_dict.get(code, '?') for code in word.split()]
        decoded.append(''.join(chars))

    return ' '.join(decoded)
