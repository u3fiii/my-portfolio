import { useEffect } from "react";
import { Link } from "react-router-dom";
import RelatedWorkSection from "../components/work/RelatedWorkSection.jsx";
import { useLenis } from "../hooks/useLenis.jsx";
import { ROUTES } from "../routes/paths.js";
import rialDepositThumbnail from "../assets/thumbnails/Rial Deposit.png";

const LESSONS = [
  {
    title: "Test earlier in the constraint phase.",
    body: "The months between the gateway shutdown and the research were a period of legitimate urgency — but some earlier, lighter-weight testing (even 3 users, unrecruited, in a coffee shop) might have surfaced the trust gap before we spent cycles optimizing around it.",
  },
  {
    title: "Measure more carefully.",
    body: "A longer measurement window and a cleaner control period would have made the post-ship data more interpretable. In a volatile market, a two-week snapshot isn't conclusive.",
  },
];

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

function PullQuote({ children }) {
  return <blockquote className="case-study__quote">{children}</blockquote>;
}

function MetaItem({ label, value }) {
  return (
    <div
      className="case-study__ui h-full rounded-xl border border-[#E2E1DC] dark:border-zinc-200 bg-white px-5 py-4"
      style={{ borderWidth: "0.5px" }}
    >
      <dt className="text-xs font-medium uppercase tracking-[0.06em] text-zinc-500">
        {label}
      </dt>
      <dd className="mt-1.5 text-xs leading-relaxed text-zinc-700">{value}</dd>
    </div>
  );
}

function Callout({ title, children }) {
  return (
    <div
      className="case-study__ui rounded-xl border border-[#E2E1DC] dark:border-zinc-200 bg-zinc-50 px-5 py-4"
      style={{ borderWidth: "0.5px" }}
    >
      {title ? (
        <p className="case-study__ui text-sm font-semibold text-zinc-900">{title}</p>
      ) : null}
      <div className={title ? "mt-3" : ""}>{children}</div>
    </div>
  );
}

function ConversionComparison() {
  return (
    <div className="case-study__ui my-8 flex flex-wrap items-center justify-center gap-4">
      <div className="min-w-[140px] flex-1 rounded-xl bg-zinc-100 px-4 py-6 text-center">
        <p className="text-[2rem] font-medium leading-none text-[#0099CC]">8%</p>
        <p className="mx-auto mt-3 max-w-[12rem] text-xs leading-normal text-zinc-500">
          conversion before
        </p>
      </div>
      <span
        className="text-xl text-zinc-400"
        style={{ fontFamily: '"DM Sans", ui-sans-serif, system-ui, sans-serif' }}
        aria-hidden
      >
        →
      </span>
      <div className="min-w-[140px] flex-1 rounded-xl bg-zinc-100 px-4 py-6 text-center">
        <p className="text-[2rem] font-medium leading-none text-[#0099CC]">10%</p>
        <p className="mx-auto mt-3 max-w-[12rem] text-xs leading-normal text-zinc-500">
          conversion after
        </p>
      </div>
    </div>
  );
}

const REGISTRATION_FUNNEL_STAGES = [
  { label: "Registration", value: "100%", pct: 100 },
  { label: "KYC verified", value: "62%", pct: 62 },
  { label: "Deposited", value: "8%", pct: 8 },
];

function RegistrationFunnel() {
  const chartHeight = 148;
  const baselineY = 148;
  const segmentWidth = 640 / REGISTRATION_FUNNEL_STAGES.length;
  const topYs = REGISTRATION_FUNNEL_STAGES.map(
    (stage) => baselineY - (stage.pct / 100) * chartHeight,
  );

  return (
    <figure className="case-study__ui my-2 rounded-xl border border-[#E2E1DC] dark:border-zinc-200 bg-white px-5 py-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500">
          New-user funnel
        </p>
        <p className="rounded-lg border border-[#E2E1DC] dark:border-zinc-200 bg-zinc-50 px-3 py-2 text-xs leading-snug text-zinc-600">
          <span className="font-semibold text-zinc-900">8%</span> of registered
          users deposited within 30 days
        </p>
      </div>

      <svg
        viewBox="0 0 640 160"
        className="h-auto w-full"
        role="img"
        aria-label="New-user funnel from registration at 100 percent through KYC at 62 percent to deposit at 8 percent"
      >
        <defs>
          <linearGradient
            id="bitpinRegistrationFunnelFill"
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

        {REGISTRATION_FUNNEL_STAGES.map((stage, index) => {
          const x0 = index * segmentWidth;
          const x1 = (index + 1) * segmentWidth;
          const yLeft = topYs[index];
          const yRight =
            index === REGISTRATION_FUNNEL_STAGES.length - 1
              ? topYs[index]
              : topYs[index + 1];

          return (
            <path
              key={stage.label}
              d={`M${x0} ${yLeft} L${x1} ${yRight} L${x1} ${baselineY} L${x0} ${baselineY} Z`}
              fill="url(#bitpinRegistrationFunnelFill)"
              fillOpacity={1 - index * 0.1}
            />
          );
        })}

        {REGISTRATION_FUNNEL_STAGES.slice(1).map((stage, index) => {
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

      <ul className="mt-4 grid grid-cols-3 gap-3">
        {REGISTRATION_FUNNEL_STAGES.map((stage) => (
          <li key={stage.label} className="min-w-0 text-center">
            <p className="text-xl font-semibold leading-none tracking-tight text-[#0077A3] sm:text-2xl">
              {stage.value}
            </p>
            <p className="mt-1.5 text-[11px] font-medium leading-snug text-zinc-700 sm:text-xs">
              {stage.label}
            </p>
            <p className="mt-0.5 text-[10px] leading-snug text-zinc-500">
              of registered users
            </p>
          </li>
        ))}
      </ul>

      <figcaption className="mt-5 text-center text-[12px] leading-relaxed text-zinc-500">
        Deposit measured within 30 days of registration
      </figcaption>
    </figure>
  );
}

export default function CaseStudyBitpinDeposit() {
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
      <article className="case-study mx-auto max-w-[748px] px-6 pb-20 pt-24 md:pt-28">
        <header className="mb-8 pb-6">
          <p className="case-study__eyebrow">Case Study · 2024</p>
          <h1 className="case-study__title mt-4">
            Rebuilding Trust in a Broken Deposit Flow
          </h1>

          <figure className="case-study__ui my-8 overflow-hidden rounded-xl border border-zinc-300 bg-zinc-100">
            <img
              src={rialDepositThumbnail}
              alt="Bitpin Rial deposit case study cover"
              className="block h-auto w-full"
            />
          </figure>

          <p className="case-study__deck mt-4">Bitpin · Product Design · 2024</p>

          <dl className="mt-6 grid gap-3 min-[600px]:grid-cols-3">
            <MetaItem
              label="Role"
              value="End-to-end product design, usability research, synthesis, redesign"
            />
            <MetaItem label="Timeline" value="~4 months" />
            <MetaItem label="Platform" value="iOS, Android, Web" />
          </dl>
        </header>

        <Section title="Overview">
          <Paragraph>
            When a court order shut down payment gateways across Iran&apos;s crypto
            exchanges overnight, Bitpin had days to build an alternative deposit system
            from scratch. We shipped it. Users came back. But the numbers quietly
            told a different story — and it took the company&apos;s first-ever usability
            test to understand why.
          </Paragraph>
        </Section>

        <Section title="The Crisis">
          <Paragraph>
            Bitpin is one of Iran&apos;s largest centralized crypto exchanges. For most
            users, it was the simplest way to turn Iranian Rial into Bitcoin, Tether,
            or digital gold — without navigating the complexity of decentralized finance
            or the friction of international transactions.
          </Paragraph>
          <Paragraph>
            That model depended on one thing: a payment gateway. Users would tap
            &ldquo;Buy,&rdquo; enter an amount, and pay with their bank card — the same
            way they&apos;d buy anything online.
          </Paragraph>
          <Paragraph>
            In January 2024, a judicial order shut down payment gateways across every
            Iranian crypto exchange. No warning, no timeline for reversal. The path
            that 100% of depositing users relied on was gone.
          </Paragraph>
          <figure className="case-study__ui my-8 overflow-hidden rounded-lg border border-dashed border-[#CCC] bg-[#F5F5F5] p-4">
            <img
              src="/images/case-studies/bitpin-gateway-flow.jpg"
              alt="Bitpin easy-buy screen redirecting to the Shaparak payment gateway"
              className="block h-auto w-full rounded"
              loading="lazy"
            />
          </figure>
        </Section>

        <Section title="The Improvised Solution">
          <Paragraph>
            Within days, Bitpin introduced card-to-card transfers as a deposit method:
            users would manually transfer money from their bank account to a Bitpin
            account number, include their national ID as a reference code, and wait
            for the system to match the transfer and credit their wallet.
          </Paragraph>
          <Paragraph>
            Over the following weeks, the deposit system expanded to include four
            methods, each with its own tradeoffs:
          </Paragraph>
          <figure className="case-study__ui my-8 overflow-hidden rounded-lg border border-dashed border-[#CCC] bg-[#F5F5F5] p-4">
            <img
              src="/images/case-studies/bitpin-deposit-methods-tradeoff-map.png"
              alt="Deposit method tradeoff map comparing speed and ceiling across account-to-account, SHEBA transfer, card-to-card, and direct debit"
              className="block h-auto w-full rounded"
              loading="lazy"
            />
          </figure>
          <Paragraph>
            Each method had its own tradeoffs and edge cases — and users needed to
            understand them to make the right choice. The flow we designed was
            straightforward: choose a method → select source and destination accounts
            → follow manual transfer instructions.
          </Paragraph>
          <figure className="case-study__ui my-8 overflow-hidden rounded-lg border border-dashed border-[#CCC] bg-[#F5F5F5] p-4">
            <img
              src="/images/case-studies/bitpin-initial-deposit-flow.jpg"
              alt="Initial deposit flow: method selection on the left, SHEBA transfer instructions on the right"
              className="block h-auto w-full rounded"
              loading="lazy"
            />
            <figcaption className="mx-auto mt-4 max-w-md text-center font-['DM_Sans',ui-sans-serif,sans-serif] text-[13px] leading-relaxed text-zinc-500">
              Left: choose a deposit method. Right: the instructions screen for
              SHEBA transfer — source account, destination bank, and transfer
              rules.
            </figcaption>
          </figure>
          <Paragraph>
            Deposits recovered. In some periods, daily deposit volume even exceeded
            pre-shutdown levels — partly because SHEBA and account-to-account allowed
            transfers up to 100M IRR, higher than the old gateway&apos;s 25M ceiling, and
            partly because a weak Rial was driving a wave of people toward Tether as
            a store of value.
          </Paragraph>
        </Section>

        <Section title="The Signal We Almost Missed">
          <Paragraph>
            A surface reading of the metrics looked fine. But when we looked more
            carefully at the new-user funnel, something was off.
          </Paragraph>
          <RegistrationFunnel />
          <Paragraph>
            Of everyone who registered, 62% completed KYC — and only 8% made a
            deposit within 30 days. The team&apos;s response was what you&apos;d
            expect: iterate on the flow. We tested reordering the method selection
            screen, introduced a &ldquo;recommended method&rdquo; based on declared
            deposit amount, and prioritized same-bank options when we detected a
            match between the user&apos;s source card and one of Bitpin&apos;s
            destination accounts.
          </Paragraph>
          <figure className="case-study__ui my-8 overflow-hidden rounded-lg border border-dashed border-[#CCC] bg-[#F5F5F5] p-4">
            <img
              src="/images/case-studies/bitpin-assumption-iterations.jpg"
              alt="Assumption-based deposit flow iterations: source card picker, regrouped method selection, granular methods, and destination bank matching"
              className="block h-auto w-full rounded"
              loading="lazy"
            />
            <figcaption className="mx-auto mt-4 max-w-md text-center font-['DM_Sans',ui-sans-serif,sans-serif] text-[13px] leading-relaxed text-zinc-500">
              Iterations we tried before research — reordering methods, a
              recommended option, and same-bank prioritization. All based on
              assumptions.
            </figcaption>
          </figure>
          <Paragraph>
            Reasonable changes. But we were working from assumptions, not from watching
            real users.
          </Paragraph>
        </Section>

        <Section title="Proposing the Research">
          <Paragraph>
            There had never been a formal usability test at Bitpin. I made the case
            that we were flying blind — Metabase dashboards and Clarity session
            recordings told us what was happening, but not why.
          </Paragraph>
          <Paragraph>
            I designed a study that would cover the full critical path for new users:
            registration → KYC verification → deposit → purchase → withdrawal. I
            scoped it to the most common use case — &ldquo;easy buy,&rdquo; Bitpin&apos;s
            one-tap purchase flow — since roughly 70% of first-time buyers used it, and
            many never switched to order-book trading.
          </Paragraph>
          <figure className="case-study__ui my-8 overflow-hidden rounded-lg border border-dashed border-[#CCC] bg-[#F5F5F5] p-4">
            <img
              src="/images/case-studies/bitpin-usability-test-scenario-flow.jpg"
              alt="Usability test scenario flow: Registration to KYC to Deposit to Easy Buy to Withdrawal"
              className="block h-auto w-full rounded"
              loading="lazy"
            />
          </figure>
          <Paragraph>
            Recruitment was harder than a typical usability study. Deposits required
            real bank transfers from users&apos; own accounts — I couldn&apos;t provide
            test cards or simulate payments. Participants needed to bring their own
            debit card and national ID, and be comfortable making a small real transfer
            as part of the session.
          </Paragraph>
          <Paragraph>
            To make this work, I recruited through internal referrals — posting in the
            company Telegram group and asking team members to refer acquaintances who
            fit the profile: digitally active, not current Bitpin users, open to crypto
            as a savings tool.
          </Paragraph>
          <Callout title="Participant breakdown — 10 total">
            <ul className="case-study__ui list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-zinc-700">
              <li>7 participants: first-time crypto exchange users</li>
              <li>2 participants: had used Nobitex before</li>
              <li>1 participant: experienced trader</li>
            </ul>
          </Callout>
          <Paragraph>
            Sessions ran over two weeks at the office. The task brief was intentionally
            open: based on a quick conversation about what they&apos;d want to invest in
            (Bitcoin, Tether, gold), I&apos;d ask them to go ahead and buy a small amount
            on their own.
          </Paragraph>
        </Section>

        <Section title="What We Saw">
          <Paragraph>
            The deposit flow was where things broke down — consistently and clearly.
          </Paragraph>
          <Paragraph>
            The 7 first-time users all hit the same wall. They expected a payment
            gateway. That&apos;s how every e-commerce site in Iran works. When they
            reached the deposit screen instead, they were confused — and then
            suspicious.
          </Paragraph>
          <PullQuote>
            Why do I have to card-to-card? This looks like an Instagram seller.
          </PullQuote>
          <Paragraph>
            That line captured something we hadn&apos;t fully articulated as a design
            problem. These users didn&apos;t understand why the normal payment flow
            didn&apos;t exist. From their perspective, they had landed on a screen
            asking them to manually wire money to a stranger&apos;s account number.
          </Paragraph>
          <Paragraph>
            We had spent months optimizing the deposit flow — method comparison, smart
            recommendations, account matching — without ever explaining the one thing
            users actually needed to know first: why the gateway was gone.
          </Paragraph>
          <Paragraph>
            The trust wasn&apos;t missing because the flow was confusing. It was missing
            because the context was missing.
          </Paragraph>
        </Section>

        <Section title="The Fix">
          <Paragraph>The solution was deliberately minimal.</Paragraph>
          <Paragraph>
            I added a bottom sheet that appeared before users entered the deposit flow
            — but only for users who had never completed a deposit before. It explained,
            briefly and plainly, that payment gateways across Iranian exchanges had been
            suspended by court order, and that the methods shown were the compliant
            alternatives Bitpin had built.
          </Paragraph>
          <Callout>
            <p className="case-study__ui text-sm leading-relaxed text-zinc-700">
              <span className="font-semibold text-zinc-900">
                Why a bottom sheet, why only for new depositors:
              </span>{" "}
              Experienced users didn&apos;t need this explanation — they&apos;d already
              navigated it. Surfacing it to everyone would add friction for users who
              already understood. The context was only missing for people encountering
              this for the first time.
            </p>
          </Callout>
          <figure className="case-study__ui my-8 overflow-hidden rounded-lg border border-dashed border-[#CCC] bg-[#F5F5F5] p-4">
            <img
              src="/images/case-studies/bitpin-bottom-sheet-revision.jpg"
              alt="Bottom sheet before and after: longer copy with a Got it button, revised to shorter trust-focused copy with View deposit methods"
              className="block h-auto w-full rounded"
              loading="lazy"
            />
            <figcaption className="mx-auto mt-4 max-w-md text-center font-['DM_Sans',ui-sans-serif,sans-serif] text-[13px] leading-relaxed text-zinc-500">
              Left: launched version. Right: revised after the data came in.
            </figcaption>
          </figure>
          <Paragraph>
            The left version shipped. Product data showed most users dismissed it
            in under two seconds — nobody was reading it. Our working hypothesis:
            the copy was too long. We also fixed the tone: the first draft made the
            outage sound like a Bitpin-only problem. The revision clarified that
            gateways were down across Iranian exchanges, shortened the text, and
            changed the CTA from a passive &ldquo;Got it&rdquo; to &ldquo;View
            deposit methods.&rdquo;
          </Paragraph>
          <Paragraph>
            The revised sheet tested well. Users read it, understood it, and moved
            through the deposit flow without the &ldquo;Instagram seller&rdquo; moment.
          </Paragraph>
        </Section>

        <Section title="The Result">
          <ConversionComparison />
          <Paragraph>
            Two percentage points sounds modest. It&apos;s worth being honest about what
            that number does and doesn&apos;t mean.
          </Paragraph>
          <Paragraph>
            Iran&apos;s crypto market is heavily influenced by macroeconomic conditions
            — exchange rate movements, inflation anxiety, news cycles. Deposit volume at
            Bitpin correlates as much with the dollar rate as with anything we ship.
            Attributing a conversion lift cleanly to one change, over a short window,
            requires caution.
          </Paragraph>
          <Paragraph>
            The more important outcome might be structural: Bitpin ran its first usability
            study, built the muscle for doing it again, and a team that had been iterating
            on assumptions now had a method for getting out of the building.
          </Paragraph>
        </Section>

        <section>
          <h2 className="case-study__h2">What I&apos;d Do Differently</h2>
          <ul className="mt-6 flex flex-col gap-6">
            {LESSONS.map(({ title, body }) => (
              <li key={title}>
                <p className="case-study__body font-semibold text-zinc-900">{title}</p>
                <p className="case-study__body mt-2">{body}</p>
              </li>
            ))}
          </ul>
        </section>

        <Section title="Takeaway">
          <Paragraph>
            The deposit flow wasn&apos;t broken because of poor information architecture
            or weak microcopy. It was broken because we forgot to tell users that the
            world had changed.
          </Paragraph>
          <Paragraph>
            That&apos;s the thing usability testing surfaces that dashboards don&apos;t:
            not where users fail, but why they hesitate.
          </Paragraph>
        </Section>

        <RelatedWorkSection excludeId="bitpin-deposit" />

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
