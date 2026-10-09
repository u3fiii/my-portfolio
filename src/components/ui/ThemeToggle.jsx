import { AnimatePresence, motion } from "framer-motion";
import useTheme from "../../hooks/useTheme.js";
import { ICON_WEIGHT, Moon, Sun } from "./icons.js";

const swap = {
  initial: { opacity: 0, rotate: -90, scale: 0.6 },
  animate: { opacity: 1, rotate: 0, scale: 1 },
  exit: { opacity: 0, rotate: 90, scale: 0.6 },
  transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
};

export default function ThemeToggle({ className = "" }) {
  const { isDark, toggleTheme } = useTheme();
  const Icon = isDark ? Sun : Moon;

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`relative inline-flex shrink-0 cursor-pointer items-center justify-center text-zinc-900 transition-colors hover:bg-zinc-900/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-900 ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? "sun" : "moon"}
          className="inline-flex"
          {...swap}
        >
          <Icon
            className="h-5 w-5 md:h-4 md:w-4"
            weight={ICON_WEIGHT}
            aria-hidden
          />
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
