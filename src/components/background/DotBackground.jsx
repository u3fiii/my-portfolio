import DotGrid from "./DotGrid.jsx";

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

export default function DotBackground({ variant = "default" }) {
  const preset = PRESETS[variant] ?? PRESETS.default;

  return (
    <div
      className="transition-opacity duration-300"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
        opacity: preset.opacity,
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
    </div>
  );
}
