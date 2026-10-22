import { useEffect, useState } from "react";
import { useLenis } from "./useLenis.jsx";

/** Ease-in-out cubic: the page gathers weight, glides, then settles. */
const SNAP_EASING = (t) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
const SNAP_DURATION = 1.05;

/** Quiet time (ms) after which the next wheel event counts as a new gesture. */
const GESTURE_GAP_MS = 180;
/** Wheel distance (px) a gesture must travel before it turns the page. */
const GESTURE_THRESHOLD = 12;
/** Slack (px) when comparing scroll positions against section edges. */
const EDGE = 2;

/** Desktop only: a mouse or trackpad, room for full sections, motion allowed. */
const SNAP_MEDIA =
  "(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

const PAGE_KEYS = {
  PageDown: 1,
  PageUp: -1,
  ArrowDown: 1,
  ArrowUp: -1,
};

function isEditable(target) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
  );
}

/**
 * Measures each section as a stop. Viewport-sized sections are a single point;
 * taller ones (Work) are a range the user scrolls through freely.
 */
function measureStops(ids) {
  const vh = window.innerHeight;
  const scrollPadding =
    parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) ||
    0;
  const maxScroll = document.documentElement.scrollHeight - vh;

  return ids
    .map((id) => document.getElementById(id))
    .filter(Boolean)
    .map((el) => {
      const top = el.getBoundingClientRect().top + window.scrollY;
      const height = el.offsetHeight;
      const clamp = (v) => Math.round(Math.min(Math.max(v, 0), maxScroll));

      if (height <= vh + EDGE) {
        // Shorter sections sit centred, but always clear the fixed header.
        const slack = Math.max(vh - height, 0);
        const offset = Math.max(slack / 2, Math.min(scrollPadding, slack));
        const point = clamp(top - offset);
        return { start: point, end: point };
      }
      return {
        start: clamp(top - scrollPadding),
        end: clamp(top + height - vh),
      };
    });
}

/**
 * Section-by-section scrolling for the home page: one wheel gesture (or
 * PageUp/PageDown/arrow key) glides to the next section, and trackpad inertia
 * can't chain into a second jump. Inside tall sections scrolling stays free
 * and pauses at the edge before moving on.
 */
export default function useSectionSnap(sectionIds) {
  const lenis = useLenis();
  const [enabled, setEnabled] = useState(
    () => window.matchMedia(SNAP_MEDIA).matches,
  );

  useEffect(() => {
    const media = window.matchMedia(SNAP_MEDIA);
    const onChange = () => setEnabled(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!lenis || !enabled) return;

    const state = {
      animating: false,
      consumed: false,
      lastTime: 0,
      lastAbs: 0,
      travel: 0,
    };

    window.__snapDebug = () => measureStops(sectionIds);
    function glideTo(target) {
      window.__lastGlide = target;
      state.animating = true;
      state.consumed = true;
      lenis.scrollTo(target, {
        duration: SNAP_DURATION,
        easing: SNAP_EASING,
        lock: true,
        onComplete: () => {
          state.animating = false;
        },
      });
    }

    /**
     * Returns where a move in `direction` from the current position should
     * go, `null` to let Lenis scroll freely, or `undefined` to do nothing.
     */
    function resolveMove(direction, delta) {
      const y = lenis.scroll;
      const stops = measureStops(sectionIds);

      const range = stops.find(
        ({ start, end }) => end > start && y >= start - EDGE && y <= end + EDGE,
      );
      if (range) {
        const target = lenis.targetScroll + delta;
        if (direction > 0 && y < range.end - EDGE) {
          return target >= range.end ? { edge: range.end } : null;
        }
        if (direction < 0 && y > range.start + EDGE) {
          return target <= range.start ? { edge: range.start } : null;
        }
      }

      if (direction > 0) {
        const next = stops.find(({ start }) => start > y + EDGE);
        return next ? { snap: next.start } : undefined;
      }
      const prev = stops.findLast(({ end }) => end < y - EDGE);
      return prev ? { snap: prev.end } : undefined;
    }

    function block(event) {
      if (event.cancelable) event.preventDefault();
      return false;
    }

    lenis.options.virtualScroll = ({ deltaY, event }) => {
      if (event.type !== "wheel" || event.ctrlKey) return true;
      if (event.target.closest?.("[data-lenis-prevent]")) return true;

      const now = performance.now();
      const abs = Math.abs(deltaY);
      const isNewGesture =
        now - state.lastTime > GESTURE_GAP_MS ||
        (abs > state.lastAbs * 1.6 && abs > 12);
      state.lastTime = now;
      state.lastAbs = abs;

      if (state.animating) return block(event);
      if (isNewGesture) {
        state.consumed = false;
        state.travel = 0;
      }
      if (state.consumed || deltaY === 0) return block(event);

      const move = resolveMove(Math.sign(deltaY), deltaY);
      if (move === null) return true;
      if (move === undefined) return block(event);

      if (move.edge !== undefined) {
        // Ease into the section's edge, then wait for a fresh gesture.
        state.consumed = true;
        lenis.scrollTo(move.edge);
        return block(event);
      }

      state.travel += deltaY;
      if (Math.abs(state.travel) >= GESTURE_THRESHOLD) glideTo(move.snap);
      return block(event);
    };

    function onKeyDown(event) {
      const isSpace = event.key === " ";
      const direction = isSpace ? (event.shiftKey ? -1 : 1) : PAGE_KEYS[event.key];
      if (!direction || event.altKey || event.metaKey || event.ctrlKey) return;
      if (isEditable(event.target)) return;
      if (isSpace && event.target.closest?.("button, a, [role]")) return;

      if (state.animating) {
        event.preventDefault();
        return;
      }

      const move = resolveMove(direction, direction * window.innerHeight * 0.8);
      if (move === null || move === undefined) return;

      event.preventDefault();
      if (move.edge !== undefined) lenis.scrollTo(move.edge);
      else glideTo(move.snap);
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      lenis.options.virtualScroll = undefined;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lenis, enabled, sectionIds]);
}
