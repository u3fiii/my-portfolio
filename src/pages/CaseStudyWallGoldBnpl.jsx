import CaseStudyLayout, { Chapter, P, PullQuote } from "../components/case-study/CaseStudyLayout.jsx";
import LiveBnplScenes from "../components/wallgold-demo/LiveBnplScenes.jsx";
import "./CaseStudyWallGoldBnpl.css";

export default function CaseStudyWallGoldBnpl() {
  return (
    <CaseStudyLayout
      id="wallgold-bnpl"
      eyebrow="Case Study · WallGold · Product concept"
      title="Turning Gold into a Clearer Way to Pay"
      deck="Designing a four-installment purchase journey across WallGold, Goldpay, and a third-party merchant."
      role="Product & interaction design"
      cover={{
        src: "/images/editorial/wallgold-bnpl.jpg",
        alt: "Four stone steps rise from a gold bar toward a paper shopping bag",
        width: 1672,
        height: 941,
      }}
      meta={[
        ["Role", "Product & interaction design"],
        ["Surfaces", "App, checkout and POS"],
        ["Status", "Concept · not launched"],
      ]}
    >
      <Chapter title="The brief" nav="The brief">
        <P>
          <a href="https://wallgold.ir/" target="_blank" rel="noreferrer">WallGold</a> lets people buy and sell gold online. This new idea asked a different question: could people keep their gold, use it as a guarantee, and pay for something in four installments? My job was to design the customer experience and make a fairly complex product brief easy to follow on a phone.
        </P>
        <P>
          This is a design concept shown through an interactive demo, not a launched product. It covers flows and interface decisions only. There are no real customers or results to report, and the demo uses sample people, balances and orders.
        </P>
        <PullQuote>
          Pay 25% at checkout. Your gold covers the rest until the four installments are paid.
        </PullQuote>
        <P>
          The credit only works in participating stores. That one rule shaped
          most of the design.
        </P>
      </Chapter>

      <Chapter title="One gold balance, three places" nav="Three places">
        <P>
          The journey moves across three places. WallGold is where customers already see and manage their gold. Goldpay is the new credit service, with its own dashboard and payment screens. And a store, online or in person, is where the shopping happens. Goldpay reads the same gold balance as WallGold, so the same gold can never be spent twice.
        </P>
        <div className="bnpl-roles case-study__ui" aria-label="The three product surfaces">
          <div><span>01 / ASSET</span><strong>WallGold</strong><p>Gold ownership, balance, and collateral state.</p></div>
          <div><span>02 / CREDIT</span><strong>Goldpay</strong><p>Eligibility, installment plans, and repayment.</p></div>
          <div><span>03 / PURCHASE</span><strong>Merchant</strong><p>Checkout or POS, order status, and handoff.</p></div>
        </div>
        <P>
          This split guided the design. At every step, shoppers should know which service is asking who they are, which one holds their gold, and the exact moment a shopping choice becomes a financial commitment.
        </P>
      </Chapter>

      <Chapter title="Two ways to start" nav="Two ways in">
        <P>
          The first way starts inside WallGold. A short introduction explains the offer, then Goldpay shows how much credit the user&apos;s gold can unlock. Instead of an abstract multiplier, the screen shows two clear numbers: how much you can spend, and how many grams of gold that needs.
        </P>
        <LiveBnplScenes items={["wallgold-intro", "wallgold-credit"]} caption="From the introduction to a credit review, built from the original WallGold and Goldpay interface code." />
        <P>
          One gap to fix later: in the brief, asking for a credit limit should not lock any gold. The demo simplifies this and shows a lock when credit is confirmed. Before handoff, I would match the brief, so gold is only locked after the first payment.
        </P>
        <P>
          The second way starts in another store. In the demo, a TechnoLife checkout offers Goldpay next to normal card payment. The store name, the item and the price follow the shopper into every Goldpay step, so it feels like one purchase, not a separate loan application.
        </P>
        <LiveBnplScenes items={["merchant-checkout", "merchant-summary"]} caption="The order moves from the store checkout into a Goldpay review, with the product and price still in view." />
        <P>
          If the shopper doesn&apos;t have enough gold or credit, the flow stays on the same order and offers three options: pay the difference in cash, buy more gold and come back, or, with no gold at all, see how much is needed to start. The demo shows the main path, where the shopper has enough gold.
        </P>
      </Chapter>

      <Chapter title="Making the commitment clear" nav="Installments">
        <P>
          While the customer reviews the plan, the gold amount and price are held for ten minutes. Before paying, the screen shows all four installments: 25% now and the exact dates of the rest. Real dates matter here, because a purchase late in the month moves the second payment to the month after. Customers shouldn&apos;t have to work that out.
        </P>
        <LiveBnplScenes items={["merchant-terms"]} featured caption="The payment plan and the gold terms appear before the first payment." />
        <P>
          The most serious rule is stated plainly, before the first payment.
        </P>
        <PullQuote>
          If the second payment is still unpaid when the third is due, the rest of the plan is taken from your gold.
        </PullQuote>
        <P>
          After the first payment, the held gold is locked for that plan, and the store gets confirmation of the purchase.
        </P>
      </Chapter>

      <Chapter title="Paying at the counter" nav="In store">
        <P>
          Buying in a store adds a second person and a second device. The cashier enters the customer&apos;s phone number, and the customer gets a one-time code. That code only proves who the customer is. It does not approve the payment.
        </P>
        <PullQuote>At the counter, proving who you are is not the same as saying yes.</PullQuote>
        <P>
          After the cashier sends the purchase, the customer sees the same review on their own phone: available credit, gold needed, payment dates and the pay button. The cashier&apos;s screen only needs to know if the purchase can go ahead.
        </P>
        <LiveBnplScenes items={["pos-otp", "pos-waiting", "pos-terms"]} caption="The cashier checks the customer's identity, then waits while the customer reviews the payment on their own phone." />
      </Chapter>

      <Chapter title="After the purchase" nav="After purchase">
        <P>
          Every purchase creates its own four-payment plan, backed by its own gold. So the dashboard has to show the difference between credit left and gold that is really free. Paying an installment lowers the debt, but the gold for that plan stays locked until the whole plan is paid. With more than one plan, customers also need one simple view of what is due this month.
        </P>
        <P>
          Returns need as much care as checkout. Within seven days, a full return cancels future payments and frees the gold. A cheaper replacement changes the amount and needs the customer&apos;s approval. Stores receive their money after fees, on a set schedule. The demo doesn&apos;t show every screen for this yet, but these cases are part of the product map.
        </P>
        <P>
          Some questions are still open: how returns should handle changes in the gold price, how to protect the gold if the price drops sharply, and how to make sure a gold reservation happens in one safe step. These need answers before the design is ready for production.
        </P>
      </Chapter>

      <Chapter title="Where the work stands" nav="Next steps">
        <P>
          The result is an interaction model and a clickable demo for discussion. It makes the handoff between the three places visible, gives online and in-store purchases a clear sequence, and shows where risk rules need to become plain language.
        </P>
        <P>
          The next steps are to align the demo with the brief, test with customers whether they understand how their gold is used and when it can be taken, and check the store handoff with real cashiers. Any claims about sales or repayments will have to wait for a real launch.
        </P>
      </Chapter>
    </CaseStudyLayout>
  );
}
