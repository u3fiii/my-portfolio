import { useInViewOnce } from "./viz.jsx";
import PhoneFrame from "../mockups/PhoneFrame.jsx";
import { SheypoorFeed } from "../mockups/sheypoor.jsx";

/** The same feed before and after the badge; tags pop in once in view. */
export default function SheypoorFeedComparison({ caption }) {
  const [ref, inView] = useInViewOnce(0.4);
  return (
    <figure ref={ref} className="cs-tray case-study__ui">
      <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
        <PhoneFrame width={210} label="Sheypoor listing feed before the price badge">
          <SheypoorFeed mono />
        </PhoneFrame>
        <span aria-hidden className="text-xl text-zinc-300 max-sm:rotate-90">
          →
        </span>
        <PhoneFrame width={210} label="The same feed with price badges on each listing">
          <SheypoorFeed tags={[null, null, "fairBlue", null, null, null, "veryHigh", null, null, "great", null, null, "high", null]} showTags={inView} autoplay />
        </PhoneFrame>
      </div>
      {caption ? <figcaption className="cs-viz__caption text-center">{caption}</figcaption> : null}
    </figure>
  );
}
