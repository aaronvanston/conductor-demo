"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "./cn"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex items-center gap-1 p-1 rounded-full bg-muted">
        <div className="w-8 h-8 rounded-full" />
        <div className="w-8 h-8 rounded-full" />
      </div>
    )
  }

  const isDark = theme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "relative flex items-center gap-1 p-1 rounded-full",
        "bg-muted transition-colors duration-200",
        "hover:bg-muted/80"
      )}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      <span
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200",
          !isDark && "bg-background shadow-sm"
        )}
      >
        <Sun
          className={cn(
            "h-4 w-4 transition-colors",
            !isDark ? "text-foreground" : "text-muted-foreground"
          )}
        />
      </span>
      <span
        className={cn(
          "flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200",
          isDark && "bg-background shadow-sm"
        )}
      >
        <Moon
          className={cn(
            "h-4 w-4 transition-colors",
            isDark ? "text-foreground" : "text-muted-foreground"
          )}
        />
      </span>
    </button>
  )
}
