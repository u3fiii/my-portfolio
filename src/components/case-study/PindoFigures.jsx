/** Pindo Secure Purchase figures: screens rebuilt in code, paired to tell the flow. */
import PhoneFrame from "../mockups/PhoneFrame.jsx";
import {
  CheckoutScreen,
  ConditionScreen,
  InTransitScreen,
  ReceivedPromptScreen,
  ReturnRequestScreen,
  SellerShipScreen,
} from "../mockups/pindo.jsx";
import { useInViewOnce } from "./viz.jsx";

function Column({ label, phone, caption, tone, width }) {
  return (
    <div className="flex flex-col items-center" style={width ? { width } : undefined}>
      {label ? (
        <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.08em]" style={{ color: tone ?? "var(--color-zinc-400)" }}>
          {label}
        </p>
      ) : null}
      {phone}
      {caption ? <p className="mt-4 text-center text-[12px] leading-snug text-zinc-500">{caption}</p> : null}
    </div>
  );
}

function Arrow() {
  return (
    <span aria-hidden className="self-center text-xl text-zinc-300 max-sm:rotate-90">
      →
    </span>
  );
}

function Tray({ frameRef, caption, children, gap = "gap-6 sm:gap-10" }) {
  return (
    <figure ref={frameRef} className="cs-tray case-study__ui">
      <div className={`flex flex-wrap items-start justify-center ${gap}`}>{children}</div>
      {caption ? <figcaption className="cs-viz__caption text-center">{caption}</figcaption> : null}
    </figure>
  );
}

/** Checkout before and after; the new address, seller and shipping rows light up in order. */
export function PindoCheckoutFigure() {
  const [ref, inView] = useInViewOnce(0.4);
  return (
    <Tray
      frameRef={ref}
      caption="Checkout before and after: the summary now itemizes estimated shipping time and a location-based shipping cost, so buyers see the full picture before paying."
    >
      <Column label="Before" phone={<PhoneFrame width={210} label="Checkout before: items and a single total, nothing about shipping"><CheckoutScreen variant="before" /></PhoneFrame>} />
      <Arrow />
      <Column
        label="After"
        tone="#C98F00"
        phone={
          <PhoneFrame width={210} label="Checkout after: address, seller, shipping time and shipping cost itemized">
            <CheckoutScreen variant="after" play={inView} />
          </PhoneFrame>
        }
      />
    </Tray>
  );
}

/** After payment: the seller picks a method and window, the buyer tracks it, then resolves the order. */
export function PindoShippingFigure() {
  const [ref, inView] = useInViewOnce(0.35);
  const items = [
    { label: "Seller ships", caption: "Method and delivery window chosen when marking as shipped.", screen: <SellerShipScreen /> },
    { label: "Buyer waits", caption: "“In transit” for the length of that window.", screen: <InTransitScreen /> },
    { label: "Buyer resolves", caption: "After the window: received, or not — which brings in support.", screen: <ReceivedPromptScreen play={inView} /> },
  ];
  return (
    <Tray frameRef={ref} gap="gap-x-5 gap-y-8" caption="Buyers who used to disappear into phone calls now have a state at every step — and so does the funnel.">
      {items.map(({ label, caption, screen }) => (
        <Column key={label} width={180} label={label} caption={caption} phone={<PhoneFrame width={180} label={label}>{screen}</PhoneFrame>} />
      ))}
    </Tray>
  );
}

/** The new end of the funnel: confirm the item's condition, or open a return request. */
export function PindoReturnFigure() {
  return (
    <Tray caption="Buyers confirm the item's condition or open a traceable return request; requests land in the support admin panel for follow-up.">
      <Column label="Confirm condition" phone={<PhoneFrame width={210} label="Is the item as described? Confirm or report an issue"><ConditionScreen /></PhoneFrame>} />
      <Arrow />
      <Column label="Return request" phone={<PhoneFrame width={210} label="Return request with reason and details"><ReturnRequestScreen /></PhoneFrame>} />
    </Tray>
  );
}
