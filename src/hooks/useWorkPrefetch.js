import { useEffect } from "react";
import { WORK_CARDS } from "../content/workCards.js";
import { canPrefetchWork, prefetchWork } from "../routes/pageLoaders.js";

const idleCandidates = WORK_CARDS
  .filter(({ external, comingSoon, filter }) => !external && !comingSoon && filter !== "game")
  .slice(0, 2);

const QUIET_PERIOD = 2500;

export default function useWorkPrefetch() {
  useEffect(() => {
    if (!canPrefetchWork()) return;

    let timer;
    let idle;
    let disposed = false;
    let next = 0;
    let loading = false;
    let lastInteraction = performance.now();
    const markInteraction = () => { lastInteraction = performance.now(); };

    function schedule() {
      if (disposed || loading || document.hidden || next >= idleCandidates.length) return;
      window.clearTimeout(timer);
      window.cancelIdleCallback?.(idle);
      const delay = Math.max(0, QUIET_PERIOD - (performance.now() - lastInteraction));
      timer = window.setTimeout(() => {
        if (window.requestIdleCallback) idle = window.requestIdleCallback(run);
        else run();
      }, delay);
    }

    async function run() {
      if (disposed || document.hidden || !canPrefetchWork()) return;
      if (performance.now() - lastInteraction < QUIET_PERIOD) {
        schedule();
        return;
      }

      loading = true;
      await prefetchWork(idleCandidates[next++].href);
      loading = false;
      lastInteraction = performance.now();
      schedule();
    }

    function start() {
      if (document.readyState !== "complete") return;
      markInteraction();
      schedule();
    }

    const inputEvents = ["scroll", "pointerdown", "keydown"];
    inputEvents.forEach((event) => window.addEventListener(event, markInteraction, { passive: true }));
    document.addEventListener("visibilitychange", start);
    window.addEventListener("load", start);
    start();

    return () => {
      disposed = true;
      window.clearTimeout(timer);
      window.cancelIdleCallback?.(idle);
      inputEvents.forEach((event) => window.removeEventListener(event, markInteraction));
      document.removeEventListener("visibilitychange", start);
      window.removeEventListener("load", start);
    };
  }, []);
}
