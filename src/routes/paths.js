/** URL helpers — use these instead of hard-coded paths. */

export const ROUTES = {
  home: "/",
  projects: "/#projects",
};

const CASE_STUDY_PATHS = {
  "price-signal": "/case-studies/price-signal",
  "bitpin-deposit": "/case-studies/bitpin-deposit",
};

export const CASE_STUDY_TITLES = {
  "price-signal": "Price Signal",
  "bitpin-deposit": "Bitpin — Deposit Flow Redesign",
};

export function workDetailPath(id) {
  return CASE_STUDY_PATHS[id] ?? `/work/${id}`;
}

export function caseStudyPath(slug) {
  return `/case-studies/${slug}`;
}
