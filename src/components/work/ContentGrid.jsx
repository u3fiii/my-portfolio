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

function desktopGridClasses(count, isFullGrid) {
  if (isFullGrid) {
    return "md:h-full md:grid-cols-2 md:grid-rows-4 md:content-start lg:grid-cols-4 lg:grid-rows-2";
  }

  const lgCols = Math.min(count, 4);
  const mdCols = count <= 1 ? 1 : 2;

  return `md:mx-auto md:h-full md:w-max md:max-w-full md:content-start md:${COLS[mdCols]} lg:${COLS[lgCols]}`;
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
    const desktopGridClass = desktopGridClasses(count, isFullGrid);

    return (
      <div className="flex w-full flex-col items-center gap-2 md:min-h-0 md:flex-1">
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
          className={`grid w-full grid-cols-2 gap-3 md:min-h-0 md:flex-1 md:grid ${desktopGridClass}`}
        >
          {filteredItems.map((item) => (
            <li key={item.id} className="min-h-0 min-w-0 w-full md:h-full">
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
