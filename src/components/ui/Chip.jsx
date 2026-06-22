import { FILTER_ICONS, ICON_WEIGHT } from "./icons.js";

export default function Chip({
  active = false,
  onClick,
  children,
  icon,
  compact = false,
}) {
  const Icon = icon ? FILTER_ICONS[icon] : null;

  const size = compact
    ? "gap-1.5 px-3.5 py-1.5 text-[13px] md:px-4"
    : "gap-1.5 px-4 py-2 text-sm";

  const stateClass = active
    ? "border border-zinc-900 bg-zinc-900 font-windsor-bold text-white hover:bg-zinc-700 focus-visible:ring-zinc-900"
    : "pill-hover-ring border border-zinc-300 bg-white font-windsor-bold text-zinc-900 hover:bg-zinc-50 focus-visible:ring-zinc-400";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex cursor-pointer items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${size} ${stateClass}`}
    >
      {Icon ? (
        <Icon
          className="hidden h-4 w-4 shrink-0 md:block"
          weight={ICON_WEIGHT}
          aria-hidden
        />
      ) : null}
      {children}
    </button>
  );
}
