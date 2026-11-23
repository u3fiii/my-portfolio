import { workDetailPath } from "./paths.js";

export const pageLoaders = {
  "/work/:id": () => import("../pages/WorkDetailPage.jsx"),
  [workDetailPath("price-signal")]: () => import("../pages/CaseStudyPriceSignal.jsx"),
  [workDetailPath("bitpin-deposit")]: () => import("../pages/CaseStudyBitpinDeposit.jsx"),
  [workDetailPath("pindo-secure-purchase")]: () => import("../pages/CaseStudyPindoSecurePurchase.jsx"),
  [workDetailPath("bitpin-motion")]: () => import("../pages/ArticleBitpinMotion.jsx"),
  [workDetailPath("wallgold-bnpl")]: () => import("../pages/CaseStudyWallGoldBnpl.jsx"),
  [workDetailPath("wander")]: () => import("../pages/GameWander.jsx"),
  [workDetailPath("mote")]: () => import("../pages/GameMote.jsx"),
};

export function canPrefetchWork() {
  const connection = navigator.connection;
  return navigator.onLine &&
    !connection?.saveData &&
    !["slow-2g", "2g", "3g"].includes(connection?.effectiveType);
}

const prefetched = new Set();

export async function prefetchWork(path) {
  if (document.hidden || !canPrefetchWork() || prefetched.has(path)) return;
  const load = pageLoaders[path];
  if (!load) return;

  prefetched.add(path);
  try {
    await load();
  } catch {
    prefetched.delete(path);
  }
}
