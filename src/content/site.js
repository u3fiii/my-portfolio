/**
 * Site-wide config: section IDs must match each section's `id` attribute.
 */

export const SITE = {
  logo: "Ali",
  /** Put your PDF in public/ (e.g. public/cv.pdf) and set the path here. */
  cvUrl: "/cv.pdf",
  cvLabel: "Download CV",
};

export const NAV_ITEMS = [
  { id: "me", label: "Me", icon: "me" },
  { id: "projects", label: "Projects", icon: "projects" },
  { id: "contact", label: "Contact", icon: "contact" },
];
