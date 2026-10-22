/**
 * Keeps contact fields in English: keystrokes from another layout (Persian)
 * are swapped for the US-QWERTY character on the same physical key, and text
 * that still slips through is mapped or dropped.
 */

/** US-QWERTY characters per physical key: [plain, shifted]. */
const US_KEYS = {
  Backquote: ["`", "~"],
  Digit1: ["1", "!"],
  Digit2: ["2", "@"],
  Digit3: ["3", "#"],
  Digit4: ["4", "$"],
  Digit5: ["5", "%"],
  Digit6: ["6", "^"],
  Digit7: ["7", "&"],
  Digit8: ["8", "*"],
  Digit9: ["9", "("],
  Digit0: ["0", ")"],
  Minus: ["-", "_"],
  Equal: ["=", "+"],
  BracketLeft: ["[", "{"],
  BracketRight: ["]", "}"],
  Backslash: ["\\", "|"],
  Semicolon: [";", ":"],
  Quote: ["'", '"'],
  Comma: [",", "<"],
  Period: [".", ">"],
  Slash: ["/", "?"],
  Space: [" ", " "],
};

/**
 * Persian (standard ISIRI layout) characters → the QWERTY key they sit on,
 * plus Persian/Arabic digits and punctuation. Used for text that arrives
 * without a physical key, e.g. from a phone keyboard.
 */
const PERSIAN_TO_QWERTY = {
  ض: "q", ص: "w", ث: "e", ق: "r", ف: "t", غ: "y", ع: "u", ه: "i",
  خ: "o", ح: "p", ج: "[", چ: "]", پ: "\\",
  ش: "a", س: "s", ی: "d", ي: "d", ب: "f", ل: "g", ا: "h", ت: "j",
  ن: "k", م: "l", ک: ";", ك: ";", گ: "'",
  ظ: "z", ط: "x", ز: "c", ر: "v", ذ: "b", د: "n", ئ: "m", و: ",",
  ژ: "C", آ: "H", ء: "M", أ: "H", إ: "H", ؤ: "V", ة: "I",
  "،": ",", "؛": ";", "؟": "?", "«": '"', "»": '"', "٫": ".", "٬": ",",
};
for (let digit = 0; digit <= 9; digit += 1) {
  PERSIAN_TO_QWERTY[String.fromCharCode(0x06f0 + digit)] = String(digit); // ۰–۹
  PERSIAN_TO_QWERTY[String.fromCharCode(0x0660 + digit)] = String(digit); // ٠–٩
}

const ENGLISH_CHAR = /[\x20-\x7E\n\t]/;

/**
 * The US-QWERTY character for a keydown that would type a non-English
 * character, or null when the key should be left alone.
 */
export function englishCharForKey(event) {
  const { key, code } = event;
  if (event.metaKey || event.ctrlKey || event.altKey || event.isComposing) return null;
  if (key.length !== 1 || ENGLISH_CHAR.test(key)) return null;

  if (/^Key[A-Z]$/.test(code)) {
    const upper = event.shiftKey !== event.getModifierState("CapsLock");
    const letter = code.slice(3);
    return upper ? letter : letter.toLowerCase();
  }
  const pair = US_KEYS[code];
  return pair ? pair[event.shiftKey ? 1 : 0] : null;
}

/** Typed text → English: Persian mapped by key position, the rest dropped. */
export function toEnglish(text) {
  let out = "";
  for (const char of text) {
    if (ENGLISH_CHAR.test(char)) out += char;
    else if (PERSIAN_TO_QWERTY[char]) out += PERSIAN_TO_QWERTY[char];
  }
  return out;
}

/** Pasted text → English: only digits are converted, other scripts dropped. */
export function pastedToEnglish(text) {
  let out = "";
  for (const char of text) {
    if (ENGLISH_CHAR.test(char)) out += char;
    else if (/[۰-۹٠-٩]/.test(char)) out += PERSIAN_TO_QWERTY[char];
  }
  return out;
}

/**
 * Inserts `text` at the field's selection the way typing would, so React's
 * onChange fires with the new value.
 */
export function insertText(field, text) {
  const start = field.selectionStart ?? field.value.length;
  const end = field.selectionEnd ?? start;
  field.setRangeText(text, start, end, "end");
  field.dispatchEvent(new Event("input", { bubbles: true }));
}
