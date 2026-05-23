import Link from "next/link";
import { templates } from "./templates/data";

export default function Home() {
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <section className="grid min-h-[72vh] border-b border-[var(--line)] lg:grid-cols-[1.02fr_0.98fr]">
        <div className="flex flex-col justify-between px-6 py-6 sm:px-10 lg:px-14">
          <nav className="flex items-center justify-between text-sm">
            <Link href="/" className="font-semibold tracking-[-0.01em]">
              Ledger Atelier
            </Link>
            <div className="flex items-center gap-2">
              <Link className="nav-link" href="/templates">
                Templates
              </Link>
              <Link className="nav-link dark" href="/create">
                Create
              </Link>
            </div>
          </nav>

          <div className="max-w-3xl py-16 sm:py-24">
            <p className="mb-5 text-sm font-medium uppercase tracking-[0.24em] text-[var(--muted)]">
              Invoice creator for serious operators
            </p>
            <h1 className="balance max-w-4xl text-5xl font-semibold leading-[0.95] tracking-[-0.055em] sm:text-7xl lg:text-8xl">
              Build invoices that match the way your business works.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[var(--soft)]">
              Upload a company logo, choose from opinionated invoice systems,
              and start with a data model that is ready for saved clients,
              reusable settings, custom fields, and deeper template controls.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link className="button-primary" href="/create">
                Start an invoice
              </Link>
              <Link className="button-secondary" href="/templates">
                Browse templates
              </Link>
            </div>
          </div>

          <div className="grid gap-3 pb-4 text-sm text-[var(--soft)] sm:grid-cols-3">
            <span>Logo upload</span>
            <span>Template-first workflow</span>
            <span>Draft-ready architecture</span>
          </div>
        </div>

        <div className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--charcoal)] p-5 lg:border-l lg:border-t-0">
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(var(--grid)_1px,transparent_1px),linear-gradient(90deg,var(--grid)_1px,transparent_1px)] [background-size:28px_28px]" />
          <div className="relative mx-auto flex h-full max-w-xl items-center">
            <div className="invoice-fan">
              {templates.slice(0, 3).map((template, index) => (
                <article
                  className="hero-sheet"
                  data-tone={template.tone}
                  key={template.id}
                  style={{ "--shift": index } as React.CSSProperties}
                >
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-current/50">
                        {template.origin}
                      </p>
                      <h2 className="mt-3 text-2xl font-semibold tracking-[-0.04em]">
                        {template.name}
                      </h2>
                    </div>
                    <span className="invoice-mark">{template.code}</span>
                  </div>
                  <div className="mt-10 grid gap-2">
                    <span className="h-2 w-3/4 bg-current/80" />
                    <span className="h-2 w-1/2 bg-current/35" />
                  </div>
                  <div className="mt-8 grid gap-2">
                    {Array.from({ length: index === 2 ? 8 : 5 }).map((_, i) => (
                      <div className="grid grid-cols-[1fr_48px] gap-2" key={i}>
                        <span className="h-2 bg-current/15" />
                        <span className="h-2 bg-current/25" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-10 ml-auto h-10 w-28 bg-current/90" />
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid border-b border-[var(--line)] md:grid-cols-3">
        {[
          ["01", "Template range", "From Swedish restraint to Chinese high-density invoice layouts."],
          ["02", "Company assets", "Logo upload and business identity fields are first-class inputs."],
          ["03", "Scale path", "Draft schema leaves room for saved templates, clients, taxes, and history."],
        ].map(([number, title, copy]) => (
          <div className="feature-cell" key={number}>
            <span>{number}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
