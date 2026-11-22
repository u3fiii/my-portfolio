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
    image: "/images/work/scenes/price-signal.webp",
  },
  {
    id: "bitpin-deposit",
    filter: "case-study",
    tag: "Case Study · 2024",
    title: "Deposit Flow",
    description:
      "How Bitpin's first usability study revealed a trust gap shaped outside the product.",
    href: workDetailPath("bitpin-deposit"),
    external: false,
    comingSoon: false,
    image: "/images/work/scenes/deposit-flow.webp",
  },
  {
    id: "pindo-secure-purchase",
    filter: "case-study",
    tag: "Case Study · Pindo",
    title: "Secure Purchase",
    description:
      "Making the invisible measurable: redesigning Pindo's escrow flow and growing successful completions from 10% to 23%.",
    href: workDetailPath("pindo-secure-purchase"),
    external: false,
    comingSoon: false,
    image: "/images/work/scenes/secure-purchase.webp",
  },
  {
    id: "bitpin-motion",
    filter: "article",
    tag: "Article · Bitpin",
    title: "Motion Loops",
    description:
      "Product and campaign motion loops I designed at Bitpin — hero, splash, banners, and seasonal identity.",
    href: workDetailPath("bitpin-motion"),
    external: false,
    comingSoon: false,
    image: "/images/work/scenes/motion-loops.webp",
  },
  {
    id: "wander",
    filter: "game",
    tag: "Game · Web / Three.js",
    title: "Wander",
    description: "An arcade drive around a tiny living planet, built for keyboard, touch and gamepad.",
    href: workDetailPath("wander"),
    external: false,
    comingSoon: false,
    image: "/images/games/wander-editorial.jpg",
  },
  {
    id: "mote",
    filter: "game",
    tag: "Game · Godot",
    title: "Mote",
    description: "A small silhouette platformer about movement, atmosphere and a shifting world of colour.",
    href: workDetailPath("mote"),
    external: false,
    comingSoon: false,
    image: "/images/games/lana-editorial.jpg",
  },
  {
    id: "designing-for-low-trust",
    filter: "article",
    tag: "Article",
    title: "Designing for Low Trust",
    description:
      "Notes on building products for users who expect the system to fail them — and how small signals earn it back.",
    href: "#",
    external: true,
    comingSoon: true,
    image: "/images/work/scenes/low-trust.webp",
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
    image: "/images/work/scenes/verified-listings.webp",
  },

];

export function getRelatedWorkCards(excludeId, limit = 3) {
  return WORK_CARDS.filter((card) => card.id !== excludeId).slice(0, limit);
}
