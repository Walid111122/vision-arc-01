"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Magnetic } from "./Magnetic";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Ensure component is mounted to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8" />; // Placeholder
  }

  const isDark = theme === "dark";

  return (
    <Magnetic strength={0.3}>
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className="flex items-center justify-center w-8 h-8 rounded-full transition-colors"
        aria-label="Toggle Theme"
      >
        {isDark ? (
          <Sun size={18} style={{ color: "var(--va-ink)" }} className="hover:text-[var(--va-accent)] transition-colors" />
        ) : (
          <Moon size={18} style={{ color: "var(--va-ink)" }} className="hover:text-[var(--va-accent)] transition-colors" />
        )}
      </button>
    </Magnetic>
  );
}
