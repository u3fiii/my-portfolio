/** Fixed layered background: gradient, color blobs, grain. */
export default function PageBackground() {
  return (
    <>
      <div className="page-bg-gradient" aria-hidden />
      <div className="page-bg-blobs" aria-hidden>
        <div className="page-bg-blob-1" />
        <div className="page-bg-blob-2" />
      </div>
      <div className="page-bg-grain" aria-hidden />
    </>
  );
}
