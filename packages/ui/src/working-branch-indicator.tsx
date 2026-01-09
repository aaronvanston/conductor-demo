"use client"

import { Check, ChevronDown, X } from "lucide-react"
import { useState } from "react"
import { cn } from "./cn"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"

const STORAGE_KEY_PREFIX = "dev-workspace-dismissed-"
const PORT_NUMBER_REGEX = /^[0-9]+$/

const getBranchName = () =>
  process.env.NEXT_PUBLIC_WORKING_BRANCH ||
  process.env.NEXT_PUBLIC_GIT_BRANCH ||
  process.env.NEXT_PUBLIC_BRANCH_NAME ||
  process.env.NEXT_PUBLIC_WORKSPACE_NAME ||
  process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF ||
  ""

const rawAppPorts = process.env.NEXT_PUBLIC_APP_PORTS || process.env.APP_PORTS || ""

const parseAppPorts = (value: string) =>
  value
    .split(",")
    .map((pair) => {
      const [name, port] = pair.split(":").map((item) => item.trim())
      if (!(name && port && PORT_NUMBER_REGEX.test(port))) {
        return null
      }
      return { name, port }
    })
    .filter((entry): entry is { name: string; port: string } => entry !== null)

const getInitialDismissed = (storageKey: string) => {
  if (typeof window === "undefined") {
    return false
  }

  try {
    return localStorage.getItem(storageKey) === "true"
  } catch {
    return false
  }
}

export function WorkingBranchIndicator() {
  const branchName = getBranchName()
  const storageKey = `${STORAGE_KEY_PREFIX}${branchName}`
  const appPorts = parseAppPorts(rawAppPorts)
  const [isDismissed, setIsDismissed] = useState(() => getInitialDismissed(storageKey))
  const currentPort = typeof window === "undefined" ? null : window.location.port || null

  const isPreviewEnv = process.env.NEXT_PUBLIC_VERCEL_ENV === "preview"

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

  if (isDismissed) {
    return null
  }

  return (
    <div className={cn("fixed top-0 left-0 z-50", "flex items-center", "select-none")}>
      {appPorts.length > 0 ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              aria-label="Open app switcher"
              className={cn(
                "inline-flex items-center gap-1.5",
                "font-mono text-[11px]",
                "text-muted-foreground/50",
                "px-1.5 py-0.5",
                "hover:text-muted-foreground/80",
                "transition-colors"
              )}
              type="button"
            >
              {branchName}
              <ChevronDown className="h-3 w-3" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {appPorts.map(({ name, port }) => {
              const isCurrent = currentPort === port
              return (
                <DropdownMenuItem
                  className={cn(
                    "flex items-center justify-between gap-2 font-mono text-[11px]",
                    isCurrent && "text-muted-foreground"
                  )}
                  disabled={isCurrent}
                  key={`${name}:${port}`}
                  onSelect={(event) => {
                    if (isCurrent) {
                      return
                    }
                    event.preventDefault()
                    if (typeof window === "undefined") {
                      return
                    }
                    window.location.assign(
                      `${window.location.protocol}//${window.location.hostname}:${port}`
                    )
                  }}
                >
                  <span>
                    {name}:{port}
                  </span>
                  {isCurrent ? <Check className="h-3 w-3 opacity-70" /> : null}
                </DropdownMenuItem>
              )
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <span className={cn("font-mono text-[11px]", "text-muted-foreground/50", "px-1.5 py-0.5")}>
          {branchName}
        </span>
      )}

      <button
        aria-label="Dismiss working branch indicator"
        className={cn(
          "rounded p-0.5",
          "text-muted-foreground/40 hover:text-muted-foreground/70",
          "hover:bg-muted/50",
          "transition-colors"
        )}
        onClick={handleDismiss}
        type="button"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  )
}
