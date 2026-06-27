import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ScrollToHash from "../components/layout/ScrollToHash.jsx";
import Me from "../components/sections/Me.jsx";
import Projects from "../components/sections/Projects.jsx";
import Contact from "../components/sections/Contact.jsx";
import { useLenis } from "../hooks/useLenis.jsx";
import { resetScrollAfterPaint } from "../utils/resetScroll.js";

export default function HomePage() {
  const { hash } = useLocation();
  const lenis = useLenis();

  useEffect(() => {
    if (hash) return;
    const timeoutId = resetScrollAfterPaint(lenis);
    return () => window.clearTimeout(timeoutId);
  }, [hash, lenis]);

  return (
    <>
      <ScrollToHash />
      <main>
        <Me />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
