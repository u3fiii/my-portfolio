import { useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import ContentBody from "../components/work/ContentBody.jsx";
import RelatedWorkSection from "../components/work/RelatedWorkSection.jsx";

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

        <p className="text-sm text-zinc-700">This page could not be found.</p>

        <Link

          to={ROUTES.home}

          className="text-sm text-zinc-900 underline underline-offset-2"

        >

          Back to home

        </Link>

      </div>

    );

  }



  return (

    <div className="min-h-screen font-content">

      <article className="mx-auto max-w-[680px] px-6 pb-24 pt-24 md:pt-28">

        <header className="mb-10 border-b border-zinc-200 pb-10 md:mb-12 md:pb-12">

          <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">

            {TAG_LABELS[item.tag]}

          </p>

          <h1 className="text-[2rem] font-semibold leading-[1.12] tracking-tight text-zinc-950 md:text-[2.75rem]">

            {item.title}

          </h1>

          {item.subtitle && (

            <p className="mt-5 text-lg leading-[1.55] text-zinc-600 md:text-[1.25rem]">

              {item.subtitle}

            </p>

          )}

        </header>



        <ContentBody blocks={item.body} />

        <RelatedWorkSection excludeId={id} />

        <p className="mt-12 text-center text-sm">
          <Link
            to={ROUTES.projects}
            className="text-zinc-600 underline underline-offset-2 transition-colors hover:text-zinc-900"
          >
            Back to projects
          </Link>
        </p>
      </article>

    </div>

  );

}


