import { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
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
import useSectionParallax, { useDepth } from "../../hooks/useSectionParallax.js";

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
  "w-full min-[600px]:w-[calc(50%-0.375rem)] lg:w-[calc(25%-0.5625rem)]";

/**
 * On desktop, covers shrink with viewport height so two rows of cards plus
 * the header fit one screen on short laptops; more rows simply scroll.
 */
const COVER_CLASS =
  "aspect-[16/10] lg:aspect-auto lg:h-[clamp(6.5rem,16vh,11rem)]";

const REVEAL_EASE = [0.22, 1, 0.36, 1];

/** Header lines: title, subtitle, filters — a short cascade. */
function headerReveal(hasEntered, step, reduce) {
  return {
    initial: { opacity: 0, y: reduce ? 0 : 14 },
    animate: hasEntered ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.6, delay: step * 0.08, ease: REVEAL_EASE },
  };
}

/**
 * Cards rise in a wave. The first reveal waits for the header; later ones
 * (after filtering) follow quickly.
 */
const cardVariants = {
  hidden: ({ reduce }) => ({
    opacity: 0,
    y: reduce ? 0 : 40,
    scale: reduce ? 1 : 0.96,
  }),
  shown: ({ index, intro }) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: REVEAL_EASE,
      delay: (intro ? 0.22 : 0.04) + index * (intro ? 0.07 : 0.045),
    },
  }),
};

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("all");
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  // Header is the far plane, cards the near one.
  const parallax = useSectionParallax(sectionRef);
  const headerY = useDepth(parallax, 44);
  const cardsY = useDepth(parallax, 110);
  const hasEntered = useInView(contentRef, { once: true, amount: 0.25 });
  const reduce = useReducedMotion();
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    if (!hasEntered) return;
    const id = window.setTimeout(() => setIntroDone(true), 1600);
    return () => window.clearTimeout(id);
  }, [hasEntered]);

  // Published work leads; coming-soon pieces follow in their original order.
  const filteredCards = useMemo(() => {
    const cards =
      activeFilter === "all"
        ? WORK_CARDS
        : WORK_CARDS.filter((card) => card.filter === activeFilter);
    return [
      ...cards.filter((card) => !card.comingSoon),
      ...cards.filter((card) => card.comingSoon),
    ];
  }, [activeFilter]);

  return (
    <Section
      id="projects"
      sectionRef={sectionRef}
      className="scroll-mt-[-5rem] bg-transparent pt-24 pb-12 md:min-h-[100dvh] md:pb-6 md:pt-[clamp(6rem,15vh,9rem)]"
      align="center"
      contentMaxWidth="max-w-xl min-[600px]:max-w-2xl lg:max-w-[62rem]"
      tallOnMobile={false}
    >
      <div
        ref={contentRef}
        className="flex w-full flex-col gap-7 md:gap-6"
        style={SECTION_TOKENS}
      >
        <motion.header
          style={{ y: headerY }}
          className="flex w-full flex-col items-center gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left"
        >
          <div>
            <motion.h2
              {...headerReveal(hasEntered, 0, reduce)}
              className="text-[1.375rem] font-bold tracking-[-0.02em] text-zinc-900 md:text-2xl lg:text-3xl"
              style={{ fontFamily: FONT_SERIF }}
            >
              Selected work
            </motion.h2>
            <motion.p
              {...headerReveal(hasEntered, 1, reduce)}
              className="mt-1 text-zinc-500"
              style={{ fontFamily: FONT_UI, fontSize: "14px" }}
            >
              Case studies, articles and side projects.
            </motion.p>
          </div>

          <motion.div
            {...headerReveal(hasEntered, 2, reduce)}
            className="flex justify-center md:hidden"
          >
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
          </motion.div>

          <motion.div
            {...headerReveal(hasEntered, 2, reduce)}
            className="hidden md:flex"
          >
            <JellyRadio
              items={DESKTOP_ITEMS}
              value={activeFilter}
              onChange={setActiveFilter}
              size="sm"
              gap={4}
              ariaLabel="Filter work by type"
            />
          </motion.div>
        </motion.header>

        <motion.div style={{ y: cardsY }}>
          <motion.ul
            layout
            className="flex w-full flex-wrap gap-3"
            transition={{ layout: layoutTransition }}
          >
            <AnimatePresence mode="popLayout">
              {filteredCards.map((card, index) => (
                <motion.li
                  key={card.id}
                  layout
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={itemTransition}
                  className={`min-h-0 min-w-0 ${cardWidth}`}
                >
                  <motion.div
                    className="h-full"
                    variants={cardVariants}
                    custom={{ index, intro: !introDone, reduce }}
                    initial="hidden"
                    animate={hasEntered ? "shown" : "hidden"}
                  >
                    <WorkCard {...card} imageClassName={COVER_CLASS} />
                  </motion.div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </motion.div>

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
