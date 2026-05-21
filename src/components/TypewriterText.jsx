import { useEffect, useState } from "react";

const TYPE_MS = 80;
const DELETE_MS = 45;
const PAUSE_MS = 2000;

export default function TypewriterText({
  words,
  className = "",
  cursorClassName = "ml-0.5 inline-block h-[0.85em] w-0.5 translate-y-0.5 animate-cursor-blink bg-zinc-800",
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), PAUSE_MS);
    } else if (isDeleting && text === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, TYPE_MS);
    } else if (isDeleting) {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length - 1)),
        DELETE_MS,
      );
    } else {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length + 1)),
        TYPE_MS,
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  return (
    <span className={className}>
      {text}
      <span className={cursorClassName} aria-hidden />
    </span>
  );
}
