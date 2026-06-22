import {
  FinalDesignPhone,
  PhoneColumn,
  SliderPhone,
} from "./sheypoorListingFormMockup.jsx";

export default function SheypoorFormComparison() {
  return (
    <figure className="case-study__ui my-8">
      <div
        className="flex flex-wrap items-start justify-center"
        style={{ gap: "40px" }}
      >
        <PhoneColumn
          label="Screen 3 — Slider concept"
          labelColor="#C0392B"
          badge="❌ Tested & abandoned"
          badgeStyle={{
            background: "#FDECEA",
            color: "#C0392B",
            borderColor: "#F5B3B3",
          }}
          caption="Users didn't understand what the slider was for."
          phone={<SliderPhone />}
        />
        <PhoneColumn
          label="Screen 4 — Final design"
          labelColor="#0099CC"
          badge="✓ Shipped"
          badgeStyle={{
            background: "#EEF6FF",
            color: "#0077A3",
            borderColor: "#99DAEF",
          }}
          caption="Price moved to last — pre-filled with fair estimate."
          phone={<FinalDesignPhone />}
        />
      </div>
    </figure>
  );
}
