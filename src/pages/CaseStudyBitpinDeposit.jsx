import { useEffect } from "react";
import { Link } from "react-router-dom";
import StatsRow from "../components/case-study/StatsRow.jsx";
import RelatedWorkSection from "../components/work/RelatedWorkSection.jsx";
import { useLenis } from "../hooks/useLenis.jsx";
import { ROUTES } from "../routes/paths.js";

const LESSONS = [
  {
    title: "Test earlier in the constraint phase.",
    body: "The months between the gateway shutdown and the research were a period of legitimate urgency — but some earlier, lighter-weight testing (even 3 users, unrecruited, in a coffee shop) might have surfaced the trust gap before we spent cycles optimizing around it.",
  },
  {
    title: "Separate the trust problem from the UX problem sooner.",
    body: "In retrospect, the low conversion was a clear signal that something fundamental was wrong, not just something to be smoothed over through interaction design. I'd push harder, earlier, to distinguish between \"the flow is confusing\" and \"users don't believe this is legitimate.\"",
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

function Divider() {
  return (
    <hr
      className="my-8 border-0 border-t border-zinc-200"
      style={{ borderTopWidth: "0.5px" }}
    />
  );
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

function Callout({ title, children }) {
  return (
    <div
      className="case-study__ui rounded-xl border border-[#E2E1DC] bg-zinc-50 px-5 py-4"
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
      <article className="case-study mx-auto max-w-[680px] px-6 pb-20 pt-24 md:pt-28">
        <header className="mb-8 pb-6">
          <p className="case-study__eyebrow">Case Study · 2024</p>
          <h1 className="case-study__title mt-4">
            Rebuilding Trust in a Broken Deposit Flow
          </h1>
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

        <Divider />

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
          <ImagePlaceholder label="📷 Image coming: Gateway flow — screen before redirect + payment page" />
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
          <ImagePlaceholder
            height={220}
            label="📊 Image coming: Deposit method comparison — 4 methods, speed & ceiling"
          />
          <Paragraph>
            Each method had its own tradeoffs and edge cases — and users needed to
            understand them to make the right choice. The flow we designed was
            straightforward: choose a method → select source and destination accounts
            → follow manual transfer instructions.
          </Paragraph>
          <ImagePlaceholder
            height={320}
            label="📱 Image coming: Initial deposit flow (pre-research) — method selection, account picker, instructions screen"
          />
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
            carefully at the funnel, something was off.
          </Paragraph>
          <StatsRow
            items={[
              { value: "8%", label: "deposit flow conversion" },
              { value: "2%", label: "registered users who deposited in 30 days" },
            ]}
          />
          <Paragraph>
            The team&apos;s response was what you&apos;d expect: iterate on the flow. We
            tested reordering the method selection screen, introduced a
            &ldquo;recommended method&rdquo; based on declared deposit amount, and
            prioritized same-bank options when we detected a match between the
            user&apos;s source card and one of Bitpin&apos;s destination accounts.
          </Paragraph>
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
          <ImagePlaceholder
            height={180}
            label="🔀 Image coming: Test scenario flow diagram — Registration → KYC → Deposit → Easy Buy → Withdrawal"
          />
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
          <ImagePlaceholder
            height={320}
            label="📱 Image coming: Bottom sheet v1 — first draft with longer copy"
          />
          <Paragraph>
            My first draft was too long. In a follow-up round with 3 new participants, I
            watched two of them start scrolling past the text before finishing it. I cut
            the copy significantly and restructured it to lead with the most
            trust-critical information first.
          </Paragraph>
          <ImagePlaceholder
            height={320}
            label="📱 Image coming: Bottom sheet v2 — revised with shorter copy (before/after comparison preferred)"
          />
          <Paragraph>
            The revised bottom sheet tested well. Users read it, understood it, and moved
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
            What I can say: the number moved in the right direction, the change was
            grounded in direct user evidence, and the behavior we observed in testing
            matched exactly what the intervention was designed to address.
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
