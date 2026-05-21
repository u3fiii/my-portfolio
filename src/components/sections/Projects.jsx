import Section from "../layout/Section.jsx";
import ContentGrid from "../work/ContentGrid.jsx";
import {
  PROJECTS_DESCRIPTION,
  PROJECTS_HEADING,
  WORK_ITEMS,
} from "../../content/work.js";

export default function Projects() {
  return (
    <Section id="projects" className="bg-white px-6 py-24">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
            {PROJECTS_HEADING}
          </h2>
          <p className="mt-3 text-lg font-light text-zinc-600">
            {PROJECTS_DESCRIPTION}
          </p>
        </header>

        <ContentGrid items={WORK_ITEMS} />
      </div>
    </Section>
  );
}
