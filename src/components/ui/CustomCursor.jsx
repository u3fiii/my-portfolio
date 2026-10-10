import { useEffect, useRef, useState } from "react";

/** How quickly the dot catches up with the pointer. Infinity = no smoothing. */
const DOT_SPEED = 40;
/** How quickly the ring catches up with the dot (higher = snappier). */
const FOLLOW_SPEED = 10;
/**
 * Optional soft leash: if finite, the ring never trails the dot by more than
 * this many px. Infinity = disabled (the ring trails freely).
 */
const MAX_OFFSET = Infinity;

const DOT_SIZE = 8;
const RING_SIZE = 60;
/** Visual ring border (px) and colour — kept constant at every scale. */
const RING_BORDER = 1;
const RING_BORDER_ALPHA = 0.6;
/**
 * On hover the ring's border fades out and it fills with a faint tint instead:
 * black 10% in light mode, white 10% in dark mode (see the fill element below).
 */
const HOVER_SCALE = 1.8;
/** Ring scale while the mouse is held down. */
const PRESS_SCALE = 0.65;
/** On release the ring briefly overshoots to this scale, then settles. */
const RELEASE_POP_SCALE = 1.2;
const RELEASE_POP_MS = 120;
/** Scale smoothing speed for press/release — snappier than hover. */
const CLICK_SPEED = 24;
/** Longest frame step we smooth over (s) — avoids jumps after a stalled tab. */
const MAX_DT = 0.05;

const HOVER_SELECTOR = 'a, button, [role="button"], [data-cursor="hover"]';
const FINE_POINTER = "(pointer: fine)";
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";
const ACTIVE_CLASS = "custom-cursor-active";

/** Frame-rate independent exponential smoothing factor for one frame. */
function smoothing(speed, dt) {
  if (speed === Infinity) return 1;
  return 1 - Math.exp(-speed * dt);
}

/**
 * Dot + trailing ring cursor. Motion chains pointer → dot → ring: the dot
 * eases toward the pointer, the ring eases toward the dot. Only on fine pointers (mouse/trackpad); touch
 * devices keep native behaviour. mix-blend-mode: difference keeps it visible
 * on both light and dark backgrounds.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(
    () => window.matchMedia?.(FINE_POINTER).matches ?? false,
  );
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const fillRef = useRef(null);

  // Follow pointer-type changes (e.g. a tablet gaining a trackpad).
  useEffect(() => {
    const mql = window.matchMedia?.(FINE_POINTER);
    if (!mql) return undefined;
    const onChange = (e) => setEnabled(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const fill = fillRef.current;
    if (!dot || !ring || !fill) return undefined;

    const reducedMotion = window.matchMedia?.(REDUCED_MOTION);
    const root = document.documentElement;
    root.classList.add(ACTIVE_CLASS);

    const pointer = { x: 0, y: 0 };
    const dotPos = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };
    let scale = 1;
    /** 0 = resting ring (border), 1 = hover ring (tinted fill, no border). */
    let hoverMix = 0;
    let lastMix = -1;
    let hovering = false;
    let pressed = false;
    let popUntil = 0;
    let hasPosition = false;
    let frame = 0;
    let lastTime = 0;

    const setVisible = (visible) => {
      const opacity = visible ? "1" : "0";
      dot.style.opacity = opacity;
      ring.style.opacity = opacity;
    };

    const placeDot = () => {
      dot.style.transform = `translate3d(${dotPos.x - DOT_SIZE / 2}px, ${dotPos.y - DOT_SIZE / 2}px, 0)`;
    };

    // The ring grows by resizing (not transform: scale) so it is re-drawn at its
    // real size every frame — always sharp, with a constant 1px border.
    let lastSize = 0;
    const placeRing = () => {
      const size = RING_SIZE * scale;
      if (Math.abs(size - lastSize) > 0.01) {
        ring.style.width = fill.style.width = `${size}px`;
        ring.style.height = fill.style.height = `${size}px`;
        lastSize = size;
      }
      const transform = `translate3d(${ringPos.x - size / 2}px, ${ringPos.y - size / 2}px, 0)`;
      ring.style.transform = transform;
      fill.style.transform = transform;
      if (Math.abs(hoverMix - lastMix) > 0.001) {
        ring.style.borderColor = `rgb(255 255 255 / ${RING_BORDER_ALPHA * (1 - hoverMix)})`;
        fill.style.opacity = String(hoverMix);
        lastMix = hoverMix;
      }
    };

    const tick = (time) => {
      const dt = lastTime ? Math.min((time - lastTime) / 1000, MAX_DT) : 0;
      lastTime = time;

      const clickScale = pressed
        ? PRESS_SCALE
        : time < popUntil
          ? RELEASE_POP_SCALE
          : 1;
      const targetScale = (hovering ? HOVER_SCALE : 1) * clickScale;

      const targetMix = hovering ? 1 : 0;

      if (reducedMotion?.matches) {
        dotPos.x = ringPos.x = pointer.x;
        dotPos.y = ringPos.y = pointer.y;
        scale = targetScale;
        hoverMix = targetMix;
      } else {
        // pointer → dot
        const dotEase = smoothing(DOT_SPEED, dt);
        dotPos.x += (pointer.x - dotPos.x) * dotEase;
        dotPos.y += (pointer.y - dotPos.y) * dotEase;

        // dot → ring
        const ease = smoothing(FOLLOW_SPEED, dt);
        ringPos.x += (dotPos.x - ringPos.x) * ease;
        ringPos.y += (dotPos.y - ringPos.y) * ease;
        const clicking = pressed || time < popUntil;
        const scaleEase = clicking ? smoothing(CLICK_SPEED, dt) : ease;
        scale += (targetScale - scale) * scaleEase;
        hoverMix += (targetMix - hoverMix) * ease;

        // Optional soft leash (no-op when MAX_OFFSET is Infinity).
        const dx = ringPos.x - dotPos.x;
        const dy = ringPos.y - dotPos.y;
        const dist = Math.hypot(dx, dy);
        if (dist > MAX_OFFSET) {
          ringPos.x = dotPos.x + (dx / dist) * MAX_OFFSET;
          ringPos.y = dotPos.y + (dy / dist) * MAX_OFFSET;
        }
      }

      placeDot();
      placeRing();
      frame = requestAnimationFrame(tick);
    };

    const onPointerMove = (e) => {
      if (e.pointerType && e.pointerType !== "mouse" && e.pointerType !== "pen")
        return;
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      hovering = Boolean(e.target?.closest?.(HOVER_SELECTOR));

      if (!hasPosition) {
        // First appearance: start dot and ring on the pointer, not in a corner.
        hasPosition = true;
        dotPos.x = ringPos.x = pointer.x;
        dotPos.y = ringPos.y = pointer.y;
        placeDot();
        placeRing();
        setVisible(true);
      } else if (DOT_SPEED === Infinity) {
        // Unsmoothed dot: place it straight from the event for zero latency.
        dotPos.x = pointer.x;
        dotPos.y = pointer.y;
        placeDot();
      }
    };

    const onPointerDown = () => {
      pressed = true;
    };
    const onPointerUp = () => {
      if (pressed) popUntil = performance.now() + RELEASE_POP_MS;
      pressed = false;
    };
    const onLeave = () => {
      hovering = false;
      setVisible(false);
    };
    const onEnter = () => {
      if (hasPosition) setVisible(true);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("blur", onPointerUp);
    root.addEventListener("pointerleave", onLeave);
    root.addEventListener("pointerenter", onEnter);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("blur", onPointerUp);
      root.removeEventListener("pointerleave", onLeave);
      root.removeEventListener("pointerenter", onEnter);
      root.classList.remove(ACTIVE_CLASS);
    };
  }, [enabled]);

  if (!enabled) return null;

  const shared =
    "pointer-events-none fixed top-0 left-0 z-[9999] rounded-full opacity-0 transition-opacity duration-200 will-change-transform";

  return (
    <>
      {/* Hover tint: normal blending (a black fill under `difference` would be
          invisible), so it lives on its own layer under the ring. */}
      <div
        ref={fillRef}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full bg-[rgb(0_0_0/0.1)] opacity-0 will-change-transform dark:bg-[rgb(255_255_255/0.1)]"
        style={{ width: RING_SIZE, height: RING_SIZE }}
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        // Ring keeps the difference blend so its thin border shows on any
        // background. Literal white: the site's `white` token turns dark in
        // dark mode, and the blend needs true white to invert what's beneath.
        className={`${shared} border-solid mix-blend-difference`}
        style={{
          width: RING_SIZE,
          height: RING_SIZE,
          borderWidth: RING_BORDER,
          borderColor: `rgb(255 255 255 / ${RING_BORDER_ALPHA})`,
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        // Solid dot, no blending (blending would invert colours under it):
        // black in light mode, white in dark mode.
        className={`${shared} bg-[#000] dark:bg-[#fff]`}
        style={{ width: DOT_SIZE, height: DOT_SIZE }}
      />
    </>
  );
}
