import { NAV_ITEMS } from "../../content/site.js";
import NavLink from "../ui/NavLink.jsx";

export default function Header() {
  return (
    <header className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
      <nav
        className="flex items-center gap-1 rounded-full border border-zinc-200/80 bg-white/80 px-2 py-2 shadow-sm backdrop-blur-md"
        aria-label="Main"
      >
        {NAV_ITEMS.map(({ id, label }) => (
          <NavLink key={id} href={`#${id}`}>
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
