import { getRelatedWorkCards } from "../../content/workCards.js";
import WorkCard from "./WorkCard.jsx";

const SECTION_TOKENS = {
  "--color-background-primary": "var(--color-white)",
  "--color-background-secondary": "var(--color-zinc-100)",
  "--color-text-tertiary": "var(--color-zinc-400)",
  "--color-border-tertiary": "var(--color-zinc-200)",
  "--color-border-secondary": "var(--color-zinc-500)",
};

export default function RelatedWorkSection({
  excludeId,
  heading = "More stuff to read",
  count = 2,
}) {
  const items = getRelatedWorkCards(excludeId, count);

  if (items.length === 0) return null;

  return (
    <section className="mt-16 border-t border-zinc-200 pt-8">
      <h2 className="font-['DM_Sans',ui-sans-serif,sans-serif] text-[13px] font-medium uppercase tracking-[0.08em] text-zinc-500">
        {heading}
      </h2>
      <ul
        className="mt-5 grid grid-cols-1 gap-2.5 min-[520px]:grid-cols-2"
        style={SECTION_TOKENS}
      >
        {items.map((card) => (
          <li key={card.id} className="min-w-0">
            <WorkCard {...card} />
          </li>
        ))}
      </ul>
    </section>
  );
}
