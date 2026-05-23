import Link from "next/link";
import InvoiceCreator from "./workspace";

export default function CreatePage() {
  return (
    <main className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <header className="app-header">
        <Link href="/" className="font-semibold">
          Ledger Atelier
        </Link>
        <nav className="flex items-center gap-2">
          <Link className="nav-link" href="/templates">
            Templates
          </Link>
          <Link className="nav-link" href="/">
            Home
          </Link>
        </nav>
      </header>
      <InvoiceCreator />
    </main>
  );
}
