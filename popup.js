document.getElementById("translateButton").addEventListener("click", () => {
    const inputText = document.getElementById("inputText").value;
    const translatedText = translateToSignLanguage(inputText);
    document.getElementById("output").innerText = translatedText;
  });
  
  function translateToSignLanguage(arabicText) {
    const arabicToSignMap = {
      "ا": "🖐️", // Placeholder emojis for sign language
      "ب": "👌",
      "ت": "👋",
      "ث": "🤙",
      "ج": "✊",
      "ح": "🤞",
      "خ": "👈",
      "د": "👉",
      "ذ": "👆",
      "ر": "👇",
      "ز": "✌️",
      "س": "🤟",
      "ش": "👐",
      "ص": "🙏",
      "ض": "👏",
      "ط": "✋",
      "ظ": "✌️",
      "ع": "🤘",
      "غ": "✊",
      "ف": "👊",
      "ق": "✋",
      "ك": "🤲",
      "ل": "🖖",
      "م": "👋",
      "ن": "✊",
      "ه": "✌️",
      "و": "🤙",
      "ي": "👌"
      // Extend mapping for all relevant Arabic characters
    };
  
    let result = "";
    for (let char of arabicText) {
      result += arabicToSignMap[char] || char; // Append mapped symbol or original character if not found
    }
    return result;
  }
  