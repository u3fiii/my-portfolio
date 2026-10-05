import { useEffect, useRef } from "react";
import folderAnimation from "../../assets/lottie/Folder File.json";
import informationAnimation from "../../assets/lottie/information.json";
import userAnimation from "../../assets/lottie/user.json";
import { NAV_ICON_WEIGHT, NAV_ICONS } from "./icons.js";
import LottieIcon, { prefersReducedMotion } from "./LottieIcon.jsx";

/** Nav items that use a Lottie animation instead of a static icon. */
const NAV_LOTTIES = {
  me: userAnimation,
  projects: folderAnimation,
  contact: informationAnimation,
};

/** Header slides in after this delay — hold the first play until it's visible. */
const HEADER_ENTER_DELAY_MS = 1500;

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

  return (
    <LottieIcon
      animationData={animationData}
      lottieRef={lottieRef}
      className={className}
    />
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
