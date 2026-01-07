import { ThemeToggle } from "@repo/ui/theme-toggle"

export default function Home() {
  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-background">
      <div className="relative z-10 flex min-h-[100dvh] flex-col">
        <header className="absolute right-6 top-6">
          <ThemeToggle />
        </header>

        <main className="flex flex-1 items-center justify-center">
          <h1 className="text-[44px] sm:text-[88px] font-normal text-foreground">
            Carina
          </h1>
        </main>
      </div>
    </div>
  )
}
