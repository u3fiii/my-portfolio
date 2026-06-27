import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "../../hooks/useLenis.jsx";

/** Resets scroll on route change; hash anchors are handled by ScrollToHash. */
export default function ScrollRestoration() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (hash) return;

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      return;
    }

    window.scrollTo(0, 0);
  }, [pathname, hash, lenis]);

  return null;
}
