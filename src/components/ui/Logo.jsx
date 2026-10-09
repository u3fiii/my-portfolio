import { SITE } from "../../content/site.js";

export function LogoMark({ className = "" }) {
  return (
    <span
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center ${className}`.trim()}
    >
      <img
        src={SITE.logo}
        alt=""
        aria-hidden
        className="h-full w-full object-contain dark:invert"
        decoding="async"
      />
    </span>
  );
}

/** Same mark — expanded header. */
export function LogoLockup({ className = "" }) {
  return <LogoMark className={className} />;
}
