import { useEffect, useRef } from "react";
import CaseStudyLayout, { Chapter, P } from "../components/case-study/CaseStudyLayout.jsx";
import bitpinMotionThumbnail from "../assets/thumbnails/bitpin-motion-new.jpg";

const HERO_PIECES = [
  {
    id: "hero",
    title: "Hero motion",
    body: "A looping hero for Bitpin's marketing pages. It had to feel premium without making the page slow.",
    src: "/videos/bitpin-motion/hero.mp4",
  },
  {
    id: "feature-loop",
    title: "Feature loop",
    body: "A second idea for the website hero: a short loop about a product feature, small enough to sit next to text.",
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

function DesktopFrame({ src, title }) {
  return (
    <div className="overflow-hidden rounded-[clamp(16px,4vw,32px)] border-[clamp(5px,1.4vw,10px)] border-[#D4D4D8] bg-[#D4D4D8] dark:border-white/10 dark:bg-white/10">
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
    <div className="aspect-[39/85] w-full overflow-hidden rounded-[clamp(14px,3.5vw,20px)] border-[clamp(5px,1.25vw,8px)] border-[#D4D4D8] bg-[#D4D4D8] dark:border-white/10 dark:bg-white/10">
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
    <div className="aspect-square w-full max-w-[300px] overflow-hidden rounded-[clamp(14px,3vw,20px)] border-[clamp(4px,1vw,6px)] border-[#D4D4D8] bg-[#D4D4D8] dark:border-white/10 dark:bg-white/10">
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
  return (
    <CaseStudyLayout
      id="bitpin-motion"
      eyebrow="Article · Bitpin · 2024"
      title="Motion at Bitpin: product and campaign loops"
      deck="Motion pieces I designed and shipped at Bitpin — from splash and hero to campaigns and seasonal identity."
      role="Motion Design · Bitpin"
      cover={{
        src: bitpinMotionThumbnail,
        alt: "Bitpin motion article cover",
        width: 1536,
        height: 1024,
      }}
      meta={[
        ["Role", "Motion design"],
        ["Company", "Bitpin"],
        ["Timeframe", "2023 – 2024 (placeholder)"],
      ]}
    >
      <Chapter title="Motion at Bitpin" nav="Overview">
        <P>
          Besides product flows, a big part of my work at Bitpin was motion:
          short loops that carried the brand through the app, the website and
          seasonal campaigns. Here are a few of them. Some titles and dates are
          still placeholders.
        </P>
      </Chapter>

      <Chapter title="Website hero" nav="Website hero">
        <P>
          Two hero loops for the Bitpin website. Same place on the page, two
          different ideas.
        </P>
        {HERO_PIECES.map((piece) => (
          <div key={piece.id} className="flex flex-col gap-3">
            <p className="case-study__body font-semibold text-zinc-900">{piece.title}</p>
            <P>{piece.body}</P>
            <figure className="case-study__ui cs-tray my-2">
              <DesktopFrame src={piece.src} title={piece.title} />
            </figure>
          </div>
        ))}
      </Chapter>

      <Chapter title="Motion in the app" nav="In the app">
        <P>
          A banner that invites people to download the app, and a small
          animation that makes support and deposit screens feel alive while
          people wait.
        </P>
        <div className="cs-tray">
        <div className="case-study__ui mx-auto grid max-w-[420px] grid-cols-2 gap-6 sm:gap-8">
          {MOBILE_PIECES.map((piece) => (
            <figure key={piece.id} className="flex min-w-0 flex-col gap-2">
              <p className="text-center text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500">
                {piece.title}
              </p>
              <MobileFrame src={piece.src} title={piece.title} />
            </figure>
          ))}
        </div>
        </div>
      </Chapter>

      <Chapter title="Campaigns and holidays" nav="Campaigns">
        <P>
          Square loops for campaigns and holidays: a Bitcoin campaign, and an
          animated logo for Nowruz, the Persian new year.
        </P>
        <div className="cs-tray">
        <div className="case-study__ui flex flex-wrap items-start justify-center gap-6 sm:gap-8">
          {CAMPAIGN_PIECES.map((piece) => (
            <figure key={piece.id} className="flex w-full max-w-[300px] flex-col gap-2">
              <p className="text-center text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500">
                {piece.title}
              </p>
              <SquareFrame src={piece.src} title={piece.title} />
            </figure>
          ))}
        </div>
        </div>
      </Chapter>

      <Chapter title="Opening the app, and going offline" nav="Splash screens">
        <P>
          What people see when the app opens, and the screen they see when
          there is no internet, with a button to try again. The videos here
          start at slightly different times, so they don&apos;t all reach the
          logo together.
        </P>
        <div className="cs-tray">
        <div className="case-study__ui mx-auto grid w-full max-w-[600px] grid-cols-3 gap-3 sm:gap-4">
          {SPLASH_PIECES.map((piece) => (
            <figure key={piece.id} className="flex min-w-0 flex-col gap-2">
              <p className="text-center text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-500">
                {piece.title}
              </p>
              <MobileFrame src={piece.src} title={piece.title} startOffset={piece.startOffset} />
            </figure>
          ))}
        </div>
        </div>
      </Chapter>
    </CaseStudyLayout>
  );
}
