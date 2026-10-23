import PhoneFrame from "../mockups/PhoneFrame.jsx";
import { SheypoorFeed, SheypoorForm } from "../mockups/sheypoor.jsx";
import { PhoneColumn } from "./sheypoorListingFormMockup.jsx";

export default function SheypoorFinalFormScreen() {
  return (
    <figure className="case-study-artwork case-study__ui cs-tray my-4">
      <div
        className="flex flex-wrap items-start justify-center"
        style={{ gap: "40px" }}
      >
        <PhoneColumn
          label="Seller — posting an ad"
          labelColor="#444450"
          caption="Price feedback before submit. When the seller enters a price that's too high, they see what tag the listing will get — while they can still change it."
          phone={
            <PhoneFrame width={210} label="Sheypoor listing form showing very high price warning before submit">
              <SheypoorForm variant="warning" />
            </PhoneFrame>
          }
        />
        <PhoneColumn
          label="Buyer — browsing listings"
          labelColor="#444450"
          caption="Price tags on every listing in the feed. Buyers can tell at a glance whether a price looks fair."
          phone={
            <PhoneFrame width={210} label="Sheypoor listing feed with fair price and high price tags on car ads">
              <SheypoorFeed tags={["fair", null, "veryHigh", "high", null, "fair", null, "veryHigh"]} />
            </PhoneFrame>
          }
        />
      </div>
    </figure>
  );
}
