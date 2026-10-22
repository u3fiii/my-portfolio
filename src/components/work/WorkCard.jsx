import { Link } from "react-router-dom";
import { ArrowUpRight } from "@phosphor-icons/react";
import { ICON_WEIGHT } from "../ui/icons.js";

const FONT_SERIF = '"Source Serif 4", Georgia, serif';
const FONT_UI = '"DM Sans", ui-sans-serif, system-ui, sans-serif';

function IconPhoto({ className }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 8h.01" />
      <path d="M3 6a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v12a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-12" />
      <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l5 5" />
      <path d="M14 14l1 -1c.928 -.893 2.072 -.893 3 0l3 3" />
    </svg>
  );
}

/**
 * Framed card: the cover sits inset in a light frame; an arrow badge slides
 * in on hover. `imageClassName` sizes the cover (defaults to 16:10).
 */
export default function WorkCard({
  tag,
  title,
  description,
  href,
  external,
  image,
  comingSoon = false,
  imageClassName = "aspect-[16/10]",
}) {
  const cardClass = comingSoon
    ? "flex h-full flex-col rounded-2xl border border-zinc-200 bg-[color:var(--color-background-primary)] p-1.5"
    : "card-hover-ring group flex h-full flex-col rounded-2xl border border-zinc-200 bg-[color:var(--color-background-primary)] p-1.5 no-underline";

  const content = (
    <>
      <div
        className={`relative w-full shrink-0 overflow-hidden rounded-xl bg-[color:var(--color-background-secondary)] ${imageClassName}`}
      >
        {image ? (
          <img
            src={image}
            alt=""
            loading="lazy"
            decoding="async"
            className={`h-full w-full object-cover transition-transform duration-3000 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105 group-focus-visible:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 motion-reduce:group-focus-visible:scale-100 ${comingSoon ? "grayscale" : ""}`}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-1 text-[color:var(--color-text-tertiary)]">
            <IconPhoto />
            <span
              className="uppercase tracking-[0.06em]"
              style={{ fontFamily: FONT_UI, fontSize: "9px", fontWeight: 500 }}
            >
              Cover image
            </span>
          </div>
        )}
        {comingSoon ? (
          <span className="absolute right-2 top-2 rounded-full bg-zinc-900/90 px-2 py-0.5 font-['DM_Sans',ui-sans-serif,sans-serif] text-[9px] lg:text-[10px] font-semibold uppercase tracking-[0.08em] text-white">
            Coming soon
          </span>
        ) : (
          <span
            className="absolute right-2 top-2 flex h-8 w-8 translate-y-1 items-center justify-center rounded-full bg-white text-zinc-900 opacity-0 shadow-sm transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
            aria-hidden
          >
            <ArrowUpRight className="h-4 w-4" weight={ICON_WEIGHT} />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-2 pb-2 pt-3 lg:px-2.5">
        <p
          className="mb-1 text-[9px] text-[color:var(--color-text-tertiary)] lg:text-[10px]"
          style={{
            fontFamily: FONT_UI,
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {tag}
        </p>
        <h3
          title={title}
          className="mb-1 line-clamp-1 text-[15px] text-zinc-900 lg:text-[16.5px]"
          style={{
            fontFamily: FONT_SERIF,
            fontWeight: 600,
            letterSpacing: "-0.01em",
            lineHeight: 1.25,
          }}
        >
          {title}
        </h3>
        <p
          className="line-clamp-2 text-[12px] text-zinc-500 lg:text-[13px]"
          style={{
            fontFamily: FONT_UI,
            lineHeight: 1.45,
          }}
        >
          {description}
        </p>
      </div>
    </>
  );

  if (comingSoon) {
    return (
      <article className={cardClass} aria-label={`${title} — coming soon`}>
        {content}
      </article>
    );
  }

  if (external) {
    return (
      <a href={href} className={cardClass}>
        {content}
      </a>
    );
  }

  return (
    <Link to={href} className={cardClass}>
      {content}
    </Link>
  );
}
