import { AnimatePresence, motion } from "framer-motion";
import { Link, useMatch } from "react-router-dom";
import { ArrowLeft, DownloadSimple, ICON_WEIGHT } from "../ui/icons.js";
import { LogoMark } from "../ui/Logo.jsx";
import { NAV_ITEMS, SITE } from "../../content/site.js";
import { getWorkItemById } from "../../content/work.js";
import useActiveSection from "../../hooks/useActiveSection.js";
import { CASE_STUDY_TITLES, ROUTES } from "../../routes/paths.js";
import NavLink from "../ui/NavLink.jsx";

const sectionIds = NAV_ITEMS.map((item) => item.id);

const fadeTransition = { duration: 0.2, ease: [0.4, 0, 0.2, 1] };
const headerEnterTransition = {
  delay: 1.5,
  duration: 0.55,
  ease: [0.4, 0, 0.2, 1],
};

export default function Header() {
  const workMatch = useMatch("/work/:id");
  const caseStudyMatch = useMatch("/case-studies/:slug");
  const workId = workMatch?.params?.id;
  const caseStudySlug = caseStudyMatch?.params?.slug;
  const workItem = workId ? getWorkItemById(workId) : null;
  const isDetail = Boolean(workMatch || caseStudyMatch);
  const detailTitle =
    workItem?.title ??
    (caseStudySlug ? CASE_STUDY_TITLES[caseStudySlug] : null) ??
    (workId ? "Not found" : "");

  const activeId = useActiveSection(isDetail ? [] : sectionIds);

  return (
    <motion.header
      className="pointer-events-none fixed top-4 right-0 left-0 z-[100] mx-auto w-full max-w-[680px] px-6"
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={headerEnterTransition}
    >
      <nav
        className="pointer-events-auto flex w-full items-center overflow-hidden rounded-full border border-zinc-200/90 bg-white p-2 shadow-sm"
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
                aria-label="Back to home"
                className="inline-flex shrink-0 items-center justify-center rounded-full p-2 text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
              >
                <ArrowLeft
                  className="h-4 w-4 shrink-0"
                  weight={ICON_WEIGHT}
                  aria-hidden
                />
              </Link>

              <h1 className="min-w-0 flex-1 truncate pr-2 font-['DM_Sans',ui-sans-serif,sans-serif] text-sm font-semibold tracking-tight text-zinc-900 md:text-base">
                {detailTitle}
              </h1>
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
                className="inline-flex shrink-0 self-center items-stretch transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
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
                    className="max-md:[&_span]:sr-only"
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
                  className="h-4 w-4 shrink-0"
                  weight={ICON_WEIGHT}
                  aria-hidden
                />
                <span className="hidden md:inline">{SITE.cvLabel}</span>
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
