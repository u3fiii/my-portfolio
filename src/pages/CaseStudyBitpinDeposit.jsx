import CaseStudyLayout, {
  Chapter,
  P,
  PullQuote,
} from "../components/case-study/CaseStudyLayout.jsx";
import { JourneyLine } from "../components/case-study/viz.jsx";
import {
  BitpinBridgeFigure,
  BitpinExpectationFigure,
  BitpinGatewayFigure,
  BitpinIterationsFigure,
  BitpinWorkaroundFigure,
} from "../components/case-study/BitpinFigures.jsx";

const rialDepositThumbnail = "/images/editorial/deposit-trust.jpg";

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
        ["Role", "Research lead, design input"],
        ["Focus", "Trust in first-time use"],
        ["Platform", "iOS, Android, Web"],
      ]}
    >
      <Chapter title="The day payments stopped" nav="The crisis">
        <P>
          Bitpin is one of Iran&apos;s largest crypto exchanges. For most users,
          it was the easiest way to turn Rial into Bitcoin, Tether or digital
          gold. Buying was simple: tap &ldquo;Buy&rdquo;, enter an amount, and
          pay by bank card on a payment gateway, just like any online shop.
        </P>
        <BitpinGatewayFigure />
        <P>
          In January 2024, a court order shut down payment gateways on every
          Iranian crypto exchange. There was no warning and no date for when it
          would end. The usual way to pay disappeared overnight.
        </P>
        <P>
          I led Bitpin&apos;s first usability study on this problem and shared
          the findings with the team as the deposit flow changed. The product
          designer for this area owned the screens and the final design. My part
          was the research, the product context, and steady input into design
          decisions.
        </P>
      </Chapter>

      <Chapter title="A quick fix, and the wrong focus" nav="The workaround">
        <P>
          Within days, Bitpin added card-to-card transfers. Users sent money by
          hand to a Bitpin bank account, added their national ID as a reference,
          and waited for the system to match the payment. More methods came in
          the following weeks. But none of them felt as familiar, fast and safe
          as the old gateway. Each one asked users to understand something new
          first.
        </P>
        <BitpinWorkaroundFigure />
        <P>
          Deposits started again, so on paper the fix worked. That made it easy
          to forget about people opening the app for the first time, without the
          background the team had picked up during the crisis.
        </P>
        <P>
          Our data showed that deposit was a weak point for new users, but not
          why. We treated it as a layout problem: we reordered the methods,
          recommended one based on the amount, and put same-bank options first
          when a user&apos;s card matched one of Bitpin&apos;s accounts.
        </P>
        <BitpinIterationsFigure />
        <P>
          These were good improvements. But they skipped a bigger question: did
          users understand why a crypto exchange was asking them to transfer
          money by hand at all?
        </P>
      </Chapter>

      <Chapter title="Bitpin's first usability study" nav="The study">
        <P>
          Bitpin had never run a usability test. Our dashboards and session
          recordings told us what people did, but not why. So I proposed one.
        </P>
        <P>
          The study covered the whole path for a new user, built around
          &ldquo;easy buy&rdquo;, Bitpin&apos;s simplest way to buy, so people
          didn&apos;t need any trading knowledge.
        </P>
        <JourneyLine
          kicker="The study · full new-user path"
          title="People got through sign-up and identity checks, then stopped at deposit."
          steps={["Sign up", "KYC", "Deposit", "Easy buy", "Withdraw"]}
          stopAt="Deposit"
          stopLabel="Hesitation"
          caption="Testing the whole journey showed that the doubt at deposit started before people reached that screen."
        />
        <P>
          Finding participants was the hard part. They had to deposit real money
          from their own bank accounts, with no test cards, so they brought their
          own card and ID. I chose people who were active online but had never
          used Bitpin. Their expectations came from Iranian banking and online
          shopping, not from our product. After a short chat about what they
          might want to buy, they went through the journey as naturally as they
          could.
        </P>
      </Chapter>

      <Chapter title="The problem started outside the app" nav="The insight">
        <P>
          People hesitated on the deposit screen, but the reason came from
          somewhere else. New users expected to be sent to Shaparak, the payment
          gateway they used for everyday online shopping in Iran. When Bitpin
          showed bank details and transfer steps instead, they didn&apos;t see a
          list of options. They saw a familiar safety sign go missing.
        </P>
        <PullQuote>
          Why do I have to card-to-card? This looks like an Instagram seller.
        </PullQuote>
        <P>
          They weren&apos;t comparing Bitpin&apos;s deposit methods with each
          other. They were comparing Bitpin with a way of paying that Bitpin no
          longer controlled. From their side, the app was asking them to send
          money to a stranger&apos;s account number.
        </P>
        <BitpinExpectationFigure />
        <P>
          We had spent months improving the flow without explaining the one thing
          users needed first: why the gateway was gone. Clearer options
          couldn&apos;t fix that.
        </P>
        <PullQuote>The missing piece wasn&apos;t a better layout. It was context.</PullQuote>
      </Chapter>

      <Chapter title="Explaining why, before asking" nav="The fix">
        <P>
          The fix was small on purpose. I brought the trust finding to the design
          team and suggested we explain the situation before users entered the
          deposit flow. The product designer turned this into a bottom sheet and
          owned its design. I helped with the research, the order of the content,
          and the copy.
        </P>
        <P>
          The sheet only appeared for people who had never made a deposit. It
          explained briefly that a court order had paused payment gateways on all
          Iranian exchanges. Experienced users already knew this, so showing it to
          everyone would only slow them down.
        </P>
        <BitpinBridgeFigure />
        <P>
          Watching people use the first version showed that it was too long and
          easy to close without reading. Its tone also made the outage sound like
          a Bitpin-only problem. The new version said clearly that gateways were
          down on all Iranian exchanges, used fewer words, and replaced
          &ldquo;Got it&rdquo; with &ldquo;View deposit methods&rdquo;. With it,
          users saw manual transfers as a normal answer to the shutdown, not as a
          suspicious request.
        </P>
      </Chapter>

      <Chapter title="What changed" nav="Results">
        <P>
          The first deposit now explained the change before offering another way
          to pay. In follow-up sessions, people were less confused when they went
          from &ldquo;I want to buy&rdquo; to a manual deposit.
        </P>
        <P>
          Deposits at Bitpin follow the dollar rate as much as anything we ship.
          We saw a positive signal, but the numbers weren&apos;t clean enough to
          claim an exact increase, and I would rather say that honestly than
          turn a noisy number into a headline.
        </P>
        <P>
          The longer-lasting result was in how the team worked. Bitpin ran its
          first usability study, built a repeatable way to recruit and observe
          people outside its user base, and connected research more closely with
          the designers who turned it into shipped work.
        </P>
      </Chapter>

      <Chapter title="Looking back" nav="Looking back">
        <P>
          I would test people&apos;s understanding before polishing the screens.
          We improved how users chose a deposit method before checking that they
          understood why those methods existed. A few early conversations with
          people outside Bitpin would have shown that gap much sooner.
        </P>
        <P>
          I would also plan better how to measure the impact. In a crypto market,
          deposits move with exchange rates, news and regulation. Next time I
          would plan follow-up interviews and a cleaner measurement period
          together, instead of expecting a short-term number to tell the whole
          story.
        </P>
        <PullQuote>
          Dashboards showed where people stopped. Watching them showed why.
        </PullQuote>
      </Chapter>
    </CaseStudyLayout>
  );
}
