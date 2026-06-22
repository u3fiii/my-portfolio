import { SITE } from "../../content/site.js";

export function LogoMark({ className = "" }) {
  return (
    <span
      className={`inline-flex h-9 shrink-0 items-center rounded-full bg-zinc-950 px-4 ${className}`.trim()}
    >
      <img
        src={SITE.logo}
        alt=""
        aria-hidden
        className="h-4 w-auto object-contain"
        decoding="async"
      />
    </span>
  );
}

/** Same mark — expanded header. */
export function LogoLockup({ className = "" }) {
  return <LogoMark className={className} />;
}
