import { ThemeToggle } from "@repo/ui/theme-toggle";

export default function Home() {
  return (
    <div className="carina-shell">
      <div className="carina-content">
        <header className="carina-header">
          <ThemeToggle className="carina-toggle" />
        </header>

        <main className="carina-main">
          <h1 className="carina-title">Carina</h1>
        </main>
      </div>
    </div>
  );
}
