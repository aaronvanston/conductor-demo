import { ThemeToggle } from "@repo/ui/theme-toggle"

export default function Home() {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-background">
      <div className="relative z-10 flex min-h-[100dvh] flex-col">
        <header className="absolute top-6 right-6">
          <ThemeToggle />
        </header>

        <main className="flex flex-1 items-center justify-center">
          <h1 className="font-normal text-[44px] text-foreground sm:text-[88px]">Hydrus</h1>
        </main>
      </div>
    </div>
  )
}
