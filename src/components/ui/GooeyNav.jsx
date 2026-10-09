import { motion } from "framer-motion";
import NavIcon from "./NavIcon.jsx";

/** Gap that opens on each side of the active item. */
const SEPARATION = 6;
/** Rounded outer edges vs. square seams where neighbours join. */
const RADIUS = 18;
const SEAM_RADIUS = 0;
/** A little overshoot so the bar splits and re-joins like something soft. */
const SPRING = { type: "spring", stiffness: 420, damping: 26, mass: 0.8 };

/**
 * Segmented nav where the active item lifts out of the bar: a gap opens on
 * both sides of it and the remaining items close back into one shape.
 * Labels are visually hidden below `md` (icons only).
 */
export default function GooeyNav({ items, activeId }) {
  const activeIndex = items.findIndex((item) => item.id === activeId);
  const gapBefore = (i) =>
    i > 0 && (i === activeIndex || i - 1 === activeIndex) ? SEPARATION : 0;

  return (
    <div className="flex items-center">
      {items.map(({ id, label, icon }, i) => {
        const active = i === activeIndex;
        const roundLeft = i === 0 || gapBefore(i) > 0;
        const roundRight = i === items.length - 1 || gapBefore(i + 1) > 0;
        const left = roundLeft ? RADIUS : SEAM_RADIUS;
        const right = roundRight ? RADIUS : SEAM_RADIUS;

        return (
          <motion.a
            key={id}
            href={`#${id}`}
            aria-current={active ? "true" : undefined}
            initial={false}
            animate={{
              marginLeft: gapBefore(i),
              borderTopLeftRadius: left,
              borderBottomLeftRadius: left,
              borderTopRightRadius: right,
              borderBottomRightRadius: right,
            }}
            transition={SPRING}
            className={`relative inline-flex h-9 items-center gap-1.5 px-1 min-[360px]:px-1.5 min-[375px]:px-2 font-['DM_Sans',ui-sans-serif,sans-serif] text-xs font-bold transition-colors duration-200 ease-out focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 md:px-3 ${
              active
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-800"
            }`}
          >
            <NavIcon
              name={icon}
              active={active}
              className="h-5 w-5 md:h-4 md:w-4"
            />
            <span className="max-md:sr-only">{label}</span>
          </motion.a>
        );
      })}
    </div>
  );
}
