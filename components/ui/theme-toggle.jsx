"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "@/providers/theme-provider";

const options = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

export function ThemeToggle({ compact = false }) {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (event) => {
      if (!ref.current?.contains(event.target)) setOpen(false);
    };
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (compact) {
    return (
      <button
        type="button"
        className="icon-button theme-compact-toggle"
        onClick={toggleTheme}
        aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
        title={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
      >
        {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>
    );
  }

  return (
    <div className="theme-switcher" ref={ref}>
      <button
        type="button"
        className="icon-button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Theme settings"
        title="Theme settings"
      >
        {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      {open ? (
        <div className="theme-menu" role="menu" aria-label="Colour theme">
          <p className="theme-menu-label">Appearance</p>
          {options.map((option) => {
            const Icon = option.icon;
            const selected = theme === option.value;
            return (
              <button
                type="button"
                key={option.value}
                role="menuitemradio"
                aria-checked={selected}
                className={`theme-menu-item${selected ? " is-selected" : ""}`}
                onClick={() => {
                  setTheme(option.value);
                  setOpen(false);
                }}
              >
                <Icon size={16} />
                <span>{option.label}</span>
                {selected ? <Check size={15} className="theme-check" /> : null}
              </button>
            );
          })}
          <p className="theme-menu-note">Current: {resolvedTheme}</p>
        </div>
      ) : null}
    </div>
  );
}
