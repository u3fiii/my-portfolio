import { BatteryFull, CellSignalFull, WifiHigh } from "@phosphor-icons/react";

/** Logical size the mockup screens are designed at (iPhone points). */
export const SCREEN_W = 375;
export const SCREEN_H = 812;

export const FONT_FA = '"DM Sans", ui-sans-serif, system-ui, sans-serif';

/** iOS-style status bar. `tone` "dark" draws white glyphs for dark screens. */
export function StatusBar({ tone = "light", time = "9:41" }) {
  const color = tone === "dark" ? "#ffffff" : "#111111";
  return (
    <div
      className="flex h-11 shrink-0 items-center justify-between px-7 text-[15px] font-semibold"
      style={{ color, direction: "ltr", fontFamily: '"DM Sans", system-ui, sans-serif' }}
    >
      <span className="w-16">{time}</span>
      <span className="flex w-16 items-center justify-end gap-1">
        <CellSignalFull size={16} weight="fill" />
        <WifiHigh size={16} weight="bold" />
        <BatteryFull size={22} weight="fill" />
      </span>
    </div>
  );
}

/**
 * A light phone bezel around a screen built at 375×812pt, scaled to `width`.
 * Children render inside the screen; layout them as a flex column.
 */
export default function PhoneFrame({ width = 220, children, screenClassName = "bg-white", label, radius = 34 }) {
  const bezel = 6;
  const scale = (width - bezel * 2) / SCREEN_W;
  const screenH = SCREEN_H * scale;

  return (
    <div
      className="relative shrink-0 bg-[#111113] shadow-[0_18px_40px_-18px_rgb(0_0_0/0.35)]"
      style={{
        width,
        height: screenH + bezel * 2,
        padding: bezel,
        borderRadius: radius,
      }}
      role="img"
      aria-label={label}
    >
      <div className="relative overflow-hidden" style={{ width: width - bezel * 2, height: screenH, borderRadius: Math.max(0, radius - bezel) }}>
        {/* Dynamic-island notch, sized as a share of the screen so it scales with the frame. */}
        <span
          aria-hidden
          className="absolute left-1/2 z-10 -translate-x-1/2 rounded-full bg-black"
          style={{
            top: (width - bezel * 2) * 0.03,
            width: (width - bezel * 2) * 0.32,
            height: (width - bezel * 2) * 0.085,
          }}
        />
        <div
          className={`case-study-artwork absolute left-0 top-0 flex flex-col ${screenClassName}`}
          style={{
            width: SCREEN_W,
            height: SCREEN_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            fontFamily: FONT_FA,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * A rectangle cut from a source image (natural-pixel coordinates), drawn at
 * `width` — used to reuse real photos from an original screenshot.
 */
export function ImageCrop({ src, natural, x, y, w, h, width, className = "", style }) {
  const s = width / w;
  return (
    <div
      aria-hidden
      className={className}
      style={{
        width,
        height: h * s,
        backgroundImage: `url(${src})`,
        backgroundSize: `${natural[0] * s}px ${natural[1] * s}px`,
        backgroundPosition: `${-x * s}px ${-y * s}px`,
        backgroundRepeat: "no-repeat",
        ...style,
      }}
    />
  );
}
