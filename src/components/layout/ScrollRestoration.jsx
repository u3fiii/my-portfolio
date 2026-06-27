import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "../../hooks/useLenis.jsx";
import { resetScroll, resetScrollAfterPaint } from "../../utils/resetScroll.js";

/** Resets scroll on route change; hash anchors are handled by ScrollToHash. */
export default function ScrollRestoration() {
  const { pathname, hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (hash) return;

    const timeoutId = resetScrollAfterPaint(lenis);
    return () => window.clearTimeout(timeoutId);
  }, [pathname, hash, lenis]);

  useEffect(() => {
    const onPopState = () => {
      if (window.location.hash) return;
      resetScrollAfterPaint(lenis);
    };

    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [lenis]);

  return null;
}
