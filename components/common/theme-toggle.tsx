"use client";

import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className="nb-border-sm nb-shadow-sm flex size-9 items-center justify-center rounded-lg bg-background transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_var(--nb-shadow)]"
    >
      <Icon icon="mdi:weather-sunny" className="size-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Icon icon="mdi:weather-night" className="absolute size-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
