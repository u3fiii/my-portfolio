import { useEffect, useState } from "react";

const TYPE_MS = 32;
const DELETE_MS = 18;
const PAUSE_MS = 2000;

/**
 * @param {Object} props
 * @param {{ text: string, fontClass?: string }[]} props.roles
 */
export default function TypewriterText({
  roles,
  className = "",
  cursorClassName = "ml-0.5 inline-block h-[0.85em] w-[3px] translate-y-0.5 animate-cursor-blink bg-zinc-900",
}) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentRole = roles[wordIndex % roles.length];
  const currentWord = currentRole.text;

  useEffect(() => {
    let timeout;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), PAUSE_MS);
    } else if (isDeleting && text === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((i) => (i + 1) % roles.length);
      }, TYPE_MS);
    } else if (isDeleting) {
      timeout = setTimeout(
        () => setText(currentWord.slice(0, text.length - 1)),
        DELETE_MS,
      );
    } else {
      timeout = setTimeout(
        () => setText(currentWord.slice(0, text.length + 1)),
        TYPE_MS,
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, currentWord, roles.length]);

  return (
    <span
      className={`typewriter-line ${className}`.trim()}
      aria-live="polite"
    >
      {roles.map((role) => (
        <span
          key={role.text}
          className={`typewriter-sizer ${role.fontClass ?? ""}`.trim()}
          aria-hidden
        >
          {role.text}
        </span>
      ))}
      <span
        className={`typewriter-visible ${currentRole.fontClass ?? ""}`.trim()}
      >
        <span>{text}</span>
        <span className={cursorClassName} aria-hidden />
      </span>
    </span>
  );
}
