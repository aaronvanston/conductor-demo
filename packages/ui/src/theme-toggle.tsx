"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "./cn"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div
        className={cn(
          "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80",
          className
        )}
      />
    )
  }

  const isDark = theme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full",
        "border border-border bg-card/80",
        "text-muted-foreground transition-colors",
        "hover:text-foreground hover:bg-accent",
        className
      )}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
