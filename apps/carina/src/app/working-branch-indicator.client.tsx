"use client"

import dynamic from "next/dynamic"

const WorkingBranchIndicator = dynamic(
  () =>
    import("@repo/ui/working-branch-indicator").then(
      (mod) => mod.WorkingBranchIndicator
    ),
  { ssr: false }
)

export default function WorkingBranchIndicatorClient() {
  return <WorkingBranchIndicator />
}
