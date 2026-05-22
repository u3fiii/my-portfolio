import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import WorkDetailHeader from "../components/layout/WorkDetailHeader.jsx";
import ContentBody from "../components/work/ContentBody.jsx";
import { TAG_LABELS, getWorkItemById } from "../content/work.js";
import { useLenis } from "../hooks/useLenis.jsx";
import { ROUTES } from "../routes/paths.js";

export default function WorkDetailPage() {
  const { id } = useParams();
  const item = getWorkItemById(id);
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      return;
    }
    window.scrollTo(0, 0);
  }, [id, lenis]);

  if (!item) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6">
        <p className="font-light text-zinc-600">This page could not be found.</p>
        <Link
          to={ROUTES.home}
          className="text-sm font-light text-zinc-900 underline"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      <WorkDetailHeader title={item.title} />
      <article className="mx-auto max-w-3xl px-6 py-12">
        <p className="mb-2 text-sm font-light text-zinc-500">
          {TAG_LABELS[item.tag]}
        </p>
        <p className="mb-10 text-lg font-light text-zinc-600">{item.subtitle}</p>
        <ContentBody blocks={item.body} />
      </article>
    </div>
  );
}
