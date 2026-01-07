import { ThemeToggle } from "@repo/ui/theme-toggle"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background">
      <div className="fixed top-4 right-4">
        <ThemeToggle />
      </div>
      <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-foreground">
        Crux
      </h1>
    </main>
  )
}
