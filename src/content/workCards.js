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
    id: "metriwo",
    filter: "project",
    tag: "Project · 2024",
    title: "Metriwo Landing Page",
    description:
      "Designing and building a SaaS landing page for a social media management tool.",
    href: "#",
    external: true,
    comingSoon: true,
    image: "/images/covers/price-signal.png",
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
    filter: "case-study",
    tag: "Case Study",
    title: "Quiet Checkout",
    description:
      "Removing four fields from a marketplace checkout and watching completion climb.",
    href: "#",
    external: true,
    comingSoon: true,
    image: "/images/covers/quiet-checkout.png",
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
