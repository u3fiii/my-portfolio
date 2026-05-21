/**
 * Full-viewport section wrapper. `id` must match an entry in content/site.js.
 */
export default function Section({
  id,
  children,
  className = "",
  align = "center",
  contentMaxWidth = "max-w-6xl",
}) {
  const alignClass = align === "start" ? "justify-start" : "justify-center";

  return (
    <section
      id={id}
      className={`flex h-[100dvh] flex-col items-center overflow-hidden px-6 ${className}`}
    >
      <div
        className={`flex h-full w-full min-h-0 flex-col items-center ${alignClass} ${contentMaxWidth}`}
      >
        {children}
      </div>
    </section>
  );
}
