import { workDetailPath } from "../routes/paths.js";
import bitpinMotionThumbnail from "../assets/thumbnails/Bitpin motion.png";
import escrowThumbnail from "../assets/thumbnails/escrow.png";
import priceSignalThumbnail from "../assets/thumbnails/price-signal.png";
import rialDepositThumbnail from "../assets/thumbnails/Rial Deposit.png";

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
    image: priceSignalThumbnail,
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
    image: rialDepositThumbnail,
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
    image: escrowThumbnail,
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
    image: bitpinMotionThumbnail,
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
    id: "designing-for-low-trust",
    filter: "article",
    tag: "Article",
    title: "Designing for Low Trust",
    description:
      "Notes on building products for users who expect the system to fail them — and how small signals earn it back.",
    href: "#",
    external: true,
    comingSoon: true,
    image: "/images/covers/designing-for-low-trust.jpg",
  },
  {
    id: "icon-system",
    filter: "project",
    tag: "Project · Side Project",
    title: "Open Icon Set",
    description:
      "A 400-icon open-source set built on a strict 24px grid, with RTL-aware variants for Persian interfaces.",
    href: "#",
    external: true,
    comingSoon: true,
    image: "/images/covers/open-icon-set.jpg",
  },
];

export function getRelatedWorkCards(excludeId, limit = 3) {
  return WORK_CARDS.filter((card) => card.id !== excludeId).slice(0, limit);
}
