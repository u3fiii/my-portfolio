import { useEffect } from "react";
import { Link } from "react-router-dom";
import CaseStudyDivider from "../components/case-study/CaseStudyDivider.jsx";
import MediaPlaceholder from "../components/case-study/MediaPlaceholder.jsx";
import PriceBadgeList from "../components/case-study/PriceBadgeList.jsx";
import StatsRow from "../components/case-study/StatsRow.jsx";
import { useLenis } from "../hooks/useLenis.jsx";
import RelatedWorkSection from "../components/work/RelatedWorkSection.jsx";
import { ROUTES } from "../routes/paths.js";

const LEARNINGS = [
  {
    title: "Feedback timing changes everything.",
    body: "The first version wasn't wrong in concept — it was wrong in placement. The same information, delivered when the seller could still act on it, produced completely different results.",
  },
  {
    title: "Two days of data beats two weeks of debate.",
    body: "Arguments got us nowhere. A minimal test with real numbers reopened a closed conversation. Running the experiment — even imperfectly — was the right call.",
  },
  {
    title: "Defaults are stronger than instructions.",
    body: "Pre-filling the price field did more than the slider ever could. We didn't explain or persuade — we made the right option the easy option.",
  },
  {
    title: "The same idea needs the right conditions.",
    body: "We had this idea before the slowdown and it went nowhere. When the problem became visible to everyone inside the company, the same idea suddenly had support. Timing matters as much as the idea itself.",
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
    <div>
      <dt className="case-study__ui text-xs font-medium uppercase tracking-[0.06em] text-zinc-500">
        {label}
      </dt>
      <dd className="case-study__ui mt-1.5 text-xs leading-relaxed text-zinc-700">
        {value}
      </dd>
    </div>
  );
}

export default function CaseStudyPriceSignal() {
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
        <header className="mb-8 border-b border-zinc-200 pb-6">
          <p className="case-study__eyebrow">Case Study · Sheypoor · 2020</p>
          <h1 className="case-study__title mt-4">Price Signal</h1>
          <p className="case-study__deck mt-4">
            How Sheypoor helped buyers and sellers find fair ground in a volatile
            market.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <span
              className="case-study__ui flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-xs font-semibold text-white"
              aria-hidden
            >
              AY
            </span>
            <p className="case-study__ui text-sm text-zinc-700">
              <span className="font-medium text-zinc-900">Ali Yousefi</span>
              <span className="text-zinc-500"> / Product Designer · Sheypoor</span>
            </p>
          </div>

          <dl className="mt-6 grid gap-5 min-[600px]:grid-cols-3">
            <MetaItem
              label="Role"
              value="Product Design — wireframes, prototypes, interaction + product thinking"
            />
            <MetaItem
              label="Team"
              value="Kourosh (PM), Engineering, Support, Sales"
            />
            <MetaItem
              label="Timeline"
              value="~2 months from idea to results"
            />
          </dl>
        </header>

        <Section title="Buyers were losing trust — and the market was slowing down">
          <Paragraph>
            In 2020, Iran&apos;s used car market was running on rumors. Dealers were
            allegedly coordinating to inflate prices on classifieds platforms —
            creating artificial market pressure. Whether or not it was organized,
            the effect was real: buyers didn&apos;t trust what they were seeing,
            fewer deals were closing, and the market was slowing down.
          </Paragraph>
          <Paragraph>
            Most buyers had no reliable way to know if a listing was fair. They were
            relying entirely on a stranger&apos;s judgment, on a platform that had no
            opinion about whether a deal was good. Fewer transactions were
            happening. That was a problem for everyone.
          </Paragraph>
        </Section>

        <CaseStudyDivider />

        <Section title="What if Sheypoor just told people whether a price is fair?">
          <PullQuote>
            What if Sheypoor just told people whether a price is fair or not?
          </PullQuote>
          <Paragraph>
            It started over lunch. A small label on each listing. Is this car priced
            too high? About right? A great deal?
          </Paragraph>
          <Paragraph>
            Kourosh liked it immediately. We found an engineer that same afternoon —
            we already had a machine learning model estimating fair market prices
            based on mileage, year, condition, and model. We had the data. We just
            weren&apos;t using it this way.
          </Paragraph>
          <Paragraph>
            When we brought it to sales and support, they pushed back hard. Sellers
            would get angry. Support would get flooded. The idea was shelved.
          </Paragraph>
        </Section>

        <CaseStudyDivider />

        <section>
          <h2 className="case-study__h2">Minimum effort. Just see what happens.</h2>
          <div className="mt-5 flex flex-col gap-5">
            <Paragraph>
              A few weeks later, the market had visibly slowed. The same people who
              said no came back: &ldquo;Let&apos;s do a small test. Minimum
              effort.&rdquo;
            </Paragraph>
            <Paragraph>
              We built it fast. After a listing passed moderation, a colored badge
              appeared below the price:
            </Paragraph>
            <PriceBadgeList
              items={[
                {
                  label: "Price is very high",
                  variant: "red",
                  description: "seller priced significantly above market",
                },
                {
                  label: "Price is high",
                  variant: "yellow",
                  description: "seller priced above market",
                },
                {
                  label: "Fair price",
                  variant: "blue",
                  description: "Sheypoor's brand color, aligned with market",
                },
                {
                  label: "Great deal",
                  variant: "green",
                  description: "priced below market",
                },
              ]}
            />
            <Paragraph>
              The green state was for listings priced below market — rare, but real.
              When a seller was clearly in a hurry or just didn&apos;t know the value,
              we wanted to surface that.
            </Paragraph>
            <MediaPlaceholder
              tag="Screen 1 of 4"
              title="Used car listing card — all four badge states"
              description="Recreate the Sheypoor listing card in Figma. Car photo left, title + price + badge + post date stacked right. Show all 4 badge states."
              bullets={[
                "Layout: image left (~110px), text stack right",
                "Badge sits between price and post date",
                'Use Sheypoor blue #0099CC for "Fair price" badge',
                "Mobile frame, 375px wide",
                "Gray rectangle placeholder for car photo",
              ]}
              size="375 × 120px per card · 4 states"
            />
            <Paragraph>
              The test ran for two days before seller complaints forced us to roll it
              back.
            </Paragraph>
          </div>
        </section>

        <CaseStudyDivider />

        <section>
          <h2 className="case-study__h2">
            Even two days was enough to learn something real
          </h2>
          <div className="mt-5 flex flex-col gap-5">
            <Paragraph>Three signals stood out.</Paragraph>
            <StatsRow
              items={[
                {
                  value: "23%",
                  label: "of badged listings tagged as fair price — our baseline",
                },
                {
                  value: "6%",
                  label:
                    "of complaining sellers actually lowered their price after support call",
                },
                {
                  value: "+10%",
                  label: "more contact clicks on fair-price listings vs others",
                },
              ]}
            />
            <Paragraph>
              Others had quietly deleted and reposted with lower prices — we could
              see it in the data. We shared these numbers. Real data reopened a
              closed conversation.
            </Paragraph>
          </div>
        </section>

        <CaseStudyDivider />

        <section>
          <h2 className="case-study__h2">
            We were giving feedback at the wrong moment
          </h2>
          <div className="mt-5 flex flex-col gap-5">
            <Paragraph>
              The diagnosis was clear. The seller would go through the entire listing
              process, go live — and then find out their price was flagged. The
              feedback felt like a penalty, not a signal. The only option was to go
              back and edit.
            </Paragraph>
            <Paragraph>
              We needed to move the feedback to before anything went live.
            </Paragraph>
            <Paragraph>
              We also revisited the four-state design. The green &ldquo;Great
              deal&rdquo; badge made sense in theory — but in practice, genuinely
              underpriced listings were rare enough that designing a whole state around
              them added complexity without much payoff. We simplified: the final
              version would use only three labels. Fewer states, clearer signal, less
              for the seller to process.
            </Paragraph>
            <MediaPlaceholder
              tag="Screen 2 of 4"
              title="Flow diagram — before vs. after"
              description="Two-column diagram. Boxes and arrows only, no UI detail needed."
              bullets={[
                "LEFT: form steps → Publish → badge appears (red X — too late)",
                "RIGHT: form steps → Price field last → feedback here (green check) → Publish",
                'Label left: "Feedback after going live"',
                'Label right: "Feedback before going live"',
                "Use Sheypoor blue #0099CC for right-side arrows",
              ]}
              size="800 × 300px · light background"
            />
          </div>
        </section>

        <CaseStudyDivider />

        <section>
          <h2 className="case-study__h2">
            I moved the price field to the bottom of the form
          </h2>
          <div className="mt-5 flex flex-col gap-5">
            <Paragraph>
              The Sheypoor listing form was a single page — a core product principle
              we wanted to keep. So we worked within it.
            </Paragraph>
            <Paragraph>
              The price field had always been near the top. I moved it to the bottom.
              The reasoning: if the seller fills in all the car details first —
              model, year, mileage, condition — by the time they reach the price
              field, we have everything we need for an accurate estimate. The feedback
              could happen right there, before anything goes live.
            </Paragraph>
            <h3 className="case-study__h3 mt-3">
              First idea: a range slider
            </h3>
            <Paragraph>
              My initial design used a color-gradient range slider — red on the left
              through yellow to green. A marker would show where the seller&apos;s
              price landed. They could drag toward green to find a fair price.
            </Paragraph>
            <Paragraph>
              I built a Framer prototype and tested it with people from other teams.
              The same problem came up every time: nobody understood what the slider
              was for or how it connected to their price. It added confusion we
              didn&apos;t need. We moved on.
            </Paragraph>
            <MediaPlaceholder
              tag="Screen 3 of 4"
              title="Slider concept — the idea we tested and abandoned"
              description="A static concept frame showing the original slider design. Concept fidelity, not hi-fi."
              bullets={[
                "Mobile form frame, price field at the bottom",
                "Below price input: horizontal gradient bar (red → yellow → green)",
                "Circular handle in the red/yellow zone (seller priced high)",
                "Small label under handle showing price value",
                "Keep it minimal — this is the idea that didn't work",
              ]}
              size="375 × 500px · mobile frame"
            />
          </div>
        </section>

        <CaseStudyDivider />

        <section>
          <h2 className="case-study__h2">
            Make the right option the easy option
          </h2>
          <div className="mt-5 flex flex-col gap-5">
            <Paragraph>
              We simplified. Instead of a slider, we pre-filled the price field with
              our suggested fair price. Below it, one line:
            </Paragraph>
            <PullQuote>
              Based on current market conditions, Sheypoor suggests this price for
              your listing.
            </PullQuote>
            <Paragraph>
              The seller could keep it or change it — their listing, their choice. But
              the default was now a fair price. The path of least resistance led
              somewhere good.
            </Paragraph>
            <PriceBadgeList
              items={[
                {
                  label: "Price is very high",
                  variant: "red",
                  description: "seller priced significantly above market",
                },
                {
                  label: "Price is high",
                  variant: "yellow",
                  description: "seller priced above market",
                },
                {
                  label: "Fair price",
                  variant: "blue",
                  description: "aligned with market",
                },
              ]}
            />
            <Paragraph>
              Green was gone. Not because the idea was wrong, but because simplicity
              mattered more than completeness at this stage.
            </Paragraph>
            <MediaPlaceholder
              tag="Screen 4 of 4 · Most important"
              title="Final listing form — price field pre-filled with suggested price"
              description="The key screen of the whole case study. Hi-fi mobile form — take the most time on this one."
              bullets={[
                "Mobile form, 375px wide",
                "Top: filled-in fields (Brand, Model, Year, Mileage, Condition) with realistic dummy data",
                "Bottom: Price field pre-filled (e.g. 890,000,000 تومان)",
                'Below price: subtle info banner in Sheypoor blue — "با توجه به وضعیت بازار، شیپور این قیمت را پیشنهاد می‌دهد."',
                "Price field with active/focused blue border",
              ]}
              size="375 × 600px · mobile frame · hi-fi"
              highlighted
            />
          </div>
        </section>

        <CaseStudyDivider />

        <section>
          <h2 className="case-study__h2">From 23% to 41% in two weeks</h2>
          <div className="mt-5 flex flex-col gap-5">
            <Paragraph>
              Two weeks after launch, fair-priced listings grew from 23% to 41% —
              nearly double. Changing when and how feedback was delivered was enough
              to shift seller behavior at scale.
            </Paragraph>
            <MediaPlaceholder
              tag="Results graphic"
              title="Before / after — 23% → 41%"
              description="Bold and simple. Two big numbers, not a complex chart."
              bullets={[
                'Two large numbers: "23%" (gray) and "41%" (Sheypoor blue #0099CC)',
                'Label each: "2-day test" and "After redesign — 2 weeks"',
                "Arrow between them pointing right",
                "Light background, confident closing visual",
              ]}
              size="800 × 280px · landscape"
            />
          </div>
        </section>

        <CaseStudyDivider />

        <Section title="How It Ended">
          <Paragraph>
            A few months after launch, the Iranian government ordered all major
            classifieds platforms to remove car prices from listings entirely. The
            feature came down with everything else.
          </Paragraph>
          <Paragraph>
            When restrictions lifted, we brought it back. But the period that
            mattered — from a lunch conversation to a working, data-backed feature —
            was about two months.
          </Paragraph>
        </Section>

        <CaseStudyDivider />

        <section>
          <h2 className="case-study__h2">What I Learned</h2>
          <ul className="mt-6 flex flex-col gap-6">
            {LEARNINGS.map(({ title, body }) => (
              <li key={title}>
                <p className="case-study__body font-semibold text-zinc-900">
                  {title}
                </p>
                <p className="case-study__body mt-2">{body}</p>
              </li>
            ))}
          </ul>
        </section>

        <RelatedWorkSection excludeId="price-signal" />

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
