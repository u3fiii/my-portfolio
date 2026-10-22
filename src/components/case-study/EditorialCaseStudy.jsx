import { Children, cloneElement, isValidElement, useEffect, useRef } from "react";
import { useLenis } from "../../hooks/useLenis.jsx";
import RelatedWorkSection from "../work/RelatedWorkSection.jsx";
import "./EditorialCaseStudy.css";

export default function EditorialCaseStudy({ id, eyebrow, title, intro, image, imageAlt, meta, children }) {
  const lenis = useLenis();
  useEffect(() => {
    if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [lenis]);
  return (
    <div className="min-h-screen">
      <article className="case-study restored-article mx-auto max-w-[748px] px-6 pb-20 pt-24 md:pt-28">
        <header className="mb-8 pb-6">
          <p className="case-study__eyebrow detail-reveal detail-reveal--eyebrow">{eyebrow}</p>
          <h1 className="case-study__title detail-reveal detail-reveal--title mt-4">{title}</h1>
          <figure className="case-study__ui detail-reveal detail-reveal--image my-8 overflow-hidden rounded-xl border border-zinc-300 bg-zinc-100">
            <img src={image} alt={imageAlt} fetchPriority="high" decoding="async" className="block h-auto w-full" />
          </figure>
          <p className="case-study__deck detail-reveal detail-reveal--text mt-4">{intro}</p>
          <dl className="detail-mobile-stagger mt-6 grid gap-3 min-[600px]:grid-cols-3">
            {meta.map(([label, value]) => <div key={label} className="case-study__ui h-full rounded-xl border border-[#E2E1DC] dark:border-zinc-200 bg-white px-5 py-4" style={{borderWidth: "0.5px"}}><dt className="text-xs font-medium uppercase tracking-[0.06em] text-zinc-500">{label}</dt><dd className="mt-1.5 text-xs leading-relaxed text-zinc-700">{value}</dd></div>)}
          </dl>
        </header>
        {children}
        <RelatedWorkSection excludeId={id} />
      </article>
    </div>
  );
}

export function Chapter({ id, title, children }) {
  const classes = { p: "case-study__body", h3: "case-study__h3 mt-3", blockquote: "case-study__quote" };
  return <section id={id}><h2 className="case-study__h2">{title}</h2><div className="mt-5 flex flex-col gap-5">{Children.map(children, child => isValidElement(child) && classes[child.type] ? cloneElement(child, { className: classes[child.type] }) : child)}</div></section>;
}

export function Media({ src, alt, caption, concept = false }) {
  const dialog = useRef(null);
  return <figure className={`editorial-media ${concept ? "editorial-media--concept" : ""}`}>
    <button type="button" className="editorial-image-button" onClick={() => dialog.current.showModal()} aria-label={`Enlarge image: ${alt}`}><img src={src} alt={alt} loading="lazy" decoding="async" /><span className="editorial-enlarge" aria-hidden="true">↗</span></button>
    {caption && <figcaption>{concept && <span className="editorial-art-label">Concept illustration · </span>}{caption}</figcaption>}
    <dialog ref={dialog} className="editorial-lightbox" aria-label={alt} onClick={(event) => { if (event.target === event.currentTarget) dialog.current.close(); }}><button className="editorial-lightbox-close" type="button" onClick={() => dialog.current.close()} aria-label="Close enlarged image" autoFocus>Close ×</button><img src={src} alt={alt} /><p>{caption}</p></dialog>
  </figure>;
}

export function Note({ label = "The takeaway", children }) {
  return <aside className="editorial-note case-study__ui"><span>{label}</span><p>{children}</p></aside>;
}

export function Steps({ items }) {
  return <ol className="editorial-steps">{items.map(([title, body], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></li>)}</ol>;
}
