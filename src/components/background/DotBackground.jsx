import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import DotGrid from "./DotGrid.jsx";
import useTheme from "../../hooks/useTheme.js";

const PRESETS = {
  default: {
    baseColor: "#dbdadf",
    activeColor: "#9a969c",
    proximity: 120,
    shockStrength: 5,
    opacity: 1,
  },
  content: {
    baseColor: "#e0dfe3",
    activeColor: "#b8b5bb",
    proximity: 100,
    shockStrength: 3,
    opacity: 0.82,
  },
};

/** Canvas dots can't read CSS variables, so dark mode gets its own colours. */
const DARK_COLORS = {
  default: { baseColor: "#25252a", activeColor: "#66666e" },
  content: { baseColor: "#202024", activeColor: "#4e4e56" },
};

export default function DotBackground({ variant = "default" }) {
  const { isDark } = useTheme();
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const driftY = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const key = PRESETS[variant] ? variant : "default";
  const preset = { ...PRESETS[key], ...(isDark ? DARK_COLORS[key] : null) };

  return (
    <motion.div
      className="transition-opacity duration-300"
      style={{
        position: "fixed",
        top: -24,
        left: 0,
        width: "100%",
        height: "calc(100% + 48px)",
        zIndex: 0,
        pointerEvents: "none",
        opacity: preset.opacity,
        y: reduceMotion || key !== "default" ? 0 : driftY,
        willChange:
          reduceMotion || key !== "default" ? "auto" : "transform",
      }}
      aria-hidden
    >
      <DotGrid
        dotSize={2}
        gap={20}
        baseColor={preset.baseColor}
        activeColor={preset.activeColor}
        proximity={preset.proximity}
        shockRadius={250}
        shockStrength={preset.shockStrength}
        resistance={750}
        returnDuration={1.5}
        style={{ width: "100%", height: "100%" }}
      />
    </motion.div>
  );
}
