import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Chip from "../ui/Chip.jsx";
import ContentCard from "./ContentCard.jsx";
import { FILTER_OPTIONS } from "../../content/work.js";

const cardWidth =
  "w-[calc(50%-0.375rem)] md:w-[calc(50%-0.375rem)] lg:w-[calc(25%-0.5625rem)]";

const layoutTransition = { duration: 0.35, ease: [0.4, 0, 0.2, 1] };
const itemTransition = { duration: 0.25, ease: [0.4, 0, 0.2, 1] };
export default function ContentGrid({ items, compact = false, fitViewport = false }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return items;
    return items.filter((item) => item.tag === activeFilter);
  }, [items, activeFilter]);

  const listGap = fitViewport ? "gap-3" : compact ? "gap-3" : "gap-4";

  if (fitViewport) {
    const count = filteredItems.length;

    return (
      <div className="flex w-full flex-col items-center gap-2 md:flex-none md:items-center md:justify-start">
        <div
          className="flex shrink-0 flex-wrap justify-center gap-1.5 pb-4 md:pb-6"
          role="group"
          aria-label="Filter work by type"
        >
          {FILTER_OPTIONS.map(({ id, label, icon }) => (
            <Chip
              key={id}
              active={activeFilter === id}
              onClick={() => setActiveFilter(id)}
              icon={icon}
              compact
            >
              {label}
            </Chip>
          ))}
        </div>

        <motion.ul
          layout
          className={`flex w-full flex-wrap justify-center ${listGap} md:items-start`}
          transition={{ layout: layoutTransition }}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={itemTransition}
                className={`min-h-0 min-w-0 ${cardWidth}`}
              >
                <ContentCard
                  id={item.id}
                  title={item.title}
                  subtitle={item.subtitle}
                  tag={item.tag}
                  thumbnail={item.thumbnail}
                  fitViewport
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        {count === 0 && (
          <p className="text-center text-xs text-zinc-500">
            Nothing in this category yet.
          </p>
        )}
      </div>
    );
  }

  const gap = compact ? "gap-5" : "gap-8";

  return (
    <div className={`flex w-full flex-col items-center ${gap}`}>
      <div
        className="flex flex-wrap justify-center gap-2"
        role="group"
        aria-label="Filter work by type"
      >
        {FILTER_OPTIONS.map(({ id, label, icon }) => (
          <Chip
            key={id}
            active={activeFilter === id}
            onClick={() => setActiveFilter(id)}
            icon={icon}
          >
            {label}
          </Chip>
        ))}
      </div>

      <motion.ul
        layout
        className={`flex w-full flex-wrap justify-center ${listGap}`}
        transition={{ layout: layoutTransition }}
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.li
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={itemTransition}
              className={cardWidth}
            >
              <ContentCard
                id={item.id}
                title={item.title}
                subtitle={item.subtitle}
                tag={item.tag}
                thumbnail={item.thumbnail}
                compact={compact}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      {filteredItems.length === 0 && (
        <p className="text-center text-sm text-zinc-500">
          Nothing in this category yet.
        </p>
      )}
    </div>
  );
}
