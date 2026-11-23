import ScrollToHash from "../components/layout/ScrollToHash.jsx";
import Me from "../components/sections/Me.jsx";
import Projects from "../components/sections/Projects.jsx";
import Contact from "../components/sections/Contact.jsx";
import useSectionSnap from "../hooks/useSectionSnap.js";

import useWorkPrefetch from "../hooks/useWorkPrefetch.js";

const SECTION_IDS = ["me", "projects", "contact"];

export default function HomePage() {
  useSectionSnap(SECTION_IDS);
  useWorkPrefetch();

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
