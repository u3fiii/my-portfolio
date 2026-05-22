import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Download } from "lucide-react";
import { NAV_ITEMS, SITE } from "../../content/site.js";
import useActiveSection from "../../hooks/useActiveSection.js";
import NavLink from "../ui/NavLink.jsx";

const sectionIds = NAV_ITEMS.map((item) => item.id);

export default function Header() {
  const activeId = useActiveSection(sectionIds);
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastScrollY && latest > 80) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setLastScrollY(latest);
  });

  return (
    <motion.header
      variants={{
        visible: { y: 8 },
        hidden: { y: "-4px", scale: 0.93 },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{
        duration: 0.6,
        ease: [0,.44,.39,1.19], // a "bounce" like curve (cubic-bezier)
   
      }}
      className="fixed top-4 left-1/2 z-[100] w-[min(100%-2rem,56rem)] -translate-x-1/2 md:w-[400px]"
    >
      <nav
        className="flex items-center justify-center gap-2 rounded-full border border-zinc-200/80 bg-white/50 p-2 shadow-sm backdrop-blur-md md:justify-between"
        aria-label="Main"
      >
        <a
          href="#me"
          className="hidden shrink-0 rounded-full bg-gray-100 px-4 py-1 text-base font-bold tracking-tight text-zinc-900 transition-opacity hover:opacity-80 md:block"
        >
          {SITE.logo}
        </a>

        <div className="flex items-center justify-center gap-2 md:flex-1">
          {NAV_ITEMS.map(({ id, label, icon }) => (
            <NavLink
              key={id}
              href={`#${id}`}
              label={label}
              icon={icon}
              active={activeId === id}
              compact
            />
          ))}
        </div>

        <a
          href={SITE.cvUrl}
          download="Ali-Yousefi-CV.pdf"
          className="hidden shrink-0 items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-2 text-xs font-light text-white transition-colors hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 md:inline-flex"
        >
          <Download className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
          {SITE.cvLabel}
        </a>
      </nav>
    </motion.header>
  );
}
