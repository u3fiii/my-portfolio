/**
 * Renders blog-style blocks from content/work.js.
 * Add a new `type` here when you introduce new block kinds.
 */
export default function ContentBody({ blocks }) {
  const bodyText =
    "text-[15px] leading-[1.75] text-zinc-900 md:text-base md:leading-[1.8]";

  return (
    <div className="flex flex-col gap-6 md:gap-7">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={index}
                className="border-t border-zinc-200 pt-9 text-[1.35rem] font-semibold leading-snug text-zinc-950 first:border-t-0 first:pt-0 md:text-[1.5rem]"
              >
                {block.text}
              </h2>
            );
          case "subheading":
            return (
              <h3
                key={index}
                className="text-base font-semibold leading-snug text-zinc-950 md:text-[17px]"
              >
                {block.text}
              </h3>
            );
          case "meta":
            return (
              <dl
                key={index}
                className="grid gap-5 border-y border-zinc-200 py-6 md:grid-cols-3 md:gap-6 md:py-7"
              >
                {block.items.map(({ label, value }) => (
                  <div key={label}>
                    <dt className="text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-500">
                      {label}
                    </dt>
                    <dd className={`mt-2 ${bodyText}`}>{value}</dd>
                  </div>
                ))}
              </dl>
            );
          case "list":
            return (
              <ul key={index} className="flex flex-col gap-2">
                {block.items.map((item, itemIndex) => (
                  <li key={itemIndex} className={bodyText}>
                    {item}
                  </li>
                ))}
              </ul>
            );
          case "quote":
            return (
              <blockquote
                key={index}
                className="border-l-[3px] border-zinc-300 py-0.5 pl-5 text-[17px] font-medium italic leading-[1.6] text-zinc-700 md:text-lg"
              >
                {block.text}
              </blockquote>
            );
          case "learning":
            return (
              <div
                key={index}
                className="flex flex-col gap-2 border-l-[3px] border-zinc-300 py-1 pl-5"
              >
                <h3 className="text-[15px] font-semibold leading-snug text-zinc-950 md:text-base">
                  {block.title}
                </h3>
                <p className={bodyText}>{block.text}</p>
              </div>
            );
          case "divider":
            return (
              <hr
                key={index}
                className="my-2 border-zinc-200"
                aria-hidden="true"
              />
            );
          case "image":
            return (
              <figure key={index} className="my-2 flex flex-col gap-2.5">
                <img
                  src={block.src}
                  alt={block.alt ?? ""}
                  className="w-full bg-zinc-100"
                />
                {block.caption && (
                  <figcaption className="text-[13px] leading-relaxed text-zinc-500">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "paragraph":
          default:
            return (
              <p key={index} className={bodyText}>
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
