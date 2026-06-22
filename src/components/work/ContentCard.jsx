import { Link } from "react-router-dom";
import { TAG_LABELS } from "../../content/work.js";
import { workDetailPath } from "../../routes/paths.js";

const tagStyles = {
  project: "bg-zinc-900 text-white",
  article: "bg-zinc-200 text-zinc-700",
  "case-study": "border border-zinc-300 bg-white text-zinc-700",
};

export default function ContentCard({
  id,
  title,
  subtitle,
  tag,
  thumbnail,
  compact = false,
  fitViewport = false,
}) {
  if (fitViewport) {
    return (
      <Link
        to={workDetailPath(id)}
        className="group flex h-[200px] w-full flex-col overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 p-2 transition-shadow hover:shadow-md"
      >
        <img
          src={thumbnail}
          alt={title}
          className="h-[80px] w-full shrink-0 object-cover rounded-md"
        />
        <div className="flex min-h-0 flex-1 flex-col p-3">
          <span
            className={`mb-2 w-fit rounded-full px-2 py-0.5 font-windsor-condensed text-[10px] leading-none uppercase tracking-wide ${tagStyles[tag] ?? tagStyles.project}`}
          >
            {TAG_LABELS[tag] ?? tag}
          </span>
          <h3 className="line-clamp-2 font-windsor-bold text-[16px] leading-snug text-zinc-900 group-hover:text-zinc-700">
            {title}
          </h3>
          <p className="mt-1 line-clamp-3 text-[12px] font-normal leading-snug text-zinc-600">
            {subtitle}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      to={workDetailPath(id)}
      className="group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 transition-shadow hover:shadow-md md:rounded-2xl"
    >
      <img
        src={thumbnail}
        alt={title}
        className={`w-full object-cover ${compact ? "aspect-[4/3]" : "aspect-video"}`}
      />
      <div className={`flex flex-1 flex-col ${compact ? "p-3" : "p-4"}`}>
        <span
          className={`mb-2 w-fit rounded-full px-1.5 py-0.5 font-windsor-condensed text-xs leading-none uppercase tracking-wide ${tagStyles[tag] ?? tagStyles.project}`}
        >
          {TAG_LABELS[tag] ?? tag}
        </span>
        <h3
          className={`font-windsor-bold text-zinc-900 group-hover:text-zinc-700 ${compact ? "text-sm" : ""}`}
        >
          {title}
        </h3>
        <p
          className={`mt-1 flex-1 leading-relaxed text-zinc-600 ${compact ? "text-xs" : "text-sm"}`}
        >
          {subtitle}
        </p>
      </div>
    </Link>
  );
}
