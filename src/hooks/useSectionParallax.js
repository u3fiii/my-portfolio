import useDesktopScroll from "./useDesktopScroll.js";
import { useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Tracks a section's arrival and departure so its layers can move at
 * different depths while the page glides between sections. Pass the result
 * to `useDepth` once per layer.
 */
export default function useSectionParallax(sectionRef) {
  const reduce = useReducedMotion();
  const enabled = useDesktopScroll();

  // 0 → 1 as the section's top travels from the viewport bottom to its top.
  const { scrollYProgress: enter } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });
  // 0 → 1 as the section's bottom travels from the viewport bottom to its top.
  const { scrollYProgress: exit } = useScroll({
    target: sectionRef,
    offset: ["end end", "end start"],
  });

  return { enter, exit, active: enabled && !reduce };
}

/**
 * Vertical offset (px) for one layer. Nearer layers get a larger `depth`:
 * they arrive from further below and leave faster, so the section separates
 * into planes mid-glide and settles flat at rest.
 */
export function useDepth({ enter, exit, active }, depth, exitDepth = depth * 0.5) {
  return useTransform([enter, exit], ([arriving, leaving]) =>
    active ? (1 - arriving) * depth - leaving * exitDepth : 0,
  );
}

/**
 * `useDepth` as a CSS `translate` value. Use it on elements whose `transform`
 * is already animated (e.g. entrance reveals) so the two compose.
 */
export function useDepthTranslate(parallax, depth, exitDepth) {
  const y = useDepth(parallax, depth, exitDepth);
  return useTransform(y, (value) => `0 ${value}px`);
}
