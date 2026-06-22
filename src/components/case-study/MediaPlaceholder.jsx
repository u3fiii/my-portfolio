export default function MediaPlaceholder({
  tag,
  title,
  description,
  bullets = [],
  size,
  highlighted = false,
}) {
  const borderClass = highlighted
    ? "border-[#0099CC] bg-[#f0f9fc]"
    : "border-dashed border-zinc-300 bg-zinc-50";

  return (
    <figure
      className={`case-study__ui my-8 rounded-xl border p-6 ${borderClass}`}
    >
      {tag ? (
        <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.1em] text-[#0099CC]">
          {tag}
        </p>
      ) : null}
      {title ? (
        <p className="text-sm font-semibold leading-snug text-zinc-900">
          {title}
        </p>
      ) : null}
      {description ? (
        <p className="mt-2 text-[13px] leading-relaxed text-zinc-600">
          {description}
        </p>
      ) : null}
      {bullets.length > 0 ? (
        <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-4 text-[13px] leading-relaxed text-zinc-600">
          {bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {size ? (
        <p className="mt-4 inline-flex rounded-full bg-zinc-200/80 px-2.5 py-1 text-[11px] font-medium text-zinc-600">
          {size}
        </p>
      ) : null}
    </figure>
  );
}
