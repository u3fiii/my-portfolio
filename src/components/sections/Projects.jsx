import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import allAnimation from "../../assets/lottie/all.json";
import articlesAnimation from "../../assets/lottie/articles.json";
import caseStudiesAnimation from "../../assets/lottie/case studies.json";
import projectsAnimation from "../../assets/lottie/projects.json";
import Section from "../layout/Section.jsx";
import JellyRadio from "../ui/JellyRadio.jsx";
import LottieIcon, { prefersReducedMotion } from "../ui/LottieIcon.jsx";
import WorkCard from "../work/WorkCard.jsx";
import { WORK_CARDS } from "../../content/workCards.js";

const FONT_SERIF = '"Source Serif 4", Georgia, serif';
const FONT_UI = '"DM Sans", ui-sans-serif, system-ui, sans-serif';

const SECTION_TOKENS = {
  "--color-background-primary": "var(--color-white)",
  "--color-background-secondary": "var(--color-zinc-100)",
  "--color-text-tertiary": "var(--color-zinc-400)",
  "--color-border-tertiary": "var(--color-zinc-200)",
  "--color-border-secondary": "var(--color-zinc-500)",
};

const TABS = [
  { id: "all", label: "All", animation: allAnimation },
  { id: "project", label: "Projects", animation: projectsAnimation },
  { id: "article", label: "Articles", animation: articlesAnimation },
  { id: "case-study", label: "Case studies", animation: caseStudiesAnimation },
];

/** Lottie filter icon — plays once each time its chip becomes selected. */
function FilterIcon({ animation, active }) {
  const lottieRef = useRef(null);
  const mountedRef = useRef(false);
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    if (active && !prefersReducedMotion())
      lottieRef.current?.goToAndPlay(0, true);
  }, [active]);
  return (
    <LottieIcon
      animationData={animation}
      lottieRef={lottieRef}
      className="h-[1.125rem] w-[1.125rem]"
    />
  );
}

const DESKTOP_ITEMS = TABS.map(({ id, label, animation }) => ({
  value: id,
  label,
  icon: (active) => <FilterIcon animation={animation} active={active} />,
}));

/** Phones skip "All": tapping the selected chip again clears the filter. */
const MOBILE_ITEMS = TABS.filter((tab) => tab.id !== "all").map(
  ({ id, label }) => ({ value: id, label }),
);

const layoutTransition = { duration: 0.35, ease: [0.4, 0, 0.2, 1] };
const itemTransition = { duration: 0.25, ease: [0.4, 0, 0.2, 1] };

const cardWidth =
  "w-full min-[600px]:w-[calc(50%-0.3125rem)] min-[900px]:w-[calc(33.333%-0.417rem)] lg:w-[calc(25%-0.5625rem)]";

function gridColumns() {
  if (window.innerWidth >= 1024) return 4;
  if (window.innerWidth >= 900) return 3;
  if (window.innerWidth >= 600) return 2;
  return 1;
}

function ParallaxWorkItem({ card, index, columns, scrollProgress }) {
  const reduceMotion = useReducedMotion();
  const row = Math.floor(index / columns);
  const depth = 2 + row * 2;
  const y = useTransform(scrollProgress, [0, 1], [-depth, depth]);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={itemTransition}
      style={{ y: reduceMotion || columns === 1 ? 0 : y }}
      className={`min-h-0 min-w-0 ${cardWidth}`}
    >
      <WorkCard {...card} />
    </motion.li>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [columns, setColumns] = useState(gridColumns);
  const gridRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start end", "end start"],
  });

  useEffect(() => {
    const updateColumns = () => setColumns(gridColumns());
    window.addEventListener("resize", updateColumns, { passive: true });
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  const filteredCards = useMemo(() => {
    if (activeFilter === "all") return WORK_CARDS;
    return WORK_CARDS.filter((card) => card.filter === activeFilter);
  }, [activeFilter]);

  return (
    <Section
      id="projects"
      className="mb-16 bg-transparent"
      align="start"
      contentMaxWidth="max-w-xl min-[600px]:max-w-2xl min-[900px]:max-w-[42rem] lg:max-w-[62rem]"
      tallOnMobile={false}
    >
      <div
        className="flex w-full flex-col items-center gap-3 py-3 pt-2 md:gap-4 md:py-4"
        style={SECTION_TOKENS}
      >
        <header className="w-full max-w-lg text-center">
          <h2 className="font-['Source_Serif_4',Georgia,serif] text-[1.375rem] font-bold tracking-[-0.02em] text-zinc-900 md:text-2xl lg:text-3xl">
            Work
          </h2>
        </header>

        <div className="flex w-full justify-center md:hidden">
          <JellyRadio
            items={MOBILE_ITEMS}
            value={activeFilter === "all" ? null : activeFilter}
            onChange={(id) => setActiveFilter(id ?? "all")}
            allowDeselect
            size="sm"
            gap={4}
            swell={0.1}
            ariaLabel="Filter work by type"
          />
        </div>

        <div className="hidden w-full justify-center md:flex">
          <JellyRadio
            items={DESKTOP_ITEMS}
            value={activeFilter}
            onChange={setActiveFilter}
            ariaLabel="Filter work by type"
          />
        </div>

        <motion.ul
          ref={gridRef}
          layout
          className="mx-auto flex w-full max-w-[42rem] flex-wrap justify-center gap-4 min-[600px]:gap-2.5 lg:max-w-[62rem] lg:gap-3"
          transition={{ layout: layoutTransition }}
        >
          <AnimatePresence mode="popLayout">
            {filteredCards.map((card, index) => (
              <ParallaxWorkItem
                key={card.id}
                card={card}
                index={index}
                columns={columns}
                scrollProgress={scrollYProgress}
              />
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
