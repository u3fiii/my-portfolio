import { useSyncExternalStore } from "react";

/**
 * Light/dark theme stored as a `.dark` class on <html>.
 * The site is light by default; a visitor's choice is saved and restored
 * before first paint by index.html. This hook reads and toggles it.
 */
const STORAGE_KEY = "theme";

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
  return () => observer.disconnect();
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
