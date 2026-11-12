"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "vee-theme";
const ThemeContext = createContext(null);

function getSystemTheme() {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function resolveTheme(theme) {
  return theme === "system" ? getSystemTheme() : theme;
}

function applyTheme(resolved) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = resolved;
  document.documentElement.style.colorScheme = resolved;
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState("system");
  const [resolved, setResolved] = useState("light");

  useEffect(() => {
    let stored = "system";
    try {
      stored = window.localStorage.getItem(STORAGE_KEY) || "system";
    } catch {
      stored = "system";
    }
    if (!["light", "dark", "system"].includes(stored)) stored = "system";
    const nextResolved = resolveTheme(stored);
    setThemeState(stored);
    setResolved(nextResolved);
    applyTheme(nextResolved);

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const current = window.localStorage.getItem(STORAGE_KEY) || "system";
      if (current === "system") {
        const value = getSystemTheme();
        setResolved(value);
        applyTheme(value);
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const setTheme = useCallback((nextTheme) => {
    if (!["light", "dark", "system"].includes(nextTheme)) return;
    const nextResolved = resolveTheme(nextTheme);
    setThemeState(nextTheme);
    setResolved(nextResolved);
    applyTheme(nextResolved);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme);
    } catch {
      // Storage can be unavailable in privacy modes. The UI still updates.
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(resolved === "dark" ? "light" : "dark");
  }, [resolved, setTheme]);

  const value = useMemo(
    () => ({ theme, resolvedTheme: resolved, setTheme, toggleTheme }),
    [theme, resolved, setTheme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
