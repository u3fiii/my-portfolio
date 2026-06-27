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
  {
    id: "design-the-default",
    filter: "article",
    tag: "Article",
    title: "Design the Default",
    description:
      "Pre-selection is a design decision with ethics. Here's how to think about it.",
    href: "#",
    external: true,
    comingSoon: true,
    image: "/images/covers/design-the-default.png",
  },
  {
    id: "prototype-before-meeting",
    filter: "article",
    tag: "Article",
    title: "Prototype Before the Meeting",
    description:
      "Why I stopped bringing slides to stakeholder reviews — and what I do instead.",
    href: "#",
    external: true,
    comingSoon: true,
    image: "/images/covers/prototype-before-meeting.png",
  },
];

export function getRelatedWorkCards(excludeId, limit = 3) {
  return WORK_CARDS.filter((card) => card.id !== excludeId).slice(0, limit);
}
