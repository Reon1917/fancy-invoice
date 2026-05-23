import Link from "next/link";
import { templates } from "./data";

export default function TemplatesPage() {
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <header className="app-header">
        <Link href="/" className="font-semibold">
          Ledger Atelier
        </Link>
        <nav className="flex items-center gap-2">
          <Link className="nav-link" href="/">
            Home
          </Link>
          <Link className="nav-link dark" href="/create">
            Create
          </Link>
        </nav>
      </header>

      <section className="page-intro">
        <p>Template systems</p>
        <h1>Start with a regional invoice language, then customize later.</h1>
      </section>

      <section className="template-grid">
        {templates.map((template) => (
          <article className="template-card" data-tone={template.tone} key={template.id}>
            <div className="template-preview">
              <div className="flex items-start justify-between">
                <span className="template-code">{template.code}</span>
                <span className="text-xs uppercase tracking-[0.2em] opacity-50">
                  {template.density}
                </span>
              </div>
              <div className="mt-8 space-y-2">
                <span className="block h-2 w-2/3 bg-current/80" />
                <span className="block h-2 w-1/2 bg-current/30" />
              </div>
              <div className="mt-8 space-y-2">
                {Array.from({ length: template.tone === "dense" ? 10 : 6 }).map((_, index) => (
                  <div className="grid grid-cols-[1fr_40px] gap-2" key={index}>
                    <span className="h-2 bg-current/15" />
                    <span className="h-2 bg-current/25" />
                  </div>
                ))}
              </div>
            </div>
            <div className="p-5">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--muted)]">
                {template.origin}
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-[-0.035em]">
                {template.name}
              </h2>
              <p className="mt-3 min-h-20 text-sm leading-6 text-[var(--soft)]">
                {template.summary}
              </p>
              <div className="mt-5 flex items-center justify-between gap-4 border-t border-[var(--line)] pt-4 text-sm">
                <span>{template.bestFor}</span>
                <Link className="text-link" href={`/create?template=${template.id}`}>
                  Use
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
