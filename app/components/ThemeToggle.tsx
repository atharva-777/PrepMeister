"use client";

import React from "react";
import { HiMoon, HiSun } from "react-icons/hi";
import { useThemeMode } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeMode();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-5 right-5 z-[100] inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/90 px-3 py-2 text-sm font-medium text-slate-700 shadow-lg backdrop-blur transition hover:bg-white dark:border-slate-700 dark:bg-slate-900/90 dark:text-slate-100"
      aria-label="Toggle theme"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? <HiSun className="text-amber-400" size={18} /> : <HiMoon size={18} />}
      <span>{isDark ? "Light" : "Dark"}</span>
    </button>
  );
};

export default ThemeToggle;
