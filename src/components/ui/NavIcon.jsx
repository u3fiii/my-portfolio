import { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import folderAnimation from "../../assets/lottie/Folder File.json";
import informationAnimation from "../../assets/lottie/information.json";
import userAnimation from "../../assets/lottie/user.json";
import { NAV_ICON_WEIGHT, NAV_ICONS } from "./icons.js";

/** Nav items that use a Lottie animation instead of a static icon. */
const NAV_LOTTIES = {
  me: userAnimation,
  projects: folderAnimation,
  contact: informationAnimation,
};

/** Header slides in after this delay — hold the first play until it's visible. */
const HEADER_ENTER_DELAY_MS = 1500;

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

/** Plays the animation once each time `active` turns on. */
function NavLottieIcon({ animationData, active, className }) {
  const lottieRef = useRef(null);
  const mountedRef = useRef(false);

  useEffect(() => {
    const isFirstRun = !mountedRef.current;
    mountedRef.current = true;
    if (!active || prefersReducedMotion()) return undefined;

    const play = () => lottieRef.current?.goToAndPlay(0, true);
    if (!isFirstRun) {
      play();
      return undefined;
    }
    const timer = setTimeout(play, HEADER_ENTER_DELAY_MS);
    return () => clearTimeout(timer);
  }, [active]);

  // Strokes follow the text color and share one weight (48 on the 512 canvas)
  // so every nav animation matches; fill-only paths keep their own colors.
  return (
    <span
      className={`inline-block shrink-0 [&_path[stroke]]:stroke-current [&_path[stroke]]:[stroke-width:48] ${className}`}
      aria-hidden
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay={false}
        style={{ width: "100%", height: "100%" }}
        rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
      />
    </span>
  );
}

export default function NavIcon({ name, active = false, className = "h-4 w-4" }) {
  const animationData = NAV_LOTTIES[name];
  if (animationData) {
    return (
      <NavLottieIcon
        animationData={animationData}
        active={active}
        className={className}
      />
    );
  }

  const Icon = NAV_ICONS[name];
  if (!Icon) return null;

  return (
    <Icon
      className={className}
      weight={active ? NAV_ICON_WEIGHT.active : NAV_ICON_WEIGHT.default}
      aria-hidden
    />
  );
}
