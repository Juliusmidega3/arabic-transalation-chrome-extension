const style = document.createElement('style');
style.textContent = `
  .sign-language-tooltip {
    position: absolute;
    background-color: #333;
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
    z-index: 1000;
    pointer-events: none;
  }
`;
document.head.appendChild(style);


// Define Arabic to sign language character mapping
const arabicToSignMap = {
  "ا": "A", 
  "ب": "B",
  "ت": "T",
  "ث": "TH",
  "ج": "J",
  "ح": "H",
  "خ": "KH",
  "د": "D",
  "ذ": "DH",
  "ر": "R",
  "ز": "Z",
  "س": "S",
  "ش": "SH",
  "ص": "S'",
  "ض": "D'",
  "ط": "T'",
  "ظ": "DH'",
  "ع": "A'",
  "غ": "GH",
  "ف": "F",
  "ق": "Q",
  "ك": "K",
  "ل": "L",
  "م": "M",
  "ن": "N",
  "ه": "H'",
  "و": "W",
  "ي": "Y"
};

// Function to translate Arabic text to sign language characters
function translateToSignLanguage(arabicText) {
  return arabicText.split('').map(char => arabicToSignMap[char] || char).join('');
}

// Function to add hover tooltip with translation
function addTranslationTooltip(element, translatedText) {
  // Create tooltip element
  const tooltip = document.createElement("span");
  tooltip.innerText = translatedText;
  tooltip.className = "sign-language-tooltip";
  tooltip.style.display = "none";

  // Append tooltip to the document body
  document.body.appendChild(tooltip);

  // Show tooltip on hover
  element.addEventListener("mouseenter", (e) => {
    tooltip.style.display = "block";
    tooltip.style.left = e.pageX + 10 + "px";
    tooltip.style.top = e.pageY + 10 + "px";
  });

  // Update tooltip position while hovering
  element.addEventListener("mousemove", (e) => {
    tooltip.style.left = e.pageX + 10 + "px";
    tooltip.style.top = e.pageY + 10 + "px";
  });

  // Hide tooltip when not hovering
  element.addEventListener("mouseleave", () => {
    tooltip.style.display = "none";
  });
}

// Scan the page for Arabic text and add tooltips
function scanPageForArabicText(rootNode) {
  const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT);
  let node;

  while ((node = walker.nextNode())) {
    const arabicRegex = /[\u0600-\u06FF]/;
    if (arabicRegex.test(node.nodeValue)) {
      const translatedText = translateToSignLanguage(node.nodeValue);

      // Wrap text in a span for hover effect
      const span = document.createElement("span");
      span.style.cursor = "pointer";
      span.innerText = node.nodeValue;
      node.parentNode.replaceChild(span, node);

      // Add tooltip for translation
      addTranslationTooltip(span, translatedText);
    }
  }
}

// Initial scan of the entire page
scanPageForArabicText(document.body);

// Observe for any dynamic content changes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        scanPageForArabicText(node);
      }
    });
  });
});

// Start observing the document body for changes
observer.observe(document.body, { childList: true, subtree: true });
