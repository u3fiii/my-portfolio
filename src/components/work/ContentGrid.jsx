import { useMemo, useState } from "react";
import Chip from "../ui/Chip.jsx";
import ContentCard from "./ContentCard.jsx";
import { FILTER_OPTIONS } from "../../content/work.js";

export default function ContentGrid({ items }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredItems = useMemo(() => {
    if (activeFilter === "all") return items;
    return items.filter((item) => item.tag === activeFilter);
  }, [items, activeFilter]);

  return (
    <div className="flex flex-col gap-8">
      <div
        className="flex flex-wrap gap-2"
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

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filteredItems.map((item) => (
          <li key={item.id}>
            <ContentCard
              id={item.id}
              title={item.title}
              subtitle={item.subtitle}
              tag={item.tag}
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
