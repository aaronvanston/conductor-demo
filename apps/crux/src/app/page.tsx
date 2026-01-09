import { ThemeToggle } from "@repo/ui/theme-toggle";

export default function Home() {
  return (
    <div className="crux-shell">
      <div className="crux-content">
        <header className="crux-header">
          <ThemeToggle className="crux-toggle" />
        </header>

        <main className="crux-main">
          <h1 className="crux-title">Crux</h1>
        </main>
      </div>
    </div>
  );
}
