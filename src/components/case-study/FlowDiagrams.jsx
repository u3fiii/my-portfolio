import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/** Diagrams drawn in code, in the case-study palette. */

const ARROW = (
  <span aria-hidden className="cs-flow__arrow">
    →
  </span>
);

function FlowStep({ title, detail, pain, dashed = false }) {
  return (
    <div className="flex flex-col items-stretch gap-2">
      <div
        className={`flex flex-1 flex-col justify-center rounded-xl border bg-white px-4 py-3.5 text-center ${
          dashed ? "border-dashed border-zinc-300" : "border-zinc-200"
        }`}
      >
        <p className="text-[13px] font-semibold text-zinc-900">{title}</p>
        {detail ? <p className="mt-0.5 text-[12px] text-zinc-500">{detail}</p> : null}
      </div>
      {pain ? (
        <p className="mx-auto rounded-full border border-red-200 bg-red-50 px-3 py-1 text-center text-[11px] font-medium leading-snug text-red-700">
          {pain}
        </p>
      ) : null}
    </div>
  );
}

function Legend() {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-5 text-[12px] text-zinc-500">
      <span className="inline-flex items-center gap-2">
        <span className="h-3 w-3 rounded-[3px] border border-zinc-400 bg-white" aria-hidden />
        Flow step
      </span>
      <span className="inline-flex items-center gap-2">
        <span className="h-3 w-3 rounded-full border border-red-300 bg-red-50" aria-hidden />
        Pain point
      </span>
    </div>
  );
}

/** Secure Purchase as it was: six steps across two rows, one dashed off-product step. */
export function EscrowAsIsDiagram() {
  return (
    <figure className="case-study__ui my-4 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-8">
      <Legend />
      <div className="grid gap-x-6 gap-y-7 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-start">
        <FlowStep title="Browse & order" detail="Product page" pain="No shipping method or ETA" />
        {ARROW}
        <FlowStep title="Pay" detail="Funds held by Pindo" pain="Return rules unwritten" />
        {ARROW}
        <FlowStep title="Seller ships" detail="Marks as sent" pain="No delivery window" />
      </div>
      <div className="mt-7 grid gap-x-6 gap-y-7 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-start">
        <FlowStep title={'"Received?" prompt'} detail="Shown immediately" pain="Days in limbo, no state" />
        {ARROW}
        <FlowStep title="Confirm & rate" detail="Funds released" pain="No item-condition check" />
        <span aria-hidden className="cs-flow__arrow cs-flow__arrow--dashed">
          ⇢
        </span>
        <FlowStep
          title="Return via phone"
          detail="Outside the product"
          pain="Manual, unlogged, 20–25/day"
          dashed
        />
      </div>
    </figure>
  );
}

/** Shipping rule after the change: one decision, two outcomes. */
export function ShippingDecisionDiagram() {
  return (
    <figure className="case-study__ui my-4 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-8">
      <div className="grid gap-5 md:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] md:items-center">
        <FlowStep title="Buyer pays" detail="Payment completes" />
        {ARROW}
        <FlowStep title="Seller is prompted" detail="Push asks them to ship" />
        {ARROW}
        <div className="flex flex-col items-center gap-3 rounded-xl border border-[#99DAEF] bg-[#E6F1FB] px-4 py-4 text-center">
          <p className="text-[13px] font-semibold text-[#0077A3]">Shipped within 24 hours?</p>
          <div className="flex w-full justify-around gap-3 text-[11px] font-semibold">
            <span className="rounded-full bg-white px-2.5 py-1 text-zinc-600">No</span>
            <span className="rounded-full bg-white px-2.5 py-1 text-zinc-600">Yes</span>
          </div>
        </div>
        <div className="grid gap-3">
          <FlowStep title="Support follows up" detail="Contacts the seller about the delay" />
          <FlowStep title={'Order: "in transit"'} detail="Buyer sees the new state" />
        </div>
      </div>
    </figure>
  );
}

const BAR_ROWS = [
  { label: "Cart created", before: 100, after: 100 },
  { label: "Paid", before: 24, after: 39 },
  { label: "Delivered", before: 16, after: 34 },
  { label: "Confirmed item OK", before: 10, after: 23 },
];

/**
 * Before/after bars per funnel stage. Bars grow from zero once the chart is in
 * view, one row after another, so the change reads as a sequence.
 */
export function BeforeAfterBars({ footnote = "Success redefined: the bottom of the funnel is the buyer confirming item condition, not delivery." }) {
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
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const bar = (value, color, delay) => (
    <motion.div
      className="h-2.5 rounded-sm"
      style={{ background: color, originX: 0 }}
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: value / 100 } : undefined}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    />
  );

  return (
    <figure
      ref={ref}
      className="case-study__ui my-4 overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-8"
    >
      <div className="mb-6 flex flex-wrap items-center gap-5 text-[12px] text-zinc-500">
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-zinc-300" aria-hidden />
          Before
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-sm bg-[#0099CC]" aria-hidden />
          After redesign
        </span>
      </div>

      <div className="flex flex-col gap-6">
        {BAR_ROWS.map((row, index) => {
          const base = index * 0.12;
          return (
            <div key={row.label} className="grid gap-2 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:items-center sm:gap-5">
              <p className="text-[13px] font-semibold text-zinc-800 sm:text-right">{row.label}</p>
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-3">
                  <div className="h-2.5 min-w-0 flex-1">{bar(row.before, "#D4D4D8", base)}</div>
                  <span className="w-10 text-[12px] tabular-nums text-zinc-500">{row.before}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2.5 min-w-0 flex-1">{bar(row.after, "#0099CC", base + 0.15)}</div>
                  <span className="w-10 text-[12px] font-semibold tabular-nums text-[#0077A3]">{row.after}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <figcaption className="mt-7 text-[12px] leading-relaxed text-zinc-500 sm:pl-[10.5rem]">
        {footnote}
      </figcaption>
    </figure>
  );
}
