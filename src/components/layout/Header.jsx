import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import homeAnimation from "../../assets/lottie/Home 23_.json";
import { DownloadSimple, ICON_WEIGHT } from "../ui/icons.js";
import LottieIcon, { prefersReducedMotion } from "../ui/LottieIcon.jsx";
import { LogoMark } from "../ui/Logo.jsx";
import { NAV_ITEMS, SITE } from "../../content/site.js";
import useActiveSection from "../../hooks/useActiveSection.js";
import { ROUTES } from "../../routes/paths.js";
import NavLink from "../ui/NavLink.jsx";

const sectionIds = NAV_ITEMS.map((item) => item.id);

const fadeTransition = { duration: 0.2, ease: [0.4, 0, 0.2, 1] };
/** Header shrinks slightly while scrolling down, restores on scroll up. */
const SCROLLED_DOWN_SCALE = 0.98;
const SCROLL_DIRECTION_THRESHOLD = 4;
const scaleTransition = { duration: 0.3, ease: [0.4, 0, 0.2, 1] };
/** Scroll-scale is desktop-only — matches Tailwind's `md` breakpoint. */
const DESKTOP_QUERY = "(min-width: 48rem)";

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(
    () => window.matchMedia?.(DESKTOP_QUERY).matches ?? true,
  );
  useEffect(() => {
    const mql = window.matchMedia?.(DESKTOP_QUERY);
    if (!mql) return undefined;
    const onChange = (e) => setIsDesktop(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

const headerEnterTransition = {
  delay: 1.5,
  duration: 0.55,
  ease: [0.4, 0, 0.2, 1],
};

export default function Header() {
  const workMatch = useMatch("/work/:id");
  const caseStudyMatch = useMatch("/case-studies/:slug");
  const isDetail = Boolean(workMatch || caseStudyMatch);

  const activeId = useActiveSection(isDetail ? [] : sectionIds);

  const homeLottieRef = useRef(null);
  const playHomeIcon = () => {
    if (!prefersReducedMotion()) homeLottieRef.current?.goToAndPlay(0, true);
  };

  const isDesktop = useIsDesktop();
  const { scrollY } = useScroll();
  const [scrollingDown, setScrollingDown] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => {
    const delta = y - (scrollY.getPrevious() ?? y);
    if (y <= 0) setScrollingDown(false);
    else if (Math.abs(delta) >= SCROLL_DIRECTION_THRESHOLD)
      setScrollingDown(delta > 0);
  });

  return (
    <motion.header
      className="pointer-events-none fixed top-5 right-0 left-0 z-[100] mx-auto w-full max-w-[680px] px-6 md:top-4"
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={headerEnterTransition}
    >
      <motion.nav
        animate={{
          scale: isDesktop && scrollingDown ? SCROLLED_DOWN_SCALE : 1,
        }}
        transition={scaleTransition}
        className="pointer-events-auto flex w-full items-center overflow-hidden rounded-full border border-white/70 bg-white/55 p-2 shadow-[0_8px_32px_-8px_rgb(24_24_27/0.18),inset_0_1px_0_rgb(255_255_255/0.8)] ring-1 ring-zinc-900/5 backdrop-blur-xl backdrop-saturate-150"
        aria-label={isDetail ? "Work detail" : "Main"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isDetail ? (
            <motion.div
              key="detail"
              className="flex min-h-9 w-full min-w-0 items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={fadeTransition}
            >
              <Link
                to={ROUTES.home}
                onMouseEnter={playHomeIcon}
                onFocus={playHomeIcon}
                className="group inline-flex max-w-full min-w-0 items-center gap-2 rounded-full py-1.5 pr-4 pl-2.5 text-zinc-900 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
              >
                <LottieIcon
                  animationData={homeAnimation}
                  lottieRef={homeLottieRef}
                  className="h-4 w-4 text-zinc-600 transition-colors duration-200 group-hover:text-zinc-900"
                />
                <span className="min-w-0 truncate font-['DM_Sans',ui-sans-serif,sans-serif] text-sm font-medium">
                  Back to Home
                </span>
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="home"
              className="flex min-h-9 w-full min-w-0 items-stretch gap-1.5 md:gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={fadeTransition}
            >
              <a
                href={ROUTES.home}
                className="inline-flex shrink-0 self-center items-stretch rounded-full transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
                aria-label={`${SITE.logoAlt} — home`}
              >
                <LogoMark />
              </a>

              <div className="flex min-w-0 flex-1 items-center justify-center gap-0.5 self-center md:gap-1">
                {NAV_ITEMS.map(({ id, label, icon }) => (
                  <NavLink
                    key={id}
                    href={`#${id}`}
                    label={label}
                    icon={icon}
                    active={activeId === id}
                    compact
                    iconOnly={false}
                    className="max-md:p-2 max-md:[&_[data-nav-label]]:sr-only"
                    iconClassName="h-5 w-5 md:h-4 md:w-4"
                  />
                ))}
              </div>

              <a
                href={SITE.cvUrl}
                download="Ali-Yousefi-CV.pdf"
                className="inline-flex shrink-0 items-center justify-center gap-1.5 self-stretch rounded-full bg-zinc-100 px-2.5 font-['DM_Sans',ui-sans-serif,sans-serif] text-xs font-bold tracking-wide text-zinc-900 uppercase transition-colors hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 md:px-3"
                aria-label="Download CV"
              >
                <DownloadSimple
                  className="h-5 w-5 shrink-0 md:h-4 md:w-4"
                  weight={ICON_WEIGHT}
                  aria-hidden
                />
                <span className="hidden md:inline">{SITE.cvLabel}</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.header>
  );
}
