"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "./cn"

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={cn("h-9 w-9", className)} />
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      aria-label="Toggle theme"
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card/80 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
        className
      )}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      type="button"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
