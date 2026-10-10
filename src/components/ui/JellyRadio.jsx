/**
 * Jelly radio — adapted from React Bits "Jelly Radio" (reactbits.dev/micro/jelly-radio).
 * Copyright (c) 2026 David Haz. MIT + Commons Clause License Condition v1.0.
 *
 * The selected chip stretches wider on a bouncy spring; its neighbours slide
 * along with it. The selected chip also gains 4px of height, while its text
 * remains undistorted.
 *
 * Changes from the original: framer-motion import, width-only stretch (no
 * scale, no shrinking neighbours), outlined chips styled like the site's pill
 * buttons (thick black ring on hover), site palette colours, optional deselect
 * (`allowDeselect` → value can be null) and a visible focus ring.
 */
import { useEffect, useLayoutEffect, useRef } from "react";
import {
  animate,
  motion,
  motionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

/** [height, font-size, horizontal padding] in px */
const SIZES = { sm: [34, 13, 12], md: [38, 14, 16] };

const spring = (k, m, bounce) => ({
  type: "spring",
  stiffness: k,
  damping: 2 * Math.sqrt(k * m) * (1 - bounce),
  mass: m,
});

/** Inner pill whose side padding is driven by a motion value (`extra` px). */
function ChipFace({ extra, basePadding, style, className, children }) {
  const padding = useTransform(extra, (v) => `0 ${basePadding + v}px`);
  return (
    <motion.span className={className} style={{ ...style, padding }}>
      {children}
    </motion.span>
  );
}

export default function JellyRadio({
  items,
  value,
  onChange,
  allowDeselect = false,
  size = "md",
  gap = 6,
  /** How much wider the selected chip gets, as a fraction of its width. */
  swell = 0.12,
  jelly = 1,
  bounce = 0.25,
  stiffness = 520,
  ariaLabel = "Options",
  className = "",
}) {
  const at = items.findIndex((it) => it.value === value); // -1 = none selected
  const reduce = useReducedMotion();
  const groupRef = useRef(null);
  const chipRefs = useRef([]);
  const mvs = useRef([]);
  const applied = useRef(at);
  const cfg = useRef({});
  cfg.current = {
    swell,
    jelly,
    bounce,
    stiffness,
    reduce,
    count: items.length,
  };
  const [h, font, px] = SIZES[size] ?? SIZES.md;
  const itemsKey = items.map((it) => it.value).join("|");

  const mvFor = (i) => {
    if (!mvs.current[i]) mvs.current[i] = motionValue(0);
    return mvs.current[i];
  };

  /** A chip's natural width, without any stretch currently applied. */
  const naturalWidth = (i) => {
    const el = chipRefs.current[i];
    return el ? Math.max(0, el.offsetWidth - 2 * mvFor(i).get()) : 0;
  };

  const apply = (sel, instant) => {
    const C = cfg.current;
    for (let i = 0; i < C.count; i++) {
      const mv = mvFor(i);
      const target = i === sel ? (naturalWidth(i) * C.swell) / 2 : 0;
      if (instant || C.reduce) {
        mv.jump(target);
        continue;
      }
      // Overshoot on the way out gives the jelly wobble; settle back calmly.
      const growing = target > mv.get();
      animate(
        mv,
        target,
        growing
          ? spring(
              C.stiffness,
              0.9 - 0.1 * C.jelly,
              Math.min(0.85, C.bounce + 0.3 * C.jelly),
            )
          : spring(C.stiffness, 0.9, C.bounce),
      );
    }
  };

  // Size the stretch from real widths. A group hidden at this breakpoint
  // measures 0, so re-apply once it becomes visible (or fonts finish loading).
  useLayoutEffect(() => {
    const group = groupRef.current;
    let wasHidden = true;
    const settle = () => {
      const hidden = !group || group.offsetWidth === 0;
      if (!hidden) apply(applied.current, true);
      wasHidden = hidden;
    };
    settle();
    document.fonts?.ready.then(settle);
    const observer = new ResizeObserver(() => {
      if (wasHidden) settle();
      else if (group.offsetWidth === 0) wasHidden = true;
    });
    if (group) observer.observe(group);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemsKey, size, swell]);

  // Follow external value changes (e.g. parent resets the filter).
  useEffect(() => {
    if (applied.current === at) return;
    applied.current = at;
    apply(at, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [at]);

  useEffect(() => () => mvs.current.forEach((mv) => mv.destroy()), []);

  const commit = (i, instant) => {
    if (!items[i]) return;
    const next = i === at ? (allowDeselect ? -1 : at) : i;
    if (next === at) return;
    applied.current = next;
    apply(next, instant);
    onChange?.(next < 0 ? null : items[next].value);
  };

  const onKeyDown = (e, i) => {
    const n = items.length;
    let next = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      commit(i, true);
      return;
    }
    if (next === null) return;
    e.preventDefault();
    if (next !== at) commit(next, true);
    chipRefs.current[next]?.focus();
  };

  return (
    <div
      ref={groupRef}
      role="radiogroup"
      aria-label={ariaLabel}
      className={`inline-flex items-center py-1 select-none [-webkit-touch-callout:none] ${className}`}
      style={{ gap: `${gap}px` }}
    >
      {items.map((it, i) => {
        const on = i === at;
        return (
          <button
            key={it.value}
            ref={(el) => {
              chipRefs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={on}
            tabIndex={on || (at < 0 && i === 0) ? 0 : -1}
            className="group/chip relative m-0 shrink-0 cursor-pointer touch-manipulation border-0 bg-transparent p-0 text-inherit outline-none [-webkit-tap-highlight-color:transparent]"
            data-on={on ? "true" : "false"}
            onClick={(e) => commit(i, e.detail === 0)}
            onKeyDown={(e) => onKeyDown(e, i)}
          >
            <ChipFace
              extra={mvFor(i)}
              basePadding={px}
              style={{ height: on ? h + 4 : h, fontSize: font }}
              className="relative inline-flex items-center justify-center gap-1.5 rounded-full border border-zinc-300 bg-white font-['DM_Sans',ui-sans-serif,sans-serif] leading-none font-semibold whitespace-nowrap text-zinc-900 [transition:transform_160ms_cubic-bezier(0.23,1,0.32,1),height_200ms_cubic-bezier(0.23,1,0.32,1),background-color_200ms_ease,color_200ms_ease,border-color_200ms_ease,box-shadow_200ms_cubic-bezier(0.4,0,0.2,1)] group-active/chip:scale-[0.97] group-focus-visible/chip:ring-2 group-focus-visible/chip:ring-zinc-900 group-focus-visible/chip:ring-offset-2 group-data-[on=true]/chip:border-zinc-900 group-data-[on=true]/chip:bg-zinc-900 group-data-[on=true]/chip:text-white motion-reduce:group-active/chip:scale-100 [@media(hover:hover)_and_(pointer:fine)]:group-hover/chip:group-data-[on=false]/chip:border-transparent [@media(hover:hover)_and_(pointer:fine)]:group-hover/chip:group-data-[on=false]/chip:shadow-[0_0_0_3px_var(--color-zinc-900)]"
            >
              {it.icon ? (
                <span className="relative inline-flex">
                  {typeof it.icon === "function" ? it.icon(on) : it.icon}
                </span>
              ) : null}
              <span className="relative">{it.label}</span>
            </ChipFace>
          </button>
        );
      })}
    </div>
  );
}
