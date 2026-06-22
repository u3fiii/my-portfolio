import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Section from "../layout/Section.jsx";
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
  { id: "all", label: "All", Icon: IconLayoutGrid },
  { id: "project", label: "Projects", Icon: IconBriefcase },
  { id: "article", label: "Articles", Icon: IconArticle },
  { id: "case-study", label: "Case studies", Icon: IconBook2 },
];

function IconLayoutGrid({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
      <path d="M14 4m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
      <path d="M4 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
      <path d="M14 14m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" />
    </svg>
  );
}

function IconBriefcase({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 7m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
      <path d="M8 7v-2a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v2" />
      <path d="M12 12l0 .01" />
      <path d="M3 13a20 20 0 0 0 18 0" />
    </svg>
  );
}

function IconArticle({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 4m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
      <path d="M7 8h10" />
      <path d="M7 12h10" />
      <path d="M7 16h10" />
    </svg>
  );
}

function IconBook2({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M19 4v16h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h12z" />
      <path d="M19 16h-12a2 2 0 0 0 -2 2" />
      <path d="M9 8h6" />
    </svg>
  );
}

function FilterTab({ active, onClick, label, Icon, size = "desktop" }) {
  const sizeClass =
    size === "mobile"
      ? "px-3.5 py-1.5 text-sm"
      : "px-4 py-2 text-sm md:gap-1.5";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex shrink-0 cursor-pointer items-center whitespace-nowrap rounded-full font-['DM_Sans',ui-sans-serif,sans-serif] font-semibold ${sizeClass} ${
        active
          ? "border border-zinc-900 bg-zinc-900 text-white"
          : "pill-hover-ring border border-zinc-300 bg-white text-zinc-900"
      }`}
    >
      {Icon ? (
        <Icon className="hidden h-[1.125rem] w-[1.125rem] shrink-0 md:block" />
      ) : null}
      {label}
    </button>
  );
}

const MOBILE_TABS = TABS.filter((tab) => tab.id !== "all");

const layoutTransition = { duration: 0.35, ease: [0.4, 0, 0.2, 1] };
const itemTransition = { duration: 0.25, ease: [0.4, 0, 0.2, 1] };

const cardWidth =
  "w-full min-[600px]:w-[calc(50%-0.3125rem)] min-[900px]:w-[calc(33.333%-0.417rem)]";

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
      contentMaxWidth="max-w-xl min-[600px]:max-w-2xl min-[900px]:max-w-[42rem]"
      tallOnMobile={false}
    >
      <div
        className="flex w-full flex-col items-center gap-5 py-4 pt-2 md:gap-6 md:py-6"
        style={SECTION_TOKENS}
      >
        <header className="w-full max-w-lg text-center">
          <h2 className="font-['Source_Serif_4',Georgia,serif] text-[1.375rem] font-semibold tracking-[-0.02em] text-zinc-900 md:text-2xl lg:text-3xl">
            Work
          </h2>
          <p className="mx-auto mt-3 max-w-lg font-['DM_Sans',ui-sans-serif,sans-serif] text-lg font-medium leading-relaxed text-zinc-700">
            Case studies, projects, and writing from the field.
          </p>
        </header>

        <div
          className="flex w-full max-w-full flex-nowrap justify-center gap-2 md:hidden"
          role="group"
          aria-label="Filter work by type"
        >
          {MOBILE_TABS.map(({ id, label, Icon }) => (
            <FilterTab
              key={id}
              size="mobile"
              active={activeFilter === id}
              onClick={() => handleMobileFilterClick(id)}
              label={label}
              Icon={Icon}
            />
          ))}
        </div>

        <div
          className="hidden w-full flex-wrap justify-center gap-2 md:flex"
          role="group"
          aria-label="Filter work by type"
        >
          {TABS.map(({ id, label, Icon }) => (
            <FilterTab
              key={id}
              active={activeFilter === id}
              onClick={() => setActiveFilter(id)}
              label={label}
              Icon={Icon}
            />
          ))}
        </div>

        <motion.ul
          layout
          className="mx-auto flex w-full max-w-[42rem] flex-wrap justify-center gap-2.5"
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
