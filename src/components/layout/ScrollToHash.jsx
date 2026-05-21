import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/** Scrolls to a hash anchor after navigating home (e.g. /#projects). */
export default function ScrollToHash() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    const target = document.querySelector(hash);
    target?.scrollIntoView({ behavior: "smooth" });
  }, [hash]);

  return null;
}
