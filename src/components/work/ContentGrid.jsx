import { useMemo, useState } from "react";
import Chip from "../ui/Chip.jsx";
import ContentCard from "./ContentCard.jsx";
import { FILTER_OPTIONS } from "../../content/work.js";

const cardWidth =
  "w-[calc(50%-0.375rem)] md:w-[calc(50%-0.375rem)] lg:w-[calc(25%-0.5625rem)]";

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
      <div className="flex w-full flex-col items-center gap-2 md:flex-none md:items-center md:justify-center">
        <div
          className="flex shrink-0 flex-wrap justify-center gap-1.5 pb-4 md:pb-6"
          role="group"
          aria-label="Filter work by type"
        >
          {FILTER_OPTIONS.map(({ id, label }) => (
            <Chip
              key={id}
              active={activeFilter === id}
              onClick={() => setActiveFilter(id)}
              compact
            >
              {label}
            </Chip>
          ))}
        </div>

        <ul
          className={`flex w-full flex-wrap justify-center ${listGap} md:items-start`}
        >
          {filteredItems.map((item) => (
            <li
              key={item.id}
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
            </li>
          ))}
        </ul>

        {count === 0 && (
          <p className="text-center text-xs font-light text-zinc-500">
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
        {FILTER_OPTIONS.map(({ id, label }) => (
          <Chip
            key={id}
            active={activeFilter === id}
            onClick={() => setActiveFilter(id)}
          >
            {label}
          </Chip>
        ))}
      </div>

      <ul className={`flex w-full flex-wrap justify-center ${listGap}`}>
        {filteredItems.map((item) => (
          <li key={item.id} className={cardWidth}>
            <ContentCard
              id={item.id}
              title={item.title}
              subtitle={item.subtitle}
              tag={item.tag}
              thumbnail={item.thumbnail}
              compact={compact}
            />
          </li>
        ))}
      </ul>

      {filteredItems.length === 0 && (
        <p className="text-center text-sm font-light text-zinc-500">
          Nothing in this category yet.
        </p>
      )}
    </div>
  );
}
