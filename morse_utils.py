# backend/morse_utils.py

morse_dict = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..',
    'E': '.', 'F': '..-.', 'G': '--.', 'H': '....',
    'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.',
    'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', ' ': '/'
}

reverse_dict = {v: k for k, v in morse_dict.items()}

def morse_to_text(morse_code):
    """Ubah kode Morse jadi teks biasa"""
    words = morse_code.strip().split(' / ')
    decoded = ''
    for word in words:
        for symbol in word.split():
            decoded += reverse_dict.get(symbol, '?')
        decoded += ' '
    return decoded.strip()
