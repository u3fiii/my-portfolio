import CaseStudyLayout, {
  Chapter,
  Figure,
  H3,
  Interlude,
  P,
} from "../components/case-study/CaseStudyLayout.jsx";
import pindoCheckoutAfter from "../assets/case-studies/pindo-checkout-after.png";
import pindoCheckoutBefore from "../assets/case-studies/pindo-checkout-before.png";
import { BeforeAfterBars, EscrowAsIsDiagram, ShippingDecisionDiagram } from "../components/case-study/FlowDiagrams.jsx";
import escrowThumbnail from "../assets/thumbnails/escrow.jpg";

function WireframePhone({ step, title, children }) {
  return (
    <div className="mx-auto w-full max-w-[250px] rounded-[28px] bg-[#18181b] p-[7px] shadow-[0_16px_36px_rgb(0_0_0/0.18)]">
      <div className="min-h-[390px] overflow-hidden rounded-[22px] bg-zinc-50">
        <div className="flex items-center justify-between border-b border-zinc-200 bg-white px-4 py-3">
          <span className="text-sm text-zinc-500" aria-hidden>
            ←
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-zinc-500">
            {step}
          </span>
          <span className="w-3" aria-hidden />
        </div>
        <div className="p-4">
          <div className="mb-4 h-20 rounded-xl border border-zinc-200 bg-zinc-100 p-3">
            <div className="h-full w-16 rounded-lg bg-zinc-200" />
          </div>
          <h4 className="text-[15px] font-semibold leading-snug text-zinc-900">
            {title}
          </h4>
          {children}
        </div>
      </div>
    </div>
  );
}

function ReturnRequestWireframe() {
  return (
    <figure className="case-study__ui my-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-7">
      <div className="grid items-start gap-6 min-[580px]:grid-cols-2">
        <WireframePhone step="Item received" title="Is the item as described?">
          <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
            Confirm the condition to complete the purchase or tell us what went
            wrong.
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <div className="rounded-lg bg-zinc-900 px-3 py-2.5 text-center text-[11px] font-semibold text-white">
              Everything is fine
            </div>
            <div className="rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-center text-[11px] font-semibold text-zinc-700">
              Report an issue
            </div>
          </div>
        </WireframePhone>

        <WireframePhone step="Return request" title="What happened with the item?">
          <div className="mt-4 flex flex-col gap-2">
            {["Different from listing", "Damaged or incomplete", "Other issue"].map(
              (reason, index) => (
                <div
                  key={reason}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-[10px] ${
                    index === 0
                      ? "border-zinc-900 bg-zinc-100 text-zinc-900"
                      : "border-zinc-200 bg-white text-zinc-600"
                  }`}
                >
                  <span
                    className={`h-3 w-3 rounded-full border ${
                      index === 0
                        ? "border-[4px] border-zinc-900"
                        : "border-zinc-300"
                    }`}
                    aria-hidden
                  />
                  {reason}
                </div>
              ),
            )}
          </div>
          <div className="mt-3 h-12 rounded-lg border border-zinc-200 bg-white p-2">
            <div className="h-1.5 w-3/4 rounded-full bg-zinc-200" />
            <div className="mt-2 h-1.5 w-1/2 rounded-full bg-zinc-200" />
          </div>
          <div className="mt-3 rounded-lg bg-zinc-900 px-3 py-2.5 text-center text-[11px] font-semibold text-white">
            Submit request
          </div>
        </WireframePhone>
      </div>
      <figcaption className="mx-auto mt-5 max-w-lg text-center text-[12px] leading-relaxed text-zinc-500">
        Wireframe reconstruction: buyers confirm the item&apos;s condition or
        open a traceable return request for support follow-up.
      </figcaption>
    </figure>
  );
}

function funnelTopYs(pcts, baselineY, chartHeight) {
  return pcts.map((pct) => baselineY - (pct / 100) * chartHeight);
}

function FunnelSegments({
  pcts,
  segmentWidth,
  baselineY,
  chartHeight,
  fill,
  fillOpacityStep = 0.08,
}) {
  const topYs = funnelTopYs(pcts, baselineY, chartHeight);

  return pcts.map((pct, index) => {
    const x0 = index * segmentWidth;
    const x1 = (index + 1) * segmentWidth;
    const yLeft = topYs[index];
    const yRight =
      index === pcts.length - 1 ? topYs[index] : topYs[index + 1];

    return (
      <path
        key={`${pct}-${index}`}
        d={`M${x0} ${yLeft} L${x1} ${yRight} L${x1} ${baselineY} L${x0} ${baselineY} Z`}
        fill={fill}
        fillOpacity={1 - index * fillOpacityStep}
      />
    );
  });
}

function FunnelTopOutline({
  pcts,
  segmentWidth,
  baselineY,
  chartHeight,
  stroke,
  strokeWidth = 2,
  dasharray,
}) {
  const topYs = funnelTopYs(pcts, baselineY, chartHeight);
  const points = pcts
    .map((_, index) => {
      const x0 = index * segmentWidth;
      const x1 = (index + 1) * segmentWidth;
      const yLeft = topYs[index];
      const yRight =
        index === pcts.length - 1 ? topYs[index] : topYs[index + 1];
      return index === 0
        ? `${x0},${yLeft} ${x1},${yRight}`
        : `${x1},${yRight}`;
    })
    .join(" ");

  return (
    <polyline
      points={points}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeDasharray={dasharray}
    />
  );
}

const BASELINE_FUNNEL_STAGES = [
  { label: "Cart created", value: "100%", pct: 100 },
  { label: "Paid", value: "24%", pct: 24 },
  { label: "Delivered", value: "16%", pct: 16 },
  { label: "Confirmed item OK", value: "10%", pct: 10 },
];

function BaselineFunnel() {
  const chartHeight = 148;
  const baselineY = 148;
  const segmentWidth = 640 / BASELINE_FUNNEL_STAGES.length;
  const pcts = BASELINE_FUNNEL_STAGES.map((stage) => stage.pct);
  const topYs = funnelTopYs(pcts, baselineY, chartHeight);

  return (
    <figure className="case-study__ui my-2 rounded-2xl border border-zinc-200 bg-white px-5 py-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500">
          Baseline funnel
        </p>
        <p className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-xs leading-snug text-zinc-600">
          <span className="font-semibold text-zinc-900">10%</span> of created
          carts confirmed item OK
        </p>
      </div>

      <svg
        viewBox="0 0 640 160"
        className="h-auto w-full"
        role="img"
        aria-label="Baseline funnel from cart created at 100 percent down to confirmed item OK at 10 percent"
      >
        <defs>
          <linearGradient id="pindoFunnelFill" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7BC8DE" />
            <stop offset="55%" stopColor="#2AADD0" />
            <stop offset="100%" stopColor="#0099CC" />
          </linearGradient>
        </defs>

        <FunnelSegments
          pcts={pcts}
          segmentWidth={segmentWidth}
          baselineY={baselineY}
          chartHeight={chartHeight}
          fill="url(#pindoFunnelFill)"
        />

        {BASELINE_FUNNEL_STAGES.slice(1).map((stage, index) => {
          const x = (index + 1) * segmentWidth;
          return (
            <line
              key={`divider-${stage.label}`}
              x1={x}
              y1={topYs[index + 1]}
              x2={x}
              y2={baselineY}
              stroke="white"
              strokeOpacity="0.55"
              strokeWidth="1.5"
            />
          );
        })}
      </svg>

      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {BASELINE_FUNNEL_STAGES.map((stage) => (
          <li key={stage.label} className="min-w-0 text-center">
            <p className="text-xl font-semibold leading-none tracking-tight text-[#0077A3] sm:text-2xl">
              {stage.value}
            </p>
            <p className="mt-1.5 text-[11px] font-medium leading-snug text-zinc-700 sm:text-xs">
              {stage.label}
            </p>
            <p className="mt-0.5 text-[10px] leading-snug text-zinc-500">
              of created carts
            </p>
          </li>
        ))}
      </ul>

      <figcaption className="mt-5 text-center text-[12px] leading-relaxed text-zinc-500">
        Success = buyer confirms item condition, not just delivery
      </figcaption>
    </figure>
  );
}

const RESULTS_FUNNEL_STAGES = [
  { label: "Cart created", before: 100, after: 100 },
  { label: "Paid", before: 24, after: 39 },
  { label: "Delivered", before: 16, after: 34 },
  { label: "Confirmed item OK", before: 10, after: 23 },
];

function ResultsComparisonFunnel() {
  const chartHeight = 148;
  const baselineY = 148;
  const segmentWidth = 640 / RESULTS_FUNNEL_STAGES.length;
  const afterPcts = RESULTS_FUNNEL_STAGES.map((stage) => stage.after);
  const beforePcts = RESULTS_FUNNEL_STAGES.map((stage) => stage.before);
  const afterTopYs = funnelTopYs(afterPcts, baselineY, chartHeight);

  return (
    <figure className="case-study__ui my-2 rounded-2xl border border-zinc-200 bg-white px-5 py-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500">
          Results funnel
        </p>
        <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600">
          <span className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#0099CC]" aria-hidden />
            After
          </span>
          <span className="inline-flex items-center gap-2">
            <span
              className="h-0 w-5 border-t-2 border-dashed border-zinc-500"
              aria-hidden
            />
            Before
          </span>
        </div>
      </div>

      <svg
        viewBox="0 0 640 160"
        className="h-auto w-full"
        role="img"
        aria-label="Comparison funnel showing after redesign as a solid fill and before as a dashed outline"
      >
        <defs>
          <linearGradient
            id="pindoResultsFunnelFill"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#7BC8DE" />
            <stop offset="55%" stopColor="#2AADD0" />
            <stop offset="100%" stopColor="#0099CC" />
          </linearGradient>
        </defs>

        <FunnelSegments
          pcts={afterPcts}
          segmentWidth={segmentWidth}
          baselineY={baselineY}
          chartHeight={chartHeight}
          fill="url(#pindoResultsFunnelFill)"
        />

        {RESULTS_FUNNEL_STAGES.slice(1).map((stage, index) => {
          const x = (index + 1) * segmentWidth;
          return (
            <line
              key={`divider-${stage.label}`}
              x1={x}
              y1={afterTopYs[index + 1]}
              x2={x}
              y2={baselineY}
              stroke="white"
              strokeOpacity="0.55"
              strokeWidth="1.5"
            />
          );
        })}

        <FunnelTopOutline
          pcts={beforePcts}
          segmentWidth={segmentWidth}
          baselineY={baselineY}
          chartHeight={chartHeight}
          stroke="#52525B"
          strokeWidth={2.25}
          dasharray="6 5"
        />
      </svg>

      <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {RESULTS_FUNNEL_STAGES.map((stage) => (
          <li key={stage.label} className="min-w-0 text-center">
            <p className="text-xl font-semibold leading-none tracking-tight text-[#0077A3] sm:text-2xl">
              {stage.after}%
            </p>
            <p className="mt-1 text-[11px] leading-snug text-zinc-500">
              was {stage.before}%
            </p>
            <p className="mt-1.5 text-[11px] font-medium leading-snug text-zinc-700 sm:text-xs">
              {stage.label}
            </p>
          </li>
        ))}
      </ul>

      <figcaption className="mt-5 text-center text-[12px] leading-relaxed text-zinc-500">
        Confirmed item OK: 10% → 23%
      </figcaption>
    </figure>
  );
}

export default function CaseStudyPindoSecurePurchase() {
  return (
    <CaseStudyLayout
      id="pindo-secure-purchase"
      eyebrow="Case Study · Pindo · 2023"
      title="Making the invisible measurable: Pindo's Secure Purchase redesign"
      deck="Redesigning Pindo's escrow flow and growing successful completions from 10% to 23%."
      role="Lead Product Designer · Pindo"
      cover={{
        src: escrowThumbnail,
        alt: "Pindo Secure Purchase case study cover",
        width: 1536,
        height: 1024,
      }}
      meta={[
        ["Role", "Lead Product Designer"],
        ["Timeframe", "April – June 2023 (~2 months)"],
        ["Team", "Product Design, 1 PM, 1 frontend, 1 backend, Support"],
      ]}
    >
      <Interlude>
        <P>
          <strong className="text-zinc-900">TL;DR</strong> — Pindo&apos;s escrow
          flow (&ldquo;Secure Purchase&rdquo;) was the company&apos;s key revenue
          stream, but no one could see how it performed: no instrumentation, no
          return path in the product, and a support team quietly absorbing the
          gaps. I went through the flow as a real buyer, made the problem visible
          with data, redefined what &ldquo;success&rdquo; meant, and redesigned the
          flow around its biggest drop-offs. Successful completions grew from 10%
          to 23% of created carts.
        </P>
        <BeforeAfterBars />
      </Interlude>

      <Chapter title="Context" nav="Context">
        <P>
          Pindo is a marketplace where trust between buyer and seller isn&apos;t
          guaranteed — which is exactly why Secure Purchase existed: Pindo holds the
          buyer&apos;s money until the item arrives in good condition, and earns a
          commission on each transaction. It was the company&apos;s primary revenue
          flow. I had worked on escrow before at Sheypoor, so it was one of the
          first things I wanted to understand when I joined.
        </P>
      </Chapter>

      <Chapter title="Discovery: buying a power strip" nav="Discovery">
        <P>
          Instead of starting with screens, I started as a customer. I needed a
          power strip that week, so I found a listing with Secure Purchase and
          ordered it. The experience had holes:
        </P>
        <ul className="case-study__body list-disc space-y-3 pl-5">
          <li>
            <span className="font-semibold text-zinc-900">Before paying</span>,
            nothing said how or when the item would ship. My seller was in Tehran,
            so I assumed courier; it arrived by post, days later. Had I known, I
            might have decided differently.
          </li>
          <li>
            <span className="font-semibold text-zinc-900">After delivery</span>,
            the app asked me to rate the seller — and that was it. No question about
            whether the item was correct or intact, and no return path anywhere.
          </li>
        </ul>
        <P>
          So I ordered again and called support anonymously to return the item. It
          was entirely manual: support coordinated with the seller by phone, asked
          for my card number for the refund, and told me the return courier was on
          me — none of which was written in the terms. The support team confirmed
          the scale: roughly 20–25 return-related cases a day, none of them logged.
        </P>
        <EscrowAsIsDiagram />
      </Chapter>

      <Figure
        frame="bleed"
        src="/images/editorial/pindo-journey.jpg"
        alt="A parcel follows a thread through a protective arch to a receiving hand"
      />

      <Chapter title="Making the problem visible" nav="Visibility">
        <P>
          I mapped the existing flow with all its states and edge cases, and brought
          stakeholders and PMs into a briefing. The argument was simple: this flow
          is silently expensive — for buyers with no visibility, and for a support
          team doing undocumented manual work — and we can&apos;t improve what we
          can&apos;t see.
        </P>
      </Chapter>

      <Chapter title="Measuring before designing" nav="Measuring">
        <P>
          Rather than wait for client-side event tracking, we started with
          transactional data, building Metabase dashboards with a backend engineer.
          For a funnel of definitive actions — payments, confirmations — that was
          enough, and arguably more reliable.
        </P>
        <P>
          The key decision was definitional:{" "}
          <strong>we changed what counted as success.</strong> The flow used to end
          at &ldquo;I received the item.&rdquo; We replaced the post-delivery
          rating prompt with an explicit question —{" "}
          <em>confirm or reject the item&apos;s condition</em> — and made that the
          bottom of the funnel. Escrow only keeps its promise when the buyer walks
          away with an intact item, not merely a delivered box.
        </P>
        <BaselineFunnel />
        <P>
          Two numbers stood out: 8% of paying buyers never reached
          &ldquo;delivered&rdquo; — they were calling support and being handled
          manually, invisible to the product. And of those who received their items,
          a meaningful share (6pp) wouldn&apos;t confirm the item&apos;s condition.
        </P>
      </Chapter>

      <Chapter title="Design decisions, mapped to the drops" nav="Design decisions">
        <H3>Cart → Paid (the biggest drop)</H3>
        <P>
          We brought shipping information — method and estimated time — onto the
          product page and into checkout, before commitment. We also rewrote the
          terms buyers accepted to include what had been unwritten, like return
          courier costs.
        </P>
        <Figure caption="Checkout before and after: the summary now itemizes estimated shipping time and a location-based shipping cost, so buyers see the full picture before paying.">
          <div className="flex flex-wrap items-start justify-center gap-4 sm:gap-6">
            <div className="min-w-0 flex-1 basis-[200px]">
              <p className="mb-2 text-center text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500">
                Before
              </p>
              <img
                src={pindoCheckoutBefore}
                alt="Checkout before: only items and a single total, no address, shipping method, time, or cost"
                className="mx-auto block w-full max-w-[240px] rounded"
              />
            </div>
            <div className="min-w-0 flex-1 basis-[200px]">
              <p className="mb-2 text-center text-[11px] font-medium uppercase tracking-[0.08em] text-[#0077A3]">
                After
              </p>
              <img
                src={pindoCheckoutAfter}
                alt="Checkout after: recipient address, seller info, and a payment summary itemizing items price, estimated shipping time, shipping cost, and total"
                className="mx-auto block w-full max-w-[240px] rounded"
              />
            </div>
          </div>
        </Figure>

        <H3>Paid → Delivered (the invisible 8%)</H3>
        <P>
          Buyers had paid, but sellers weren&apos;t shipping — or not fast enough
          for the order to ever reach &ldquo;delivered.&rdquo; Part of the fix was
          operational. We rewrote the seller&apos;s payment notification to ask
          explicitly for shipment, and if nothing happened within 24 hours, support
          called to find out why.
        </P>
        <P>
          Those calls surfaced the real reason: shipping cost had never been part
          of the flow. Sellers were expected to absorb it, which was negligible
          locally but expensive between cities — so many simply didn&apos;t ship.
          We made shipping a priced part of the transaction, adding a fee based on
          the buyer&apos;s address (then 50,000 toman local, 200,000 inter-city),
          and the sales team told sellers directly that shipping was now covered.
        </P>
        <P>
          When marking an item as shipped, sellers now chose the method and an
          estimated delivery window (under a day for courier, 3–5 days for post).
          Buyers saw &ldquo;in transit&rdquo; during that window; afterwards, a push
          and two buttons — <em>received</em> / <em>not received</em> — asked them
          to resolve the order, and &ldquo;not received&rdquo; triggered a support
          follow-up. Buyers who used to vanish into phone calls were now counted
          and handled inside the flow.
        </P>
        <ShippingDecisionDiagram />

        <H3>Delivered → Confirmed</H3>
        <P>
          Rejecting the item&apos;s condition now opened a return request inside the
          product. The operation behind it stayed manual — requests landed in the
          support admin panel. We digitized the <em>request</em>, not the whole
          return process: a deliberate MVP that gave buyers a visible path and gave
          us the data.
        </P>
        <ReturnRequestWireframe />
      </Chapter>

      <Chapter title="Results" nav="Results">
        <P>Over the following months, the funnel shifted:</P>
        <ResultsComparisonFunnel />
        <P>
          Escrow-related support calls dropped too, from roughly 20–25 a day to
          under 10.
        </P>
        <P>
          One detail worth noting: among buyers who reached &ldquo;delivered,&rdquo;
          the share who wouldn&apos;t confirm the item&apos;s condition stayed in a
          similar range — about 38% before and 32% after. We didn&apos;t nudge
          buyers into confirming; dissatisfaction still surfaced at a comparable
          rate. The difference was that it now surfaced <em>inside the product</em>,
          where it could be counted and acted on.
        </P>
      </Chapter>

      <Chapter title="What I'd do differently" nav="Hindsight">
        <P>
          The improvements shipped close together, so we never isolated which change
          moved which number. Next time I&apos;d release in stages, and push earlier
          for at least minimal client-side tracking: transactional data told us{" "}
          <em>where</em> the funnel leaked, but behavioral data would have told us
          more about <em>why</em>.
        </P>
      </Chapter>

      <Chapter title="What happened next" nav="What's next">
        <P>
          The remaining dissatisfaction pointed mostly at sellers — items not
          shipped, or not matching the listing. That thread continued in a separate
          project: a post-purchase rating and review system that gave buyers
          leverage and sellers accountability.
        </P>
      </Chapter>
    </CaseStudyLayout>
  );
}
