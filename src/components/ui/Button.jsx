import { ICON_WEIGHT } from "./icons.js";

const variants = {
  primary:
    "bg-zinc-900 text-white hover:bg-zinc-700 focus-visible:ring-zinc-900",
  secondary:
    "pill-hover-ring border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50 focus-visible:ring-zinc-400",
};

export default function Button({
  children,
  href = "#",
  variant = "primary",
  external = false,
  icon: Icon,
  iconOnlyMobile = false,
  ariaLabel,
}) {
  const sizeClass = Icon
    ? iconOnlyMobile
      ? "gap-0 p-2.5 md:gap-1.5 md:px-4 md:py-2 font-['DM_Sans',ui-sans-serif,sans-serif] text-sm font-semibold"
      : "gap-1.5 px-4 py-2 font-['DM_Sans',ui-sans-serif,sans-serif] text-sm font-semibold"
    : "px-6 py-3 text-sm";

  const accessibleName =
    ariaLabel ?? (typeof children === "string" ? children : undefined);

  return (
    <a
      href={href}
      className={`inline-flex shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${sizeClass} ${variants[variant] ?? variants.primary}`}
      aria-label={iconOnlyMobile ? accessibleName : undefined}
      {...(external && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
    >
      {Icon ? (
        <Icon className="h-[1.125rem] w-[1.125rem] shrink-0" weight={ICON_WEIGHT} aria-hidden />
      ) : null}
      {children ? (
        <span className={iconOnlyMobile ? "hidden md:inline" : undefined}>
          {children}
        </span>
      ) : null}
    </a>
  );
}
