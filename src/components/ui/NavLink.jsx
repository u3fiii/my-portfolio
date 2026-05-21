import NavIcon from "./NavIcon.jsx";

export default function NavLink({ href, label, icon, active = false }) {
  return (
    <a
      href={href}
      aria-current={active ? "true" : undefined}
      className={`inline-flex origin-center items-center gap-2 rounded-full px-4 py-2 text-sm text-zinc-600 transition-[transform,color,font-weight] duration-300 ease-out will-change-transform hover:bg-zinc-100 hover:text-zinc-900 ${
        active
          ? "scale-[1.05] font-bold text-zinc-900"
          : "scale-100 font-light"
      }`}
    >
      <NavIcon name={icon} />
      {label}
    </a>
  );
}
