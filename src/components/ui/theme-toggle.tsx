"use client";

import type React from "react";
import { useEffect, useState } from "react";
// import { Moon, Sun } from "lucide-react";
import { MoonIcon } from "./moon";
import { SunIcon } from "./sun";
import { Button } from "@/components/ui/button";
import { useThemeTransition } from "@/hooks/use-theme-transition";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { transitionTheme, triggerRef } = useThemeTransition({
    variant: "circle-blur",
    position: "top-right",
    duration: 500,
    blurAmount: 100,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch: wait until mounted to read theme
  if (!mounted) return null;

  const currentTheme = theme === "system" ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  const toggleTheme = () => {
    transitionTheme(() => {
      setTheme(isDark ? "light" : "dark");
    });
  };

  return (
    <Button
      ref={triggerRef as React.RefObject<HTMLButtonElement>}
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <MoonIcon className="relative hidden after:absolute after:-inset-2 [html.dark_&]:block" />
      ) : (
        <SunIcon className="relative hidden after:absolute after:-inset-2 [html.light_&]:block" />
      )}
    </Button>
  );
}
