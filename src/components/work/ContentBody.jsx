/**
 * Renders blog-style blocks from content/work.js.
 * Add a new `type` here when you introduce new block kinds.
 */
export default function ContentBody({ blocks }) {
  return (
    <div className="flex flex-col gap-8">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={index}
                className="text-2xl font-bold tracking-tight text-zinc-900"
              >
                {block.text}
              </h2>
            );
          case "image":
            return (
              <figure key={index} className="flex flex-col gap-3">
                <img
                  src={block.src}
                  alt={block.alt ?? ""}
                  className="w-full rounded-2xl border border-zinc-200 bg-zinc-100"
                />
                {block.caption && (
                  <figcaption className="text-center text-sm font-light text-zinc-500">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          case "paragraph":
          default:
            return (
              <p
                key={index}
                className="text-base font-light leading-relaxed text-zinc-700 md:text-lg"
              >
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
