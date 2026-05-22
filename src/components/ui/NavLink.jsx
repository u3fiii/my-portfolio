import NavIcon from "./NavIcon.jsx";

export default function NavLink({
  href,
  label,
  icon,
  active = false,
  compact = false,
  onClick,
}) {
  const sizeClass = compact
    ? "gap-1.5 px-2 py-1 text-xs"
    : "gap-2 px-4 py-2 text-sm";

  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={`inline-flex origin-center items-center rounded-full text-zinc-600 transition-[transform,color,font-weight] duration-300 ease-out will-change-transform hover:bg-zinc-100 hover:text-zinc-900 ${sizeClass} ${
        active
          ? "scale-[1.05] font-bold text-zinc-900"
          : "scale-100 font-light"
      }`}
    >
      <NavIcon name={icon} className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
      {label}
    </a>
  );
}
