import CaseStudyLayout, {
  Chapter,
  H3,
  Interlude,
  P,
  PullQuote,
} from "../components/case-study/CaseStudyLayout.jsx";
import SheypoorFinalFormScreen from "../components/case-study/SheypoorFinalFormScreen.jsx";
import SheypoorFeedComparison from "../components/case-study/SheypoorFeedComparison.jsx";
import SheypoorFormComparison from "../components/case-study/SheypoorFormComparison.jsx";
import {
  FormReorder,
  PriceSignalPlayground,
  ShareShift,
  StatCards,
} from "../components/case-study/viz.jsx";
import priceSignalThumbnail from "../assets/thumbnails/price-signal.jpg";

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
        ["Role", "Product Designer"],
        ["Team", "PM, Eng, Support, Sales"],
        ["Timeline", "~2 months, idea to results"],
      ]}
    >
      <Chapter title="Buyers stopped trusting prices" nav="The problem">
        <P>
          In 2020, Iran&apos;s used-car market was full of rumors. People said
          dealers were working together to push prices up on classifieds sites.
          True or not, the effect was real. Buyers didn&apos;t trust the prices
          they saw, fewer deals closed, and the market slowed down.
        </P>
        <P>
          On Sheypoor, a buyer had no way to know if a price was fair. They could
          only trust the seller, and Sheypoor said nothing either way.
        </P>
      </Chapter>

      <Interlude>
        <PullQuote>
          What if Sheypoor just told people whether a price is fair?
        </PullQuote>
        <P>
          The idea came up over lunch: a small label on every listing that says
          if the price is too high, about right, or a good deal.
        </P>
        <P>
          Kourosh, our PM, liked it right away, and we found an engineer the same
          afternoon. We already had a machine learning model that estimated a fair
          price from a car&apos;s model, year, mileage and condition. We had the
          data. We just weren&apos;t showing it to anyone.
        </P>
        <P>
          First, we wanted to check that the problem was real. Kourosh and I
          called 20 users who had looked at many listings but never contacted a
          seller. They all told us something similar: when prices felt far too
          high, they simply gave up. As one of them said, &ldquo;There&apos;s no
          point calling when the prices are like this.&rdquo;
        </P>
        <P>
          Sales and support were against it. They expected angry sellers and a
          flood of support calls. The idea was put on hold.
        </P>
      </Interlude>

      <Chapter title="A two-day test" nav="First test">
        <P>
          A few weeks later, the slowdown was clear to everyone. The same people
          who had said no came back and said: &ldquo;Let&apos;s do a small test.
          Minimum effort.&rdquo;
        </P>
        <P>
          We built it quickly and showed it to 20% of users. Once a listing was
          approved, a colored badge appeared under its price:
        </P>
        <PriceSignalPlayground
          captionStyle={{ marginTop: 4, fontSize: 11 }}
          caption={
            <>
              3D model: “Low Poly Small car” by{" "}
              <a href="https://sketchfab.com/scailman" target="_blank" rel="noopener noreferrer" className="underline">
                scailman
              </a>
              , CC BY 4.0.
            </>
          }
          states={[
            { label: "Good deal", variant: "green", from: -100, hint: "Priced below market" },
            { label: "Fair price", variant: "blue", from: -8, hint: "In line with market" },
            { label: "High price", variant: "yellow", from: 8, hint: "Priced above market" },
            { label: "Too high", variant: "red", from: 20, hint: "Far above market" },
          ]}
        />
        <P>
          The badge compared the price with similar cars and put it in one of
          four groups, from a good deal to far too high. It was just one word and
          one color, so buyers could read it at a glance. In a long feed, it gave
          them a reason to stop on some listings:
        </P>
        <SheypoorFeedComparison caption="The same feed before and after the price badge." />
        <P>
          After two days, seller complaints forced us to turn it off. But two
          days was enough to learn three things:
        </P>
        <StatCards
          kicker="Two-day test · 20% of users"
          title="Small numbers, but enough to restart the conversation."
          items={[
            { value: "23%", label: "of listings were fairly priced — our starting point" },
            { value: "6%", label: "of sellers who complained lowered their price after a support call" },
            { value: "+10%", label: "more contact clicks on fair-price listings" },
          ]}
        />
        <P>
          We also saw sellers quietly delete their listings and post them again
          at a lower price. We shared these numbers, and the idea was back on the
          table.
        </P>
      </Chapter>

      <Chapter title="The feedback came too late" nav="The real issue">
        <P>
          The real problem was timing. Sellers filled in the whole form, published
          their listing, and only then saw that their price was flagged. It felt
          like a punishment, not advice, and the only way to fix it was to go back
          and edit.
        </P>
        <PullQuote>The feedback had to arrive before the listing went live.</PullQuote>
        <P>
          The form was one single page, and we wanted to keep it that way. The
          price field was near the top, so I moved it to the end. By the time
          sellers got there, they had already entered the model, year, mileage and
          condition. That was everything we needed for a good estimate, at the
          exact moment they chose a price.
        </P>
        <FormReorder />
        <P>
          We also removed the &ldquo;Good deal&rdquo; label. Very few cars were
          really priced below market, so three labels were enough and easier to
          understand.
        </P>
        <P>
          My first design for the new form was a slider from red to green that
          showed where the seller&apos;s price landed. I tested a prototype with
          people from other teams, and nobody understood what the slider was for.
          So we dropped it.
        </P>
        <SheypoorFormComparison />
      </Chapter>

      <Chapter title="A fair price by default" nav="Smart default">
        <P>
          Instead of a slider, we filled in the price field for the seller with
          our suggested fair price, and added one line under it:
        </P>
        <PullQuote>
          Based on current market conditions, Sheypoor suggests this price for your
          listing.
        </PullQuote>
        <P>
          Sellers could keep it or change it. It was still their listing. But now
          the easiest choice was also a fair one.
        </P>
        <PriceSignalPlayground
          states={[
            { label: "Fair price", variant: "green", from: -100, hint: "In line with market" },
            { label: "High price", variant: "yellow", from: 8, hint: "Priced above market" },
            { label: "Too high", variant: "red", from: 20, hint: "Far above market" },
          ]}
        />
        <P>
          If a seller typed a higher price, they saw the label their listing would
          get, while they could still change it. Buyers saw the same labels in the
          feed.
        </P>
        <SheypoorFinalFormScreen />
      </Chapter>

      <Chapter title="Fair prices almost doubled" nav="Results">
        <P>
          Two weeks after launch, fairly priced listings went from 23% to 41%.
          Changing when and how sellers got feedback was enough to change what
          they did.
        </P>
        <ShareShift
          kicker="Fair-priced listings"
          title="Earlier feedback nearly doubled fair pricing."
          rows={[
            { label: "First test", note: "2 days · 20% of users", value: 23 },
            { label: "After the redesign", note: "2 weeks after launch", value: 41, highlight: true },
          ]}
          delta="+18 pts · nearly 2×"
          footer={[
            { value: "6%", label: "of complaining sellers lowered their price" },
            { value: "+10%", label: "more contact clicks on fair-price listings" },
            { value: "~2 months", label: "from a lunch idea to a live feature" },
          ]}
        />
        <P>
          A few months later, the government told all classifieds sites to remove
          car prices completely, and the feature went down with them. We brought
          it back when the rule was lifted. But the important part had already
          happened: an idea from lunch became a working, data-backed feature in
          about two months.
        </P>
      </Chapter>

      <Chapter title="What I learned" nav="Learnings">
        <P>
          The first version had the right idea in the wrong place. The same
          information, shown while sellers could still act on it, gave completely
          different results.
        </P>
        <PullQuote>Two days of real data did more than two weeks of debate.</PullQuote>
        <P>
          Pre-filling the price also worked better than any explanation. We
          didn&apos;t try to convince sellers. We made the fair option the easy
          one. And timing matters for ideas too: the same idea that was rejected
          before the slowdown got full support once everyone could see the
          problem.
        </P>
        <P>
          If I did it again, I would get the starting number before the test. The
          pricing model already existed, so we could have scored every listing
          offline, with no launch and no angry sellers. We would still need a live
          test to see how sellers react. But walking into the first meeting with
          &ldquo;only 23% of our listings are fairly priced&rdquo; might have kept
          the idea alive from the start.
        </P>
      </Chapter>
    </CaseStudyLayout>
  );
}
