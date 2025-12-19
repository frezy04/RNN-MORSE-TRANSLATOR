AOS.init({
  once: true
});

// Morse code dictionary
const morseCodeMap = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
  G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
  M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..",
  "1": ".----", "2": "..---", "3": "...--", "4": "....-", "5": ".....",
  "6": "-....", "7": "--...", "8": "---..", "9": "----.", "0": "-----",
  " ": "/", ".": ".-.-.-", ",": "--..--", "?": "..--.."
};

// Fungsi bunyi beep
const playBeep = (duration = 100) => {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
  gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.start();
  setTimeout(() => oscillator.stop(), duration);
};

// Efek cahaya morse
const flashLight = async (morse) => {
  const light = document.getElementById("flashLight");
  for (let symbol of morse) {
    if (symbol === ".") {
      light.classList.add("active");
      playBeep(150);
      await new Promise((r) => setTimeout(r, 150));
      light.classList.remove("active");
    } else if (symbol === "-") {
      light.classList.add("active");
      playBeep(400);
      await new Promise((r) => setTimeout(r, 400));
      light.classList.remove("active");
    }
    await new Promise((r) => setTimeout(r, 150));
  }
};

// Konversi teks → morse
function textToMorse(text) {
  return text
    .toUpperCase()
    .split("")
    .map((char) => morseCodeMap[char] || "")
    .join(" ");
}

// Konversi morse → teks
function morseToText(morse) {
  const reverseMap = Object.fromEntries(
    Object.entries(morseCodeMap).map(([k, v]) => [v, k])
  );
  return morse
    .split(" ")
    .map((code) => reverseMap[code] || "")
    .join("");
}

// Event klik tombol translate
document.getElementById("translateBtn").addEventListener("click", async () => {
  const text = document.getElementById("inputText").value.trim();
  const mode = document.getElementById("modeSelect").value;
  const resultDiv = document.getElementById("result");

  if (!text) {
    resultDiv.innerHTML = "<span class='text-red-400'>⚠️ Masukkan input terlebih dahulu!</span>";
    return;
  }

  resultDiv.innerHTML = "<span class='text-blue-300 animate-pulse'>⏳ Menerjemahkan...</span>";

  if (mode === "morse2text") {
    // Gunakan RNN di backend untuk Morse → Text
    try {
      const response = await fetch("https://rnn-morse-translator.onrender.com/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ morse: text }),
      });
      const data = await response.json();
      resultDiv.innerHTML = `<span class='text-green-400 neon'>${data.translation}</span>`;
      flashLight(text);
    } catch (error) {
      resultDiv.innerHTML = "<span class='text-red-400'>❌ Gagal menghubungi server!</span>";
    }
  } else {
    // Text → Morse langsung di frontend
    const morseResult = textToMorse(text);
    resultDiv.innerHTML = `<span class='text-green-400 neon'>${morseResult}</span>`;
    flashLight(morseResult);
  }
});

