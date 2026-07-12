import { useEffect } from "react";
import { Link } from "react-router-dom";
import RelatedWorkSection from "../components/work/RelatedWorkSection.jsx";
import { useLenis } from "../hooks/useLenis.jsx";
import { ROUTES } from "../routes/paths.js";
import pindoAsIsFlow from "../assets/case-studies/pindo-escrow-as-is-flow.png";
import pindoCheckoutAfter from "../assets/case-studies/pindo-checkout-after.png";
import pindoCheckoutBefore from "../assets/case-studies/pindo-checkout-before.png";
import pindoFunnelBeforeAfter from "../assets/case-studies/pindo-escrow-funnel-before-after.png";
import pindoShippingStatesFlow from "../assets/case-studies/pindo-shipping-states-flow.jpg";

function Section({ title, children }) {
  return (
    <section>
      <h2 className="case-study__h2">{title}</h2>
      <div className="mt-5 flex flex-col gap-5">{children}</div>
    </section>
  );
}

function Paragraph({ children }) {
  return <p className="case-study__body">{children}</p>;
}

function MetaItem({ label, value }) {
  return (
    <div
      className="case-study__ui h-full rounded-xl border border-[#E2E1DC] bg-white px-5 py-4"
      style={{ borderWidth: "0.5px" }}
    >
      <dt className="text-xs font-medium uppercase tracking-[0.06em] text-zinc-500">
        {label}
      </dt>
      <dd className="mt-1.5 text-xs leading-relaxed text-zinc-700">{value}</dd>
    </div>
  );
}

function ImagePlaceholder({ label, height = 280 }) {
  return (
    <figure
      className="case-study__ui my-8 flex items-center justify-center rounded-lg border border-dashed border-[#CCC] bg-[#F5F5F5] px-6 text-center"
      style={{ height, borderWidth: "1px" }}
    >
      <figcaption className="max-w-md font-['DM_Sans',ui-sans-serif,sans-serif] text-[13px] leading-relaxed text-[#999]">
        {label}
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
    <figure className="case-study__ui my-2 rounded-xl border border-[#E2E1DC] bg-white px-5 py-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500">
          Baseline funnel
        </p>
        <p className="rounded-lg border border-[#E2E1DC] bg-zinc-50 px-3 py-2 text-xs leading-snug text-zinc-600">
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
    <figure className="case-study__ui my-2 rounded-xl border border-[#E2E1DC] bg-white px-5 py-6">
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
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      return;
    }
    window.scrollTo(0, 0);
  }, [lenis]);

  return (
    <div className="min-h-screen">
      <article className="case-study mx-auto max-w-[680px] px-6 pb-20 pt-24 md:pt-28">
        <header className="mb-8 pb-6">
          <p className="case-study__eyebrow">Case Study · Pindo</p>
          <h1 className="case-study__title mt-4">
            Making the invisible measurable: redesigning Pindo&apos;s Secure
            Purchase flow
          </h1>
          <p className="case-study__deck mt-4">
            Pindo · Lead Product Designer · Marketplace
          </p>

          <dl className="mt-6 grid gap-3 min-[600px]:grid-cols-3">
            <MetaItem label="Role" value="Lead Product Designer" />
            <MetaItem label="Timeframe" value="April – June 2023 (~2 months)" />
            <MetaItem
              label="Team"
              value="Product Design, 1 PM, 1 frontend, 1 backend, Support"
            />
          </dl>
        </header>

        <section>
          <div className="mt-5 flex flex-col gap-5">
            <Paragraph>
              <strong>TL;DR</strong> — Pindo&apos;s escrow flow
              (&ldquo;Secure Purchase&rdquo;) was the company&apos;s key revenue
              stream, but no one could see how it was performing: no
              instrumentation, no return path in the product, and a support team
              manually absorbing the gaps. I experienced the flow first-hand as a
              real buyer, made the problem visible with data, redefined what
              &ldquo;success&rdquo; meant for the funnel, and redesigned the flow
              around its biggest drop-offs. Successful completions grew from 10%
              to 23% of created carts.
            </Paragraph>
            <figure className="case-study__ui my-8 overflow-hidden rounded-lg border border-dashed border-[#CCC] bg-[#F5F5F5] p-4">
              <img
                src={pindoFunnelBeforeAfter}
                alt="Before and after funnel comparison: cart created, paid, delivered, and confirmed item OK"
                className="block h-auto w-full rounded"
              />
            </figure>
          </div>
        </section>

        <Section title="Context">
          <Paragraph>
            Pindo is a marketplace where the trust between buyer and seller
            isn&apos;t guaranteed — which is exactly why its Secure Purchase
            (escrow) feature existed: the buyer&apos;s money is held by Pindo
            until the item arrives in good condition. Pindo earned a commission
            on each escrow transaction, making this the company&apos;s primary
            revenue flow.
          </Paragraph>
          <Paragraph>
            I had worked on an escrow flow before at Sheypoor, so when I joined
            Pindo, this feature was one of the first things I wanted to
            understand.
          </Paragraph>
        </Section>

        <Section title="Discovery: buying a power strip">
          <Paragraph>
            Instead of starting with screens, I started as a customer. I needed a
            power strip that week, so I browsed the app as a real buyer, found a
            listing that supported Secure Purchase, and ordered it.
          </Paragraph>
          <Paragraph>The experience had holes in it:</Paragraph>
          <ul className="case-study__body list-disc space-y-3 pl-5">
            <li>
              <span className="font-semibold text-zinc-900">Before paying</span>,
              there was no information about how or when the item would ship. My
              seller was in Tehran; I assumed courier. It arrived by post, days
              later. Had I known, I might have decided differently.
            </li>
            <li>
              <span className="font-semibold text-zinc-900">
                After confirming delivery
              </span>
              , the app asked me to rate the seller — and that was it. No
              question about whether the item was correct or intact. No return
              path anywhere in the product.
            </li>
          </ul>
          <Paragraph>
            So I ran a second experiment: I ordered again, and this time called
            support anonymously to return the item. The process was entirely
            manual — support coordinated with the seller by phone, asked me for a
            card number for the refund, and told me the return courier cost was
            on me. None of this was written anywhere in the terms.
          </Paragraph>
          <Paragraph>
            Talking to the support team confirmed the scale: roughly 20–25
            return-related cases per day, none of them logged anywhere.
          </Paragraph>
          <figure className="case-study__ui my-8 overflow-hidden rounded-lg border border-dashed border-[#CCC] bg-[#F5F5F5] p-4">
            <img
              src={pindoAsIsFlow}
              alt="As-is Secure Purchase flow diagram with pain points marked at each step"
              className="block h-auto w-full rounded"
            />
          </figure>
        </Section>

        <Section title="Making the problem visible">
          <Paragraph>
            I mapped the existing flow with all its states and edge cases, and
            brought stakeholders and PMs into a briefing session. The argument
            was simple: this flow is silently expensive — for buyers who have no
            visibility, and for a support team doing undocumented manual work —
            and we can&apos;t improve what we can&apos;t see.
          </Paragraph>
        </Section>

        <Section title="Measuring before designing">
          <Paragraph>
            Client-side event tracking required frontend work we didn&apos;t want
            to wait for, so we started with transactional data from the database,
            building dashboards in Metabase with a backend engineer. For a funnel
            of definitive actions — payments, confirmations — this was sufficient
            and arguably more reliable. Behavioral events were deferred to a later
            phase.
          </Paragraph>
          <Paragraph>
            The key decision here wasn&apos;t technical, it was definitional:{" "}
            <strong>we changed what counted as success.</strong> Until then, the
            flow effectively ended at &ldquo;I received the item.&rdquo; We
            replaced the post-delivery rating prompt with an explicit question —{" "}
            <em>confirm or reject the item&apos;s condition</em> — and made that
            confirmation the bottom of the funnel. Escrow only fulfills its
            promise when the buyer walks away with an intact item, not merely a
            delivered box.
          </Paragraph>
          <Paragraph>The baseline told the story:</Paragraph>
          <BaselineFunnel />
          <Paragraph>
            Two numbers stood out: 8% of paying buyers never even reached
            &ldquo;delivered&rdquo; — they were calling support and being handled
            manually, invisible to the product. And of those who did receive
            items, a meaningful share (6pp) wouldn&apos;t confirm the item&apos;s
            condition.
          </Paragraph>
        </Section>

        <Section title="Design decisions, mapped to the drops">
          <h3 className="case-study__h3">
            Cart → Paid (the biggest drop).
          </h3>
          <Paragraph>
            We brought shipping information forward — method and estimated time —
            onto the PDP and into checkout, before commitment. We also rewrote the
            terms buyers accepted before paying to include what had previously
            been unwritten, like return courier costs.
          </Paragraph>
          <figure className="case-study__ui my-8 rounded-lg border border-dashed border-[#CCC] bg-[#F5F5F5] p-4">
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
            <figcaption className="mx-auto mt-4 max-w-md text-center font-['DM_Sans',ui-sans-serif,sans-serif] text-[13px] leading-relaxed text-zinc-500">
              Checkout before and after: the summary now itemizes estimated
              shipping time and a location-based shipping cost, so buyers see the
              full picture before paying.
            </figcaption>
          </figure>

          <h3 className="case-study__h3">
            Paid → Delivered (the invisible 8%).
          </h3>
          <Paragraph>
            Between payment and delivery, we had an 8pp leak: buyers had paid,
            but sellers weren&apos;t shipping — or weren&apos;t shipping fast
            enough for the order to ever reach &ldquo;delivered.&rdquo; Part of
            the fix was operational, not just UI. Sellers already received a
            push when a buyer paid, but the copy didn&apos;t convey urgency. We
            rewrote it and asked the seller explicitly to ship. If a seller still
            hadn&apos;t acted 24 hours after payment, support called to find out
            why and remind them that fulfillment was overdue. We leaned on the
            support team here deliberately — the drop was as much about seller
            behavior as product gaps.
          </Paragraph>
          <Paragraph>
            Those calls surfaced a concrete reason. Shipping cost had never been
            accounted for anywhere in the flow — sellers were expected to absorb
            it into their asking price. For local deliveries that was negligible,
            but inter-city shipping was expensive enough that many sellers simply
            chose not to ship, and Pindo offered no mechanism to cover it. So we
            made shipping a priced part of the transaction: based on the
            buyer&apos;s address, we added a shipping fee to the amount the buyer
            paid — 50,000 toman for local delivery and 200,000 toman inter-city
            at the time — and had the sales team tell sellers directly that
            shipping was now covered, so they could fulfill orders without eating
            the cost. The buyer saw this itemized in their cart before paying
            (above), but its real purpose was to unblock the drop between paid
            and delivered.
          </Paragraph>
          <Paragraph>
            On the product side, when marking an item as shipped, sellers now
            had to select the shipping method and enter an estimated delivery
            window (e.g., under a day for courier, 3–5 days for post). The buyer
            saw an &ldquo;in transit&rdquo; state during that window; only after
            it ended did two buttons appear — <em>received</em> /{" "}
            <em>not received</em> — accompanied by a push notification prompting
            them to resolve the order. &ldquo;Not received&rdquo; triggered a
            support follow-up and extended the window. The buyers who used to
            vanish into phone calls were now systematically counted and handled
            inside the flow.
          </Paragraph>
          <figure className="case-study__ui my-8 overflow-hidden rounded-lg border border-dashed border-[#CCC] bg-[#F5F5F5] p-4">
            <img
              src={pindoShippingStatesFlow}
              alt="Post-payment flow: buyer pays, seller is prompted to ship; if not shipped within 24 hours support follows up, otherwise the buyer's order moves to in transit"
              className="block h-auto w-full rounded"
            />
          </figure>

          <h3 className="case-study__h3">Delivered → Confirmed.</h3>
          <Paragraph>
            Rejecting the item&apos;s condition now opened a return request inside
            the product. To be transparent: the operation behind it stayed manual
            — the request landed in the support admin panel and was followed up by
            the same team. We digitized the <em>request</em>, not the whole return
            operation. It was a deliberate MVP decision: buyers got a visible
            path, and we got the data.
          </Paragraph>
          <ImagePlaceholder label="Image coming: Item condition confirmation and return request UI" />
        </Section>

        <Section title="Results">
          <Paragraph>
            Over the following months, the funnel shifted:
          </Paragraph>
          <ResultsComparisonFunnel />
          <Paragraph>
            Support load from escrow-related calls dropped as well — from roughly
            20–25 calls a day to under 10.
          </Paragraph>
          <Paragraph>
            One detail worth noting: among buyers who reached
            &ldquo;delivered,&rdquo; the share who wouldn&apos;t confirm item
            condition stayed in a similar range — roughly 38% before and 32%
            after. We didn&apos;t nudge buyers into confirming — dissatisfaction
            still surfaced at a comparable rate. The difference was that it now
            surfaced <em>inside the product</em>, where it could be counted and
            acted on.
          </Paragraph>
        </Section>

        <Section title="What I'd Do Differently">
          <Paragraph>
            The improvements shipped close together, so their effects were
            combined — we never isolated which change moved which number. If I
            did this again, I&apos;d release in stages so each intervention&apos;s
            contribution was measurable on its own. I&apos;d also push for at
            least minimal client-side event tracking earlier; transactional data
            told us <em>where</em> the funnel leaked, but behavioral data would
            have told us more about <em>why</em>.
          </Paragraph>
        </Section>

        <Section title="What happened next">
          <Paragraph>
            The remaining dissatisfaction pointed largely at the seller side —
            items not shipped, or not matching the listing. That thread continued
            in a separate project: a detailed post-purchase rating and review
            system that gave buyers leverage and sellers accountability.
          </Paragraph>
        </Section>

        <RelatedWorkSection excludeId="pindo-secure-purchase" />

        <p className="case-study__ui mt-12 text-center text-sm">
          <Link
            to={ROUTES.projects}
            className="text-zinc-600 underline underline-offset-2 transition-colors hover:text-zinc-900"
          >
            Back to projects
          </Link>
        </p>
      </article>
    </div>
  );
}
