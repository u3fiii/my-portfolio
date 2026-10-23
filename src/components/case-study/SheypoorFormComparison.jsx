import { Check, X } from "@phosphor-icons/react";
import PhoneFrame from "../mockups/PhoneFrame.jsx";
import { SheypoorForm } from "../mockups/sheypoor.jsx";
import { useInViewOnce } from "./viz.jsx";

/** Label above, phone, then a small status pill and one-line caption. */
function Column({ label, status, phone, caption }) {
  const shipped = status === "shipped";
  return (
    <div className="flex w-[230px] flex-col items-center">
      <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.08em] text-zinc-400">{label}</p>
      {phone}
      <span
        className="mt-5 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
        style={shipped ? { background: "#E8F1FD", color: "#2481ED" } : { background: "#FDECEF", color: "#D0425E" }}
      >
        {shipped ? <Check size={12} weight="bold" /> : <X size={12} weight="bold" />}
        {shipped ? "Shipped" : "Tested & dropped"}
      </span>
      <p className="mt-2 text-center text-[12px] leading-snug text-zinc-500">{caption}</p>
    </div>
  );
}

export default function SheypoorFormComparison() {
  const [ref, inView] = useInViewOnce(0.4);
  return (
    <figure ref={ref} className="case-study__ui cs-tray my-4">
      <div className="flex flex-wrap items-start justify-center gap-10">
        <Column
          label="Slider concept"
          status="dropped"
          caption="Sellers didn't understand what the slider was for."
          phone={
            <PhoneFrame width={210} label="Sheypoor listing form with price range slider concept">
              <SheypoorForm variant="slider" play={inView} />
            </PhoneFrame>
          }
        />
        <Column
          label="Final design"
          status="shipped"
          caption="Price moved to last, pre-filled with a fair estimate."
          phone={
            <PhoneFrame width={210} label="Sheypoor listing form final design with pre-filled fair price">
              <SheypoorForm variant="suggestion" play={inView} />
            </PhoneFrame>
          }
        />
      </div>
    </figure>
  );
}
