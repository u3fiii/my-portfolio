/**
 * Full-viewport section wrapper. `id` must match an entry in content/site.js.
 */
export default function Section({
  id,
  children,
  className = "",
  align = "center",
  contentMaxWidth = "max-w-6xl",
  /** When false, section height follows content at all breakpoints. */
  tallOnMobile = true,
}) {
  const alignClass = align === "start" ? "justify-start" : "justify-center";
  const heightClass = tallOnMobile ? "h-[100dvh]" : "h-auto";
  const overflowClass = tallOnMobile ? "overflow-hidden" : "overflow-visible";
  const innerHeightClass = tallOnMobile ? "h-full min-h-0" : "h-auto";

  return (
    <section
      id={id}
      className={`flex flex-col items-center px-6 ${heightClass} ${overflowClass} ${className}`}
    >
      <div
        className={`flex w-full flex-col items-center ${innerHeightClass} ${alignClass} ${contentMaxWidth}`}
      >
        {children}
      </div>
    </section>
  );
}
