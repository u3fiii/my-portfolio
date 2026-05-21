import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useLenis } from "../../hooks/useLenis.jsx";

/** Scrolls to a hash anchor after navigating home (e.g. /#projects). */
export default function ScrollToHash() {
  const { hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (!hash) return;

    const target = document.querySelector(hash);
    if (!target) return;

    if (lenis) {
      lenis.scrollTo(target);
      return;
    }

    target.scrollIntoView();
  }, [hash, lenis]);

  return null;
}
