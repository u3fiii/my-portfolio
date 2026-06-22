import {
  FinalDesignPhone,
  PhoneMockupFooter,
  SHIPPED_BADGE,
} from "./sheypoorListingFormMockup.jsx";

export default function SheypoorFinalFormScreen() {
  return (
    <figure className="case-study__ui my-8 flex flex-col items-center">
      <FinalDesignPhone />
      <PhoneMockupFooter
        badge="✓ Shipped"
        badgeStyle={SHIPPED_BADGE}
        caption="Price moved to last — pre-filled with fair estimate."
      />
    </figure>
  );
}
