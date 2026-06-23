import { PhoneColumn } from "./sheypoorListingFormMockup.jsx";

function ScreenImage({ src, alt }) {
  return (
    <img src={src} alt={alt} className="mx-auto block w-full max-w-[260px]" />
  );
}

export default function SheypoorFinalFormScreen() {
  return (
    <figure className="case-study__ui my-8">
      <div
        className="flex flex-wrap items-start justify-center"
        style={{ gap: "40px" }}
      >
        <PhoneColumn
          label="Seller — posting an ad"
          labelColor="#444450"
          caption="Price feedback before submit. When the seller enters a price that's too high, they see what tag the listing will get — while they can still change it."
          phone={
            <ScreenImage
              src="/images/case-studies/price-signal-screen-5.png"
              alt="Sheypoor listing form showing very high price warning before submit"
            />
          }
        />
        <PhoneColumn
          label="Buyer — browsing listings"
          labelColor="#444450"
          caption="Price tags on every listing in the feed. Buyers can tell at a glance whether a price looks fair."
          phone={
            <ScreenImage
              src="/images/case-studies/price-signal-screen-6.png"
              alt="Sheypoor listing feed with fair price and high price tags on car ads"
            />
          }
        />
      </div>
    </figure>
  );
}
