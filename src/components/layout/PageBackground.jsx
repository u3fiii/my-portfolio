import { useMatch } from "react-router-dom";
import DotBackground from "../background/DotBackground.jsx";

/** Fixed white base + interactive dot grid behind page content. */
export default function PageBackground() {
  const isContentPage = Boolean(
    useMatch("/work/:id") || useMatch("/case-studies/*"),
  );

  return (
    <>
      <div className="fixed inset-0 z-0 bg-white dark:bg-[#0e0e10]" aria-hidden />
      <DotBackground variant={isContentPage ? "content" : "default"} />
    </>
  );
}
