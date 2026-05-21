import Section from "../layout/Section.jsx";
import ContentGrid from "../work/ContentGrid.jsx";
import {
  PROJECTS_DESCRIPTION,
  PROJECTS_HEADING,
  WORK_ITEMS,
} from "../../content/work.js";

export default function Projects() {
  return (
    <Section
      id="projects"
      className="bg-white"
      align="start"
      contentMaxWidth="max-w-[78rem]"
    >
      <div className="flex h-full w-full min-h-0 flex-col items-center justify-start gap-2 py-3 pt-2">
        <header className="w-full shrink-0 text-center pb-2">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 md:text-3xl">
            {PROJECTS_HEADING}
          </h2>
          <p className="mx-auto mt-1 max-w-xl text-sm font-light leading-snug text-zinc-600 md:text-base">
            {PROJECTS_DESCRIPTION}
          </p>
        </header>

        <ContentGrid items={WORK_ITEMS} fitViewport />
      </div>
    </Section>
  );
}
