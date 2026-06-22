import { Link } from "react-router-dom";

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

export default function WorkCard({
  tag,
  title,
  description,
  href,
  external,
  image,
  comingSoon = false,
}) {
  const cardClass = comingSoon
    ? "flex h-full flex-col overflow-hidden rounded-xl border border-zinc-300 bg-[color:var(--color-background-primary)]"
    : "pill-hover-ring group flex h-full flex-col overflow-hidden rounded-xl border border-zinc-300 bg-[color:var(--color-background-primary)] no-underline";

  const content = (
    <>
      <div className="relative aspect-[4/2] w-full shrink-0 overflow-hidden bg-[color:var(--color-background-secondary)]">
        {image ? (
          <img
            src={image}
            alt=""
            className={`h-full w-full object-cover ${comingSoon ? "grayscale" : ""}`}
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
          <span className="absolute right-2 top-2 rounded-full bg-zinc-900/90 px-2 py-0.5 font-['DM_Sans',ui-sans-serif,sans-serif] text-[9px] font-semibold uppercase tracking-[0.08em] text-white">
            Coming soon
          </span>
        ) : null}
      </div>

      <div className="p-3">
        <p
          className="mb-1.5 text-[color:var(--color-text-tertiary)]"
          style={{
            fontFamily: FONT_UI,
            fontSize: "9px",
            fontWeight: 500,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {tag}
        </p>
        <h3
          title={title}
          className="mb-1 line-clamp-1 text-zinc-900"
          style={{
            fontFamily: FONT_SERIF,
            fontSize: "15px",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            lineHeight: 1.25,
          }}
        >
          {title}
        </h3>
        <p
          className="line-clamp-2 text-zinc-500"
          style={{
            fontFamily: FONT_UI,
            fontSize: "12px",
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
