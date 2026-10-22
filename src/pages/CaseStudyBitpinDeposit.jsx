import CaseStudyLayout, {
  Callout,
  Chapter,
  Figure,
  Lessons,
  P,
  PullQuote,
} from "../components/case-study/CaseStudyLayout.jsx";

const rialDepositThumbnail = "/images/editorial/deposit-trust.jpg";

const LESSONS = [
  {
    title: "Test the mental model before refining the interface.",
    body: "We improved method selection before confirming that users understood why those methods existed. A few early conversations with people outside Bitpin would have exposed that gap sooner.",
  },
  {
    title: "Separate product impact from market movement.",
    body: "Deposits in a volatile crypto market move with exchange rates, news, and regulation. I'd plan qualitative follow-up and a cleaner measurement window together, instead of asking a short-term conversion change to carry the story.",
  },
];

const RESEARCH_JOURNEY = ["Sign up", "KYC", "Deposit", "Easy buy", "Withdraw"];

function ResearchJourney() {
  return (
    <Figure caption="Testing the complete journey revealed that hesitation at deposit was shaped by expectations formed before users reached this screen.">
      <ol className="grid gap-2 min-[600px]:grid-cols-5">
        {RESEARCH_JOURNEY.map((step) => {
          const isDeposit = step === "Deposit";
          return (
            <li
              key={step}
              className={`flex min-h-14 items-center justify-center rounded-lg border px-3 text-center text-xs font-semibold ${
                isDeposit
                  ? "border-[#0099CC] bg-[#0099CC]/10 text-[#0077A3]"
                  : "border-zinc-200 bg-white text-zinc-700"
              }`}
            >
              {step}
            </li>
          );
        })}
      </ol>
    </Figure>
  );
}

export default function CaseStudyBitpinDeposit() {
  return (
    <CaseStudyLayout
      id="bitpin-deposit"
      eyebrow="Case Study · Bitpin · 2024"
      title="Rebuilding Trust in a Broken Deposit Flow"
      deck="How Bitpin's first usability study revealed a trust gap that was shaped outside the product."
      role="Usability Research & Design Collaboration"
      cover={{
        src: rialDepositThumbnail,
        alt: "Bitpin Rial deposit case study cover",
        width: 1672,
        height: 941,
      }}
      meta={[
        ["Role", "Usability research lead, synthesis, and design input"],
        ["Focus", "Trust, first-time use, research practice"],
        ["Platform", "iOS, Android, Web"],
      ]}
    >
      <Chapter title="Overview" nav="Overview">
        <P>
          When a court order shut down payment gateways across Iran&apos;s crypto
          exchanges overnight, Bitpin had days to build an alternative deposit
          system. The replacement worked operationally, but new users still
          hesitated the moment they were asked to move money. Bitpin&apos;s first
          usability study showed the problem was bigger than the deposit screen:
          users were comparing it with a trusted payment convention they had
          learned outside Bitpin.
        </P>
        <Callout title="My role in this work">
          I led the usability study end to end, synthesized the findings, and
          stayed closely involved as the deposit experience evolved. The product
          designer for this area owned the interface and final design; my
          contribution was research direction, product context, and continuous
          input into the design decisions.
        </Callout>
      </Chapter>

      <Chapter title="The crisis" nav="The crisis">
        <P>
          Bitpin is one of Iran&apos;s largest crypto exchanges. For most users, it
          was the simplest way to turn Rial into Bitcoin, Tether, or digital gold —
          and it depended on one thing: a payment gateway. Users tapped
          &ldquo;Buy,&rdquo; entered an amount, and paid by bank card, the same way
          they&apos;d buy anything online.
        </P>
        <P>
          In January 2024, a judicial order shut down payment gateways across every
          Iranian crypto exchange. No warning, no timeline for reversal. The
          familiar route from intent to payment disappeared overnight.
        </P>
        <Figure
          src="/images/case-studies/bitpin-gateway-flow.jpg"
          alt="Bitpin easy-buy screen redirecting to the Shaparak payment gateway"
        />
      </Chapter>

      <Chapter title="The improvised solution" nav="The workaround">
        <P>
          Within days, Bitpin introduced card-to-card transfers: users manually
          sent money to a Bitpin account, added their national ID as a reference,
          and waited for the system to match the transfer. Over the following weeks
          more methods were added, but none combined the familiarity, instant
          confirmation, and perceived safety of the old gateway. Each asked users to
          understand a different tradeoff first.
        </P>
        <Figure
          src="/images/case-studies/bitpin-initial-deposit-flow.jpg"
          alt="Initial deposit flow: method selection on the left, SHEBA transfer instructions on the right"
          caption="Left: choose a deposit method. Right: the instructions screen for SHEBA transfer — source account, destination bank, and transfer rules."
        />
        <P>
          Deposits resumed, so operationally the solution looked like a success.
          That made it easy to overlook someone arriving for the first time,
          without the context the team had built up during the crisis.
        </P>
      </Chapter>

      <Chapter title="We were optimizing the wrong layer" nav="Wrong layer">
        <P>
          Analytics and session recordings showed deposit was a fragile point in
          the new-user journey, but not what users believed was happening. We
          treated it as an information-architecture problem: reordering methods,
          recommending one based on the amount, and prioritizing same-bank options
          when a user&apos;s card matched one of Bitpin&apos;s accounts.
        </P>
        <Figure
          src="/images/case-studies/bitpin-assumption-iterations.jpg"
          alt="Assumption-based deposit flow iterations: source card picker, regrouped method selection, granular methods, and destination bank matching"
          caption="Explorations before the usability study — reordered methods, a recommended option, and same-bank prioritization. I reviewed these closely with the product designer, who owned the interface work."
        />
        <P>
          These were reasonable improvements. They didn&apos;t challenge the more
          important assumption: that users understood why a crypto exchange was
          asking them to make a manual transfer at all.
        </P>
      </Chapter>

      <Chapter title="Bitpin's first usability study" nav="The study">
        <P>
          Bitpin had never run a formal usability test. I made the case that we were
          flying blind — Metabase dashboards and Clarity recordings told us what was
          happening, but not why.
        </P>
        <P>
          I designed a study covering the full critical path for new users, centered
          on &ldquo;easy buy,&rdquo; Bitpin&apos;s simplest purchase route, so
          participants needed no trading knowledge.
        </P>
        <ResearchJourney />
        <P>
          Recruitment was the hard part. Deposits required real transfers from
          participants&apos; own accounts — no test cards, no simulated payments —
          so they had to bring their own card and ID. I deliberately recruited
          digitally active people from outside Bitpin&apos;s user base, who arrived
          with expectations formed by Iranian banking and e-commerce rather than by
          our product vocabulary. The brief was open: after a short chat about what
          they might want to invest in, they completed the journey as naturally as
          possible.
        </P>
      </Chapter>

      <Chapter title="The problem came from outside the flow" nav="The insight">
        <P>
          Hesitation became visible on the deposit screen, but the expectation
          behind it had been formed elsewhere. First-time users expected to be
          redirected to Shaparak, the payment gateway they trusted from everyday
          online shopping in Iran. When Bitpin showed bank details and manual
          transfer instructions instead, they didn&apos;t read it as a set of
          options. They read it as a break from a familiar safety signal.
        </P>
        <PullQuote>
          Why do I have to card-to-card? This looks like an Instagram seller.
        </PullQuote>
        <P>
          The critical comparison wasn&apos;t between Bitpin&apos;s deposit methods.
          It was between Bitpin and a payment convention the product no longer
          controlled. From the user&apos;s side, they had landed on a screen asking
          them to wire money to a stranger&apos;s account number.
        </P>
        <P>
          We had spent months optimizing the flow without explaining the one thing
          users needed first: why the gateway was gone. Clearer options couldn&apos;t
          repair that break in trust. The missing piece was context.
        </P>
      </Chapter>

      <Chapter title="Designing a context bridge" nav="Context bridge">
        <P>
          The solution was deliberately small. I brought the trust finding into the
          design process and proposed that the missing context appear before users
          entered the deposit flow. The product designer turned that direction into
          a bottom sheet and owned its interaction and visual design; I contributed
          the research synthesis, content hierarchy, and copy feedback. The sheet
          appeared only for people who had never deposited, and briefly explained
          that gateways across Iranian exchanges had been suspended by court order.
        </P>
        <Callout title="Why only for new depositors">
          Experienced users had already navigated this. Showing it to everyone
          would add friction for people who understood; the context was missing
          only for first-timers.
        </Callout>
        <Figure
          src="/images/case-studies/bitpin-bottom-sheet-revision.jpg"
          alt="Bottom sheet before and after: longer copy with a Got it button, revised to shorter trust-focused copy with View deposit methods"
          caption="Left: the initial explanation. Right: a shorter, more direct bridge to the available deposit methods."
        />
        <P>
          Follow-up observation showed the first version was too long and easy to
          dismiss — and its tone could make the outage sound like a Bitpin-only
          problem. The revision made clear that gateways were down across all
          Iranian exchanges, shortened the copy, and replaced the passive &ldquo;Got
          it&rdquo; with &ldquo;View deposit methods.&rdquo; With it, users read the
          manual methods as a legitimate response to the shutdown rather than a
          suspicious request.
        </P>
      </Chapter>

      <Chapter title="What changed" nav="Results">
        <P>
          The first deposit now acknowledged the expectation users brought with them
          before offering an alternative, and follow-up sessions showed less
          confusion at the jump from buying intent to manual deposit.
        </P>
        <P>
          Deposit volume at Bitpin tracks the dollar rate as much as anything we
          ship. We saw a positive directional signal, but the window wasn&apos;t
          clean enough to claim a precise conversion lift — and I&apos;d rather
          state that limitation than turn a noisy number into a headline.
        </P>
        <P>
          The durable outcome was structural: Bitpin ran its first usability study,
          built a repeatable way to recruit and observe people outside its customer
          base, and strengthened the link between research and the designers
          turning it into shipped work.
        </P>
      </Chapter>

      <Chapter title="What I'd do differently" nav="Hindsight">
        <Lessons items={LESSONS} />
      </Chapter>

      <Chapter title="Takeaway" nav="Takeaway">
        <P>
          The deposit flow wasn&apos;t failing because of information architecture
          or microcopy alone. It was inheriting a trust problem created outside the
          product: a familiar national payment pattern had disappeared, and users
          still expected to see it. Dashboards pointed to the screen where people
          hesitated; watching them revealed the expectation behind it.
        </P>
      </Chapter>
    </CaseStudyLayout>
  );
}
