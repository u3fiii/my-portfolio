import ScrollToHash from "../components/layout/ScrollToHash.jsx";
import Me from "../components/sections/Me.jsx";
import Projects from "../components/sections/Projects.jsx";
import Contact from "../components/sections/Contact.jsx";

export default function HomePage() {
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
