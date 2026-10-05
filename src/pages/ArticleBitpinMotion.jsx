import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import RelatedWorkSection from "../components/work/RelatedWorkSection.jsx";
import { useLenis } from "../hooks/useLenis.jsx";
import { ROUTES } from "../routes/paths.js";

const HERO_PIECES = [
  {
    id: "hero",
    title: "Hero motion",
    body: "A looping hero piece for Bitpin's product marketing surface — built to feel premium without slowing the page down.",
    src: "/videos/bitpin-motion/hero.mp4",
  },
  {
    id: "feature-loop",
    title: "Feature loop",
    body: "Another take on the website hero — a short product-feature loop compact enough to sit next to marketing copy.",
    src: "/videos/bitpin-motion/feature-loop.mp4",
  },
];

const MOBILE_PIECES = [
  {
    id: "app-banner",
    title: "App download banner",
    src: "/videos/bitpin-motion/app-banner.mp4",
  },
  {
    id: "enquiry",
    title: "Enquiry animation",
    src: "/videos/bitpin-motion/enquiry.mp4",
  },
];

const CAMPAIGN_PIECES = [
  {
    id: "btc-campaign",
    title: "BTC campaign",
    src: "/videos/bitpin-motion/btc-campaign.mp4",
  },
  {
    id: "nowruz",
    title: "Nowruz logomotion",
    src: "/videos/bitpin-motion/nowruz-logo.mp4",
  },
];

const SPLASH_PIECES = [
  {
    id: "splash",
    title: "Splash",
    src: "/videos/bitpin-motion/splash.mp4",
    startOffset: 0,
  },
  {
    id: "splash-full",
    title: "Splash full",
    src: "/videos/bitpin-motion/splash-full.mp4",
    startOffset: 1.4,
  },
  {
    id: "offline",
    title: "No connection",
    src: "/videos/bitpin-motion/splash-comp.mp4",
    startOffset: 0,
  },
];

function Section({ title, children }) {
  return (
    <section>
      <h2 className="case-study__h2">{title}</h2>
      <div className="mt-5 flex flex-col gap-5">{children}</div>
    </section>
  );
}

function Paragraph({ children }) {
  return <p className="case-study__body">{children}</p>;
}

function MetaItem({ label, value }) {
  return (
    <div
      className="case-study__ui h-full rounded-xl border border-[#E2E1DC] bg-white px-5 py-4"
      style={{ borderWidth: "0.5px" }}
    >
      <dt className="text-xs font-medium uppercase tracking-[0.06em] text-zinc-500">
        {label}
      </dt>
      <dd className="mt-1.5 text-xs leading-relaxed text-zinc-700">{value}</dd>
    </div>
  );
}

function DesktopFrame({ src, title }) {
  return (
    <div className="overflow-hidden rounded-[32px] border-[10px] border-[#D4D4D8] bg-[#D4D4D8]">
      <video
        src={src}
        title={title}
        className="block h-auto w-full"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
}

function MobileFrame({ src, title, startOffset = 0 }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !startOffset) return;

    const applyOffset = () => {
      if (!video.duration || Number.isNaN(video.duration)) return;
      video.currentTime = startOffset % video.duration;
    };

    video.addEventListener("loadedmetadata", applyOffset);
    if (video.readyState >= 1) applyOffset();

    return () => video.removeEventListener("loadedmetadata", applyOffset);
  }, [src, startOffset]);

  return (
    <div className="aspect-[39/85] w-full overflow-hidden rounded-[20px] border-[8px] border-[#D4D4D8] bg-[#D4D4D8]">
      <video
        ref={videoRef}
        src={src}
        title={title}
        className="block h-full w-full object-cover object-top"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
}

function SquareFrame({ src, title }) {
  return (
    <div className="aspect-square w-full max-w-[300px] overflow-hidden rounded-[20px] border-[6px] border-[#D4D4D8] bg-[#D4D4D8]">
      <video
        src={src}
        title={title}
        className="block h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
      />
    </div>
  );
}

export default function ArticleBitpinMotion() {
  const lenis = useLenis();

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
      return;
    }
    window.scrollTo(0, 0);
  }, [lenis]);

  return (
    <div className="min-h-screen">
      <article className="case-study mx-auto max-w-[748px] px-6 pb-20 pt-24 md:pt-28">
        <header className="mb-8 pb-6">
          <p className="case-study__eyebrow">Article · Bitpin · 2024</p>
          <h1 className="case-study__title mt-4">
            Motion at Bitpin: product and campaign loops
          </h1>
          <p className="case-study__deck mt-4">
            A selection of motion pieces I designed and shipped while at Bitpin —
            from splash and hero to campaign and seasonal identity.
          </p>

          <dl className="mt-6 grid gap-3 min-[600px]:grid-cols-3">
            <MetaItem label="Role" value="Motion design · Brand and product" />
            <MetaItem label="Company" value="Bitpin" />
            <MetaItem label="Timeframe" value="2023 – 2024 (placeholder)" />
          </dl>
        </header>

        <Section title="Overview">
          <Paragraph>
            Beyond product flows, a big part of my work at Bitpin was motion —
            short loops that carried the brand across the app, marketing pages,
            and seasonal campaigns. This page collects a few of those pieces.
            Titles and dates are placeholders for now; we&apos;ll refine the
            story as we go.
          </Paragraph>
        </Section>

        <Section title="Website hero">
          <Paragraph>
            Two desktop hero loops for the Bitpin website — same surface, different
            motion treatments.
          </Paragraph>
          {HERO_PIECES.map((piece) => (
            <div key={piece.id} className="flex flex-col gap-3">
              <p className="case-study__body font-semibold text-zinc-900">
                {piece.title}
              </p>
              <p className="case-study__body">{piece.body}</p>
              <figure className="case-study__ui my-2">
                <DesktopFrame src={piece.src} title={piece.title} />
              </figure>
            </div>
          ))}
        </Section>

        <Section title="In-product mobile motion">
          <Paragraph>
            Two mobile loops from inside the product: an app-download banner for
            acquisition surfaces, and a small enquiry moment that keeps support
            and deposit flows feeling responsive.
          </Paragraph>
          <div className="case-study__ui mx-auto grid max-w-[520px] grid-cols-2 gap-6 sm:gap-8">
            {MOBILE_PIECES.map((piece) => (
              <figure key={piece.id} className="flex min-w-0 flex-col gap-2">
                <p className="text-center text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500">
                  {piece.title}
                </p>
                <MobileFrame src={piece.src} title={piece.title} />
              </figure>
            ))}
          </div>
        </Section>

        <Section title="Campaign & seasonal motion">
          <Paragraph>
            Short square loops for campaign and seasonal moments — a Bitcoin push
            for growth surfaces, and a Nowruz logo treatment for the holiday.
          </Paragraph>
          <div className="case-study__ui flex flex-wrap items-start justify-center gap-6 sm:gap-8">
            {CAMPAIGN_PIECES.map((piece) => (
              <figure
                key={piece.id}
                className="flex w-full max-w-[300px] flex-col gap-2"
              >
                <p className="text-center text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500">
                  {piece.title}
                </p>
                <SquareFrame src={piece.src} title={piece.title} />
              </figure>
            ))}
          </div>
        </Section>

        <Section title="Splash & no connection">
          <Paragraph>
            App-open splash treatments and the offline empty state — brand beats
            for launch, plus a no-internet screen with retry when the connection
            drops. Splash playback is slightly offset so they don&apos;t hit the
            final logo hold at the same time.
          </Paragraph>
          <div className="case-study__ui grid w-full grid-cols-3 gap-3 sm:gap-4">
            {SPLASH_PIECES.map((piece) => (
              <figure key={piece.id} className="flex min-w-0 flex-col gap-2">
                <p className="text-center text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500">
                  {piece.title}
                </p>
                <MobileFrame
                  src={piece.src}
                  title={piece.title}
                  startOffset={piece.startOffset}
                />
              </figure>
            ))}
          </div>
        </Section>

        <RelatedWorkSection excludeId="bitpin-motion" />

        <p className="case-study__ui mt-12 text-center text-sm">
          <Link
            to={ROUTES.projects}
            className="text-zinc-600 underline underline-offset-2 transition-colors hover:text-zinc-900"
          >
            Back to projects
          </Link>
        </p>
      </article>
    </div>
  );
}
