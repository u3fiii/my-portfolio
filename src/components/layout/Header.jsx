import { NAV_ITEMS, SITE } from "../../content/site.js";
import useActiveSection from "../../hooks/useActiveSection.js";
import NavLink from "../ui/NavLink.jsx";

const sectionIds = NAV_ITEMS.map((item) => item.id);

export default function Header() {
  const activeId = useActiveSection(sectionIds);

  return (
    <header className="fixed top-5 left-1/2 z-50 w-[min(100%-2rem,56rem)] -translate-x-1/2">
      <nav
        className="flex items-center justify-between gap-3 rounded-full border border-zinc-200/80 bg-white/85 px-4 py-2.5 shadow-sm backdrop-blur-md md:gap-6 md:px-6"
        aria-label="Main"
      >
        <a
          href="#me"
          className="shrink-0 text-lg font-bold tracking-tight text-zinc-900 transition-opacity hover:opacity-80"
        >
          {SITE.logo}
        </a>

        <div className="flex flex-1 items-center justify-center gap-0.5 sm:gap-1">
          {NAV_ITEMS.map(({ id, label, icon }) => (
            <NavLink
              key={id}
              href={`#${id}`}
              label={label}
              icon={icon}
              active={activeId === id}
            />
          ))}
        </div>

        <a
          href={SITE.cvUrl}
          download
          className="shrink-0 rounded-full bg-zinc-900 px-4 py-2 text-sm font-light text-white transition-colors hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 md:px-5 md:py-2.5"
        >
          <span className="hidden sm:inline">{SITE.cvLabel}</span>
          <span className="sm:hidden">CV</span>
        </a>
      </nav>
    </header>
  );
}
