import { useRef, useState } from "react";
import { SCREEN_W } from "./PhoneFrame.jsx";

/**
 * Screen root: no text selection, and a ripple under every press. The ripple
 * is placed in screen units, so it stays put when the frame is scaled.
 */
export function Screen({ className = "", style, children }) {
  const ref = useRef(null);
  const [ripples, setRipples] = useState([]);

  const onPointerDown = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = rect.width / SCREEN_W;
    const id = performance.now();
    const point = { id, x: (e.clientX - rect.left) / ratio, y: (e.clientY - rect.top) / ratio };
    setRipples((list) => [...list, point]);
    window.setTimeout(() => setRipples((list) => list.filter((p) => p.id !== id)), 650);
  };

  return (
    <div
      ref={ref}
      className={`relative select-none overflow-hidden ${className}`}
      style={style}
      onPointerDown={onPointerDown}
    >
      {children}
      {ripples.map((p) => (
        <span key={p.id} aria-hidden className="cs-ripple" style={{ left: p.x, top: p.y }} />
      ))}
    </div>
  );
}

/**
 * Mouse-drag scrolling for a scroll container (the mouse only; touch keeps
 * its native scrolling). Returns the ref and handlers to spread on the element.
 */
export function useDragScroll(axis = "y") {
  const ref = useRef(null);
  const drag = useRef(null);
  const key = axis === "y" ? "scrollTop" : "scrollLeft";
  const coord = axis === "y" ? "clientY" : "clientX";

  const onPointerDown = (e) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    drag.current = { p: e[coord], s: el[key] };
  };
  const onPointerMove = (e) => {
    const el = ref.current;
    const d = drag.current;
    if (!el || !d) return;
    const scale = el.getBoundingClientRect().width / el.offsetWidth || 1;
    el[key] = d.s - (e[coord] - d.p) / scale;
  };
  const end = () => {
    drag.current = null;
  };

  return {
    ref,
    handlers: {
      onPointerDown,
      onPointerMove,
      onPointerUp: end,
      onPointerCancel: end,
      onPointerLeave: end,
    },
  };
}
