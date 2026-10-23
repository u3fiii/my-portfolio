/**
 * Sheypoor screens rebuilt in code (RTL, Vazirmatn) so the case study can
 * animate them. Car photos are cropped from the original feed screenshot.
 */
import {
  ArrowLeft,
  ArrowRight,
  CaretDown as Caret,
  ChatCircle,
  Faders,
  Heart,
  House,
  MagnifyingGlass,
  Plus,
  User,
  Bell,
  Camera,
  CaretDown,
  ChatCircleDots,
  MapPin,
  Megaphone,
  PlusSquare,
  SlidersHorizontal,
  Star,
  UserCircle,
  XCircle,
} from "@phosphor-icons/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { createPortal } from "react-dom";
import { StatusBar } from "./PhoneFrame.jsx";
import CarModel3D from "../case-study/CarModel3D.jsx";
import { useEffect, useRef, useState } from "react";
import { Screen, useDragScroll } from "./interaction.jsx";

// Sheypoor brand blue.
const BLUE = "#2481ED";

/** Price tags: label + colours, per variant. */
export const TAGS = {
  fairBlue: { text: "Fair price", bg: "#E6F1FB", fg: "#1D63B8" },
  fair: { text: "Fair price", bg: "#E5F6EA", fg: "#15803D" },
  high: { text: "High price", bg: "#FDF1DE", fg: "#C2410C" },
  veryHigh: { text: "Too high", bg: "#FDE7EC", fg: "#DB2756" },
  great: { text: "Good deal", bg: "#E5F6EA", fg: "#15803D" },
};

const LISTINGS = [
  { id: "pride", title: "Peugeot 207 · 2019", price: "150,000,000" },
  { id: "tip5", title: "Peugeot 206 · 2014", price: "150,000,000" },
  { id: "dena", title: "Dena Turbo · 2020", price: "180,000,000" },
  { id: "tiba", title: "Tiba 2 · 2019", price: "150,000,000" },
  { id: "pride2", title: "Pride 111 · 2011", price: "110,000,000" },
  { id: "tip5b", title: "Peugeot 206 SD · 2017", price: "220,000,000" },
  { id: "denab", title: "Dena Plus Turbo · 2021", price: "450,000,000" },
  { id: "tibab", title: "Tiba Sedan · 2015", price: "130,000,000" },
  { id: "samand", title: "Samand LX · 2016", price: "240,000,000" },
  { id: "pars", title: "Peugeot Pars · 2018", price: "310,000,000" },
  { id: "quick", title: "Quick R · 2022", price: "390,000,000" },
  { id: "rira", title: "Rira · 2020", price: "260,000,000" },
  { id: "saina", title: "Saina S · 2021", price: "280,000,000" },
  { id: "kia", title: "Kia Pride · 2008", price: "95,000,000" },
];

/** Low-poly cars the listings pick from at random (all CC BY 4.0, scailman). */
const CAR_MODELS = [
  "/models/low-poly-car/model.glb",
  "/models/lowpoly-sedan/model.glb",
  "/models/generic-sedan/model.glb",
];

/** Body colours handed out to listings in order, so neighbours never match. */
const PAINTS = [
  "#F4F4F2", // ivory
  "#A9B8C4", // powder blue
  "#E8A598", // dusty salmon
  "#E9D8A6", // butter
  "#8FB8A6", // sage
  "#C0392B", // tomato
  "#7D9CC4", // cornflower
  "#D9C2D6", // lilac
];

/** Mounts its child only while the element is on screen, so WebGL contexts stay few. */
function useOnScreen() {
  const ref = useRef(null);
  const [onScreen, setOnScreen] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return [ref, onScreen];
}

function Tag({ tag, show, delay = 0, full = false }) {
  const reduce = useReducedMotion();
  if (!tag) return <div className="h-[26px]" aria-hidden />;
  return (
    <motion.span
      initial={reduce ? false : { opacity: 0, scale: 0.8, y: 4 }}
      animate={show ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 4 }}
      transition={{ type: "spring", stiffness: 420, damping: 24, delay }}
      className={`cs-tag inline-flex h-[26px] items-center justify-center rounded-full px-3 text-[12.5px] font-semibold ${full ? "w-full" : ""}`}
      style={{ background: tag.bg, color: tag.fg }}
    >
      {tag.text}
    </motion.span>
  );
}

const randomModel = () => CAR_MODELS[Math.floor(Math.random() * CAR_MODELS.length)];

function ListingCard({ listing, tag, showTag, delay, paint, mono, shine = 0, model: fixedModel, angle: fixedAngle }) {
  const [model] = useState(() => fixedModel ?? randomModel());
  const [angle] = useState(() => fixedAngle ?? Math.random() * Math.PI * 2);
  const [ref, onScreen] = useOnScreen();
  return (
    <div className="relative flex items-start justify-between gap-3 overflow-hidden rounded-[20px] bg-white p-3.5 shadow-[0_1px_2px_rgb(0_0_0/0.04),0_4px_14px_-6px_rgb(0_0_0/0.06)]">
      {shine ? <span key={shine} aria-hidden className="cs-shine" /> : null}
      <div className="flex min-w-0 flex-1 flex-col">
        <p className="truncate pt-0.5 text-[15px] font-semibold tracking-[-0.01em] text-[#111]">{listing.title}</p>
        <p className="mt-1 text-[12px] text-[#9B9B9B]">85,000 km · Tehran</p>
        <p className="mt-3 text-[16px] font-semibold tracking-[-0.01em] tabular-nums text-[#111]">
          {listing.price} <span className="text-[11.5px] font-normal text-[#9B9B9B]">toman</span>
        </p>
        {tag ? (
          <div className="mt-2.5">
            <Tag tag={tag} show={showTag} delay={delay} />
          </div>
        ) : null}
      </div>
      <div ref={ref} className={`h-[96px] w-[118px] shrink-0 overflow-hidden rounded-[14px] bg-[#F4F4F2] ${mono ? "grayscale" : ""}`}>
        {onScreen ? <CarModel3D modelUrl={model} paint={paint} startAngle={angle} className="h-full w-full" /> : null}
      </div>
    </div>
  );
}

function BottomNav() {
  const items = [
    { icon: House, label: "Home", active: true },
    { icon: Heart, label: "Saved" },
    { icon: Plus, label: "Post", accent: true },
    { icon: ChatCircle, label: "Chats" },
    { icon: User, label: "Profile" },
  ];
  return (
    <div className="flex shrink-0 items-center justify-around border-t border-[#F0F0F0] bg-white/95 px-3 pb-7 pt-3">
      {items.map(({ icon: Icon, label, accent, active }) =>
        accent ? (
          <span key={label} aria-label={label} className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2481ED] shadow-[0_6px_14px_-4px_rgb(36_129_237/0.55)]">
            <Icon size={20} weight="bold" color="#fff" />
          </span>
        ) : (
          <span key={label} className={`flex w-12 flex-col items-center gap-1 text-[10.5px] font-medium ${active ? "text-[#2481ED]" : "text-[#A3A3A3]"}`}>
            <Icon size={23} weight={active ? "fill" : "regular"} />
            {label}
          </span>
        ),
      )}
    </div>
  );
}

/**
 * The listing feed. `tags`: one tag (from TAGS) per listing, or nulls; tags
 * pop in with a short stagger whenever `showTags` turns true.
 */
export function SheypoorFeed({ tags = [], showTags = true, mono = false, autoplay = false }) {
  const list = useDragScroll("y");
  const cardRefs = useRef([]);
  const hits = useRef({});
  const paused = useRef(false);
  const resumeTimer = useRef(null);
  const [shines, setShines] = useState({});

  const [focus, setFocus] = useState(null);
  // Fixed per card so the pop-out copy shows the same car at the same angle.
  const [picks] = useState(() => LISTINGS.map(() => ({ model: randomModel(), angle: Math.random() * Math.PI * 2 })));
  // The focused card "breaks out" of the phone: a copy drawn over the frame,
  // outside the screen's clipping, at the card's exact on-screen spot.
  const [pop, setPop] = useState(null);
  useEffect(() => {
    if (focus === null) return; // keep the last copy mounted so it can animate back in
    const node = cardRefs.current[focus];
    const host = node?.closest('[role="img"]');
    if (!host) return;
    const h = host.getBoundingClientRect();
    const n = node.getBoundingClientRect();
    setPop({ i: focus, host, left: n.left - h.left, top: n.top - h.top, scale: n.width / node.offsetWidth, w: node.offsetWidth });
  }, [focus]);

  // The "director": flicks the list to each tagged listing like a thumb would
  // (fast start, soft landing with a hint of overshoot), holds on it while it
  // lifts and catches the light, then moves on; loops back to the top.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = list.ref.current;
    if (!autoplay || reduce || !showTags || !el) return;
    const targets = LISTINGS.map((_, i) => i).filter((i) => tags.length && tags[i % tags.length]);
    if (!targets.length) return;

    let cancelled = false;
    let frame = 0;
    let timer = 0;
    let k = 0;
    // easeOutBack, gentle: quick flick that settles a touch past, then back.
    const ease = (t) => {
      const c1 = 0.9;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };
    const centerOf = (i) => {
      const node = cardRefs.current[i];
      const max = el.scrollHeight - el.clientHeight;
      return Math.max(0, Math.min(max, node.offsetTop - (el.clientHeight - node.offsetHeight) / 2));
    };
    const tween = (to, ms, done) => {
      const from = el.scrollTop;
      const start = performance.now();
      const run = (now) => {
        if (cancelled) return;
        if (paused.current) {
          timer = window.setTimeout(() => tween(to, ms, done), 400);
          return;
        }
        const t = Math.min(1, (now - start) / ms);
        el.scrollTop = from + (to - from) * ease(t);
        if (t < 1) frame = requestAnimationFrame(run);
        else done();
      };
      frame = requestAnimationFrame(run);
    };
    const next = () => {
      if (cancelled) return;
      if (k >= targets.length) {
        k = 0;
        tween(0, 1000, () => {
          timer = window.setTimeout(next, 700);
        });
        return;
      }
      const i = targets[k++];
      const to = centerOf(i);
      const distance = Math.abs(to - el.scrollTop);
      tween(to, Math.min(1300, 520 + distance * 0.8), () => {
        setFocus(i);
        setShines((s) => ({ ...s, [i]: (s[i] || 0) + 1 }));
        timer = window.setTimeout(() => {
          setFocus(null);
          // Wait for the pop-out copy to settle back into the list before moving on.
          timer = window.setTimeout(next, 950);
        }, 1600);
      });
    };
    timer = window.setTimeout(next, 900);
    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(timer);
      setFocus(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, showTags, tags.length]);

  const pause = () => {
    paused.current = true;
    window.clearTimeout(resumeTimer.current);
  };
  const resume = () => {
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => (paused.current = false), 1500);
  };
  const listHandlers = {
    ...list.handlers,
    onPointerDown: (e) => {
      pause();
      list.handlers.onPointerDown(e);
    },
    onPointerUp: (e) => {
      resume();
      list.handlers.onPointerUp(e);
    },
    onPointerCancel: (e) => {
      resume();
      list.handlers.onPointerCancel(e);
    },
    onPointerLeave: (e) => {
      resume();
      list.handlers.onPointerLeave(e);
    },
  };
  const chips = useDragScroll("x");
  const hideBar = "[&::-webkit-scrollbar]:hidden";
  return (
    <Screen className="flex h-full flex-col bg-white" style={{ direction: "ltr" }}>
      <StatusBar />
      <div className="flex items-end justify-between px-5 pb-3 pt-3">
        <span>
          <span className="flex items-center gap-1 text-[12px] font-medium text-[#9B9B9B]">
            <MapPin size={13} weight="fill" /> Tehran <Caret size={11} weight="bold" />
          </span>
          <span className="mt-0.5 block text-[26px] font-semibold tracking-[-0.02em] text-[#111]">Cars</span>
        </span>
        <span className="mb-1 flex h-10 w-10 items-center justify-center rounded-full bg-[#F4F4F2]">
          <MagnifyingGlass size={19} weight="bold" color="#111" />
        </span>
      </div>
      <div
        ref={chips.ref}
        {...chips.handlers}
        className={`flex cursor-grab gap-1.5 overflow-x-auto px-5 pb-3 text-[13px] font-medium ${hideBar}`}
        style={{ scrollbarWidth: "none" }}
      >
        {[
          { icon: Faders, text: "Filters" },
          { text: "All", active: true },
          { text: "Sedan" },
          { text: "Hatchback" },
          { text: "Under 200M" },
          { text: "2018+" },
        ].map(({ icon: Icon, text, active }) => (
          <span
            key={text}
            className={`flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3.5 ${
              active ? "bg-[#2481ED] text-white" : Icon ? "border border-[#E6E6E6] text-[#111]" : "bg-[#F4F4F2] text-[#555]"
            }`}
          >
            {Icon ? <Icon size={15} weight="bold" /> : null}
            {text}
          </span>
        ))}
      </div>
      <div
        ref={list.ref}
        {...listHandlers}
        className={`relative flex min-h-0 flex-1 cursor-grab flex-col gap-2.5 overflow-y-auto bg-[#FAFAF9] px-3.5 pt-2 pb-6 ${hideBar}`}
        style={{ scrollbarWidth: "none", perspective: "900px" }}
      >
        {LISTINGS.map((listing, i) => (
          <div
            key={listing.id}
            ref={(n) => (cardRefs.current[i] = n)}
            style={{ visibility: focus === i && pop?.i === i ? "hidden" : undefined }}
            className={`cs-card shrink-0 ${focus === i ? "cs-card-focus" : ""} ${
              focus !== null && focus !== i ? "cs-card-dim" : ""
            }`}
          >
          <ListingCard
            key={listing.id}
            listing={listing}
            tag={tags.length && tags[i % tags.length] ? TAGS[tags[i % tags.length]] : null}
            showTag={showTags}
            delay={i * 0.12}
            paint={PAINTS[i % PAINTS.length]}
            mono={mono}
            shine={shines[i] || 0}
            model={picks[i].model}
            angle={picks[i].angle}
          />
          </div>
        ))}
      </div>
      <BottomNav />
      {pop
        ? createPortal(
            <AnimatePresence>
              {focus === pop.i ? (
                <motion.div
                  key={pop.i}
                  aria-hidden
                  className="pointer-events-none absolute z-20"
                  style={{ left: pop.left, top: pop.top, width: pop.w, transformOrigin: "top left", fontFamily: "inherit", perspective: 900 }}
                  initial={{ scale: pop.scale }}
                  animate={{ scale: pop.scale }}
                  exit={{ scale: pop.scale }}
                >
                  <motion.div
                    className="cs-pop case-study-artwork rounded-[22px]"
                    style={{ fontFamily: '"DM Sans", ui-sans-serif, system-ui, sans-serif', transformOrigin: "50% 50%" }}
                    initial={{ scale: 1, y: 0, rotateX: 0, boxShadow: "0 0px 0px -20px rgb(0 0 0 / 0)" }}
                    animate={{
                      scale: 1.28,
                      y: -6,
                      rotateX: [0, 10, -3, 0],
                      rotateZ: [0, -1.5, 0.6, 0],
                      boxShadow: "0 40px 60px -20px rgb(0 0 0 / 0.35)",
                    }}
                    exit={{
                      scale: 1,
                      y: 0,
                      rotateX: 0,
                      rotateZ: 0,
                      boxShadow: "0 0px 0px -20px rgb(0 0 0 / 0)",
                      // Fade the shadow out early so it's gone by the time the card lands.
                      transition: {
                        type: "spring",
                        stiffness: 260,
                        damping: 22,
                        boxShadow: { duration: 0.35, ease: "easeOut" },
                      },
                    }}
                    transition={{ type: "spring", stiffness: 260, damping: 16, rotateX: { duration: 0.9 }, rotateZ: { duration: 0.9 } }}
                  >
                    <ListingCard
                      listing={LISTINGS[pop.i]}
                      tag={TAGS[tags[pop.i % tags.length]]}
                      showTag
                      delay={0}
                      paint={PAINTS[pop.i % PAINTS.length]}
                      mono={mono}
                      shine={1}
                      model={picks[pop.i].model}
                      angle={picks[pop.i].angle}
                    />
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>,
            pop.host,
          )
        : null}
    </Screen>
  );
}

/** A filled field with its label inside (iOS-style), so each input reads as one large, calm block. */
function Field({ label, value, placeholder, end = "caret", shown = true, tone, after }) {
  const reduce = useReducedMotion();
  const filled = shown && value;
  return (
    <div
      className="mb-2 flex h-[60px] items-center justify-between gap-3 rounded-[18px] bg-[#F5F5F3] px-4 transition-[box-shadow,background-color] duration-500"
      style={tone ? { boxShadow: `inset 0 0 0 1.5px ${tone}`, background: "#fff" } : undefined}
    >
      <span className="flex min-w-0 flex-1 flex-col justify-center">
        <span className="text-[11.5px] font-medium leading-none text-[#9B9B9B]">{label}</span>
        <span className="relative mt-1.5 h-[20px]">
          <AnimatePresence initial={false}>
            <motion.span
              key={filled ? "value" : "placeholder"}
              className={`absolute inset-0 truncate text-[16px] leading-[20px] ${
                filled ? "font-semibold tracking-[-0.01em] text-[#111]" : "text-[#BDBDB8]"
              }`}
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, transition: { duration: 0.12 } }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {filled ? value : placeholder ?? "\u00A0"}
            </motion.span>
          </AnimatePresence>
        </span>
      </span>
      {after}
      {end === "clear" ? <XCircle size={19} weight="fill" color="#D2D2CD" /> : null}
      {end === "caret" ? <Caret size={14} weight="bold" color="#A8A8A3" /> : null}
    </div>
  );
}

/** Counts a "150,000,000"-style number up from zero while `run` is true. */
function CountUpPrice({ value, run }) {
  const target = Number(value.replace(/,/g, ""));
  const [shown, setShown] = useState(run ? 0 : target);
  useEffect(() => {
    if (!run) return setShown(target);
    let frame = 0;
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - start) / 900);
      setShown(Math.round((target * (1 - Math.pow(1 - t, 3))) / 1e6) * 1e6);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [run, target]);
  return shown.toLocaleString("en-US");
}

const NOTES = {
  suggestion: {
    title: "Suggested price",
    body: "Based on similar cars, this price gets a fair-price tag in the feed.",
    tag: "fairBlue",
  },
  warning: {
    title: "Price looks high",
    body: "At this price, buyers will see a too-high tag on your listing.",
    tag: "veryHigh",
  },
};

function PriceNote({ kind, show }) {
  const reduce = useReducedMotion();
  const note = NOTES[kind];
  const tag = TAGS[note.tag];
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10, scale: 0.97 }}
      animate={show ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.97 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
      className="rounded-[18px] px-4 py-3"
      style={{ background: tag.bg }}
    >
      <p className="text-[14px] font-semibold" style={{ color: tag.fg }}>
        {note.title}
      </p>
      <p className="mt-1 text-[12.5px] leading-[1.6]" style={{ color: tag.fg, opacity: 0.8 }}>
        {note.body}
      </p>
    </motion.div>
  );
}

// Where the thumb drifts (percent of the track) and when (share of one 4.2s loop).
const WANDER = [
  [0, 44],
  [0.25, 22],
  [0.45, 63],
  [0.7, 36],
  [0.85, 52],
  [1, 44],
];
const sliderPrice = (pct) => Math.round((80 + (pct / 100) * 220) / 5) * 5 * 1e6;

/** The abandoned slider: the thumb drifts back and forth, never settling — the confusion we saw. */
function PriceSlider({ play }) {
  const thumbRef = useRef(null);
  const [price, setPrice] = useState(() => sliderPrice(WANDER[0][1]));
  useEffect(() => {
    if (!play) return;
    let frame = 0;
    const start = performance.now();
    const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
    const tick = (now) => {
      const t = ((now - start) / 4200) % 1;
      const k = WANDER.findIndex(([at]) => at >= t);
      const [t0, p0] = WANDER[Math.max(0, k - 1)];
      const [t1, p1] = WANDER[k];
      const pct = t1 === t0 ? p1 : p0 + (p1 - p0) * ease((t - t0) / (t1 - t0));
      if (thumbRef.current) thumbRef.current.style.left = `${pct}%`;
      const next = sliderPrice(pct);
      setPrice((prev) => (prev === next ? prev : next));
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [play]);
  return (
    <div className="mb-2 rounded-[18px] bg-[#F5F5F3] px-4 pb-3.5 pt-3">
      <span className="text-[11.5px] font-medium leading-none text-[#9B9B9B]">Price (toman)</span>
      <p className="mt-1.5 text-[16px] font-semibold leading-[20px] tracking-[-0.01em] tabular-nums text-[#111]">
        {price.toLocaleString("en-US")}
      </p>
      <div className="relative mt-4 h-[6px] rounded-full bg-[linear-gradient(to_right,#8FCB9B,#7DB3E8_35%,#EBC77A_65%,#EB8F9F)]">
        <span
          ref={thumbRef}
          className="absolute left-[44%] top-1/2 h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 rounded-full border-[2.5px] bg-white shadow-[0_2px_8px_rgb(0_0_0/0.18)]"
          style={{ borderColor: BLUE }}
        />
      </div>
      <div className="mt-2.5 flex justify-between text-[10.5px] font-medium text-[#A8A8A3]">
        <span>Fair</span>
        <span>High</span>
        <span>Too high</span>
      </div>
    </div>
  );
}

/**
 * The "post a free ad" form. `variant`:
 * "slider" — the abandoned slider concept (price near the top);
 * "suggestion" — price last, pre-filled, with Sheypoor's suggestion;
 * "warning" — price last, too high, flagged before submitting.
 * `play`: run the story in a loop — details fill in one by one, then the price
 * arrives already set, with its tag (or, for the slider, the thumb wanders).
 */
export function SheypoorForm({ variant = "suggestion", showNote = true, play = false }) {
  const reduce = useReducedMotion();
  const slider = variant === "slider";
  const animate = play && !slider && !reduce;
  // 0: empty · 1–4: details filled · 5: price · 6: note
  const [step, setStep] = useState(animate ? 0 : 6);
  useEffect(() => {
    if (!animate) return setStep(6);
    let timer = 0;
    let n = 0;
    const advance = () => {
      n = n >= 6 ? 0 : n + 1;
      setStep(n);
      const wait = n === 0 ? 700 : n === 5 ? 1100 : n === 6 ? 3600 : 420;
      timer = window.setTimeout(advance, wait);
    };
    setStep(0);
    timer = window.setTimeout(advance, 600);
    return () => window.clearTimeout(timer);
  }, [animate]);
  const [carRef, carOnScreen] = useOnScreen();
  const price = variant === "warning" ? "250,000,000" : "150,000,000";
  const priceTone = step >= 6 && showNote ? TAGS[NOTES[variant]?.tag]?.fg : undefined;

  return (
    <Screen className="flex h-full flex-col bg-white" style={{ direction: "ltr" }}>
      <StatusBar />
      <div className="flex items-center justify-between px-5 pb-2 pt-1">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F5F3]">
          <ArrowLeft size={18} weight="bold" color="#111" />
        </span>
        <span className="text-[13px] font-medium" style={{ color: BLUE }}>
          Clear
        </span>
      </div>
      <div className="px-5 pb-4">
        <p className="text-[28px] font-semibold leading-tight tracking-[-0.025em] text-[#111]">New listing</p>
        <p className="mt-1 text-[13px] text-[#9B9B9B]">Tell buyers about your car.</p>
      </div>
      <div className="flex gap-2 px-5 pb-4">
        <div ref={carRef} className="h-[84px] w-[112px] shrink-0 overflow-hidden rounded-[18px] bg-[#F5F5F3]">
          {carOnScreen ? (
            <CarModel3D modelUrl={CAR_MODELS[0]} paint={PAINTS[6]} startAngle={-0.5} className="h-full w-full" />
          ) : null}
        </div>
        <span className="flex h-[84px] w-[84px] shrink-0 flex-col items-center justify-center gap-1 rounded-[18px] border-[1.5px] border-dashed border-[#DADAD5] text-[11px] font-medium text-[#9B9B9B]">
          <Camera size={22} color={BLUE} weight="fill" />
          Add
        </span>
      </div>
      <div className="flex-1 overflow-hidden px-5">
        {slider ? (
          <>
            <Field label="Category" value="Pride" end="clear" />
            <PriceSlider play={play && !reduce} />
            <Field label="Mileage" placeholder="Enter mileage" />
            <Field label="Cash or installments" placeholder="Choose a plan" />
            <Field label="Year" placeholder="4-digit year" />
          </>
        ) : (
          <>
            <Field label="Category" value="Pride 111" placeholder="Choose a model" end="clear" shown={step >= 1} />
            <Field label="Mileage" value="40,000 km" placeholder="Enter mileage" shown={step >= 2} />
            <Field label="Year" value="2019" placeholder="4-digit year" shown={step >= 3} />
            <Field label="Body condition" value="Clean, no scratches" placeholder="Choose one" shown={step >= 4} />
            <Field
              label="Price (toman)"
              value={step >= 5 ? <CountUpPrice value={price} run={animate} /> : null}
              placeholder="Filled in for you"
              end={null}
              shown={step >= 5}
              tone={priceTone}
              after={
                priceTone ? (
                  <motion.span
                    initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 420, damping: 22 }}
                    className="rounded-full px-2.5 py-1 text-[11.5px] font-semibold"
                    style={{ background: TAGS[NOTES[variant].tag].bg, color: priceTone }}
                  >
                    {TAGS[NOTES[variant].tag].text}
                  </motion.span>
                ) : null
              }
            />
            <PriceNote kind={variant} show={showNote && step >= 6} />
          </>
        )}
      </div>
      <div className="shrink-0 bg-white px-5 pb-7 pt-3">
        <div
          className="flex h-[52px] items-center justify-center rounded-full text-[15px] font-semibold text-white shadow-[0_8px_18px_-8px_rgb(36_129_237/0.7)]"
          style={{ background: BLUE }}
        >
          Post ad
        </div>
      </div>
    </Screen>
  );
}
