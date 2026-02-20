// Language List
const languages = {
    "en": "English",
    "hi": "Hindi",
    "ur": "Urdu",
    "ar": "Arabic",
    "de": "German",
    "fr": "French",
    "es": "Spanish",
    "ko": "Korean",
    "ja": "Japanese",
    "zh": "Chinese",
    "ru": "Russian",
    "tr": "Turkish",
    "it": "Italian",
    "pt": "Portuguese",
    "bn": "Bengali"
};

const fromLang = document.getElementById("fromLang");
const toLang = document.getElementById("toLang");
const inputText = document.getElementById("inputText");
const outputText = document.getElementById("outputText");
const translateBtn = document.getElementById("translateBtn");
const copyBtn = document.getElementById("copyBtn");
const clearBtn = document.getElementById("clearBtn");
const loader = document.getElementById("loader");
const errorMsg = document.getElementById("errorMsg");
const charCount = document.getElementById("charCount");
const swapBtn = document.getElementById("swapBtn");
const darkToggle = document.getElementById("darkToggle");

// Populate Language Dropdown
for (let code in languages) {
    fromLang.innerHTML += `<option value="${code}">${languages[code]}</option>`;
    toLang.innerHTML += `<option value="${code}">${languages[code]}</option>`;
}

fromLang.value = "en";
toLang.value = "hi";

// Character Counter
inputText.addEventListener("input", () => {
    charCount.textContent = inputText.value.length;
    autoResize(inputText);
});

// Auto Resize Textarea
function autoResize(textarea) {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
}

// Translate Function
translateBtn.addEventListener("click", async () => {

    const text = inputText.value.trim();
    const from = fromLang.value;
    const to = toLang.value;

    errorMsg.textContent = "";

    if (!text) {
        errorMsg.textContent = "Please enter text.";
        return;
    }

    if (from === to) {
        errorMsg.textContent = "Please select different languages.";
        return;
    }

    loader.style.display = "block";
    translateBtn.disabled = true;

    try {
        const response = await fetch(
            `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${from}|${to}`
        );

        const data = await response.json();

        if (data.responseData) {
            outputText.value = data.responseData.translatedText;
        } else {
            throw new Error("Translation failed.");
        }

    } catch (error) {
        errorMsg.textContent = "Error: Unable to translate.";
    }

    loader.style.display = "none";
    translateBtn.disabled = false;
});

// Swap Languages
swapBtn.addEventListener("click", () => {
    [fromLang.value, toLang.value] = [toLang.value, fromLang.value];
    [inputText.value, outputText.value] = [outputText.value, inputText.value];
});

// Copy Text
copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(outputText.value);
});

// Clear Text
clearBtn.addEventListener("click", () => {
    inputText.value = "";
    outputText.value = "";
    charCount.textContent = 0;
});

// Dark Mode Toggle
darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});