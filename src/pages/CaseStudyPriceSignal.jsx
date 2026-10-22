import BadgeColorTest from "../components/case-study/BadgeColorTest.jsx";
import CaseStudyLayout, {
  Chapter,
  Figure,
  H3,
  Interlude,
  Lessons,
  P,
  PullQuote,
} from "../components/case-study/CaseStudyLayout.jsx";
import FormReorderDiagram from "../components/case-study/FormReorderDiagram.jsx";
import PriceBadgeList from "../components/case-study/PriceBadgeList.jsx";
import PriceSignalResultsGraphic from "../components/case-study/PriceSignalResultsGraphic.jsx";
import SheypoorFinalFormScreen from "../components/case-study/SheypoorFinalFormScreen.jsx";
import SheypoorFormComparison from "../components/case-study/SheypoorFormComparison.jsx";
import StatsRow from "../components/case-study/StatsRow.jsx";
import priceSignalThumbnail from "../assets/thumbnails/price-signal.jpg";

const LEARNINGS = [
  {
    title: "Feedback timing changes everything.",
    body: "The first version was right in concept and wrong in placement. The same information, delivered while sellers could still act on it, produced completely different results.",
  },
  {
    title: "Two days of data beats two weeks of debate.",
    body: "Arguments got us nowhere. A minimal test with real numbers reopened a closed conversation.",
  },
  {
    title: "Defaults are stronger than instructions.",
    body: "Pre-filling the price did more than the slider ever could. We didn't explain or persuade — we made the right option the easy one.",
  },
  {
    title: "The same idea needs the right conditions.",
    body: "Before the slowdown, the idea went nowhere. Once the problem was visible to everyone in the company, the same idea suddenly had support.",
  },
];

export default function CaseStudyPriceSignal() {
  return (
    <CaseStudyLayout
      id="price-signal"
      eyebrow="Case Study · Sheypoor · 2020"
      title="Designing Price Signal: helping buyers and sellers find fair ground"
      deck="How Sheypoor helped buyers and sellers find fair ground in a volatile market."
      role="Product Designer · Sheypoor"
      cover={{
        src: priceSignalThumbnail,
        alt: "Price Signal case study cover",
        width: 1536,
        height: 1024,
      }}
      meta={[
        ["Role", "Product Design — wireframes, prototypes, interaction + product thinking"],
        ["Team", "Kourosh (PM), Engineering, Support, Sales"],
        ["Timeline", "~2 months from idea to results"],
      ]}
    >
      <Chapter title="Buyers were losing trust — and the market was slowing down" nav="The problem">
        <P>
          In 2020, Iran&apos;s used-car market ran on rumors. Dealers were said to
          be coordinating to inflate prices on classifieds platforms. Organized or
          not, the effect was real: buyers didn&apos;t trust what they saw, fewer
          deals closed, and the market slowed down.
        </P>
        <P>
          Buyers had no reliable way to tell whether a listing was fair. They
          relied entirely on a stranger&apos;s judgment, on a platform that had no
          opinion about whether a deal was good.
        </P>
      </Chapter>

      <Interlude>
        <PullQuote>
          What if Sheypoor just told people whether a price is fair or not?
        </PullQuote>
        <P>
          It started over lunch: a small label on each listing. Is this car priced
          too high? About right? A great deal?
        </P>
        <P>
          Kourosh liked it immediately, and we found an engineer that same
          afternoon. We already had a machine learning model estimating fair market
          prices from mileage, year, condition, and model. We had the data — we
          just weren&apos;t using it this way.
        </P>
        <P>
          First we wanted to know the problem was real. Kourosh and I called 20
          active users who had viewed lots of listings but never tapped the contact
          button. The pattern was consistent: when the gap between expectation and
          listing price grew too wide, people simply stopped engaging. One person
          put it plainly — &ldquo;There&apos;s no point calling when the prices are
          like this.&rdquo;
        </P>
        <P>
          When we brought it to sales and support, they pushed back hard. Sellers
          would get angry. Support would get flooded. The idea was shelved.
        </P>
      </Interlude>

      <Chapter title="Minimum effort. Just see what happens." nav="First test">
        <P>
          A few weeks later, the market had visibly slowed. The same people who said
          no came back: &ldquo;Let&apos;s do a small test. Minimum effort.&rdquo;
        </P>
        <P>
          We built it fast and rolled it out to 20% of users as a controlled test.
          For them, once a listing passed moderation, a colored badge appeared
          below the price:
        </P>
        <PriceBadgeList
          items={[
            { label: "Price is very high", variant: "red", description: "seller priced significantly above market" },
            { label: "Price is high", variant: "yellow", description: "seller priced above market" },
            { label: "Fair price", variant: "blue", description: "Sheypoor's brand color, aligned with market" },
            { label: "Great deal", variant: "green", description: "priced below market" },
          ]}
        />
        <P>
          The green state marked listings priced below market — rare, but real,
          usually a seller in a hurry or unsure of the value.
        </P>
        <BadgeColorTest />
        <P>
          One question was still open: should &ldquo;Fair price&rdquo; be blue,
          Sheypoor&apos;s brand color, or green, following the red-to-green scale
          people already understand? We couldn&apos;t agree, so we tested it.
        </P>
        <P>
          I built a skeleton listing page with colored badges and no labels, and
          asked participants from our weekly usability sessions one question: which
          listing looks like a better deal? Most chose green without hesitation.
        </P>
        <Figure caption="Listing cards before and after the price badge — same listing, new signal.">
          <p className="mb-3 text-center text-[10px] font-medium uppercase tracking-[0.1em] text-[#0099CC]">
            Screen 1 of 4
          </p>
          <img
            src="/images/case-studies/price-signal-screen-1.png"
            alt="Listing cards before and after the price badge — same listing, new signal"
            loading="lazy"
            decoding="async"
          />
        </Figure>
        <P>
          The test ran for two days before seller complaints forced us to roll it
          back.
        </P>
      </Chapter>

      <Chapter title="Even two days was enough to learn something real" nav="Early signals">
        <P>Three signals stood out.</P>
        <StatsRow
          items={[
            { value: "23%", label: "of badged listings tagged as fair price — our baseline" },
            { value: "6%", label: "of complaining sellers actually lowered their price after support call" },
            { value: "+10%", label: "more contact clicks on fair-price listings vs others" },
          ]}
        />
        <P>
          Other sellers had quietly deleted and reposted with lower prices — we
          could see it in the data. We shared these numbers, and real data
          reopened a closed conversation.
        </P>
      </Chapter>

      <Chapter title="We were giving feedback at the wrong moment" nav="The real issue">
        <P>
          Sellers went through the entire listing process, went live, and only then
          found their price flagged. It felt like a penalty, not a signal, and the
          only way out was to go back and edit. The feedback had to arrive before
          anything went live.
        </P>
        <P>
          We also dropped the green &ldquo;Great deal&rdquo; state. Genuinely
          underpriced listings were too rare to justify a whole state; three labels
          meant a clearer signal and less for the seller to process.
        </P>
        <FormReorderDiagram />
        <Figure
          frame="bleed"
          src="/images/editorial/price-feedback.jpg"
          alt="Cut-paper car, blank price tag and pencil on an ochre background"
        />
      </Chapter>

      <Chapter title="I moved the price field to the bottom of the form" nav="The new form">
        <P>
          The listing form was a single page — a core product principle we wanted
          to keep. The price field had always sat near the top, so I moved it to the
          bottom. By the time sellers reached it, they had entered the model, year,
          mileage, and condition: everything we needed for an accurate estimate,
          right at the moment they set a price.
        </P>
        <H3>First idea: a range slider</H3>
        <P>
          My first design was a red-to-yellow-to-green slider, with a marker showing
          where the seller&apos;s price landed. I tested a Framer prototype with
          people from other teams, and the same thing came up every time: nobody
          understood what the slider was for or how it related to their price. We
          moved on.
        </P>
        <SheypoorFormComparison />
      </Chapter>

      <Chapter title="Make the right option the easy option" nav="Smart defaults">
        <P>
          Instead of a slider, we pre-filled the price field with our suggested fair
          price, with one line below it:
        </P>
        <PullQuote>
          Based on current market conditions, Sheypoor suggests this price for your
          listing.
        </PullQuote>
        <P>
          Sellers could keep it or change it — their listing, their choice. But the
          default was now a fair price, and the path of least resistance led
          somewhere good.
        </P>
        <PriceBadgeList
          items={[
            { label: "Price is very high", variant: "red", description: "seller priced significantly above market" },
            { label: "Price is high", variant: "yellow", description: "seller priced above market" },
            { label: "Fair price", variant: "green", description: "aligned with market" },
          ]}
        />
        <P>
          &ldquo;Fair price&rdquo; landed on green — the color buyers had read as a
          good deal in testing.
        </P>
        <SheypoorFinalFormScreen />
      </Chapter>

      <Chapter title="From 23% to 41% in two weeks" nav="Results">
        <P>
          Two weeks after launch, fair-priced listings grew from 23% to 41% — nearly
          double. Changing when and how feedback arrived was enough to shift seller
          behavior at scale.
        </P>
        <PriceSignalResultsGraphic />
      </Chapter>

      <Chapter title="How it ended" nav="The ending">
        <P>
          A few months after launch, the government ordered all major classifieds
          platforms to remove car prices from listings entirely, and the feature
          came down with everything else. We brought it back when the restrictions
          lifted — but the part that mattered, from a lunch conversation to a
          working, data-backed feature, took about two months.
        </P>
      </Chapter>

      <Chapter title="What I learned" nav="Learnings">
        <Lessons items={LEARNINGS} />
      </Chapter>

      <Chapter title="What I'd do differently" nav="Hindsight">
        <P>
          <strong className="text-zinc-900">We could have had the baseline for free.</strong>{" "}
          The pricing model existed before the feature did. Scoring every active
          listing offline — no launch, no complaints, no risk — would have told us
          from day one that only 23% were fairly priced: the very number we later
          used to reopen the conversation.
        </P>
        <P>
          We would still have needed the live test. Offline scoring shows the state
          of the market; only real sellers show how people <em>respond</em> — the 6%
          who lowered their price, the quiet reposts, the +10% in contact clicks.
          But walking into that first meeting with &ldquo;only 23% of our listings
          are fairly priced&rdquo; instead of a hypothesis might have kept the idea
          from being shelved at all.
        </P>
      </Chapter>
    </CaseStudyLayout>
  );
}
