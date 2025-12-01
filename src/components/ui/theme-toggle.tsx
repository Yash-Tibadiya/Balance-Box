"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useThemeTransition } from "@/hooks/use-theme-transition";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const { transitionTheme, triggerRef } = useThemeTransition({
    variant: "circle-blur",
    position: "top-right",
    duration: 500,
    blurAmount: 100,
  });

  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  const toggleTheme = () => {
    transitionTheme(() => {
      const newTheme = theme === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      setTheme(newTheme);
    });
  };

  return (
    <Button
      ref={triggerRef as React.RefObject<HTMLButtonElement>}
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
