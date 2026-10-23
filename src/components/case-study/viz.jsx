/**
 * Case-study figures: one shared frame and a set of small, animated
 * explanations. Every figure leads with its takeaway as a title, animates
 * once when it scrolls into view, and stays still for reduced motion.
 */
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import CarModel3D from "./CarModel3D.jsx";

export const EASE = [0.22, 1, 0.36, 1];
export const BLUE = "#0099CC";
export const BLUE_INK = "#0077A3";
// Sheypoor's brand blue and the warm neutrals of its rebuilt screens, so the
// Price Signal figures read as one family with the phone mockups.
const SP = { blue: "#2481ED", tint: "#E8F1FD", track: "#EFEFEC", muted: "#D6D6D1", red: "#D0425E", redTint: "#FDECEF" };

/** True once the element has been at least `threshold` visible. */
export function useInViewOnce(threshold = 0.35) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/** Figure shell: kicker, takeaway title, body, caption. */
export function VizFrame({ kicker, title, caption, captionStyle, children, frameRef, className = "" }) {
  return (
    <figure ref={frameRef} className={`cs-viz case-study__ui ${className}`}>
      {kicker || title ? (
        <header className="mb-6">
          {kicker ? <p className="cs-viz__kicker">{kicker}</p> : null}
          {title ? <p className="cs-viz__title">{title}</p> : null}
        </header>
      ) : null}
      {children}
      {caption ? (
        <figcaption className="cs-viz__caption" style={captionStyle}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Animates the number inside a value like "23%", "+10%" or "1.5×". */
export function CountUp({ value, active, duration = 1.1 }) {
  const reduce = useReducedMotion();
  const match = /^([^\d]*)([\d.]+)(.*)$/.exec(String(value));
  const target = match ? parseFloat(match[2]) : null;
  const decimals = match && match[2].includes(".") ? match[2].split(".")[1].length : 0;
  const [shown, setShown] = useState(reduce || target === null ? target : 0);

  useEffect(() => {
    if (target === null || !active) return;
    if (reduce) {
      setShown(target);
      return;
    }
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / (duration * 1000));
      setShown(target * (1 - Math.pow(1 - t, 3)));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration, reduce]);

  if (!match) return value;
  return (
    <span className="tabular-nums">
      {match[1]}
      {shown.toFixed(decimals)}
      {match[3]}
    </span>
  );
}

/** A bar that grows from zero to `value`% once `active`. */
function Bar({ value, color, active, delay = 0, height = "h-2.5", track }) {
  const reduce = useReducedMotion();
  return (
    <div className={`${height} w-full overflow-hidden rounded-full ${track ? "" : "bg-zinc-100"}`} style={track ? { background: track } : undefined}>
      <motion.div
        className="h-full rounded-full"
        style={{ background: color, originX: 0 }}
        initial={{ scaleX: reduce ? value / 100 : 0 }}
        animate={active ? { scaleX: value / 100 } : undefined}
        transition={{ duration: 1, delay, ease: EASE }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* Stat cards                                                                */
/* ------------------------------------------------------------------------ */

/**
 * Counting numbers with a short label, each with a small visual underneath:
 * a share gets a bar, a "+N%" lift gets two bars compared.
 */
export function StatCards({ items, title, kicker }) {
  const [ref, inView] = useInViewOnce();
  return (
    <VizFrame frameRef={ref} kicker={kicker} title={title}>
      <div className="grid gap-3 min-[600px]:grid-cols-3">
        {items.map(({ value, label }, index) => {
          const share = /^\d+%$/.test(value) ? parseFloat(value) : null;
          const lift = /^\+\d+%$/.test(value) ? parseFloat(value.slice(1)) : null;
          return (
            <div
              key={label}
              className="flex flex-col rounded-[20px] bg-white p-5 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_6px_18px_-8px_rgb(0_0_0/0.08)] dark:bg-zinc-100"
            >
              <p className="text-[2.25rem] font-semibold leading-none tracking-[-0.03em]" style={{ color: SP.blue }}>
                <CountUp value={value} active={inView} />
              </p>
              <p className="mt-3 flex-1 text-[13px] leading-snug text-zinc-600">{label}</p>
              <div className="mt-5">
                {share !== null ? (
                  <Bar value={share} color={SP.blue} track={SP.track} active={inView} delay={index * 0.12} height="h-2" />
                ) : lift !== null ? (
                  <div className="flex flex-col gap-1.5">
                    {[
                      { name: "Others", v: 100 / (1 + lift / 100), color: SP.muted },
                      { name: "Fair price", v: 100, color: SP.blue },
                    ].map((row, i) => (
                      <div key={row.name} className="flex items-center gap-2">
                        <span className="w-14 shrink-0 text-[10.5px] font-medium text-zinc-400">{row.name}</span>
                        <Bar value={row.v} color={row.color} track={SP.track} active={inView} delay={index * 0.12 + i * 0.15} height="h-2" />
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>
    </VizFrame>
  );
}

/* ------------------------------------------------------------------------ */
/* Price Signal: interactive price → badge                                   */
/* ------------------------------------------------------------------------ */

const BADGES = {
  red: "bg-[#FCEBEB] text-[#A32D2D] dark:bg-[#3A1D1D] dark:text-[#FFB4B4]",
  yellow: "bg-[#FAEEDA] text-[#633806] dark:bg-[#352711] dark:text-[#F3C982]",
  blue: "bg-[#E6F1FB] text-[#0C447C] dark:bg-[#132A40] dark:text-[#9DCCFA]",
  green: "bg-[#EAF3DE] text-[#27500A] dark:bg-[#1D2D16] dark:text-[#B8DD9B]",
};
const TRACK = { red: "#E5807A", yellow: "#EBC06A", blue: "#6FB6E8", green: "#8CC56A" };

const FAIR_PRICE = 1_850_000_000;
const MIN_DEV = -20;
const MAX_DEV = 40;

/**
 * A sample listing whose badge follows its price. The scale is split into
 * equal zones, one per label; the thumb moves through them, and its position
 * maps to a price (piecewise, so each zone's edge sits at its threshold).
 * `states`: [{ label, variant, from, hint }] ordered by `from` (% vs fair).
 */
export function PriceSignalPlayground({ states, caption, captionStyle }) {
  const reduce = useReducedMotion();
  const [ref, inView] = useInViewOnce(0.5);
  const count = states.length;
  const knots = [MIN_DEV, ...states.slice(1).map((s) => s.from), MAX_DEV];
  const fairIndex = Math.max(0, states.findIndex((s) => s.label === "Fair price"));
  const [pos, setPos] = useState(reduce ? fairIndex + 0.5 : count - 0.5);
  const touched = useRef(false);

  // One demo sweep: from the highest zone down to the fair one.
  useEffect(() => {
    if (!inView || reduce) return;
    let frame;
    const start = performance.now();
    const from = count - 0.5;
    const to = fairIndex + 0.5;
    const tick = (now) => {
      if (touched.current) return;
      const t = Math.min(1, (now - start) / 1300);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setPos(from + (to - from) * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, count, fairIndex]);

  const posToDev = (p) => {
    const i = Math.min(count - 1, Math.floor(p));
    return knots[i] + (knots[i + 1] - knots[i]) * (p - i);
  };
  const dev = posToDev(pos);
  const activeIndex = Math.min(count - 1, Math.floor(pos));
  const active = states[activeIndex];
  const price = Math.round((FAIR_PRICE * (1 + dev / 100)) / 10_000_000) * 10_000_000;
  const cell = { gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` };

  return (
    <VizFrame frameRef={ref} caption={caption} captionStyle={captionStyle}>
      <div className="grid gap-6 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:items-center md:gap-8">
        {/* Sample listing */}
        <div className="rounded-xl border border-zinc-100 bg-white p-3 shadow-[0_1px_2px_rgb(0_0_0/3%)]">
          <div className="flex items-start gap-3">
            <div className="flex w-24 shrink-0 flex-col items-stretch">
              <CarModel3D className="h-14 w-24 overflow-hidden rounded-lg bg-zinc-100" />
              <div className="mt-2 flex h-6 justify-center">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={active.label}
                    initial={{ opacity: 0, y: 4, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -4, scale: 0.96 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    className={`inline-flex h-6 w-24 items-center justify-center truncate rounded-full px-2 text-[11px] font-semibold leading-none ${BADGES[active.variant]}`}
                  >
                    {active.label}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="truncate text-[13px] font-semibold text-zinc-900">Pride 111</p>
              <p className="mt-0.5 text-[11px] text-zinc-500">85,000 km · Tehran</p>
              <p className="mt-1.5 text-[13px] font-semibold tabular-nums text-zinc-900">
                {price.toLocaleString("en-US")} <span className="text-[11px] font-normal text-zinc-500">toman</span>
              </p>
            </div>
          </div>
        </div>

        {/* Price scale */}
        <div className="md:translate-y-5">
          <div className="mb-2 grid h-4 text-center text-[11px] text-zinc-500" style={cell}>
            {states.map((_, i) => {
              const text =
                i === 0 ? "Below market" : i === fairIndex ? "Fair" : i === count - 1 ? "Far above" : "High";
              return (
                <span
                  key={i}
                  className={`whitespace-nowrap transition-opacity duration-300 ${i === activeIndex ? "opacity-100 text-zinc-800" : "opacity-40"}`}
                  style={{ gridRow: 1, gridColumn: i + 1 }}
                >
                  {text}
                </span>
              );
            })}
          </div>
          <div className="relative flex h-6 items-center">
            <div className="relative h-2 w-full overflow-hidden rounded-full">
              {states.map((s, i) => (
                <span
                  key={s.label}
                  className="absolute inset-y-0 transition-opacity duration-200"
                  style={{
                    left: `${(i / count) * 100}%`,
                    width: `${100 / count}%`,
                    background: TRACK[s.variant],
                    opacity: i === activeIndex ? 1 : 0.4,
                  }}
                />
              ))}
            </div>
            <input
              type="range"
              min={0}
              max={count * 100}
              step={1}
              value={Math.round(pos * 100)}
              onChange={(e) => {
                touched.current = true;
                setPos(Number(e.target.value) / 100);
              }}
              aria-label="Listing price compared with the fair market price"
              aria-valuetext={`${active.label}`}
              className="cs-range absolute inset-x-0 top-0 w-full"
            />
          </div>
          <ul className="mt-5 grid gap-y-5 text-center" style={cell}>
            {states.map((s, i) => {
              const on = i === activeIndex;
              return (
                <li key={s.label} className="flex flex-col items-center">
                  <motion.span
                    animate={{ scale: on ? 1.08 : 1 }}
                    transition={{ type: "spring", stiffness: 420, damping: 22 }}
                    className={`inline-flex h-6 w-[6.75rem] items-center justify-center rounded-full px-2 text-[11px] font-semibold leading-none whitespace-nowrap transition-opacity duration-300 ${BADGES[s.variant]} ${
                      on ? "opacity-100" : "opacity-45"
                    }`}
                  >
                    {s.label}
                  </motion.span>
                  <span className="mt-2 flex h-12 items-start justify-center overflow-hidden">
                    <AnimatePresence initial={false}>
                      {on ? (
                        <motion.span
                          key="hint"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.3, ease: EASE }}
                          className="block text-[11px] leading-snug text-zinc-500"
                        >
                          {s.hint}
                        </motion.span>
                      ) : null}
                    </AnimatePresence>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </VizFrame>
  );
}

/* ------------------------------------------------------------------------ */
/* Price Signal: the form reorder                                            */
/* ------------------------------------------------------------------------ */

const DETAIL_FIELDS = [
  { id: "brand", label: "Brand & model", value: "Peugeot 207" },
  { id: "year", label: "Year of manufacture", value: "2019" },
  { id: "mileage", label: "Mileage", value: "85,000 km" },
  { id: "condition", label: "Body condition", value: "Minor scratches" },
];

const REORDER_COPY = {
  before: {
    title: "Price came first.",
    body: "Sellers set a price before telling us anything about the car, so we had nothing to estimate from — and nothing to say until the listing was live.",
  },
  after: {
    title: "Price comes last.",
    body: "By the time sellers reach the price, we know the model, year, mileage, and condition. The field arrives pre-filled with a fair estimate, and feedback lands before submitting.",
  },
};

/** One form, two orders: the price field travels from first to last. */
export function FormReorder() {
  const reduce = useReducedMotion();
  const [ref, inView] = useInViewOnce(0.5);
  const [mode, setMode] = useState(reduce ? "after" : "before");
  const touched = useRef(false);

  useEffect(() => {
    if (!inView || reduce) return;
    const id = window.setTimeout(() => {
      if (!touched.current) setMode("after");
    }, 1400);
    return () => window.clearTimeout(id);
  }, [inView, reduce]);

  const choose = (next) => {
    touched.current = true;
    setMode(next);
  };

  // The price card "lifts" while it travels to its new slot, then settles.
  const [lifted, setLifted] = useState(false);
  const firstMode = useRef(true);
  useEffect(() => {
    if (firstMode.current) {
      firstMode.current = false;
      return;
    }
    if (reduce) return;
    setLifted(true);
    const id = window.setTimeout(() => setLifted(false), 520);
    return () => window.clearTimeout(id);
  }, [mode, reduce]);

  const isAfter = mode === "after";
  const price = { id: "price", label: "Price" };
  const order = isAfter ? [...DETAIL_FIELDS, price] : [price, ...DETAIL_FIELDS];
  const copy = REORDER_COPY[mode];

  return (
    <VizFrame
      frameRef={ref}
      kicker="The listing form"
      title="Moving one field changed when feedback could arrive."
      caption="Same fields, same single page — only the order changed."
    >
      <div role="group" aria-label="Form order" className="mb-5 inline-flex rounded-full bg-zinc-100 p-1">
        {["before", "after"].map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => choose(m)}
            aria-pressed={mode === m}
            className={`relative cursor-pointer rounded-full px-4 py-1.5 text-[12px] font-semibold transition-colors ${
              mode === m ? "text-zinc-900" : "text-zinc-500 hover:text-zinc-700"
            }`}
          >
            {mode === m ? (
              <motion.span
                layoutId="reorder-pill"
                className="absolute inset-0 rounded-full bg-white shadow-[0_1px_2px_rgb(0_0_0/8%)]"
                transition={{ duration: 0.3, ease: EASE }}
              />
            ) : null}
            <span className="relative">{m === "before" ? "Before" : "After"}</span>
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] md:gap-8">
        <ol className="flex flex-col gap-2">
          {order.map((field, index) => {
            const isPrice = field.id === "price";
            const priceStyle = isPrice
              ? isAfter
                ? { background: "#fff", boxShadow: `inset 0 0 0 1.5px ${SP.blue}` }
                : { background: SP.redTint }
              : undefined;
            return (
              <motion.li
                key={field.id}
                layout={!reduce}
                style={{ position: "relative", zIndex: isPrice ? 2 : 1 }}
                animate={
                  isPrice && lifted
                    ? { scale: 1.035, filter: "drop-shadow(0 16px 22px rgb(0 0 0 / 0.16))" }
                    : { scale: 1, filter: "drop-shadow(0 0 0 rgb(0 0 0 / 0))" }
                }
                transition={{
                  // Spring travel: the price card leads, the others make way a beat later.
                  layout: isPrice
                    ? { type: "spring", stiffness: 210, damping: 26, mass: 1.1 }
                    : { type: "spring", stiffness: 300, damping: 30, delay: 0.04 + index * 0.03 },
                  scale: { type: "spring", stiffness: 380, damping: 24 },
                  filter: { duration: 0.35, ease: EASE },
                }}
              >
                <div
                  className="flex min-h-[58px] items-center gap-3 rounded-[16px] bg-[#F5F5F3] px-4 py-2.5 transition-[background-color,box-shadow] duration-500 dark:bg-zinc-100"
                  style={priceStyle}
                >
                  <span className="w-4 shrink-0 text-[11px] font-semibold tabular-nums text-zinc-400">{index + 1}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-medium text-zinc-400">{field.label}</span>
                    <span
                      className="mt-0.5 block truncate text-[14px] font-semibold tracking-[-0.01em]"
                      style={{ color: isPrice && !isAfter ? SP.red : "var(--color-zinc-900)" }}
                    >
                      {isPrice ? (isAfter ? "1,850,000,000 toman" : "Empty — no car details yet") : field.value}
                    </span>
                  </span>
                  {isPrice && isAfter ? (
                    <span className="shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold" style={{ background: SP.tint, color: SP.blue }}>
                      Fair price
                    </span>
                  ) : null}
                </div>
              </motion.li>
            );
          })}
          <li className="mt-1 flex h-[50px] items-center justify-center rounded-full text-[13.5px] font-semibold text-white" style={{ background: SP.blue }}>
            Post ad
          </li>
        </ol>

        <div className="md:pt-1">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="rounded-[18px] px-5 py-4"
              style={{ background: isAfter ? SP.tint : SP.redTint }}
            >
              <p className="text-[14.5px] font-semibold" style={{ color: isAfter ? SP.blue : SP.red }}>
                {copy.title}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-zinc-700">{copy.body}</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </VizFrame>
  );
}

/* ------------------------------------------------------------------------ */
/* Before → after shift (a single share)                                     */
/* ------------------------------------------------------------------------ */

/** Two bars for one metric, with the change called out. */
export function ShareShift({ kicker, title, rows, delta, footer = [], caption }) {
  const [ref, inView] = useInViewOnce();
  return (
    <VizFrame frameRef={ref} kicker={kicker} title={title} caption={caption}>
      <div className="flex flex-col gap-5">
        {rows.map((row, index) => (
          <div key={row.label}>
            <div className="mb-2 flex items-baseline justify-between gap-3">
              <p className="text-[13px] text-zinc-600">
                <span className="font-semibold text-zinc-900">{row.label}</span>
                {row.note ? <span> · {row.note}</span> : null}
              </p>
              <p
                className="text-[1.875rem] font-semibold leading-none tracking-[-0.03em]"
                style={{ color: row.highlight ? SP.blue : "var(--color-zinc-400)" }}
              >
                <CountUp value={`${row.value}%`} active={inView} />
              </p>
            </div>
            <Bar value={row.value} color={row.highlight ? SP.blue : SP.muted} track={SP.track} active={inView} delay={index * 0.25} height="h-2.5" />
          </div>
        ))}
      </div>
      {delta ? (
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.4, delay: 1.1, ease: EASE }}
          className="mt-5 inline-flex rounded-full px-3 py-1 text-[12px] font-semibold"
          style={{ background: SP.tint, color: SP.blue }}
        >
          {delta}
        </motion.p>
      ) : null}
      {footer.length ? (
        <dl className="mt-6 grid gap-3 min-[520px]:grid-cols-3">
          {footer.map(({ value, label }) => (
            <div key={label} className="rounded-[16px] bg-white p-4 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_6px_18px_-8px_rgb(0_0_0/0.08)] dark:bg-zinc-100">
              <dt className="text-[1.375rem] font-semibold leading-none tracking-[-0.02em]" style={{ color: SP.blue }}>
                <CountUp value={value} active={inView} />
              </dt>
              <dd className="mt-1.5 text-[12px] leading-snug text-zinc-500">{label}</dd>
            </div>
          ))}
        </dl>
      ) : null}
    </VizFrame>
  );
}

/** One headline number pair, e.g. "10% → 23%". */
export function HeadlineStat({ before, after, label, kicker }) {
  const [ref, inView] = useInViewOnce();
  return (
    <VizFrame frameRef={ref} kicker={kicker}>
      <div className="flex flex-wrap items-end gap-x-5 gap-y-2">
        <p className="text-[2.75rem] font-semibold leading-none tracking-tight text-zinc-400">
          <CountUp value={before} active={inView} />
        </p>
        <motion.span
          aria-hidden
          initial={{ opacity: 0, x: -6 }}
          animate={inView ? { opacity: 1, x: 0 } : undefined}
          transition={{ duration: 0.4, delay: 0.3, ease: EASE }}
          className="pb-2 text-2xl text-zinc-300"
        >
          →
        </motion.span>
        <p className="text-[2.75rem] font-semibold leading-none tracking-tight" style={{ color: BLUE_INK }}>
          <CountUp value={after} active={inView} duration={1.4} />
        </p>
      </div>
      <p className="mt-3 max-w-md text-[14px] leading-relaxed text-zinc-600">{label}</p>
    </VizFrame>
  );
}

/* ------------------------------------------------------------------------ */
/* Funnel bars (Pindo)                                                       */
/* ------------------------------------------------------------------------ */

/**
 * Funnel stages as bars. "before" mode annotates the drops between stages;
 * "compare" mode overlays before/after with the gain per stage.
 */
export function FunnelBars({ stages, mode = "before", notes = {}, kicker, title, caption }) {
  const [ref, inView] = useInViewOnce();
  const compare = mode === "compare";

  return (
    <VizFrame frameRef={ref} kicker={kicker} title={title} caption={caption}>
      {compare ? (
        <div className="mb-5 flex flex-wrap gap-5 text-[12px] text-zinc-500">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#C9C9CF]" aria-hidden />
            Before
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: BLUE }} aria-hidden />
            After the redesign
          </span>
        </div>
      ) : null}

      <ol className="flex flex-col">
        {stages.map((stage, index) => {
          const delay = index * 0.18;
          const prev = stages[index - 1];
          const drop = prev ? prev.before - stage.before : 0;
          const note = notes[index];
          return (
            <li key={stage.label}>
              {index > 0 && !compare ? (
                <div className="flex items-center gap-3 py-2 pl-1">
                  <span className="h-6 w-px bg-zinc-200" aria-hidden />
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : undefined}
                    transition={{ duration: 0.4, delay: delay + 0.3 }}
                    className={`text-[11px] ${note ? "font-semibold text-[#A32D2D]" : "text-zinc-400"}`}
                  >
                    −{drop} pts{note ? ` · ${note}` : ""}
                  </motion.p>
                </div>
              ) : null}
              <div className={`grid gap-2 sm:grid-cols-[9rem_minmax(0,1fr)_4.5rem] sm:items-center sm:gap-4 ${compare && index > 0 ? "mt-5" : ""}`}>
                <p className="text-[13px] font-semibold text-zinc-800">{stage.label}</p>
                <div className="flex flex-col gap-1.5">
                  <Bar value={stage.before} color={compare ? "#C9C9CF" : BLUE} active={inView} delay={delay} />
                  {compare ? <Bar value={stage.after} color={BLUE} active={inView} delay={delay + 0.12} /> : null}
                </div>
                <p className="text-[13px] tabular-nums sm:text-right">
                  {compare ? (
                    <>
                      <span className="text-zinc-400">{stage.before}%</span>{" "}
                      <span className="font-semibold" style={{ color: BLUE_INK }}>
                        {stage.after}%
                      </span>
                    </>
                  ) : (
                    <span className="font-semibold text-zinc-900">{stage.before}%</span>
                  )}
                </p>
              </div>
              {compare && stage.after !== stage.before ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : undefined}
                  transition={{ duration: 0.4, delay: delay + 0.8 }}
                  className="mt-1.5 text-[11px] font-semibold text-[#27500A] sm:pl-[10rem] dark:text-[#B8DD9B]"
                >
                  +{stage.after - stage.before} pts
                </motion.p>
              ) : null}
            </li>
          );
        })}
      </ol>
    </VizFrame>
  );
}

/* ------------------------------------------------------------------------ */
/* Journey line (Bitpin)                                                     */
/* ------------------------------------------------------------------------ */

/** Steps on a line that draws up to the stop where users hesitated. */
export function JourneyLine({ steps, stopAt, stopLabel, kicker, title, caption }) {
  const reduce = useReducedMotion();
  const [ref, inView] = useInViewOnce();
  const stopIndex = steps.indexOf(stopAt);
  const reach = steps.length > 1 ? (stopIndex / (steps.length - 1)) * 100 : 0;

  return (
    <VizFrame frameRef={ref} kicker={kicker} title={title} caption={caption}>
      <div className="relative px-2 pb-2 pt-1">
        {/* Runs from the centre of the first step to the centre of the last one (centres sit at 1/2n of each column). */}
        <div
          className="absolute top-[14px] h-[3px] rounded-full bg-zinc-200"
          style={{ left: `${100 / (2 * steps.length)}%`, right: `${100 / (2 * steps.length)}%` }}
          aria-hidden
        >
          <motion.div
            className="h-full rounded-full"
            style={{ background: "#111", originX: 0 }}
            initial={{ scaleX: reduce ? reach / 100 : 0 }}
            animate={inView ? { scaleX: reach / 100 } : undefined}
            transition={{ duration: 1.4, ease: EASE }}
          />
        </div>
        <ol className="relative grid" style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}>
          {steps.map((step, index) => {
            const isStop = index === stopIndex;
            const passed = index < stopIndex;
            const delay = (index / Math.max(1, stopIndex)) * 1.2;
            return (
              <li key={step} className="flex flex-col items-center text-center">
                <motion.span
                  initial={{ scale: reduce ? 1 : 0.6, opacity: reduce ? 1 : 0.4 }}
                  animate={inView ? { scale: 1, opacity: 1 } : undefined}
                  transition={{ duration: 0.35, delay: index <= stopIndex ? delay : 1.5 }}
                  className={`relative flex h-8 w-8 -translate-y-[2px] items-center justify-center rounded-full border-[3px] text-[11px] font-bold ${
                    isStop
                      ? "border-[#00C77F] bg-[#00C77F] text-white"
                      : passed
                        ? "border-[#111] bg-white text-[#111]"
                        : "border-zinc-300 bg-white text-zinc-400"
                  }`}
                >
                  {isStop && !reduce ? (
                    <motion.span
                      aria-hidden
                      className="absolute inset-[-6px] rounded-full border-2 border-[#00C77F]"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: [0, 0.6, 0], scale: [0.8, 1.25, 1.4] } : undefined}
                      transition={{ duration: 1.8, delay: 1.4, repeat: Infinity, repeatDelay: 0.6 }}
                    />
                  ) : null}
                  {passed ? "✓" : index + 1}
                </motion.span>
                <span className={`mt-2.5 text-[12px] font-semibold ${index > stopIndex ? "text-zinc-400" : isStop ? "text-[#00875A]" : "text-zinc-900"}`}>
                  {step}
                </span>
                {isStop ? (
                  <motion.span
                    initial={{ opacity: 0, y: 4 }}
                    animate={inView ? { opacity: 1, y: 0 } : undefined}
                    transition={{ duration: 0.4, delay: 1.5 }}
                    className="mt-1 rounded-full bg-[#E6FAF2] px-2 py-0.5 text-[10px] font-semibold text-[#00875A]"
                  >
                    {stopLabel}
                  </motion.span>
                ) : null}
              </li>
            );
          })}
        </ol>
      </div>
    </VizFrame>
  );
}
