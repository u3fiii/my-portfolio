const variants = {
  primary:
    "bg-zinc-900 text-white hover:bg-zinc-700 focus-visible:ring-zinc-900",
  secondary:
    "border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50 focus-visible:ring-zinc-400",
};

export default function Button({
  children,
  href = "#",
  variant = "primary",
  external = false,
  icon: Icon,
}) {
  const sizeClass = Icon
    ? "gap-1 px-4 py-2 text-sm font-bold"
    : "px-6 py-3 text-sm font-light";

  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${sizeClass} ${variants[variant] ?? variants.primary}`}
      {...(external && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
    >
      {Icon ? <Icon className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden /> : null}
      {children}
    </a>
  );
}
