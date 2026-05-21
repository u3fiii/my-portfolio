/** URL helpers — use these instead of hard-coded paths. */

export const ROUTES = {
  home: "/",
  projects: "/#projects",
};

export function workDetailPath(id) {
  return `/work/${id}`;
}
