"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { cn } from "./cn"

const STORAGE_KEY_PREFIX = "dev-workspace-dismissed-"

const getBranchName = () =>
  process.env.NEXT_PUBLIC_WORKING_BRANCH ||
  process.env.NEXT_PUBLIC_GIT_BRANCH ||
  process.env.NEXT_PUBLIC_BRANCH_NAME ||
  process.env.NEXT_PUBLIC_WORKSPACE_NAME ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  ""

export function WorkingBranchIndicator() {
  const [isDismissed, setIsDismissed] = useState(true)
  const [mounted, setMounted] = useState(false)

  const branchName = getBranchName()
  const storageKey = `${STORAGE_KEY_PREFIX}${branchName}`

  const isPreviewEnv = process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"

  useEffect(() => {
    setMounted(true)
    try {
      const dismissed = localStorage.getItem(storageKey)
      setIsDismissed(dismissed === "true")
    } catch {
      setIsDismissed(false)
    }
  }, [storageKey])

  if (process.env.NODE_ENV !== "development" && !isPreviewEnv) {
    return null
  }

  if (!branchName) {
    return null
  }

  const handleDismiss = () => {
    setIsDismissed(true)
    try {
      localStorage.setItem(storageKey, "true")
    } catch {
      // Ignore localStorage errors
    }
  }

  if (!mounted || isDismissed) {
    return null
  }

  return (
    <div className={cn("fixed top-0 left-0 z-10", "flex items-center", "select-none group")}>
      <span
        className={cn(
          "text-[11px] font-mono",
          "text-muted-foreground/40",
          "px-1.5 py-0.5"
        )}
      >
        {branchName}
      </span>
      <button
        onClick={handleDismiss}
        className={cn(
          "p-0.5 rounded",
          "text-muted-foreground/30 hover:text-muted-foreground/60",
          "hover:bg-muted/50",
          "transition-opacity opacity-0 group-hover:opacity-100",
          "hover:opacity-100 focus-visible:opacity-100 group-focus-within:opacity-100"
        )}
        aria-label="Dismiss working branch indicator"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  )
}
