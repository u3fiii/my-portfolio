import { Link } from "react-router-dom";
import { TAG_LABELS } from "../../content/work.js";
import { workDetailPath } from "../../routes/paths.js";

const tagStyles = {
  project: "bg-zinc-900 text-white",
  article: "bg-zinc-200 text-zinc-700",
  "case-study": "border border-zinc-300 bg-white text-zinc-700",
};

const cardClassName =
  "group flex h-full flex-col rounded-2xl border border-zinc-200 bg-zinc-50 p-5 transition-shadow hover:shadow-md";

export default function ContentCard({ id, title, subtitle, tag }) {
  return (
    <Link to={workDetailPath(id)} className={cardClassName}>
      <span
        className={`mb-4 w-fit rounded-full px-3 py-1 text-xs font-light ${tagStyles[tag] ?? tagStyles.project}`}
      >
        {TAG_LABELS[tag] ?? tag}
      </span>
      <h3 className="font-bold text-zinc-900 group-hover:text-zinc-700">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm font-light leading-relaxed text-zinc-600">
        {subtitle}
      </p>
    </Link>
  );
}
