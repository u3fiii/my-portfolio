/**
 * Shown while an article's code loads: the article's own outline (eyebrow,
 * title, deck, cover, facts) in soft grey blocks, so the page doesn't jump
 * when the real content arrives. It fades in after a short delay, so fast
 * loads show nothing at all.
 */
export default function PageSkeleton() {
  const block = "cs-skeleton rounded-full";
  return (
    <div className="cs-skeleton-page mx-auto w-full max-w-[calc(52.5rem+3rem)] px-6 pt-28" role="status" aria-label="Loading">
      <div className={`${block} h-3 w-48`} />
      <div className={`${block} mt-6 h-9 w-[85%]`} />
      <div className={`${block} mt-3 h-9 w-[60%]`} />
      <div className={`${block} mt-6 h-4 w-[70%]`} />
      <div className="cs-skeleton mt-10 aspect-[16/9] w-full rounded-2xl" />
      <div className="mt-8 grid gap-2.5 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="cs-skeleton h-24 rounded-[18px]" />
        ))}
      </div>
    </div>
  );
}
