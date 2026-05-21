/**
 * All work items: card data + full page content.
 * `id` is used in the URL: /work/{id}
 */

export const PROJECTS_HEADING = "Work";
export const PROJECTS_DESCRIPTION =
  "Projects, articles, and case studies from product and design practice.";

export const FILTER_OPTIONS = [
  { id: "all", label: "All" },
  { id: "project", label: "Projects" },
  { id: "article", label: "Articles" },
  { id: "case-study", label: "Case studies" },
];

export const TAG_LABELS = {
  project: "Project",
  article: "Article",
  "case-study": "Case study",
};

/** @typedef {"paragraph"|"heading"|"image"} BlockType */

/**
 * @typedef {Object} ContentBlock
 * @property {BlockType} type
 * @property {string} [text]
 * @property {string} [src]
 * @property {string} [alt]
 * @property {string} [caption]
 */

/**
 * @typedef {Object} WorkItem
 * @property {string} id
 * @property {string} title
 * @property {string} subtitle
 * @property {"project"|"article"|"case-study"} tag
 * @property {string} thumbnail — card image (put files in public/images/work/)
 * @property {ContentBlock[]} body
 */

/** Placeholder helper — replace with /images/work/your-file.jpg when ready. */
function thumb(label) {
  return `https://placehold.co/800x450/e4e4e7/52525b?text=${encodeURIComponent(label)}`;
}

/** @type {WorkItem[]} */
export const WORK_ITEMS = [
  {
    id: "banking-app-redesign",
    title: "Banking app redesign",
    subtitle: "Mobile flows, design system, and usability testing.",
    tag: "project",
    thumbnail: thumb("Banking app"),
    body: [
      {
        type: "paragraph",
        text: "A full redesign of core mobile banking flows with a focus on clarity for everyday tasks—balances, transfers, and card controls.",
      },
      {
        type: "image",
        src: "https://placehold.co/960x540/e4e4e7/52525b?text=Banking+app",
        alt: "Banking app screens",
        caption: "Early wireframes exploring hierarchy and spacing.",
      },
      {
        type: "heading",
        text: "Outcome",
      },
      {
        type: "paragraph",
        text: "Shipped a token-based UI kit and reduced task completion time in usability tests by simplifying navigation and feedback states.",
      },
      {
        type: "image",
        src: "https://placehold.co/960x540/e4e4e7/52525b?text=Banking+app",
        alt: "Banking app screens",
        caption: "Early wireframes exploring hierarchy and spacing.",
      },
    ],
  },
  {
    id: "hierarchy-beats-decoration",
    title: "Why hierarchy beats",
    subtitle: "Notes on structuring interfaces for clarity.",
    tag: "article",
    thumbnail: thumb("Typography"),
    body: [
      {
        type: "paragraph",
        text: "Visual polish matters, but users navigate with structure first. Type scale, spacing, and grouping do more work than ornamental detail.",
      },
      {
        type: "heading",
        text: "Practical checks",
      },
      {
        type: "paragraph",
        text: "Can someone scan the screen in five seconds and name the primary action? If not, decoration is probably masking weak hierarchy.",
      },
      {
        type: "image",
        src: "https://placehold.co/960x540/f4f4f5/52525b?text=Typography+scale",
        alt: "Type scale comparison",
      },
    ],
  },
  {
    id: "saas-onboarding-audit",
    title: "SaaS onboarding audit",
    subtitle: "Research, journey maps, and recommended patterns.",
    tag: "case-study",
    thumbnail: thumb("Journey map"),
    body: [
      {
        type: "paragraph",
        text: "Reviewed signup-to-activation for a B2B SaaS product. Mapped drop-off points and compared against onboarding patterns from comparable tools.",
      },
      {
        type: "image",
        src: "https://placehold.co/960x540/e4e4e7/52525b?text=Journey+map",
        alt: "Customer journey map",
        caption: "Simplified journey used in stakeholder workshops.",
      },
      {
        type: "paragraph",
        text: "Recommendations centered on progressive disclosure, a single success metric per session, and in-product guidance instead of long tours.",
      },
    ],
  },
  {
    id: "travel-booking",
    title: "Travel booking experience",
    subtitle: "End-to-end UX for search, compare, and checkout.",
    tag: "project",
    thumbnail: thumb("Travel booking"),
    body: [
      {
        type: "paragraph",
        text: "Designed search, comparison, and checkout for a travel aggregator. Emphasis on scannable results and transparent pricing.",
      },
      {
        type: "image",
        src: "https://placehold.co/960x540/e4e4e7/52525b?text=Travel+search",
        alt: "Travel search results",
      },
      {
        type: "paragraph",
        text: "Collaborated with engineering on responsive layouts and loading states so perceived performance stayed high on slower connections.",
      },
    ],
  },
  {
    id: "motion-in-product-ui",
    title: "Motion in product UI",
    subtitle: "When animation helps—and when it gets in the way.",
    tag: "article",
    thumbnail: thumb("Motion UI"),
    body: [
      {
        type: "paragraph",
        text: "Motion should explain change: what moved, what opened, what completed. Decorative motion without meaning adds latency and noise.",
      },
      {
        type: "heading",
        text: "Guidelines I use",
      },
      {
        type: "paragraph",
        text: "Keep durations short, respect reduced-motion preferences, and never block input while an animation plays unless it is essential feedback.",
      },
    ],
  },
  {
    id: "healthcare-portal",
    title: "Healthcare portal",
    subtitle: "Accessibility, forms, and role-based dashboards.",
    tag: "case-study",
    thumbnail: thumb("Healthcare"),
    body: [
      {
        type: "paragraph",
        text: "Patients and clinicians needed different views of the same data. We separated roles while keeping a shared design language.",
      },
      {
        type: "image",
        src: "https://placehold.co/960x540/f4f4f5/52525b?text=Healthcare+dashboard",
        alt: "Healthcare dashboard",
      },
      {
        type: "paragraph",
        text: "Form flows were tested with keyboard-only navigation and screen readers. Error messages were rewritten in plain language.",
      },
    ],
  },
  {
    id: "portfolio-site",
    title: "Portfolio site",
    subtitle: "Personal brand, layout, and component library.",
    tag: "project",
    thumbnail: thumb("Portfolio"),
    body: [
      {
        type: "paragraph",
        text: "This site—built with React, Vite, and Tailwind. Structured for maintainability: content in one place, sections and pages separated.",
      },
      {
        type: "image",
        src: "https://placehold.co/960x540/e4e4e7/52525b?text=Portfolio+layout",
        alt: "Portfolio layout",
      },
    ],
  },
  {
    id: "design-dev-handoff",
    title: "Design–dev handoff",
    subtitle: "Specs, tokens, and keeping teams aligned.",
    tag: "article",
    body: [
      {
        type: "paragraph",
        text: "Handoff fails when tokens, states, and edge cases live only in a designer’s head. Documentation should be part of the design process.",
      },
      {
        type: "heading",
        text: "What to include",
      },
      {
        type: "paragraph",
        text: "Component anatomy, spacing rules, interaction states, and links to prototypes. Developers should not have to guess intent from static frames alone.",
      },
    ],
  },
];

export function getWorkItemById(id) {
  return WORK_ITEMS.find((item) => item.id === id);
}
