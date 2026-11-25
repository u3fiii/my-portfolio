import { useSyncExternalStore } from "react";

const DESKTOP_SCROLL = "(min-width: 768px) and (hover: hover) and (pointer: fine)";

function subscribe(onChange) {
  const media = window.matchMedia(DESKTOP_SCROLL);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

export default function useDesktopScroll() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(DESKTOP_SCROLL).matches,
    () => false,
  );
}
