"use client";

import { SunIcon } from "@heroicons/react/24/outline";
import { MoonIcon } from "@heroicons/react/24/outline";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Button that switches current theme between light and dark.
 * Dark mode is represented by a moon icon, and light mode by a sun icon.
 * Relies on [Providers](app\providers.tsx).
 */
export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();
  const iconClasses = "w-6 h-6";

  // Sets mounted to true when component is rendered on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Render placeholder if component is not mounted (current theme is unknown)
  if (!mounted) return <div className={iconClasses}></div>;

  const currentTheme = theme === "system" ? systemTheme : theme;

  // TODO add "System" option
  if (currentTheme === "dark") {
    return (
      <SunIcon
        data-testid="theme-switcher-sun"
        role="button"
        className={iconClasses + " text-neutral-300"}
        onClick={() => setTheme("light")}
      />
    );
  }

  return (
    <MoonIcon
      data-testid="theme-switcher-moon"
      role="button"
      className={iconClasses + " text-neutral-700"}
      onClick={() => setTheme("dark")}
    />
  );
}
