import { Download } from "lucide-react";
import { NAV_ITEMS, SITE } from "../../content/site.js";
import useActiveSection from "../../hooks/useActiveSection.js";
import NavLink from "../ui/NavLink.jsx";

const sectionIds = NAV_ITEMS.map((item) => item.id);

export default function Header() {
  const activeId = useActiveSection(sectionIds);

  return (
    <header className="fixed top-5 left-1/2 z-50 w-[min(100%-2rem,56rem)] -translate-x-1/2">
      <nav
        className="flex items-center justify-center gap-0.5 rounded-full border border-zinc-200/80 bg-white/85 px-3 py-2 shadow-sm backdrop-blur-md md:justify-between md:gap-6 md:px-6 md:py-2.5"
        aria-label="Main"
      >
        <a
          href="#me"
          className="hidden w-[110px] shrink-0 text-lg font-bold tracking-tight text-zinc-900 transition-opacity hover:opacity-80 md:block"
        >
          {SITE.logo}
        </a>

        <div className="flex items-center justify-center gap-0.5 md:flex-1 md:gap-1">
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
          download="Ali-Yousefi-CV.pdf"
          className="hidden shrink-0 items-center gap-2 rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-light text-white transition-colors hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 md:inline-flex"
        >
          <Download className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          {SITE.cvLabel}
        </a>
      </nav>
    </header>
  );
}
