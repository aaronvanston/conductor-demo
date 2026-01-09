import { ThemeToggle } from "@repo/ui/theme-toggle";

export default function Home() {
  return (
    <div className="hydrus-shell">
      <div className="hydrus-content">
        <header className="hydrus-header">
          <ThemeToggle className="hydrus-toggle" />
        </header>

        <main className="hydrus-main">
          <h1 className="hydrus-title">Hydrus</h1>
        </main>
      </div>
    </div>
  );
}
