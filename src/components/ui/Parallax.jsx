import { createContext, useContext, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { prefersReducedMotion } from "./LottieIcon.jsx";

/** Soft, slightly floaty follow — layers drift after the pointer rather than snap to it. */
const SPRING = { stiffness: 50, damping: 18, mass: 1 };

const ParallaxContext = createContext(null);

/**
 * Tracks the pointer across the viewport as -1…1 on each axis (0 = centre)
 * and shares it with every <ParallaxLayer> inside. Only active for a real
 * mouse/trackpad and when the visitor hasn't asked for reduced motion.
 */
export function ParallaxProvider({ children }) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, SPRING);
  const y = useSpring(pointerY, SPRING);

  useEffect(() => {
    const finePointer = window.matchMedia?.(
      "(hover: hover) and (pointer: fine)",
    );
    if (!finePointer?.matches || prefersReducedMotion()) return undefined;

    const onMove = (e) => {
      pointerX.set((e.clientX / window.innerWidth) * 2 - 1);
      pointerY.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    const reset = () => {
      pointerX.set(0);
      pointerY.set(0);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", reset);
    };
  }, [pointerX, pointerY]);

  return (
    <ParallaxContext.Provider value={{ x, y }}>
      {children}
    </ParallaxContext.Provider>
  );
}

/**
 * Shifts its children by up to `depth` px horizontally (60% of that
 * vertically). Positive depth follows the pointer; negative moves against
 * it. `tilt` adds a small 3D rotation toward the pointer, in degrees.
 */
export function ParallaxLayer({
  as = "div",
  depth = 0,
  tilt = 0,
  className = "",
  children,
}) {
  const ctx = useContext(ParallaxContext);
  const fallback = useMotionValue(0);
  const px = ctx?.x ?? fallback;
  const py = ctx?.y ?? fallback;

  const x = useTransform(px, (v) => v * depth);
  const y = useTransform(py, (v) => v * depth * 0.6);
  const rotateY = useTransform(px, (v) => v * tilt);
  const rotateX = useTransform(py, (v) => v * -tilt);

  const Component = motion[as];
  return (
    <Component
      className={className}
      style={{
        x,
        y,
        ...(tilt ? { rotateX, rotateY, transformPerspective: 800 } : null),
      }}
    >
      {children}
    </Component>
  );
}
