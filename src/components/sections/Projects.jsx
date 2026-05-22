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
      className="mb-16 bg-transparent"
      align="start"
      contentMaxWidth="max-w-[78rem]"
      tallOnMobile={false}
    >
      <div className="flex w-full flex-col items-center justify-start gap-2 py-6 pt-4 md:h-full md:min-h-0 md:items-center md:justify-center md:py-3 md:pt-2">
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
