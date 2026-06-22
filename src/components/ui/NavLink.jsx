import NavIcon from "./NavIcon.jsx";

export default function NavLink({
  href,
  label,
  icon,
  active = false,
  compact = false,
  iconOnly = false,
  className = "",
  onClick,
}) {
  const sizeClass = compact
    ? iconOnly
      ? "p-2"
      : "gap-1.5 px-2 py-1.5 text-xs"
    : "gap-2 px-4 py-2 text-sm";

  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      aria-label={iconOnly ? label : undefined}
      title={iconOnly ? label : undefined}
      className={`inline-flex origin-center items-center rounded-full font-['DM_Sans',ui-sans-serif,sans-serif] font-bold transition-[background-color,color] duration-200 ease-out ${sizeClass} ${className} ${
        active
          ? "bg-zinc-100 text-zinc-900"
          : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-800"
      }`}
    >
      <NavIcon
        name={icon}
        active={active}
        className={compact ? "h-4 w-4" : "h-[1.125rem] w-[1.125rem]"}
      />
      {!iconOnly && <span>{label}</span>}
    </a>
  );
}
