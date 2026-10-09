import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import allAnimation from "../../assets/lottie/all.json";
import articlesAnimation from "../../assets/lottie/articles.json";
import caseStudiesAnimation from "../../assets/lottie/case studies.json";
import projectsAnimation from "../../assets/lottie/projects.json";
import Section from "../layout/Section.jsx";
import LottieIcon, { prefersReducedMotion } from "../ui/LottieIcon.jsx";
import WorkCard from "../work/WorkCard.jsx";
import { WORK_CARDS } from "../../content/workCards.js";

const FONT_SERIF = '"Source Serif 4", Georgia, serif';
const FONT_UI = '"DM Sans", ui-sans-serif, system-ui, sans-serif';

const SECTION_TOKENS = {
  "--color-background-primary": "#ffffff",
  "--color-background-secondary": "#f4f4f5",
  "--color-text-tertiary": "#a1a1aa",
  "--color-border-tertiary": "#e4e4e7",
  "--color-border-secondary": "#71717a",
};

const TABS = [
  { id: "all", label: "All", animation: allAnimation },
  { id: "project", label: "Projects", animation: projectsAnimation },
  { id: "article", label: "Articles", animation: articlesAnimation },
  { id: "case-study", label: "Case studies", animation: caseStudiesAnimation },
];

function FilterTab({ active, onClick, label, animation, size = "desktop" }) {
  const sizeClass =
    size === "mobile"
      ? "px-2.5 py-1.5 text-[0.8125rem] min-[375px]:px-3.5 min-[375px]:text-sm"
      : "px-4 py-2 text-sm md:gap-1.5";

  const lottieRef = useRef(null);
  /** Icon animates on click only — not on hover or focus. */
  const handleClick = (event) => {
    if (!prefersReducedMotion()) lottieRef.current?.goToAndPlay(0, true);
    onClick?.(event);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      className={`inline-flex shrink-0 cursor-pointer items-center whitespace-nowrap rounded-full font-['DM_Sans',ui-sans-serif,sans-serif] font-semibold ${sizeClass} ${
        active
          ? "border border-zinc-900 bg-zinc-900 text-white"
          : "pill-hover-ring border border-zinc-300 bg-white text-zinc-900"
      }`}
    >
      {animation ? (
        <LottieIcon
          animationData={animation}
          lottieRef={lottieRef}
          className="hidden h-[1.125rem] w-[1.125rem] md:block"
        />
      ) : null}
      {label}
    </button>
  );
}

const MOBILE_TABS = TABS.filter((tab) => tab.id !== "all");

const layoutTransition = { duration: 0.35, ease: [0.4, 0, 0.2, 1] };
const itemTransition = { duration: 0.25, ease: [0.4, 0, 0.2, 1] };

const cardWidth =
  "w-full min-[600px]:w-[calc(50%-0.3125rem)] min-[900px]:w-[calc(33.333%-0.417rem)] lg:w-[calc(25%-0.5625rem)]";

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredCards = useMemo(() => {
    if (activeFilter === "all") return WORK_CARDS;
    return WORK_CARDS.filter((card) => card.filter === activeFilter);
  }, [activeFilter]);

  const handleMobileFilterClick = (id) => {
    setActiveFilter((prev) => (prev === id ? "all" : id));
  };

  return (
    <Section
      id="projects"
      className="mb-16 bg-transparent"
      align="start"
      contentMaxWidth="max-w-xl min-[600px]:max-w-2xl min-[900px]:max-w-[42rem] lg:max-w-[62rem]"
      tallOnMobile={false}
    >
      <div
        className="flex w-full flex-col items-center gap-5 py-4 pt-2 md:gap-6 md:py-6"
        style={SECTION_TOKENS}
      >
        <header className="w-full max-w-lg text-center">
          <h2 className="font-['Source_Serif_4',Georgia,serif] text-[1.375rem] font-bold tracking-[-0.02em] text-zinc-900 md:text-2xl lg:text-3xl">
            Work
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-['DM_Sans',ui-sans-serif,sans-serif] text-lg font-medium leading-relaxed text-zinc-700">
            Case studies, projects, and writing from the field.
          </p>
        </header>

        <div
          className="flex w-full max-w-full flex-wrap justify-center gap-1.5 min-[375px]:gap-2 md:hidden"
          role="group"
          aria-label="Filter work by type"
        >
          {MOBILE_TABS.map(({ id, label, animation }) => (
            <FilterTab
              key={id}
              size="mobile"
              active={activeFilter === id}
              onClick={() => handleMobileFilterClick(id)}
              label={label}
              animation={animation}
            />
          ))}
        </div>

        <div
          className="hidden w-full flex-wrap justify-center gap-2 md:flex"
          role="group"
          aria-label="Filter work by type"
        >
          {TABS.map(({ id, label, animation }) => (
            <FilterTab
              key={id}
              active={activeFilter === id}
              onClick={() => setActiveFilter(id)}
              label={label}
              animation={animation}
            />
          ))}
        </div>

        <motion.ul
          layout
          className="mx-auto flex w-full max-w-[42rem] flex-wrap justify-center gap-4 min-[600px]:gap-2.5 lg:max-w-[62rem] lg:gap-3"
          transition={{ layout: layoutTransition }}
        >
          <AnimatePresence mode="popLayout">
            {filteredCards.map((card) => (
              <motion.li
                key={card.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={itemTransition}
                className={`min-h-0 min-w-0 ${cardWidth}`}
              >
                <WorkCard {...card} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {filteredCards.length === 0 ? (
          <p
            className="text-center text-zinc-500"
            style={{ fontFamily: FONT_UI, fontSize: "13px" }}
          >
            Nothing in this category yet.
          </p>
        ) : null}
      </div>
    </Section>
  );
}
