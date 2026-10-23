/** Bitpin deposit flow figures: screens rebuilt in code, paired to tell the flow. */
import { motion, useReducedMotion } from "framer-motion";
import PhoneFrame from "../mockups/PhoneFrame.jsx";
import {
  BankMatchScreen,
  BridgeSheetScreen,
  EasyBuyScreen,
  GatewayScreen,
  MethodSheetScreen,
  ShebaScreen,
  SourceCardScreen,
} from "../mockups/bitpin.jsx";
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
      {caption ? <p className="mt-4 max-w-[220px] text-center text-[12px] leading-snug text-zinc-500">{caption}</p> : null}
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

/** Easy buy → Shaparak, then the link between them breaks once the figure is in view. */
export function BitpinGatewayFigure() {
  const [ref, inView] = useInViewOnce(0.45);
  const reduce = useReducedMotion();
  return (
    <Tray frameRef={ref} caption="The route users knew: tap Buy, land on Shaparak, pay by card. In January 2024, that link was cut.">
      <Column label="Easy buy" phone={<PhoneFrame width={210} label="Bitpin easy buy screen"><EasyBuyScreen /></PhoneFrame>} />
      <div className="relative flex h-[440px] w-24 items-center justify-center max-sm:h-16 max-sm:w-full">
        <svg viewBox="0 0 96 24" className="h-6 w-24 max-sm:rotate-90" fill="none" strokeLinecap="round">
          <motion.path
            d="M4 12 H40"
            stroke="currentColor"
            className="text-zinc-300"
            strokeWidth="1.8"
          />
          <motion.path
            d="M56 12 H90 M83 5 L90 12 L83 19"
            stroke="currentColor"
            className="text-zinc-300"
            strokeWidth="1.8"
            initial={false}
            animate={inView && !reduce ? { x: 6, opacity: 0.35 } : { x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.path
            d="M40 12 H56"
            stroke="currentColor"
            className="text-zinc-300"
            strokeWidth="1.8"
            initial={false}
            animate={inView ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2, delay: 1.1 }}
          />
        </svg>
        <motion.span
          className="absolute top-[calc(50%+18px)] whitespace-nowrap rounded-full bg-[#FDECEF] px-2.5 py-1 text-[10.5px] font-semibold text-[#D0425E] max-sm:top-auto max-sm:left-[calc(50%+24px)]"
          initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: -8 }}
          animate={inView ? { opacity: 1, scale: 1, rotate: -4 } : undefined}
          transition={{ type: "spring", stiffness: 380, damping: 16, delay: 1.25 }}
        >
          Gateways shut down
        </motion.span>
      </div>
      <Column label="Shaparak gateway" phone={<PhoneFrame width={210} label="Shaparak bank card payment page"><GatewayScreen /></PhoneFrame>} />
    </Tray>
  );
}

/** The workaround: pick a method, then follow manual transfer instructions. */
export function BitpinWorkaroundFigure() {
  const [ref, inView] = useInViewOnce(0.4);
  return (
    <Tray frameRef={ref} caption="Left: choose a deposit method. Right: SHEBA transfer instructions — source account, destination bank and transfer rules.">
      <Column label="Choose a method" phone={<PhoneFrame width={210} label="Deposit method sheet"><MethodSheetScreen play={inView} /></PhoneFrame>} />
      <Arrow />
      <Column label="Transfer instructions" phone={<PhoneFrame width={210} label="SHEBA transfer instructions"><ShebaScreen /></PhoneFrame>} />
    </Tray>
  );
}

/** Four explorations made before the study, in a row. */
export function BitpinIterationsFigure() {
  const [ref, inView] = useInViewOnce(0.35);
  const items = [
    { label: "Source card", caption: "Pick the card first; partner banks flagged as fastest.", screen: <SourceCardScreen play={inView} /> },
    { label: "Grouped methods", caption: "Fewer options, one recommended.", screen: <MethodSheetScreen variant="grouped" play={inView} /> },
    { label: "Granular methods", caption: "Every method listed with its limits.", screen: <MethodSheetScreen play={inView} /> },
    { label: "Same-bank match", caption: "Destination bank matched to the user's card.", screen: <BankMatchScreen play={inView} /> },
  ];
  return (
    <Tray
      frameRef={ref}
      gap="gap-x-4 gap-y-8"
      caption="Explorations before the usability study — I reviewed these closely with the product designer, who owned the interface work."
    >
      {items.map(({ label, caption, screen }) => (
        <Column key={label} width={148} label={label} caption={caption} phone={<PhoneFrame radius={20} width={148} label={label}>{screen}</PhoneFrame>} />
      ))}
    </Tray>
  );
}

/** What first-time users expected next to what they got. */
export function BitpinExpectationFigure() {
  return (
    <Tray caption="The comparison users were really making: not between Bitpin's methods, but between a familiar gateway and a stranger's account number.">
      <Column label="What they expected" tone="#1A9E5C" phone={<PhoneFrame width={210} label="Expected: Shaparak payment gateway"><GatewayScreen /></PhoneFrame>} />
      <span aria-hidden className="self-center text-[13px] font-medium text-zinc-400">vs</span>
      <Column label="What they got" tone="#D0425E" phone={<PhoneFrame width={210} label="Got: manual SHEBA transfer details"><ShebaScreen /></PhoneFrame>} />
    </Tray>
  );
}

/** The bottom sheet before and after the revision. */
export function BitpinBridgeFigure() {
  const [ref, inView] = useInViewOnce(0.4);
  return (
    <Tray frameRef={ref} caption="Left: the first explanation — long, easy to dismiss. Right: shorter, framed as industry-wide, and leading straight to the deposit methods.">
      <Column label="First version" phone={<PhoneFrame width={210} label="Bottom sheet, first version"><BridgeSheetScreen version="v1" play={inView} /></PhoneFrame>} />
      <Arrow />
      <Column label="Revision" tone="#00A86B" phone={<PhoneFrame width={210} label="Bottom sheet, revised"><BridgeSheetScreen version="v2" play={inView} /></PhoneFrame>} />
    </Tray>
  );
}
