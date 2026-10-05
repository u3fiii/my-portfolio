import { useRef } from "react";
import Lottie from "lottie-react";
import { ICON_WEIGHT } from "./icons.js";

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

const variants = {
  primary:
    "bg-zinc-900 text-white hover:bg-zinc-700 focus-visible:ring-zinc-900",
  instagram: "btn-instagram focus-visible:ring-pink-500",
  secondary:
    "pill-hover-ring border border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50 focus-visible:ring-zinc-400",
};

export default function Button({
  children,
  href = "#",
  variant = "primary",
  external = false,
  icon: Icon,
  /** Lottie JSON shown in place of `icon`; plays once on hover. */
  lottie,
  iconOnlyMobile = false,
  ariaLabel,
}) {
  const sizeClass = Icon
    ? iconOnlyMobile
      ? "gap-0 p-2.5 max-lg:gap-1 max-lg:px-2.5 max-lg:py-1.5 max-lg:text-xs lg:gap-1 lg:px-3 lg:py-1.5 lg:text-xs xl:gap-1.5 xl:px-4 xl:py-2 xl:text-sm font-['DM_Sans',ui-sans-serif,sans-serif] font-semibold"
      : "gap-1.5 px-4 py-2 font-['DM_Sans',ui-sans-serif,sans-serif] text-sm font-semibold"
    : "px-6 py-3 text-sm";

  const lottieRef = useRef(null);
  const playLottie = () => {
    if (lottie && !prefersReducedMotion()) lottieRef.current?.goToAndPlay(0, true);
  };

  const accessibleName =
    ariaLabel ?? (typeof children === "string" ? children : undefined);

  return (
    <a
      href={href}
      className={`inline-flex shrink-0 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${sizeClass} ${variants[variant] ?? variants.primary}`}
      aria-label={iconOnlyMobile ? accessibleName : undefined}
      onMouseEnter={playLottie}
      {...(external && {
        target: "_blank",
        rel: "noopener noreferrer",
      })}
    >
      {lottie ? (
        // Strokes and solid black fills follow the text color; mask shapes in
        // <defs> keep theirs. Stroke 48/512 matches Phosphor's bold weight.
        <span
          className="inline-block h-[1.125rem] w-[1.125rem] shrink-0 [&_path[stroke]]:stroke-current [&_path[stroke]]:[stroke-width:48] [&_path[fill='rgb(0,0,0)']:not(defs_path)]:fill-current"
          aria-hidden
        >
          <Lottie
            lottieRef={lottieRef}
            animationData={lottie}
            loop={false}
            autoplay={false}
            style={{ width: "100%", height: "100%" }}
            rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
          />
        </span>
      ) : Icon ? (
        <Icon className="h-[1.125rem] w-[1.125rem] shrink-0" weight={ICON_WEIGHT} aria-hidden />
      ) : null}
      {children ? (
        <span className={iconOnlyMobile ? "hidden md:inline" : undefined}>
          {children}
        </span>
      ) : null}
    </a>
  );
}
