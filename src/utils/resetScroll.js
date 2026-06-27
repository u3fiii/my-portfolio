/** Force scroll to top — works with Lenis and native scroll. */
export function resetScroll(lenis) {
  if (lenis) {
    lenis.resize();
    lenis.scrollTo(0, { immediate: true, force: true });
  }

  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

/** Run reset after paint so new route content is measured. */
export function resetScrollAfterPaint(lenis) {
  resetScroll(lenis);

  requestAnimationFrame(() => {
    resetScroll(lenis);
    requestAnimationFrame(() => resetScroll(lenis));
  });

  return window.setTimeout(() => resetScroll(lenis), 50);
}
