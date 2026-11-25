import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import useDesktopScroll from "./useDesktopScroll.js";

const LenisContext = createContext(null);

export const LENIS_EASING = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export const LENIS_OPTIONS = {
  duration: 1.4,
  easing: LENIS_EASING,
  orientation: "vertical",
  smoothWheel: true,
  anchors: true,
};

/** Touch and narrow layouts use the browser’s native scrolling. */
export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null);

  const desktopScroll = useDesktopScroll();

  useEffect(() => {
    if (!desktopScroll) return;
    const instance = new Lenis(LENIS_OPTIONS);
    setLenis(instance);

    let rafId;
    let cancelled = false;

    const raf = (time) => {
      if (cancelled) return;
      instance.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafId);
      instance.destroy();
      setLenis(null);
    };
  }, [desktopScroll]);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}

/** Returns the active Lenis instance (null until mounted). */
export function useLenis() {
  return useContext(LenisContext);
}
