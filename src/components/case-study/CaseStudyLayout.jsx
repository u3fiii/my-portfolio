import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Buildings, CalendarBlank, DeviceMobile, Flag, Info, Stack, Target, UserCircle, UsersThree } from "@phosphor-icons/react";
import { useLenis } from "../../hooks/useLenis.jsx";
import RelatedWorkSection from "../work/RelatedWorkSection.jsx";

const WORDS_PER_MINUTE = 230;

const AUTHOR = { name: "Ali Yousefi", initials: "AY" };

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Thin bar along the top edge that fills as the reader moves down the page. */
function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 260, damping: 40 });
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[200] h-[2px] origin-left bg-zinc-900"
      style={{ scaleX }}
    />
  );
}

/**
 * Chapter list in the left margin on wide screens. It appears once the cover
 * has scrolled away and highlights the chapter being read.
 */
function ChapterNav({ articleRef, coverRef }) {
  const lenis = useLenis();
  const [chapters, setChapters] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;
    const sections = [...article.querySelectorAll("[data-chapter]")];
    setChapters(sections.map((el) => ({ id: el.id, title: el.dataset.nav })));

    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).at(-1);
        if (hit) setActiveId(hit.target.id);
      },
      { rootMargin: "-25% 0px -65% 0px" },
    );
    sections.forEach((el) => observer.observe(el));

    const cover = coverRef.current;
    const coverObserver = new IntersectionObserver(([entry]) =>
      setVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0),
    );
    if (cover) coverObserver.observe(cover);

    return () => {
      observer.disconnect();
      coverObserver.disconnect();
    };
  }, [articleRef, coverRef]);

  const goTo = (event, id) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;
    if (lenis) lenis.scrollTo(target, { offset: -96 });
    else target.scrollIntoView({ behavior: "smooth" });
  };

  if (chapters.length < 3) return null;

  return (
    <nav
      aria-label="Chapters"
      className={`cs-toc fixed top-1/2 z-20 w-40 ${
        visible ? "cs-toc--visible" : ""
      }`}
    >
      <ol className="mt-3 flex flex-col gap-0.5">
        {chapters.map(({ id, title }, index) => (
          <li key={id}>
            <a
              href={`#${id}`}
              onClick={(event) => goTo(event, id)}
              aria-current={activeId === id ? "location" : undefined}
              className="cs-toc__link"
            >
              <span className="cs-toc__num">{String(index + 1).padStart(2, "0")}</span>
              <span className="min-w-0 truncate">{title}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/**
 * Shared page for case studies and articles: header (eyebrow, title, deck,
 * byline, cover, facts), the body, and related work.
 */
/** An icon per fact in the header strip, matched by its label. */
const FACT_ICONS = {
  role: UserCircle,
  team: UsersThree,
  timeline: CalendarBlank,
  timeframe: CalendarBlank,
  focus: Target,
  platform: DeviceMobile,
  surfaces: Stack,
  status: Flag,
  company: Buildings,
};

export default function CaseStudyLayout({
  id,
  eyebrow,
  title,
  deck,
  role,
  cover,
  meta = [],
  children,
}) {
  const lenis = useLenis();
  const articleRef = useRef(null);
  const bodyRef = useRef(null);
  const coverRef = useRef(null);
  const [minutes, setMinutes] = useState(null);

  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [lenis]);

  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const clone = body.cloneNode(true);
    clone.querySelectorAll("figure, svg, [data-related]").forEach((node) => node.remove());
    const words = clone.textContent.trim().split(/\s+/).length;
    setMinutes(Math.max(1, Math.round(words / WORDS_PER_MINUTE)));
  }, []);

  // Every screenshot in the article loses its flat backdrop so it sits on the
  // grey tray; illustrations (bleed figures) keep theirs.
  useEffect(() => {
    const body = bodyRef.current;
    if (!body) return;
    const images = [...body.querySelectorAll("img")].filter(
      (img) => !img.closest(".cs-figure--bleed"),
    );
    const cleanups = images.map((img) => {
      const apply = () => {
        if (img.dataset.cleared) return;
        img.dataset.cleared = "1";
        const cleaned = clearBackdrop(img);
        if (cleaned) img.src = cleaned;
      };
      if (img.complete && img.naturalWidth) {
        apply();
        return () => {};
      }
      img.addEventListener("load", apply, { once: true });
      return () => img.removeEventListener("load", apply);
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div className="cs-page relative min-h-screen">
      <ReadingProgress />
      <ChapterNav articleRef={articleRef} coverRef={coverRef} />
      <div className="cs-paper" aria-hidden />

      <article
        ref={articleRef}
        className="case-study relative mx-auto max-w-[calc(52.5rem+3rem)] px-6 pb-24 pt-28 md:pt-32"
      >
        <header className="mb-14">
          <p className="case-study__eyebrow detail-reveal detail-reveal--eyebrow">
            {eyebrow}
          </p>
          <h1 className="case-study__title detail-reveal detail-reveal--title mt-4">
            {title}
          </h1>
          {deck ? (
            <p className="case-study__deck detail-reveal detail-reveal--title mt-4">
              {deck}
            </p>
          ) : null}

          <div className="case-study__ui detail-reveal detail-reveal--text mt-6 flex items-center gap-3">
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-[11px] font-semibold text-white"
              aria-hidden
            >
              {AUTHOR.initials}
            </span>
            <p className="text-sm leading-snug text-zinc-500">
              <span className="font-medium text-zinc-900">{AUTHOR.name}</span>
              {role ? <span> · {role}</span> : null}
              {minutes ? (
                <>
                  <br className="min-[480px]:hidden" />
                  <span className="max-[479px]:hidden"> · </span>
                  {minutes} min read
                </>
              ) : null}
            </p>
          </div>

          <figure
            ref={coverRef}
            className={`cs-cover case-study__ui detail-reveal detail-reveal--image mt-10 ${cover.node ? "" : "overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100"}`}
          >
            {cover.node ?? <img
              src={cover.src}
              alt={cover.alt}
              width={cover.width}
              height={cover.height}
              decoding="async"
              fetchPriority="high"
              className="ambient-cover-zoom block aspect-[2/1] w-full object-cover"
            />}
          </figure>

          {meta.length ? (
            <dl className="cs-facts case-study__ui detail-mobile-stagger mt-8">
              {meta.map(([label, value]) => (
                <div key={label}>
                  <span className="cs-facts__icon" aria-hidden>
                    {(() => {
                      const Icon = FACT_ICONS[label.toLowerCase()] ?? Info;
                      return <Icon size={18} weight="duotone" />;
                    })()}
                  </span>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </header>

        <div ref={bodyRef} className="cs-body">
          {children}
        </div>

        <div data-related>
          <RelatedWorkSection excludeId={id} />
        </div>
      </article>
    </div>
  );
}

/**
 * Numbered chapter: counted by CSS and listed in the contents under `nav` —
 * a short label (one to three words) so every entry fits on one line.
 */
export function Chapter({ title, nav = title, children }) {
  return (
    <section
      id={slugify(title)}
      data-chapter={title}
      data-nav={nav}
      className="cs-chapter"
    >
      <h2 className="case-study__h2">{title}</h2>
      <div className="mt-5 flex flex-col gap-5">{children}</div>
    </section>
  );
}

/** Unnumbered block between chapters (an opening, a quote, a TL;DR). */
export function Interlude({ children }) {
  return <div className="cs-interlude flex flex-col gap-5">{children}</div>;
}

export function P({ children }) {
  return <p className="case-study__body">{children}</p>;
}

export function H3({ children }) {
  return <h3 className="case-study__h3 mt-3">{children}</h3>;
}

export function PullQuote({ children }) {
  return <blockquote className="case-study__quote">{children}</blockquote>;
}

export function Callout({ title, children }) {
  return (
    <aside className="cs-callout case-study__ui">
      {title ? <p className="cs-callout__title">{title}</p> : null}
      <div className="cs-callout__body">{children}</div>
    </aside>
  );
}

/**
 * Image figure. `frame` "inset" shows the image on a soft tray (screens,
 * diagrams); "bleed" lets an illustration fill the rounded frame.
 */
/**
 * Clears a screenshot's flat backdrop: if all four corners share one colour,
 * flood-fill everything connected to the edges in that colour to transparent,
 * so the screen sits directly on the figure tray. Returns a PNG data URL, or
 * null when the image has no flat backdrop (it is then left as is).
 */
function clearBackdrop(img) {
  try {
    const w = img.naturalWidth;
    const h = img.naturalHeight;
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(img, 0, 0);
    const image = ctx.getImageData(0, 0, w, h);
    const px = image.data;

    const corners = [0, w - 1, (h - 1) * w, h * w - 1].map((i) => [px[i * 4], px[i * 4 + 1], px[i * 4 + 2]]);
    const spread = Math.max(
      ...[0, 1, 2].map((c) => Math.max(...corners.map((p) => p[c])) - Math.min(...corners.map((p) => p[c]))),
    );
    if (spread > 12) return null;
    const bg = [0, 1, 2].map((c) => corners.reduce((sum, p) => sum + p[c], 0) / 4);

    const TOLERANCE = 14;
    const matches = (i) =>
      Math.abs(px[i] - bg[0]) <= TOLERANCE &&
      Math.abs(px[i + 1] - bg[1]) <= TOLERANCE &&
      Math.abs(px[i + 2] - bg[2]) <= TOLERANCE;

    const seen = new Uint8Array(w * h);
    const stack = [];
    for (let x = 0; x < w; x += 1) stack.push(x, (h - 1) * w + x);
    for (let y = 0; y < h; y += 1) stack.push(y * w, y * w + w - 1);
    while (stack.length) {
      const p = stack.pop();
      if (seen[p]) continue;
      seen[p] = 1;
      if (!matches(p * 4)) continue;
      px[p * 4 + 3] = 0;
      const x = p % w;
      if (x > 0) stack.push(p - 1);
      if (x < w - 1) stack.push(p + 1);
      if (p >= w) stack.push(p - w);
      if (p < w * (h - 1)) stack.push(p + w);
    }
    ctx.putImageData(image, 0, 0);
    return canvas.toDataURL("image/png");
  } catch {
    return null;
  }
}

/**
 * Image figure. `frame` "inset" shows the image on the grey tray (screens,
 * diagrams); "bleed" lets an illustration fill the rounded frame.
 */
export function Figure({ src, alt, caption, frame = "inset", children }) {
  return (
    <figure className={`cs-figure cs-figure--${frame} case-study__ui`}>
      <div className="cs-figure__frame">
        {children ?? <img src={src} alt={alt} loading="lazy" decoding="async" />}
      </div>
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}

/** Numbered takeaways: a bold claim and a short explanation each. */
export function Lessons({ items }) {
  return (
    <ol className="cs-lessons">
      {items.map(({ title, body }, index) => (
        <li key={title}>
          <span className="cs-lessons__num case-study__ui" aria-hidden>
            {String(index + 1).padStart(2, "0")}
          </span>
          <div>
            <p className="case-study__body font-semibold text-zinc-900">{title}</p>
            <p className="case-study__body mt-1.5">{body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
