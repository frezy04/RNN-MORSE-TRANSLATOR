AOS.init({ once: true });

// Morse code dictionary (FULL)
const morseCodeMap = {
  A: ".-", B: "-...", C: "-.-.", D: "-..", E: ".", F: "..-.",
  G: "--.", H: "....", I: "..", J: ".---", K: "-.-", L: ".-..",
  M: "--", N: "-.", O: "---", P: ".--.", Q: "--.-", R: ".-.",
  S: "...", T: "-", U: "..-", V: "...-", W: ".--", X: "-..-",
  Y: "-.--", Z: "--..",

  "0": "-----", "1": ".----", "2": "..---", "3": "...--",
  "4": "....-", "5": ".....", "6": "-....",
  "7": "--...", "8": "---..", "9": "----.",

  " ": "/",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  ":": "---...",
  "=": "-...-",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "-": "-....-",
  "+": ".-.-."
};


// Beep sound
const playBeep = (duration = 100) => {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = 600;
  gainNode.gain.value = 0.1;
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  oscillator.start();
  setTimeout(() => oscillator.stop(), duration);
};

// Morse flash
const flashLight = async (morse) => {
  const light = document.getElementById("flashLight");
  for (let s of morse) {
    if (s === ".") {
      light.classList.add("active");
      playBeep(150);
      await new Promise(r => setTimeout(r, 150));
      light.classList.remove("active");
    } else if (s === "-") {
      light.classList.add("active");
      playBeep(400);
      await new Promise(r => setTimeout(r, 400));
      light.classList.remove("active");
    }
    await new Promise(r => setTimeout(r, 150));
  }
};

// Text → Morse
function textToMorse(text) {
  return text
    .toUpperCase()
    .split("")
    .map(c => morseCodeMap[c] || "")
    .join(" ");
}

// Morse → Text (frontend only)
function morseToText(morse) {
  const reverseMap = Object.fromEntries(
    Object.entries(morseCodeMap).map(([k, v]) => [v, k])
  );
  return morse
    .split(" ")
    .map(code => reverseMap[code] || "")
    .join("");
}

// Button event
document.getElementById("translateBtn").addEventListener("click", async () => {
  const input = document.getElementById("inputText").value.trim();
  const mode = document.getElementById("modeSelect").value;
  const result = document.getElementById("result");

  if (!input) {
    result.innerHTML = "⚠️ Masukkan input!";
    return;
  }

  if (mode === "morse2text") {
    try {
      const res = await fetch("http://127.0.0.1:5000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ morse: input })
      });
      const data = await res.json();
      result.innerHTML = data.translation;
      flashLight(input);
    } catch {
      result.innerHTML = "❌ Server error";
    }
  } else {
    const morse = textToMorse(input);
    result.innerHTML = morse;
    flashLight(morse);
  }
});
