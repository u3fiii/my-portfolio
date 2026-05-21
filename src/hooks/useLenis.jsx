import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";

const LenisContext = createContext(null);

export const LENIS_EASING = (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export const LENIS_OPTIONS = {
  duration: 1.4,
  easing: LENIS_EASING,
  orientation: "vertical",
  smoothWheel: true,
  anchors: true,
};

/** Provides a Lenis instance for smooth vertical scrolling. */
export function LenisProvider({ children }) {
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
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
  }, []);

  return (
    <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
  );
}

/** Returns the active Lenis instance (null until mounted). */
export function useLenis() {
  return useContext(LenisContext);
}
