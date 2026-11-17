export function GameImage({ src, alt, caption, crop = false }) {
  return (
    <figure className="case-study__ui overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900">
      <img src={src} alt={alt} data-preserve-background className={crop ? "block aspect-video w-full object-cover" : "block h-auto w-full"} loading="lazy" decoding="async" />
      <figcaption className="px-4 py-3 text-sm text-zinc-500 dark:text-zinc-400">{caption}</figcaption>
    </figure>
  );
}

export function ProcessStrip({ label, steps }) {
  return (
    <figure className="case-study__ui rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-900" aria-label={label}>
      <figcaption className="mb-4 text-xs font-semibold uppercase tracking-[.14em] text-zinc-500 dark:text-zinc-400">{label}</figcaption>
      <ol className="grid gap-3 md:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.title} className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-800">
            <span className="text-xs font-semibold tabular-nums text-zinc-400">{String(index + 1).padStart(2, "0")}</span>
            <strong className="mt-2 block text-base text-zinc-900 dark:text-zinc-100">{step.title}</strong>
            <p className="mt-1 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{step.detail}</p>
          </li>
        ))}
      </ol>
    </figure>
  );
}

export function PlayGame({ href, title, note }) {
  return (
    <div className="case-study__ui flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-700 dark:bg-zinc-900">
      <p className="max-w-md text-sm leading-6 text-zinc-600 dark:text-zinc-300">{note}</p>
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-zinc-900">Play {title} <span aria-hidden>↗</span></a>
    </div>
  );
}
