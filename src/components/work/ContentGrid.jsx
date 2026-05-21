import { useMemo, useState } from "react";
import Chip from "../ui/Chip.jsx";
import ContentCard from "./ContentCard.jsx";
import { FILTER_OPTIONS } from "../../content/work.js";

const COLS = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

function fitViewportGridClasses(count, isFullGrid) {
  if (isFullGrid) {
    return "w-full grid-cols-2 grid-rows-4 content-start lg:grid-cols-4 lg:grid-rows-2";
  }

  const mobileCols = count <= 1 ? 1 : 2;
  const lgCols = Math.min(count, 4);

  return `mx-auto w-max max-w-full content-start ${COLS[mobileCols]} lg:${COLS[lgCols]}`;
}

export default function ContentGrid({ items, compact = false, fitViewport = false }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return items;
    return items.filter((item) => item.tag === activeFilter);
  }, [items, activeFilter]);

  if (fitViewport) {
    const count = filteredItems.length;
    const isFullGrid = activeFilter === "all" && count === items.length;
    const gridClass = fitViewportGridClasses(count, isFullGrid);

    return (
      <div className="flex min-h-0 w-full flex-1 flex-col items-center gap-2">
        <div
          className="flex shrink-0 flex-wrap justify-center gap-1.5 pb-6"
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
          className={`flex min-h-0 flex-1 flex-wrap justify-center items-start gap-3 ${gridClass.replace(/grid-cols-\d+|grid-rows-\d+/g, '')}`}
     
        >
          {filteredItems.map((item) => (
            <li key={item.id} className="min-h-0 w-[250px] max-w-full">
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
  const gridGap = compact ? "gap-3" : "gap-4";

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

      <ul className={`grid w-full grid-cols-2 ${gridGap} lg:grid-cols-4`}>
        {filteredItems.map((item) => (
          <li key={item.id}>
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
