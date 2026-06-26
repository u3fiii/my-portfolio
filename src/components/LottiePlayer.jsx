import Lottie from "lottie-react";

/**
 * @param {object} props
 * @param {object} props.animationData - Lottie JSON (import in Vite: `import anim from '...json'`)
 * @param {string} [props.ariaLabel] - accessible label; omit for decorative animation
 */
export default function LottiePlayer({
  animationData,
  className = "",
  ariaLabel,
}) {
  if (!animationData) return null;

  const width = animationData.w ?? 1;
  const height = animationData.h ?? 1;

  return (
    <div
      className={`w-full ${className}`.trim()}
      style={{ aspectRatio: `${width} / ${height}` }}
      {...(ariaLabel
        ? { role: "img", "aria-label": ariaLabel }
        : { "aria-hidden": true })}
    >
      <Lottie
        animationData={animationData}
        loop
        autoplay
        className="h-full w-full"
        style={{ width: "100%", height: "100%" }}
        rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
      />
    </div>
  );
}
