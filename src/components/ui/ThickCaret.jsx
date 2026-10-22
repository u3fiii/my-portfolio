import { useEffect, useState } from "react";

/** Styles a hidden mirror copies so its text wraps exactly like the field's. */
const MIRROR_PROPS = [
  "boxSizing",
  "width",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "borderTopWidth",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth",
  "borderStyle",
  "fontFamily",
  "fontSize",
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "fontStretch",
  "letterSpacing",
  "lineHeight",
  "textAlign",
  "textIndent",
  "textTransform",
  "wordSpacing",
  "tabSize",
];

/**
 * Where the caret sits inside `field`, in px from its top-left corner. Renders
 * the text before the caret into an off-screen mirror and reads the position
 * of a marker placed right after it.
 */
function measureCaret(field) {
  const style = getComputedStyle(field);
  const isInput = field.nodeName === "INPUT";
  const fontSize = parseFloat(style.fontSize);
  const lineHeight = parseFloat(style.lineHeight) || fontSize * 1.25;

  const mirror = document.createElement("div");
  for (const prop of MIRROR_PROPS) mirror.style[prop] = style[prop];
  Object.assign(mirror.style, {
    position: "absolute",
    top: "0",
    left: "-9999px",
    visibility: "hidden",
    overflow: "hidden",
    whiteSpace: isInput ? "pre" : "pre-wrap",
    overflowWrap: isInput ? "normal" : "break-word",
  });

  const position = field.selectionStart ?? field.value.length;
  mirror.textContent = field.value.slice(0, position);
  const marker = document.createElement("span");
  marker.textContent = field.value.slice(position) || ".";
  mirror.appendChild(marker);
  document.body.appendChild(mirror);

  // Fit the bar to the glyphs actually on screen. While empty that's the
  // placeholder, which can have its own (smaller) size and line height.
  const placeholder = getComputedStyle(field, "::placeholder");
  const textSize = field.value
    ? fontSize
    : parseFloat(placeholder.fontSize) || fontSize;
  const textLineHeight = field.value
    ? lineHeight
    : parseFloat(placeholder.lineHeight) || lineHeight;

  const left = marker.offsetLeft - field.scrollLeft;
  // Inputs centre their single line vertically; textareas stack lines.
  const lineTop = isInput
    ? (field.clientHeight - textLineHeight) / 2
    : marker.offsetTop - field.scrollTop;
  mirror.remove();

  // From just above cap height to just below the baseline, rather than the
  // whole line box.
  const ctx = getMeasureContext();
  ctx.font = `${style.fontWeight} ${textSize}px ${style.fontFamily}`;
  const box = ctx.measureText("Hg");
  const capHeight = ctx.measureText("H").actualBoundingBoxAscent;
  const ascent = box.fontBoundingBoxAscent;
  const descent = box.fontBoundingBoxDescent;
  const baseline = (textLineHeight - (ascent + descent)) / 2 + ascent;
  const top = baseline - capHeight - textSize * 0.16;
  const bottom = baseline + textSize * 0.2;

  // Keep the 2px bar off the glyphs: before the first character, after the
  // last one, and centred on the gap between two characters.
  const atStart = position === 0 || field.value[position - 1] === "\n";
  const atEnd = position === field.value.length || field.value[position] === "\n";
  const nudge = atStart ? -2 : atEnd ? 0.5 : -1;
  return { left: left + nudge, top: lineTop + top, height: bottom - top };
}

let measureContext;
function getMeasureContext() {
  measureContext ??= document.createElement("canvas").getContext("2d");
  return measureContext;
}

/**
 * A thicker text caret for an input or textarea. Hides the native caret on
 * `fieldRef` and draws a bar at the caret position that blinks like the
 * native one and stays solid while the caret is moving. Place it next to the
 * field inside a `relative` wrapper that shares the field's top-left corner.
 */
export default function ThickCaret({ fieldRef, className = "" }) {
  const [caret, setCaret] = useState(null);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) return;

    field.style.caretColor = "transparent";
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const focused = document.activeElement === field;
        const collapsed = field.selectionStart === field.selectionEnd;
        if (!focused || !collapsed) {
          setCaret(null);
          return;
        }
        const next = measureCaret(field);
        const visible =
          next.top + next.height > 0 && next.top < field.clientHeight;
        // `key` changes on every move so the blink restarts solid.
        setCaret(visible ? { ...next, key: performance.now() } : null);
      });
    };
    const hide = () => {
      cancelAnimationFrame(frame);
      setCaret(null);
    };

    const fieldEvents = ["focus", "input", "keydown", "keyup", "click", "select", "scroll"];
    fieldEvents.forEach((type) => field.addEventListener(type, update));
    field.addEventListener("blur", hide);
    document.addEventListener("selectionchange", update);
    window.addEventListener("resize", update);
    if (document.activeElement === field) update();

    return () => {
      cancelAnimationFrame(frame);
      fieldEvents.forEach((type) => field.removeEventListener(type, update));
      field.removeEventListener("blur", hide);
      document.removeEventListener("selectionchange", update);
      window.removeEventListener("resize", update);
      field.style.caretColor = "";
    };
  }, [fieldRef]);

  if (!caret) return null;

  return (
    <span
      key={caret.key}
      aria-hidden
      className={`thick-caret pointer-events-none absolute w-[2px] rounded-full bg-zinc-900 ${className}`}
      style={{ left: caret.left, top: caret.top, height: caret.height }}
    />
  );
}
