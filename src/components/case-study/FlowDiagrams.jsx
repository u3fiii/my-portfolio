/** Flow diagrams drawn in code; steps reveal in order as the figure scrolls in. */
import { motion, useReducedMotion } from "framer-motion";
import { EASE, VizFrame, useInViewOnce } from "./viz.jsx";

function Reveal({ active, delay, children, className = "" }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={active ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.45, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

function Arrow({ active, delay, dashed = false }) {
  return (
    <Reveal active={active} delay={delay} className="flex items-center justify-center text-zinc-300 max-md:rotate-90">
      <span aria-hidden className="text-lg">
        {dashed ? "⇢" : "→"}
      </span>
    </Reveal>
  );
}

function Step({ index, title, detail, pain, dashed = false, active, delay }) {
  return (
    <div className="flex flex-col items-stretch gap-2">
      <Reveal active={active} delay={delay}>
        <div
          className={`flex items-start gap-2.5 rounded-xl border bg-white px-3.5 py-3 ${
            dashed ? "border-dashed border-zinc-300" : "border-zinc-200"
          }`}
        >
          {index ? (
            <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-[10px] font-semibold tabular-nums text-zinc-500">
              {index}
            </span>
          ) : null}
          <span>
            <span className="block text-[13px] font-semibold text-zinc-900">{title}</span>
            {detail ? <span className="mt-0.5 block text-[12px] text-zinc-500">{detail}</span> : null}
          </span>
        </div>
      </Reveal>
      {pain ? (
        <Reveal active={active} delay={delay + 0.25}>
          <p className="flex items-start gap-1.5 text-[11.5px] font-medium leading-snug text-[#A32D2D] dark:text-[#FFB4B4]">
            <span aria-hidden className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#E5807A]" />
            {pain}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}

const AS_IS = [
  { title: "Browse & order", detail: "Product page", pain: "No shipping method or ETA" },
  { title: "Pay", detail: "Funds held by Pindo", pain: "Return rules unwritten" },
  { title: "Seller ships", detail: "Marks as sent", pain: "No delivery window" },
  { title: '"Received?" prompt', detail: "Shown immediately", pain: "Days in limbo, no state" },
  { title: "Confirm & rate", detail: "Funds released", pain: "No item-condition check" },
  { title: "Return via phone", detail: "Outside the product", pain: "Manual, unlogged, 20–25 a day", dashed: true },
];

/** Secure Purchase as it was: a gap in trust at every step. */
export function EscrowAsIsDiagram() {
  const [ref, inView] = useInViewOnce(0.3);
  const row = (items, offset) => (
    <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-start md:gap-x-3">
      {items.flatMap((step, i) => {
        const index = offset + i;
        const nodes = [
          <Step key={step.title} index={index + 1} {...step} active={inView} delay={index * 0.16} />,
        ];
        if (i < items.length - 1) {
          nodes.push(
            <Arrow key={`${step.title}-arrow`} active={inView} delay={index * 0.16 + 0.1} dashed={items[i + 1].dashed} />,
          );
        }
        return nodes;
      })}
    </div>
  );
  return (
    <VizFrame
      frameRef={ref}
      kicker="Secure Purchase · as it was"
      title="Every step left the buyer guessing — and returns happened off the product."
    >
      {row(AS_IS.slice(0, 3), 0)}
      <div className="my-3 flex justify-center text-zinc-300 md:justify-end md:pr-[14%]" aria-hidden>
        ↓
      </div>
      {row(AS_IS.slice(3), 3)}
    </VizFrame>
  );
}

/** The 24-hour rule after payment: one decision, two outcomes. */
export function ShippingDecisionDiagram() {
  const [ref, inView] = useInViewOnce(0.3);
  return (
    <VizFrame
      frameRef={ref}
      kicker="After payment"
      title="Sellers got 24 hours to ship before support stepped in."
    >
      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr_auto_1.1fr_auto_1.3fr] md:items-center md:gap-x-3">
        <Step title="Buyer pays" detail="Funds held by Pindo" active={inView} delay={0} />
        <Arrow active={inView} delay={0.1} />
        <Step title="Seller is prompted" detail="Push asks them to ship" active={inView} delay={0.2} />
        <Arrow active={inView} delay={0.3} />
        <Reveal active={inView} delay={0.4}>
          <div className="rounded-xl border border-[#99DAEF] bg-[#EEF7FC] px-3.5 py-3 text-center dark:bg-[#132A40]">
            <span className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#0077A3]">Decision</span>
            <span className="mt-0.5 block text-[13px] font-semibold text-zinc-900">Shipped within 24 h?</span>
          </div>
        </Reveal>
        <Arrow active={inView} delay={0.5} />
        <div className="flex flex-col gap-2.5">
          <Reveal active={inView} delay={0.6}>
            <div className="flex items-start gap-2.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-3">
              <span className="mt-px rounded-full bg-[#EAF3DE] px-2 py-0.5 text-[10px] font-semibold text-[#27500A] dark:bg-[#1D2D16] dark:text-[#B8DD9B]">
                Yes
              </span>
              <span>
                <span className="block text-[13px] font-semibold text-zinc-900">Order: “in transit”</span>
                <span className="mt-0.5 block text-[12px] text-zinc-500">Buyer sees the new state</span>
              </span>
            </div>
          </Reveal>
          <Reveal active={inView} delay={0.75}>
            <div className="flex items-start gap-2.5 rounded-xl border border-zinc-200 bg-white px-3.5 py-3">
              <span className="mt-px rounded-full bg-[#FCEBEB] px-2 py-0.5 text-[10px] font-semibold text-[#A32D2D] dark:bg-[#3A1D1D] dark:text-[#FFB4B4]">
                No
              </span>
              <span>
                <span className="block text-[13px] font-semibold text-zinc-900">Support calls the seller</span>
                <span className="mt-0.5 block text-[12px] text-zinc-500">Finds out why and follows up</span>
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </VizFrame>
  );
}
