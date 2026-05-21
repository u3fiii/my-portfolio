/**
 * Full-viewport section wrapper. `id` must match an entry in content/site.js.
 */
export default function Section({ id, children, className = "" }) {
  return (
    <section
      id={id}
      className={`flex min-h-screen scroll-mt-24 flex-col ${className}`}
    >
      {children}
    </section>
  );
}
