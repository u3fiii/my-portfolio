import Lottie from "lottie-react";

export function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

/**
 * Line-icon Lottie that renders like the static icon set: strokes and solid
 * black fills follow the text color, and every stroke shares one weight
 * (48 on the 512 canvas ≈ Phosphor bold). Mask shapes in <defs> keep their
 * own fills. Doesn't autoplay — call `lottieRef.current.goToAndPlay(0, true)`.
 */
export default function LottieIcon({ animationData, lottieRef, className = "" }) {
  return (
    <span
      className={`inline-block shrink-0 [&_path[stroke]]:stroke-current [&_path[stroke]]:[stroke-width:48] [&_path[fill='rgb(0,0,0)']:not(defs_path)]:fill-current ${className}`}
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
