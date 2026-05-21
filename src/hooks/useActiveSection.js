import { useEffect, useState } from "react";
import { useLenis } from "./useLenis.jsx";

/**
 * Returns the id of the section currently in view while scrolling.
 * `sectionIds` order should match NAV_ITEMS in content/site.js.
 */
export default function useActiveSection(sectionIds) {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? "");
  const lenis = useLenis();

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (elements.length === 0) return;

    const updateActive = () => {
      // Line ~35% from top: section spanning this point is "current"
      const anchor = window.innerHeight * 0.35;
      let current = sectionIds[0];

      for (const el of elements) {
        const { top, bottom } = el.getBoundingClientRect();
        if (top <= anchor && bottom > anchor) {
          current = el.id;
          break;
        }
        if (top <= anchor) {
          current = el.id;
        }
      }

      setActiveId((prev) => (prev === current ? prev : current));
    };

    updateActive();

    if (lenis) {
      const unsubscribe = lenis.on("scroll", updateActive);
      return unsubscribe;
    }

    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
    };
  }, [sectionIds, lenis]);

  return activeId;
}
