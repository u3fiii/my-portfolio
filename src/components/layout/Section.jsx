/**
 * Full-viewport section wrapper. `id` must match an entry in content/site.js.
 */
export default function Section({
  id,
  children,
  className = "",
  align = "center",
  contentMaxWidth = "max-w-6xl",
  /** When false, section grows with content on mobile; desktop stays 100dvh. */
  tallOnMobile = true,
}) {
  const alignClass = align === "start" ? "justify-start" : "justify-center";
  const heightClass = tallOnMobile ? "h-[100dvh]" : "h-auto md:h-[100dvh]";
  const overflowClass = tallOnMobile
    ? "overflow-hidden"
    : "overflow-visible md:overflow-hidden";
  const innerHeightClass = tallOnMobile ? "h-full min-h-0" : "h-auto md:h-full md:min-h-0";

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
