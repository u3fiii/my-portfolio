import { Link } from "react-router-dom";
import { ROUTES } from "../../routes/paths.js";

export default function WorkDetailHeader({ title }) {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-4">
        <Link
          to={ROUTES.projects}
          className="shrink-0 text-sm font-light text-zinc-600 transition-colors hover:text-zinc-900"
        >
          ← Back
        </Link>
        <h1 className="min-w-0 flex-1 truncate text-lg font-bold text-zinc-900 md:text-xl">
          {title}
        </h1>
      </div>
    </header>
  );
}
