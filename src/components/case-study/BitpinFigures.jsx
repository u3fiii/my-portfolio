/** Bitpin deposit flow figures: screens rebuilt in code, paired to tell the flow. */
import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
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

/** The familiar pre-shutdown route, played as one sequence across both phones. */
const GATEWAY_FLOW_TIMES = [0, 850, 1120, 1390, 1660, 1930, 2200, 2800, 3200, 3700, 4150, 4600, 5050, 5650, 6400, 7100];
const GATEWAY_FLOW_LENGTH = 9000;

export function BitpinGatewayFigure() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduce = useReducedMotion();
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (reduce) {
      setStage(15);
      return;
    }
    if (!inView) {
      setStage(0);
      return;
    }

    const timers = new Set();
    const later = (callback, delay) => {
      const id = window.setTimeout(() => {
        timers.delete(id);
        callback();
      }, delay);
      timers.add(id);
    };
    const play = () => {
      setStage(0);
      GATEWAY_FLOW_TIMES.forEach((time, nextStage) => {
        if (nextStage > 0) later(() => setStage(nextStage), time);
      });
      later(play, GATEWAY_FLOW_LENGTH);
    };
    play();
    return () => timers.forEach(window.clearTimeout);
  }, [inView, reduce]);

  const gatewayActive = stage >= 8;
  return (
    <Tray frameRef={ref} caption="The familiar route before the shutdown: enter an amount, pay on Shaparak, return to a completed purchase. In January 2024, that route was cut.">
      <Column label="Easy buy" phone={<PhoneFrame width={210} label="Animated Bitpin easy buy flow"><EasyBuyScreen flowStage={stage} /></PhoneFrame>} />
      <div className="flex h-[440px] w-24 items-center justify-center max-sm:h-16 max-sm:w-full" aria-hidden>
        <motion.span
          className="text-4xl leading-none max-sm:rotate-90"
          initial={false}
          animate={{ color: gatewayActive ? "#00A86B" : "#D4D4D8", opacity: gatewayActive ? 1 : 0.55, scale: gatewayActive && stage < 15 ? 1.14 : 1 }}
          transition={{ duration: 0.45 }}
        >{stage >= 15 ? "←" : "→"}</motion.span>
      </div>
      <Column label="Shaparak gateway" phone={
        <motion.div
          initial={false}
          animate={{ opacity: gatewayActive ? 1 : 0.32, filter: gatewayActive ? "grayscale(0%)" : "grayscale(100%)" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <PhoneFrame width={210} label="Animated Shaparak payment page"><GatewayScreen flowStage={stage} /></PhoneFrame>
        </motion.div>
      } />
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
