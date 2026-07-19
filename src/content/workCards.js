import { workDetailPath } from "../routes/paths.js";

/** Homepage work grid — single source for Projects section and related links. */
export const WORK_CARDS = [
  {
    id: "price-signal",
    filter: "case-study",
    tag: "Case Study · Sheypoor",
    title: "Price Signal",
    description:
      "How Sheypoor helped buyers and sellers find fair ground in a volatile market.",
    href: workDetailPath("price-signal"),
    external: false,
    comingSoon: false,
    image: "/images/covers/metriwo.png",
  },
  {
    id: "bitpin-deposit",
    filter: "case-study",
    tag: "Case Study · 2024",
    title: "Bitpin — Deposit Flow Redesign",
    description:
      "Rebuilding user trust in a payment flow after Iran's crypto exchanges lost access to payment gateways overnight.",
    href: workDetailPath("bitpin-deposit"),
    external: false,
    comingSoon: false,
    image: "/images/covers/quiet-checkout.png",
  },
  {
    id: "pindo-secure-purchase",
    filter: "case-study",
    tag: "Case Study · Pindo",
    title: "Pindo — Secure Purchase",
    description:
      "Making the invisible measurable: redesigning Pindo's escrow flow and growing successful completions from 10% to 23%.",
    href: workDetailPath("pindo-secure-purchase"),
    external: false,
    comingSoon: false,
    image: "/images/covers/design-the-default.png",
  },
  {
    id: "bitpin-motion",
    filter: "article",
    tag: "Article · Bitpin",
    title: "Bitpin — Motion",
    description:
      "Product and campaign motion loops I designed at Bitpin — hero, splash, banners, and seasonal identity.",
    href: workDetailPath("bitpin-motion"),
    external: false,
    comingSoon: false,
    image: "/images/covers/bitpin-motion.png",
  },
  {
    id: "verified-listings",
    filter: "case-study",
    tag: "Case Study",
    title: "Verified Listings",
    description:
      "A trust badge that cut scam reports — and why we almost shipped the wrong version.",
    href: "#",
    external: true,
    comingSoon: true,
    image: "/images/covers/verified-listings.png",
  },
  {
    id: "quiet-checkout",
    filter: "project",
    tag: "Project",
    title: "Quiet Checkout",
    description:
      "Removing four fields from a marketplace checkout and watching completion climb.",
    href: "#",
    external: true,
    comingSoon: true,
    image: "/images/covers/price-signal.png",
  },
];

export function getRelatedWorkCards(excludeId, limit = 3) {
  return WORK_CARDS.filter((card) => card.id !== excludeId).slice(0, limit);
}
