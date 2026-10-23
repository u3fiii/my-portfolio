/**
 * Pindo Secure Purchase screens rebuilt in code (English, LTR) for the case
 * study. They follow the flow, not every pixel of the shipped UI; product
 * photos are abstract tiles.
 */
import {
  ArrowLeft,
  CaretRight,
  Check,
  Clock,
  Lightbulb,
  MapPin,
  Minus,
  Package,
  PencilSimple,
  Phone,
  Plus,
  SealCheck,
  ShieldCheck,
  Storefront,
  Truck,
  User,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import { StatusBar } from "./PhoneFrame.jsx";
import { Screen } from "./interaction.jsx";

export const PINDO = {
  yellow: "#FFBB00",
  ink: "#141414",
  muted: "#8A8A8A",
  line: "#EFEFEF",
  bg: "#F5F5F5",
};

const EASE = [0.22, 1, 0.36, 1];

function Header({ title, step }) {
  return (
    <div className="flex items-center justify-between border-b bg-white px-5 pb-3.5 pt-2" style={{ borderColor: PINDO.line }}>
      <span className="flex items-center gap-3 text-[17px] font-semibold" style={{ color: PINDO.ink }}>
        <ArrowLeft size={20} weight="bold" />
        {title}
      </span>
      {step ? (
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ color: PINDO.muted }}>
          {step}
        </span>
      ) : null}
    </div>
  );
}

function Card({ title, children, className = "", highlight = false, delay = 0, play = true }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`mx-4 mb-2.5 rounded-[18px] bg-white p-4 ${className}`}
      initial={highlight && !reduce ? { opacity: 0, y: 12 } : false}
      animate={highlight && play ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      {title ? (
        <p className="mb-3 text-[14.5px] font-semibold" style={{ color: PINDO.ink }}>
          {title}
        </p>
      ) : null}
      {children}
    </motion.div>
  );
}

/** Product photos as soft tiles — the photo isn't the point. */
function Thumb({ tone = "#E9E4D8", icon: Icon = Package }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[12px]" style={{ background: tone }}>
      <Icon size={20} color="#8A7F66" />
    </span>
  );
}

function ItemRow({ name, price, tone }) {
  return (
    <div className="flex items-center gap-3 py-1.5">
      <Thumb tone={tone} />
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[13.5px] font-semibold" style={{ color: PINDO.ink }}>{name}</span>
        <span className="mt-0.5 block text-[12px]" style={{ color: PINDO.muted }}>{price} toman</span>
      </span>
      <span className="flex items-center gap-2 rounded-full px-2 py-1" style={{ background: PINDO.bg }}>
        <Minus size={12} weight="bold" color={PINDO.muted} />
        <span className="text-[12px] font-semibold" style={{ color: PINDO.ink }}>1</span>
        <Plus size={12} weight="bold" color={PINDO.ink} />
      </span>
    </div>
  );
}

function SummaryRow({ label, value, highlight, delay, play, strong }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="relative -mx-2 flex items-center justify-between rounded-[10px] px-2 py-2 text-[13px]"
      initial={highlight && !reduce ? { opacity: 0, x: -8, backgroundColor: "rgba(255,187,0,0)" } : false}
      animate={
        highlight && play
          ? { opacity: 1, x: 0, backgroundColor: ["rgba(255,187,0,0)", "rgba(255,187,0,0.18)", "rgba(255,187,0,0)"] }
          : undefined
      }
      transition={{ duration: 1.4, delay, ease: EASE }}
    >
      <span style={{ color: PINDO.muted }}>{label}</span>
      <span className={strong ? "font-semibold" : "font-medium"} style={{ color: PINDO.ink }}>{value}</span>
    </motion.div>
  );
}

function PayBar({ total = "1,400,000", label = "Pay" }) {
  return (
    <div className="mt-auto flex items-center justify-between gap-4 border-t bg-white px-5 pb-8 pt-3.5" style={{ borderColor: PINDO.line }}>
      {total ? (
        <span>
          <span className="block text-[11.5px]" style={{ color: PINDO.muted }}>Total</span>
          <span className="block text-[16px] font-semibold" style={{ color: PINDO.ink }}>{total} <span className="text-[11.5px] font-normal">toman</span></span>
        </span>
      ) : null}
      <span className="flex h-[50px] flex-1 items-center justify-center rounded-[14px] text-[15px] font-semibold" style={{ background: PINDO.yellow, color: PINDO.ink }}>
        {label}
      </span>
    </div>
  );
}

/**
 * Checkout. "before": items and a single total, nothing about shipping.
 * "after": address, seller, and a summary itemising shipping time and cost —
 * the new rows light up in order when `play` turns true.
 */
export function CheckoutScreen({ variant = "after", play = true }) {
  const after = variant === "after";
  return (
    <Screen className="flex h-full flex-col" style={{ background: PINDO.bg, direction: "ltr" }}>
      <div className="bg-white">
        <StatusBar />
      </div>
      <Header title="Cart" />
      <div className="pt-3">
        {after ? (
          <Card title="Delivery address" highlight delay={0.1} play={play}>
            <div className="flex items-start gap-3">
              <MapPin size={18} weight="fill" color={PINDO.ink} className="mt-0.5 shrink-0" />
              <p className="flex-1 text-[12.5px] leading-[1.55]" style={{ color: PINDO.muted }}>
                Niloufar Alley, Piroozi St., Tehran · Unit 2
              </p>
              <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: PINDO.bg }}>
                <PencilSimple size={14} color={PINDO.ink} />
              </span>
            </div>
            <div className="mt-3 flex items-center gap-4 border-t pt-3 text-[12.5px]" style={{ borderColor: PINDO.line, color: PINDO.ink }}>
              <span className="flex items-center gap-1.5"><User size={15} /> Sara K.</span>
              <span className="flex items-center gap-1.5"><Phone size={15} /> 0912 ••• 7654</span>
            </div>
          </Card>
        ) : (
          <Card>
            <div className="flex items-center justify-between text-[14px] font-semibold" style={{ color: PINDO.ink }}>
              Delivery address
              <CaretRight size={14} weight="bold" color={PINDO.muted} />
            </div>
          </Card>
        )}
        {after ? (
          <Card title="Seller" highlight delay={0.25} play={play}>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: PINDO.bg }}>
                <Storefront size={19} color={PINDO.ink} />
              </span>
              <span className="flex-1">
                <span className="flex items-center gap-1 text-[13.5px] font-semibold" style={{ color: PINDO.ink }}>
                  Electronic World <SealCheck size={15} weight="fill" color="#3B82F6" />
                </span>
                <span className="mt-0.5 block text-[12px]" style={{ color: PINDO.muted }}>Tehran, Sohrevardi</span>
              </span>
              <CaretRight size={14} weight="bold" color={PINDO.muted} />
            </div>
          </Card>
        ) : null}
        <Card title="Items">
          <ItemRow name="Desk phone" price="1,100,000" tone="#E3E0DA" />
          <ItemRow name="Power strip" price={after ? "250,000" : "300,000"} tone="#E6EAE2" />
        </Card>
        <Card title="Payment summary">
          {after ? (
            <>
              <SummaryRow label="Items" value="1,350,000 toman" />
              <SummaryRow label="Shipping time" value="Within 1 working day" highlight delay={0.7} play={play} />
              <SummaryRow label="Shipping cost" value="50,000 toman" highlight delay={1.0} play={play} />
              <SummaryRow label="Total" value="1,400,000 toman" strong />
            </>
          ) : (
            <SummaryRow label="Total" value="1,400,000 toman" strong />
          )}
        </Card>
      </div>
      <PayBar />
    </Screen>
  );
}

/* ——— After payment: seller ships, buyer waits, buyer resolves ——— */

function Choice({ icon: Icon, title, note, active }) {
  return (
    <div
      className="mb-2 flex items-center gap-3 rounded-[16px] border-[1.5px] bg-white px-4 py-3"
      style={{ borderColor: active ? PINDO.ink : PINDO.line }}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-[11px]" style={{ background: active ? PINDO.yellow : PINDO.bg }}>
        <Icon size={19} color={PINDO.ink} weight={active ? "fill" : "regular"} />
      </span>
      <span className="flex-1">
        <span className="block text-[14px] font-semibold" style={{ color: PINDO.ink }}>{title}</span>
        <span className="mt-0.5 block text-[12px]" style={{ color: PINDO.muted }}>{note}</span>
      </span>
      <span
        className="flex h-5 w-5 items-center justify-center rounded-full border-[1.5px]"
        style={{ borderColor: active ? PINDO.ink : "#D4D4D4", background: active ? PINDO.ink : "transparent" }}
      >
        {active ? <Check size={11} weight="bold" color="#fff" /> : null}
      </span>
    </div>
  );
}

function OrderItem() {
  return (
    <div className="mx-4 mb-3 flex items-center gap-3 rounded-[18px] bg-white p-3.5">
      <Thumb tone="#E6EAE2" />
      <span className="flex-1">
        <span className="block text-[13.5px] font-semibold" style={{ color: PINDO.ink }}>Power strip</span>
        <span className="mt-0.5 block text-[12px]" style={{ color: PINDO.muted }}>Order #48213 · 250,000 toman</span>
      </span>
    </div>
  );
}

export function SellerShipScreen() {
  return (
    <Screen className="flex h-full flex-col" style={{ background: PINDO.bg, direction: "ltr" }}>
      <div className="bg-white">
        <StatusBar />
      </div>
      <Header title="Mark as shipped" step="Seller" />
      <div className="pt-3">
        <OrderItem />
        <p className="mx-5 mb-2 text-[12px] font-medium" style={{ color: PINDO.muted }}>Shipping method</p>
        <div className="mx-4">
          <Choice icon={Truck} title="Courier" note="Delivered in under a day" active />
          <Choice icon={Package} title="Post" note="Delivered in 3–5 days" />
        </div>
        <div className="mx-4 mt-2 flex items-center gap-2.5 rounded-[14px] px-3.5 py-3 text-[12px] leading-[1.5]" style={{ background: "#FFF6DB", color: "#7A5A00" }}>
          <Lightbulb size={17} weight="fill" className="shrink-0" />
          Shipping is now paid by the buyer at checkout.
        </div>
      </div>
      <PayBar total={null} label="Confirm shipment" />
    </Screen>
  );
}

function TimelineStep({ title, note, state }) {
  const done = state === "done";
  const now = state === "now";
  return (
    <div className="relative flex gap-3 pb-5 last:pb-0">
      <span
        className="relative z-[1] mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
        style={{ background: done ? PINDO.ink : now ? PINDO.yellow : "#E6E6E6" }}
      >
        {done ? <Check size={12} weight="bold" color="#fff" /> : null}
        {now ? <Truck size={13} weight="fill" color={PINDO.ink} /> : null}
      </span>
      <span>
        <span className="block text-[14px] font-semibold" style={{ color: state ? PINDO.ink : "#B5B5B5" }}>{title}</span>
        <span className="mt-0.5 block text-[12px]" style={{ color: state ? PINDO.muted : "#C8C8C8" }}>{note}</span>
      </span>
    </div>
  );
}

export function InTransitScreen() {
  return (
    <Screen className="flex h-full flex-col" style={{ background: PINDO.bg, direction: "ltr" }}>
      <div className="bg-white">
        <StatusBar />
      </div>
      <Header title="Order status" step="Buyer" />
      <div className="pt-3">
        <OrderItem />
        <div className="mx-4 rounded-[18px] bg-white p-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="rounded-full px-2.5 py-1 text-[11.5px] font-semibold" style={{ background: PINDO.yellow, color: PINDO.ink }}>In transit</span>
            <span className="flex items-center gap-1 text-[12px] font-medium" style={{ color: PINDO.muted }}>
              <Clock size={14} /> Arrives in under a day
            </span>
          </div>
          <div className="relative">
            <span className="absolute bottom-3 left-[11px] top-3 w-[2px] bg-[#EDEDED]" />
            <TimelineStep title="Paid" note="Held safely by Pindo" state="done" />
            <TimelineStep title="Shipped by courier" note="Today, 11:20" state="done" />
            <TimelineStep title="On the way" note="Expected within 1 day" state="now" />
            <TimelineStep title="Delivered" note="Confirm the item to release payment" />
          </div>
        </div>
        <div className="mx-4 mt-2.5 flex items-center gap-2.5 rounded-[14px] bg-white px-3.5 py-3 text-[12px]" style={{ color: PINDO.muted }}>
          <ShieldCheck size={18} weight="fill" color="#1A9E5C" className="shrink-0" />
          Your money stays with Pindo until you confirm.
        </div>
      </div>
    </Screen>
  );
}

export function ReceivedPromptScreen({ play = true }) {
  const reduce = useReducedMotion();
  return (
    <Screen className="relative flex h-full flex-col" style={{ background: PINDO.bg, direction: "ltr" }}>
      <div className="bg-white">
        <StatusBar />
      </div>
      <Header title="Order status" step="Buyer" />
      <div className="pt-3 opacity-40">
        <OrderItem />
      </div>
      <div className="absolute inset-0 bg-black/30" />
      <motion.div
        className="absolute inset-x-0 bottom-0 rounded-t-[28px] bg-white px-5 pb-8 pt-3"
        initial={reduce ? false : { y: "100%" }}
        animate={play ? { y: 0 } : { y: "100%" }}
        transition={{ type: "spring", stiffness: 210, damping: 28, delay: 0.3 }}
      >
        <span className="mx-auto mb-5 block h-1 w-10 rounded-full bg-[#E4E4E4]" />
        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "#FFF3CC" }}>
          <Package size={28} weight="fill" color="#C98F00" />
        </span>
        <p className="text-center text-[18px] font-semibold" style={{ color: PINDO.ink }}>Did your order arrive?</p>
        <p className="mt-2 text-center text-[13px] leading-[1.55]" style={{ color: PINDO.muted }}>
          The delivery window has passed. Let us know so we can close the order — or help.
        </p>
        <div className="mt-6 flex flex-col gap-2">
          <span className="flex h-[50px] items-center justify-center rounded-[14px] text-[15px] font-semibold" style={{ background: PINDO.yellow, color: PINDO.ink }}>
            I received it
          </span>
          <span className="flex h-[50px] items-center justify-center rounded-[14px] border-[1.5px] text-[15px] font-semibold" style={{ borderColor: PINDO.line, color: PINDO.ink }}>
            Not received yet
          </span>
        </div>
      </motion.div>
    </Screen>
  );
}

/* ——— Delivered → confirmed, or a return request ——— */

export function ConditionScreen() {
  return (
    <Screen className="flex h-full flex-col" style={{ background: PINDO.bg, direction: "ltr" }}>
      <div className="bg-white">
        <StatusBar />
      </div>
      <Header title="Item received" />
      <div className="pt-3">
        <OrderItem />
        <div className="mx-4 rounded-[18px] bg-white p-5">
          <p className="text-[20px] font-semibold leading-snug tracking-[-0.01em]" style={{ color: PINDO.ink }}>
            Is the item as described?
          </p>
          <p className="mt-2 text-[13px] leading-[1.55]" style={{ color: PINDO.muted }}>
            Confirm its condition to complete the purchase, or tell us what went wrong.
          </p>
          <div className="mt-5 flex flex-col gap-2">
            <span className="flex h-[50px] items-center justify-center gap-2 rounded-[14px] text-[15px] font-semibold" style={{ background: PINDO.yellow, color: PINDO.ink }}>
              <Check size={17} weight="bold" /> Everything is fine
            </span>
            <span className="flex h-[50px] items-center justify-center rounded-[14px] border-[1.5px] text-[15px] font-semibold" style={{ borderColor: PINDO.line, color: PINDO.ink }}>
              Report an issue
            </span>
          </div>
        </div>
      </div>
    </Screen>
  );
}

export function ReturnRequestScreen() {
  const reasons = ["Different from the listing", "Damaged or incomplete", "Other issue"];
  return (
    <Screen className="flex h-full flex-col" style={{ background: PINDO.bg, direction: "ltr" }}>
      <div className="bg-white">
        <StatusBar />
      </div>
      <Header title="Return request" />
      <div className="pt-4">
        <p className="mx-5 mb-3 text-[18px] font-semibold" style={{ color: PINDO.ink }}>What happened with the item?</p>
        <div className="mx-4">
          {reasons.map((reason, i) => (
            <div
              key={reason}
              className="mb-2 flex items-center gap-3 rounded-[14px] border-[1.5px] bg-white px-4 py-3.5 text-[14px] font-medium"
              style={{ borderColor: i === 0 ? PINDO.ink : PINDO.line, color: PINDO.ink }}
            >
              <span
                className="h-5 w-5 rounded-full border-[1.5px]"
                style={i === 0 ? { borderColor: PINDO.ink, borderWidth: 6 } : { borderColor: "#D4D4D4" }}
              />
              {reason}
            </div>
          ))}
          <div className="mt-1 rounded-[14px] bg-white px-4 py-3.5">
            <p className="text-[12px] font-medium" style={{ color: PINDO.muted }}>Details</p>
            <p className="mt-1 text-[13.5px] leading-[1.5]" style={{ color: PINDO.ink }}>
              It has two sockets, the listing said three.
            </p>
          </div>
          <div className="mt-2 flex items-center gap-2.5 rounded-[14px] px-3.5 py-3 text-[12px] leading-[1.5]" style={{ background: "#FFF6DB", color: "#7A5A00" }}>
            <ShieldCheck size={17} weight="fill" className="shrink-0" />
            Your payment stays on hold while support reviews this.
          </div>
        </div>
      </div>
      <PayBar total={null} label="Submit request" />
    </Screen>
  );
}
