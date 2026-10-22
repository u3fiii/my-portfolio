import { ICON_WEIGHT, SOCIAL_ICONS } from "./icons.js";

/** Round outlined icon link to a social profile (hero and contact). */
export default function SocialIconLink({ id, label, href }) {
  const Icon = SOCIAL_ICONS[id];
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      className="pill-hover-ring button-ready-bounce inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2"
    >
      <Icon className="h-[1.125rem] w-[1.125rem]" weight={ICON_WEIGHT} aria-hidden />
    </a>
  );
}
