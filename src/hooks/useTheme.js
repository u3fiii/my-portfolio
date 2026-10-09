import { useSyncExternalStore } from "react";

/**
 * Light/dark theme stored as a `.dark` class on <html>.
 * index.html applies it before first paint; this hook reads and toggles it.
 * Without a saved choice the theme follows the OS setting, live.
 */
const STORAGE_KEY = "theme";
const systemDark = () =>
  window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;

function readSaved() {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "dark" || value === "light" ? value : null;
  } catch {
    return null;
  }
}

function apply(theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function subscribe(onChange) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  const media = window.matchMedia?.("(prefers-color-scheme: dark)");
  const onSystemChange = () => {
    if (!readSaved()) apply(systemDark() ? "dark" : "light");
  };
  media?.addEventListener("change", onSystemChange);

  return () => {
    observer.disconnect();
    media?.removeEventListener("change", onSystemChange);
  };
}

export function setTheme(theme) {
  apply(theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage blocked (private mode etc.) — the theme still applies for this visit.
  }
}

export default function useTheme() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, () => "light");
  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");
  return { theme, isDark: theme === "dark", setTheme, toggleTheme };
}
