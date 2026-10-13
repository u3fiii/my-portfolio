import { useEffect } from "react";
import { Link } from "react-router-dom";
import RelatedWorkSection from "../components/work/RelatedWorkSection.jsx";
import { useLenis } from "../hooks/useLenis.jsx";
import { ROUTES } from "../routes/paths.js";
import rialDepositThumbnail from "../assets/thumbnails/rial-deposit.jpg";

const LESSONS = [
  {
    title: "Test the mental model before refining the interface.",
    body: "We spent time improving method selection before confirming that users understood why those methods existed. A few early conversations with people outside Bitpin would have exposed that gap sooner.",
  },
  {
    title: "Separate product impact from market movement.",
    body: "Deposit behavior in a volatile crypto market moves with exchange rates, news, and regulation. I would plan qualitative follow-up and a cleaner measurement window together instead of asking a short-term conversion change to carry the whole story.",
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

const RESEARCH_JOURNEY = [
  "Sign up",
  "KYC",
  "Deposit",
  "Easy buy",
  "Withdraw",
];

function ResearchJourney() {
  return (
    <figure className="case-study__ui my-2 rounded-xl border border-[#E2E1DC] dark:border-zinc-200 bg-white px-5 py-6">
      <ol className="grid gap-2 min-[600px]:grid-cols-5">
        {RESEARCH_JOURNEY.map((step) => {
          const isDeposit = step === "Deposit";
          return (
            <li
              key={step}
              className={`flex min-h-14 items-center justify-center rounded-lg border px-3 text-center text-xs font-semibold ${
                isDeposit
                  ? "border-[#0099CC] bg-[#0099CC]/10 text-[#0077A3]"
                  : "border-zinc-200 bg-zinc-50 text-zinc-700"
              }`}
            >
              {step}
            </li>
          );
        })}
      </ol>
      <figcaption className="mt-4 text-center text-[12px] leading-relaxed text-zinc-500">
        Testing the complete journey revealed that the hesitation at deposit was
        shaped by expectations formed before users reached this screen.
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
          <p className="case-study__eyebrow detail-reveal detail-reveal--eyebrow">Case Study · 2024</p>
          <h1 className="case-study__title detail-reveal detail-reveal--title mt-4">
            Rebuilding Trust in a Broken Deposit Flow
          </h1>

          <figure
            className="case-study__ui detail-reveal detail-reveal--image my-8 overflow-hidden rounded-xl border border-zinc-300 bg-zinc-100"
          >
            <img
              src={rialDepositThumbnail}
              alt="Bitpin Rial deposit case study cover"
              width="1672"
              height="941"
              decoding="async"
              fetchPriority="high"
              className="ambient-cover-zoom block h-auto w-full"
            />
          </figure>

          <p className="case-study__deck detail-reveal detail-reveal--text mt-4">
            Bitpin · Usability Research &amp; Design Collaboration · 2024
          </p>

          <dl className="mt-6 grid gap-3 min-[600px]:grid-cols-3">
            <MetaItem
              label="Role"
              value="Usability research lead, synthesis, and design input"
            />
            <MetaItem label="Focus" value="Trust, first-time use, research practice" />
            <MetaItem label="Platform" value="iOS, Android, Web" />
          </dl>
        </header>

        <Section title="Overview">
          <Paragraph>
            When a court order shut down payment gateways across Iran&apos;s crypto
            exchanges overnight, Bitpin had days to build an alternative deposit system
            from scratch. The replacement worked operationally, but new users still
            hesitated at the moment they were asked to move money. Bitpin&apos;s first
            formal usability study showed that the problem was larger than the deposit
            interface: users were comparing it with a trusted payment convention they
            had learned outside Bitpin.
          </Paragraph>
          <Callout title="My role in this work">
            <p className="case-study__ui text-sm leading-relaxed text-zinc-700">
              I led the usability study end to end, synthesized the findings, and
              stayed closely involved as the deposit experience evolved. The product
              designer for this area owned the interface and final design execution;
              my contribution was research direction, product context, and continuous
              input into the design decisions.
            </p>
          </Callout>
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
            Iranian crypto exchange. No warning, no timeline for reversal. The familiar
            route from intent to payment disappeared at once.
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
            Over the following weeks, the deposit system expanded to include several
            methods. None combined the familiarity, instant confirmation, and perceived
            safety of the old gateway. Each option asked users to understand a different
            tradeoff before they could move forward.
          </Paragraph>
          <Paragraph>
            The flow built by the deposit team made that complexity explicit: choose a
            method → select source and destination accounts → follow manual transfer
            instructions.
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
            Deposits resumed, which made the solution look successful from an
            operational perspective. That recovery also made it easy to overlook the
            experience of someone arriving for the first time, without the context the
            team had accumulated during the crisis.
          </Paragraph>
        </Section>

        <Section title="We Were Optimizing the Wrong Layer">
          <Paragraph>
            Product analytics and session recordings suggested that deposit was a
            fragile point in the new-user journey, but they could not tell us what users
            believed was happening. We treated it as an information-architecture
            problem and began refining the choices inside the flow.
          </Paragraph>
          <Paragraph>
            I worked closely with the product designer as they explored reordering the
            method selection screen, recommending a method based on the intended
            deposit, and prioritizing same-bank options when the product detected a
            match between the user&apos;s source card and one of Bitpin&apos;s destination
            accounts. The designer owned these explorations and their final execution;
            I contributed product and research input throughout.
          </Paragraph>
          <figure className="case-study__ui my-8 overflow-hidden rounded-lg border border-dashed border-[#CCC] bg-[#F5F5F5] p-4">
            <img
              src="/images/case-studies/bitpin-assumption-iterations.jpg"
              alt="Assumption-based deposit flow iterations: source card picker, regrouped method selection, granular methods, and destination bank matching"
              className="block h-auto w-full rounded"
              loading="lazy"
            />
            <figcaption className="mx-auto mt-4 max-w-md text-center font-['DM_Sans',ui-sans-serif,sans-serif] text-[13px] leading-relaxed text-zinc-500">
              Design explorations before the usability study — reordering methods, a
              recommended option, and same-bank prioritization. I reviewed these closely
              with the product designer, who owned the final interface work.
            </figcaption>
          </figure>
          <Paragraph>
            These were reasonable improvements to the interface we had built. They did
            not challenge the more important assumption: that users understood why a
            crypto exchange was asking them to make a manual transfer at all.
          </Paragraph>
        </Section>

        <Section title="Bitpin&apos;s First Usability Study">
          <Paragraph>
            There had never been a formal usability test at Bitpin. I made the case
            that we were flying blind — Metabase dashboards and Clarity session
            recordings told us what was happening, but not why.
          </Paragraph>
          <Paragraph>
            I designed a study that would cover the full critical path for new users:
            registration → KYC verification → deposit → purchase → withdrawal. I
            centered the task on &ldquo;easy buy,&rdquo; Bitpin&apos;s simplest purchase
            route, so participants could approach the journey without needing trading
            knowledge.
          </Paragraph>
          <ResearchJourney />
          <Paragraph>
            Recruitment was harder than a typical usability study. Deposits required
            real bank transfers from users&apos; own accounts — I couldn&apos;t provide
            test cards or simulate payments. Participants needed to bring their own
            debit card and national ID, and be comfortable making a small real transfer
            as part of the session.
          </Paragraph>
          <Paragraph>
            I deliberately recruited people from outside the existing Bitpin user base,
            using internal referrals to reach digitally active participants with little
            or no familiarity with the product. That external perspective mattered:
            they arrived with expectations formed by Iranian banking and e-commerce,
            not by our product vocabulary.
          </Paragraph>
          <Paragraph>
            The task brief was intentionally open. After a short conversation about what
            they might want to save or invest in, I asked them to use their own account
            and complete the journey as naturally as possible.
          </Paragraph>
        </Section>

        <Section title="The Problem Came From Outside the Flow">
          <Paragraph>
            The deposit screen was where hesitation became visible, but it was not where
            the underlying expectation had been created.
          </Paragraph>
          <Paragraph>
            First-time users expected to be redirected to Shaparak, the payment gateway
            pattern they already trusted from everyday online purchases in Iran. When
            Bitpin presented bank details and manual transfer instructions instead,
            they did not interpret it as a set of deposit options. They interpreted it
            as a break from a familiar safety signal.
          </Paragraph>
          <PullQuote>
            Why do I have to card-to-card? This looks like an Instagram seller.
          </PullQuote>
          <Paragraph>
            That line captured something we hadn&apos;t fully articulated as a design
            problem. The critical comparison was not between Bitpin&apos;s deposit
            methods. It was between Bitpin and an external payment convention the
            product no longer controlled. From the user&apos;s perspective, they had
            landed on a screen asking them to manually wire money to a stranger&apos;s
            account number.
          </Paragraph>
          <Paragraph>
            We had spent months optimizing the deposit flow — method comparison, smart
            recommendations, account matching — without ever explaining the one thing
            users actually needed to know first: why the gateway was gone.
          </Paragraph>
          <Paragraph>
            The interface could make the options clearer, but clarity alone could not
            repair that break in trust. The missing piece was context: what had changed
            outside Bitpin, why the gateway was unavailable, and why these unfamiliar
            methods were legitimate.
          </Paragraph>
        </Section>

        <Section title="Designing a Context Bridge">
          <Paragraph>
            The solution was deliberately small because the insight was no longer about
            redesigning the whole deposit flow. The design needed to bridge an external
            change in the financial ecosystem with the screen users were seeing inside
            Bitpin.
          </Paragraph>
          <Paragraph>
            I brought the trust finding into the design process and proposed that the
            missing context appear before users entered the deposit flow. In close
            collaboration, the product designer translated that direction into the
            bottom sheet and owned the final interaction and visual design. I contributed
            the research synthesis, content hierarchy, copy feedback, and iteration
            input. The sheet appeared only for people who had never completed a deposit
            and briefly explained that payment gateways across Iranian exchanges had
            been suspended by court order.
          </Paragraph>
          <Callout>
            <p className="case-study__ui text-sm leading-relaxed text-zinc-700">
              <span className="font-semibold text-zinc-900">
                Why we recommended context only for new depositors:
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
              Left: the initial explanation. Right: a shorter, more direct bridge to
              the available deposit methods.
            </figcaption>
          </figure>
          <Paragraph>
            Follow-up observation suggested that the first version was too long and easy
            to dismiss. More importantly, its tone could make the outage sound like a
            Bitpin-only problem. I shared those findings and copy recommendations with
            the product designer, who revised the final design to clarify that gateways
            were unavailable across Iranian exchanges, shorten the explanation, and
            replace the passive &ldquo;Got it&rdquo; CTA with the more concrete
            &ldquo;View deposit methods.&rdquo;
          </Paragraph>
          <Paragraph>
            In follow-up observation, the revised sheet gave users enough context to
            interpret the manual methods as a legitimate response to the shutdown,
            rather than as a suspicious request from Bitpin.
          </Paragraph>
        </Section>

        <Section title="What Changed">
          <Paragraph>
            The product outcome was a clearer first-deposit experience: the flow now
            acknowledged the expectation users brought with them before presenting an
            alternative. Follow-up sessions showed less confusion at the transition
            from buying intent to manual deposit.
          </Paragraph>
          <Paragraph>
            Iran&apos;s crypto market is heavily influenced by macroeconomic conditions
            — exchange rate movements, inflation anxiety, news cycles. Deposit volume at
            Bitpin correlates as much with the dollar rate as with anything we ship.
            We saw a positive directional signal after the change, but the available
            window was not clean enough to claim a precise conversion lift. I would
            rather state that limitation than turn a noisy number into the headline.
          </Paragraph>
          <Paragraph>
            The durable outcome was structural: Bitpin ran its first usability study,
            created a repeatable way to recruit and observe people outside the existing
            customer base, and strengthened the collaboration between research input
            and the designers responsible for turning it into shipped product work.
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
            The deposit flow was not failing only because of information architecture
            or microcopy. It was inheriting a trust problem created outside the product:
            a familiar national payment pattern had disappeared, while users still
            expected to see it.
          </Paragraph>
          <Paragraph>
            That is what the first usability study made visible. Dashboards could point
            to the screen where hesitation happened; observing people revealed the
            external expectation behind it and changed the direction I brought into the
            design collaboration.
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
