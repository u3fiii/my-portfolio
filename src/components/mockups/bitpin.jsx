/**
 * Bitpin screens rebuilt in code (English, LTR) for the deposit case study.
 * They follow the flow rather than every pixel of the shipped UI, so some
 * details are simplified into abstract blocks.
 */
import {
  ArrowLeft,
  Bank,
  CaretDown,
  CaretRight,
  ChartBar,
  ClockCounterClockwise,
  Copy,
  CreditCard,
  CurrencyBtc,
  House,
  Info,
  Lightning,
  Lock,
  Question,
  Star,
  Timer,
  Wallet,
  ArrowsLeftRight,
} from "@phosphor-icons/react";
import { motion, useReducedMotion } from "framer-motion";
import { StatusBar } from "./PhoneFrame.jsx";
import { Screen } from "./interaction.jsx";

export const BP = {
  bg: "#0E0F11",
  surface: "#1A1B1E",
  raised: "#232428",
  line: "#2C2D32",
  text: "#F3F3F4",
  muted: "#8B8C93",
  faint: "#5C5D64",
  green: "#00C77F",
  amber: "#E7A93B",
};

/** A grey bar standing in for text we don't need to show. */
function Bar({ w = 80, h = 8, color = BP.raised, className = "" }) {
  return <span className={`block rounded-full ${className}`} style={{ width: w, height: h, background: color }} />;
}

function Header({ title, back = true, actions = true }) {
  return (
    <div className="flex items-center justify-between px-5 pb-4 pt-2">
      <span className="flex items-center gap-3 text-[17px] font-semibold" style={{ color: BP.text }}>
        {back ? <ArrowLeft size={20} weight="bold" /> : null}
        {title}
      </span>
      {actions ? (
        <span className="flex gap-3" style={{ color: BP.muted }}>
          <Question size={21} />
          <ClockCounterClockwise size={21} />
        </span>
      ) : null}
    </div>
  );
}

/* ——— Easy buy ——— */

function TabBar() {
  const items = [
    { icon: House, label: "Home" },
    { icon: ChartBar, label: "Markets" },
    { icon: ArrowsLeftRight, label: "Trade" },
    { icon: Lightning, label: "Easy buy", active: true },
    { icon: Wallet, label: "Wallet" },
  ];
  return (
    <div className="mt-auto flex justify-around border-t px-2 pb-7 pt-3" style={{ borderColor: BP.line }}>
      {items.map(({ icon: Icon, label, active }) => (
        <span key={label} className="flex flex-col items-center gap-1 text-[10.5px] font-medium" style={{ color: active ? BP.green : BP.faint }}>
          <Icon size={22} weight={active ? "fill" : "regular"} />
          {label}
        </span>
      ))}
    </div>
  );
}

export function EasyBuyScreen() {
  return (
    <Screen className="flex h-full flex-col" style={{ background: BP.bg, direction: "ltr" }}>
      <StatusBar tone="dark" />
      <Header title="Easy buy" back={false} />
      <div className="px-5">
        <div className="grid grid-cols-2 rounded-[2px] p-1 text-[14px] font-semibold" style={{ background: BP.surface }}>
          <span className="rounded-[2px] py-2 text-center" style={{ background: BP.raised, color: BP.text }}>Buy</span>
          <span className="py-2 text-center" style={{ color: BP.muted }}>Sell</span>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-[2px] px-4 py-3.5" style={{ background: BP.surface }}>
          <span className="flex items-center gap-2.5 text-[15px] font-semibold" style={{ color: BP.text }}>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F7931A] text-white">
              <CurrencyBtc size={17} weight="bold" />
            </span>
            Bitcoin
          </span>
          <CaretDown size={14} weight="bold" color={BP.muted} />
        </div>
        <div className="mt-3 rounded-[2px] px-4 pb-4 pt-5" style={{ background: BP.surface }}>
          <p className="text-[11.5px] font-medium" style={{ color: BP.muted }}>You pay</p>
          <p className="mt-1 flex items-baseline gap-2 text-[30px] font-semibold tracking-[-0.02em]" style={{ color: BP.text }}>
            500,000 <span className="text-[14px] font-medium" style={{ color: BP.muted }}>toman</span>
          </p>
          <p className="mt-2 text-[12px]" style={{ color: BP.faint }}>≈ 0.00071 BTC</p>
        </div>
        <div className="mt-5 flex h-[54px] items-center justify-center gap-2 rounded-[2px] text-[16px] font-semibold text-[#0B2A1E]" style={{ background: BP.green }}>
          <Lightning size={18} weight="fill" /> Buy
        </div>
      </div>
      <div className="mt-6 grid grid-cols-3 gap-y-5 px-10 text-center text-[22px] font-medium" style={{ color: BP.text }}>
        {["1", "2", "3", "4", "5", "6", "7", "8", "9", "", "0", "⌫"].map((k, i) => (
          <span key={i} style={{ color: k === "⌫" ? BP.muted : undefined }}>{k}</span>
        ))}
      </div>
      <TabBar />
    </Screen>
  );
}

/* ——— Shaparak gateway (the trusted, familiar step) ——— */

export function GatewayScreen() {
  const field = (label, value) => (
    <div className="mb-3">
      <p className="mb-1.5 text-[11.5px] font-medium text-[#8A8A8A]">{label}</p>
      <div className="flex h-[44px] items-center rounded-[2px] border border-[#E4E4E4] bg-white px-3.5 text-[14.5px] font-semibold tracking-[0.04em] text-[#222]">
        {value}
      </div>
    </div>
  );
  return (
    <Screen className="flex h-full flex-col bg-[#F4F5F7]" style={{ direction: "ltr" }}>
      <StatusBar />
      <div className="mx-4 mb-4 mt-2 flex h-10 items-center gap-2 rounded-full bg-white px-4 text-[13px] text-[#555] shadow-[0_1px_2px_rgb(0_0_0/0.06)]">
        <Lock size={14} weight="fill" color="#1A9E5C" />
        shaparak.ir
      </div>
      <div className="mx-4 rounded-[2px] bg-white p-4 shadow-[0_1px_3px_rgb(0_0_0/0.05)]">
        <div className="flex items-center justify-between">
          <span>
            <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-[#9A9A9A]">Merchant</p>
            <p className="mt-0.5 text-[16px] font-semibold text-[#111]">Bitpin</p>
          </span>
          <span className="rounded-full bg-[#E9F7EF] px-2.5 py-1 text-[11px] font-semibold text-[#1A9E5C]">Verified</span>
        </div>
        <div className="mt-4 flex items-baseline justify-between border-t border-dashed border-[#E6E6E6] pt-3.5">
          <span className="text-[12.5px] text-[#8A8A8A]">Amount</span>
          <span className="text-[19px] font-semibold text-[#111]">500,000 <span className="text-[12px] font-normal text-[#8A8A8A]">toman</span></span>
        </div>
      </div>
      <div className="mx-4 mt-3 rounded-[2px] bg-white p-4 shadow-[0_1px_3px_rgb(0_0_0/0.05)]">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-[14px] font-semibold text-[#111]">Card details</span>
          <span className="flex items-center gap-1 text-[12px] font-medium text-[#8A8A8A]">
            <Timer size={14} /> 09:28
          </span>
        </div>
        {field("Card number", "6219 86•• •••• 6407")}
        <div className="grid grid-cols-2 gap-2.5">
          {field("CVV2", "•••")}
          {field("Expiry", "•• / ••")}
        </div>
        {field("Dynamic password", "••••••")}
      </div>
      <div className="mx-4 mt-auto mb-8 flex h-[52px] items-center justify-center gap-2 rounded-[2px] bg-[#1A9E5C] text-[15px] font-semibold text-white">
        <Lock size={16} weight="fill" /> Pay 500,000 toman
      </div>
    </Screen>
  );
}

/* ——— Deposit method sheet ——— */

const METHODS = {
  initial: [
    { title: "Card to card", note: "Up to 10 minutes", icon: Timer },
    { title: "Account to account", note: "Up to 100M a day", icon: Bank },
    { title: "SHEBA transfer", note: "Up to 100M a day", icon: Bank },
    { title: "Direct debit", note: "Up to 10 minutes", icon: Lightning },
  ],
  grouped: [
    { title: "Bank transfer", note: "Card, account, SHEBA", icon: Bank, badge: "Recommended" },
    { title: "Direct debit", note: "Automatic, with bank approval", icon: Lightning },
    { title: "Online gateway", note: "Currently unavailable", icon: CreditCard, disabled: true },
  ],
};

function MethodRow({ title, note, icon: Icon, badge, disabled }) {
  return (
    <div
      className="relative mb-2.5 flex items-center gap-3.5 rounded-[2px] border px-4 py-3.5"
      style={{ borderColor: badge ? BP.green : BP.line, background: BP.surface, opacity: disabled ? 0.4 : 1 }}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px]" style={{ background: BP.raised, color: badge ? BP.green : BP.muted }}>
        <Icon size={19} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-semibold" style={{ color: BP.text }}>{title}</span>
        <span className="mt-0.5 block text-[12px]" style={{ color: BP.muted }}>{note}</span>
      </span>
      {badge ? (
        <span className="absolute -top-2.5 left-4 flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-semibold text-[#0B2A1E]" style={{ background: BP.green }}>
          <Star size={10} weight="fill" /> {badge}
        </span>
      ) : null}
      <CaretRight size={14} weight="bold" color={BP.faint} />
    </div>
  );
}

/** Dimmed page behind a sheet — abstract on purpose, it's only context. */
function Backdrop({ title }) {
  return (
    <div className="flex flex-1 flex-col opacity-30">
      <Header title={title} />
      <div className="px-5">
        <Bar w={120} />
        <Bar w={200} className="mt-3" />
        <Bar w={170} className="mt-3" />
      </div>
    </div>
  );
}

function Sheet({ children, play = true, delay = 0.2 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="absolute inset-x-0 bottom-0 z-10 rounded-t-[4px] border-t px-5 pb-8 pt-3"
      style={{ background: "#141518", borderColor: BP.line }}
      initial={reduce ? false : { y: "100%" }}
      animate={play ? { y: 0 } : { y: "100%" }}
      transition={{ type: "spring", stiffness: 210, damping: 28, delay }}
    >
      <span className="mx-auto mb-4 block h-1 w-10 rounded-full" style={{ background: BP.line }} />
      {children}
    </motion.div>
  );
}

export function MethodSheetScreen({ variant = "initial", play = true }) {
  return (
    <Screen className="relative flex h-full flex-col" style={{ background: BP.bg, direction: "ltr" }}>
      <StatusBar tone="dark" />
      <Backdrop title="Deposit toman" />
      <div className="absolute inset-0 bg-black/50" />
      <Sheet play={play}>
        <p className="mb-4 text-center text-[17px] font-semibold" style={{ color: BP.text }}>Choose a deposit method</p>
        <p className="mb-2.5 text-[12px] font-medium" style={{ color: BP.muted }}>Toman deposit</p>
        {METHODS[variant].map((m) => (
          <MethodRow key={m.title} {...m} />
        ))}
        <p className="mb-2.5 mt-4 text-[12px] font-medium" style={{ color: BP.muted }}>Have crypto elsewhere?</p>
        <MethodRow title="Crypto deposit" note="From another wallet, on-chain" icon={CurrencyBtc} />
      </Sheet>
    </Screen>
  );
}

/* ——— SHEBA instructions (the manual transfer) ——— */

function InfoRow({ label, value, copy }) {
  return (
    <div className="flex items-center justify-between py-2 text-[13px]">
      <span style={{ color: BP.muted }}>{label}</span>
      <span className="flex items-center gap-1.5 font-semibold tracking-[0.02em]" style={{ color: BP.text }}>
        {value}
        {copy ? <Copy size={14} color={BP.muted} /> : null}
      </span>
    </div>
  );
}

function Select({ label, value, swatch }) {
  return (
    <div className="mb-3">
      <p className="mb-1.5 text-[11.5px] font-medium" style={{ color: BP.muted }}>{label}</p>
      <div className="flex h-[48px] items-center justify-between rounded-[2px] px-4" style={{ background: BP.raised }}>
        <span className="flex items-center gap-2.5 text-[14px] font-semibold" style={{ color: BP.text }}>
          <span className="h-5 w-5 rounded-[2px]" style={{ background: swatch }} />
          {value}
        </span>
        <CaretDown size={14} weight="bold" color={BP.muted} />
      </div>
    </div>
  );
}

export function ShebaScreen({ dim = false, children }) {
  return (
    <Screen className="relative flex h-full flex-col" style={{ background: BP.bg, direction: "ltr" }}>
      <StatusBar tone="dark" />
      <div className={`flex flex-1 flex-col transition-opacity duration-500 ${dim ? "opacity-40 blur-[1.5px]" : ""}`}>
        <Header title="SHEBA transfer" />
        <div className="mx-5 flex items-center gap-3 rounded-[2px] px-4 py-3" style={{ background: BP.surface }}>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[2px]" style={{ background: "#0F3B2A", color: BP.green }}>
            <Bank size={19} weight="fill" />
          </span>
          <p className="text-[12.5px] leading-[1.5]" style={{ color: BP.muted }}>
            Best for deposits <span style={{ color: BP.green }}>over 10M toman</span>, credited in the next banking cycle.
          </p>
        </div>
        <div className="mx-5 mt-4 rounded-[2px] border p-4" style={{ borderColor: BP.line }}>
          <Select label="From your account" value="IR67 2182 •••• 2304" swatch="#D9534F" />
          <Select label="To Bitpin's bank" value="Tose'e Ta'avon" swatch="#2E9E5B" />
          <div className="mt-1 rounded-[2px] px-3.5 py-1.5" style={{ background: BP.surface }}>
            <InfoRow label="SHEBA" value="IR67 2182 9319 •••" copy />
            <InfoRow label="Name" value="Sana Exchange Co." />
            <InfoRow label="Reason" value="Goods / services" />
          </div>
        </div>
        <div className="mx-5 mt-3 rounded-[2px] px-4 py-3 text-[12px] leading-[1.6]" style={{ background: "#2A2112", color: "#D9B97A" }}>
          Send from the account selected above, using your bank's official app or a branch.
        </div>
        <div className="mx-5 mt-auto mb-8 flex h-[52px] items-center justify-center gap-2 rounded-[2px] text-[15px] font-semibold text-[#0B2A1E]" style={{ background: BP.green }}>
          <Copy size={17} weight="bold" /> Copy SHEBA number
        </div>
      </div>
      {children}
    </Screen>
  );
}

/* ——— Explorations before the study ——— */

export function SourceCardScreen({ play = true }) {
  const card = (bank, swatch, fast) => (
    <div key={bank} className="mb-2.5 rounded-[2px] border p-3.5" style={{ borderColor: BP.line, background: BP.surface }}>
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[14px] font-semibold" style={{ color: BP.text }}>
          <span className="h-5 w-5 rounded-[2px]" style={{ background: swatch }} />
          {bank}
        </span>
        {fast ? (
          <span className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-semibold" style={{ background: "#0F3B2A", color: BP.green }}>
            <Lightning size={10} weight="fill" /> Under 10 min
          </span>
        ) : null}
      </div>
      <Bar w={150} className="mt-3" />
      <Bar w={110} h={6} className="mt-2" />
    </div>
  );
  return (
    <Screen className="relative flex h-full flex-col" style={{ background: BP.bg, direction: "ltr" }}>
      <StatusBar tone="dark" />
      <Backdrop title="Deposit toman" />
      <div className="absolute inset-0 bg-black/50" />
      <Sheet play={play}>
        <p className="mb-2 text-center text-[17px] font-semibold" style={{ color: BP.text }}>Choose your source card</p>
        <p className="mb-4 text-center text-[12px] leading-[1.5]" style={{ color: BP.muted }}>
          Cards from Bitpin's partner banks are credited fastest.
        </p>
        <p className="mb-2 text-[12px] font-medium" style={{ color: BP.muted }}>Last used</p>
        {card("Blu Bank", "#2B6BE6", true)}
        <p className="mb-2 mt-3 text-[12px] font-medium" style={{ color: BP.muted }}>Other cards</p>
        {card("Eghtesad Novin", "#7A4FE0", true)}
        {card("Sepah", "#D9534F", false)}
      </Sheet>
    </Screen>
  );
}

export function BankMatchScreen({ play = true }) {
  const bank = (name, swatch, tag, active) => (
    <div
      key={name}
      className="mb-2 flex items-center justify-between rounded-[2px] border px-4 py-3"
      style={{ borderColor: active ? BP.green : BP.line, background: BP.surface }}
    >
      <span className="flex items-center gap-2.5 text-[14px] font-semibold" style={{ color: BP.text }}>
        <span className="h-5 w-5 rounded-[2px]" style={{ background: swatch }} />
        {name}
      </span>
      {tag}
    </div>
  );
  return (
    <ShebaScreen dim>
      <div className="absolute inset-0 z-[5] bg-black/40" />
      <Sheet play={play}>
        <p className="mb-4 text-center text-[17px] font-semibold" style={{ color: BP.text }}>Choose destination bank</p>
        {bank(
          "Blu Bank",
          "#2B6BE6",
          <span className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10.5px] font-semibold" style={{ background: "#0F3B2A", color: BP.green }}>
            <Lightning size={10} weight="fill" /> Same bank
          </span>,
          true,
        )}
        {bank("Iran Venezuela", "#E0A43B")}
        {bank(
          "Gardeshgari",
          "#C0392B",
          <span className="rounded-full px-2 py-0.5 text-[10.5px] font-semibold" style={{ background: "#2A2112", color: BP.amber }}>
            Slower
          </span>,
        )}
      </Sheet>
    </ShebaScreen>
  );
}

/* ——— The context bridge ——— */

const BRIDGE = {
  v1: {
    title: "Online gateway deposits aren't available",
    body: "Online gateway deposits are currently unavailable, but you can easily top up your account with bank transfers (card to card, account to account, SHEBA) or direct debit.",
    cta: "Got it",
  },
  v2: {
    title: "Payment gateways are paused across all Iranian exchanges",
    body: "Card to card and other bank transfers are official, secure alternatives.",
    cta: "View deposit methods",
  },
};

export function BridgeSheetScreen({ version = "v2", play = true }) {
  const copy = BRIDGE[version];
  return (
    <ShebaScreen dim>
      <div className="absolute inset-0 z-[5] bg-black/45" />
      <Sheet play={play} delay={0.35}>
        <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full" style={{ background: "#12304F" }}>
          <Info size={30} weight="fill" color="#4EA8FF" />
        </span>
        <p className="text-center text-[17px] font-semibold leading-snug" style={{ color: BP.text }}>{copy.title}</p>
        <p className="mt-2.5 text-center text-[13px] leading-[1.6]" style={{ color: BP.muted }}>{copy.body}</p>
        <div className="mt-6 flex h-[52px] items-center justify-center rounded-[2px] text-[15px] font-semibold text-[#0B2A1E]" style={{ background: BP.green }}>
          {copy.cta}
        </div>
      </Sheet>
    </ShebaScreen>
  );
}

