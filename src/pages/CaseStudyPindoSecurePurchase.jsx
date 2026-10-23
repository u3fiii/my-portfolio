import CaseStudyLayout, {
  Chapter,
  Figure,
  Interlude,
  P,
  PullQuote,
} from "../components/case-study/CaseStudyLayout.jsx";
import { PindoCheckoutFigure, PindoReturnFigure, PindoShippingFigure } from "../components/case-study/PindoFigures.jsx";
import { EscrowAsIsDiagram, ShippingDecisionDiagram } from "../components/case-study/FlowDiagrams.jsx";
import { FunnelBars, HeadlineStat } from "../components/case-study/viz.jsx";
import escrowThumbnail from "../assets/thumbnails/escrow.jpg";

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
        ["Timeframe", "Apr – Jun 2023 · 2 months"],
        ["Team", "PM, 2 engineers, Support"],
      ]}
    >
      <Interlude>
        <P>
          <strong className="text-zinc-900">In short</strong> — Secure Purchase
          was Pindo&apos;s main source of revenue, but nobody could see how well it
          worked. There was no tracking, no way to return an item in the app, and
          the support team was quietly fixing problems by phone. I used the flow as
          a real buyer, made the problem visible with data, changed what
          &ldquo;success&rdquo; meant, and redesigned the flow where people dropped
          off the most. Successful purchases grew from 10% to 23% of carts.
        </P>
        <HeadlineStat
          kicker="Successful Secure Purchases"
          before="10%"
          after="23%"
          label="of carts ended with the buyer confirming the item was OK — more than double."
        />
      </Interlude>

      <Chapter title="I bought a power strip" nav="The problem">
        <P>
          On Pindo, buyers and sellers are strangers, so trust isn&apos;t
          guaranteed. Secure Purchase solved this: Pindo held the buyer&apos;s
          money until the item arrived in good condition, and took a small
          commission. It was the company&apos;s main source of revenue. I had
          worked on a similar flow at Sheypoor, so it was one of the first things
          I wanted to understand when I joined.
        </P>
        <P>
          Instead of starting with screens, I started as a customer. I needed a
          power strip that week, so I ordered one with Secure Purchase. Before I
          paid, nothing told me how or when it would ship. The seller was in
          Tehran, so I expected a courier, but it came by post, days later. If I
          had known, I might have chosen differently.
        </P>
        <P>
          After it arrived, the app asked me to rate the seller, and that was all.
          It never asked if the item was correct or undamaged, and there was no
          way to return it.
        </P>
        <P>
          So I ordered again and called support, without saying who I was, to
          return the item. Everything happened by phone. Support talked to the
          seller, asked for my card number for the refund, and told me I had to
          pay for the return courier. None of this was written anywhere.
        </P>
        <PullQuote>
          Support handled 20 to 25 return cases a day, and none of them were
          recorded.
        </PullQuote>
        <EscrowAsIsDiagram />
      </Chapter>

      <Figure
        frame="bleed"
        src="/images/editorial/pindo-journey.jpg"
        alt="A parcel follows a thread through a protective arch to a receiving hand"
      />

      <Chapter title="Measuring what really matters" nav="Measuring">
        <P>
          I mapped the whole flow, with every state and edge case, and presented
          it to the managers and PMs. My point was simple: this flow is costing us
          money without anyone noticing, for buyers who can&apos;t see what is
          happening and for a support team doing hidden manual work. We
          can&apos;t improve what we can&apos;t see.
        </P>
        <P>
          We didn&apos;t wait for in-app tracking. Together with a backend
          engineer, I built dashboards in Metabase from our transaction data.
          For clear steps like payments and confirmations, that was enough, and
          probably more reliable.
        </P>
        <P>
          The most important decision was about the goal. The flow used to end
          when the buyer said &ldquo;I received the item.&rdquo; We replaced the
          rating question with a clearer one: is the item OK, or not? That became
          the last step of the funnel.
        </P>
        <PullQuote>
          Secure Purchase only works when the buyer gets an item in good
          condition, not just a box at the door.
        </PullQuote>
        <FunnelBars
          kicker="Starting funnel · share of carts"
          title="Most buyers left before paying, and some disappeared after."
          mode="before"
          stages={[
            { label: "Cart created", before: 100 },
            { label: "Paid", before: 24 },
            { label: "Delivered", before: 16 },
            { label: "Confirmed item OK", before: 10 },
          ]}
          notes={{
            2: "paid but never delivered — handled by phone, invisible",
            3: "received but didn't confirm the item",
          }}
          caption="Success means the buyer confirms the item is OK, not just that it arrived."
        />
        <P>
          Two numbers stood out. 8% of buyers paid but never reached
          &ldquo;delivered&rdquo;. They were calling support and being handled by
          hand, outside the product. And another 6% received their item but
          didn&apos;t confirm it was OK.
        </P>
      </Chapter>

      <Chapter title="Before paying: show the full picture" nav="Before paying">
        <P>
          The biggest drop was between creating a cart and paying. So we showed
          the shipping method and the expected delivery time on the product page
          and at checkout, before the buyer paid. We also added the missing rules
          to the terms, like who pays for a return courier.
        </P>
        <PindoCheckoutFigure />
      </Chapter>

      <Chapter title="After paying: a state for every step" nav="After paying">
        <P>
          Some buyers paid, but the seller never shipped, or shipped too late.
          Part of the fix was simple. We changed the message sellers got after a
          payment so it clearly asked them to ship. If nothing happened in 24
          hours, support called them to find out why.
        </P>
        <ShippingDecisionDiagram />
        <P>
          Those calls showed us the real reason: nobody paid for shipping.
          Sellers had to cover it themselves. That was cheap in the same city but
          expensive between cities, so many sellers just didn&apos;t ship. We
          added a shipping fee based on the buyer&apos;s address (50,000 toman in
          the same city, 200,000 between cities), and the sales team told sellers
          that shipping was now paid for.
        </P>
        <P>
          When sellers marked an order as shipped, they now chose a method and a
          delivery time: under a day by courier, or 3 to 5 days by post. During
          that time the buyer saw &ldquo;in transit&rdquo;. After it, the buyer
          got a notification asking if the order had arrived. &ldquo;Not
          received&rdquo; sent the case to support. Buyers who used to disappear
          into phone calls were now counted inside the flow.
        </P>
        <PindoShippingFigure />
        <P>
          Finally, if a buyer said the item was not OK, they could now open a
          return request in the app. The work behind it was still manual, and
          requests went to the support team&apos;s admin panel. We moved the
          request into the product, not the whole return process. It was a small
          first step, but it gave buyers a clear path and gave us the data.
        </P>
        <PindoReturnFigure />
      </Chapter>

      <Chapter title="Successful purchases more than doubled" nav="Results">
        <P>Over the next months, every step of the funnel improved:</P>
        <FunnelBars
          kicker="Before and after the redesign"
          title="Every step improved, and confirmed purchases more than doubled."
          mode="compare"
          stages={[
            { label: "Cart created", before: 100, after: 100 },
            { label: "Paid", before: 24, after: 39 },
            { label: "Delivered", before: 16, after: 34 },
            { label: "Confirmed item OK", before: 10, after: 23 },
          ]}
        />
        <P>
          Support calls about Secure Purchase also dropped, from 20–25 a day to
          fewer than 10.
        </P>
        <P>
          One detail is worth mentioning. Among buyers who received their item,
          the share who didn&apos;t confirm it stayed about the same: around 38%
          before and 32% after. We didn&apos;t push buyers to say yes. Unhappy
          buyers still spoke up, but now they did it inside the product, where we
          could count them and act.
        </P>
      </Chapter>

      <Chapter title="Looking back" nav="Looking back">
        <P>
          We released all the changes close together, so we never knew which
          change moved which number. Next time I would release them in stages, and
          push earlier for basic in-app tracking. Our transaction data showed us
          where people dropped off. Behavior data would have told us more about
          why.
        </P>
        <P>
          Most of the remaining unhappy buyers had problems with sellers: items
          that never shipped, or didn&apos;t match the listing. That led to our
          next project, a rating and review system that gave buyers a voice and
          made sellers more accountable.
        </P>
      </Chapter>
    </CaseStudyLayout>
  );
}
