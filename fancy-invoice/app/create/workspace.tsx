"use client";

import { ChangeEvent, Suspense, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { templates } from "../templates/data";

type LineItem = {
  id: string;
  description: string;
  quantity: number;
  price: number;
};

type InvoiceDraft = {
  companyName: string;
  companyDetails: string;
  clientName: string;
  clientDetails: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  currency: string;
  taxRate: number;
  notes: string;
  templateId: string;
  items: LineItem[];
};

const initialDraft: InvoiceDraft = {
  companyName: "Northline Studio AB",
  companyDetails: "Kungsgatan 12, 111 35 Stockholm\nVAT SE559001234501",
  clientName: "Dragon Gate Trading Co.",
  clientDetails: "88 Fuxing Road, Shanghai\nAttn: Finance Department",
  invoiceNumber: "INV-2026-0042",
  issueDate: "2026-05-23",
  dueDate: "2026-06-06",
  currency: "USD",
  taxRate: 7,
  notes: "Payment due by bank transfer. Please include invoice number as reference.",
  templateId: "stockholm-minimal",
  items: [
    { id: "strategy", description: "Brand and invoice system strategy", quantity: 1, price: 2400 },
    { id: "design", description: "Template design and production setup", quantity: 1, price: 3600 },
    { id: "ops", description: "Implementation support", quantity: 8, price: 180 },
  ],
};

function money(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(value);
}

function Workspace() {
  const params = useSearchParams();
  const requestedTemplate = params.get("template");
  const [draft, setDraft] = useState<InvoiceDraft>(() => ({
    ...initialDraft,
    templateId: templates.some((template) => template.id === requestedTemplate)
      ? requestedTemplate ?? initialDraft.templateId
      : initialDraft.templateId,
  }));
  const [logo, setLogo] = useState<string>("");

  const selectedTemplate = useMemo(
    () => templates.find((template) => template.id === draft.templateId) ?? templates[0],
    [draft.templateId],
  );

  const subtotal = useMemo(
    () => draft.items.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [draft.items],
  );
  const tax = subtotal * (draft.taxRate / 100);
  const total = subtotal + tax;

  useEffect(() => {
    localStorage.setItem("ledger-atelier-draft", JSON.stringify(draft));
  }, [draft]);

  function updateField(field: keyof InvoiceDraft, value: string | number) {
    setDraft((current) => ({ ...current, [field]: value }));
  }

  function updateItem(id: string, field: keyof LineItem, value: string | number) {
    setDraft((current) => ({
      ...current,
      items: current.items.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: field === "description" ? value : Number(value),
            }
          : item,
      ),
    }));
  }

  function addItem() {
    setDraft((current) => ({
      ...current,
      items: [
        ...current.items,
        {
          id: crypto.randomUUID(),
          description: "New line item",
          quantity: 1,
          price: 0,
        },
      ],
    }));
  }

  function handleLogoUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setLogo(String(reader.result));
    reader.readAsDataURL(file);
  }

  function exportPdf() {
    document.title = `${draft.invoiceNumber}-${draft.clientName}`.replaceAll(" ", "-");
    window.print();
  }

  return (
    <section className="creator-shell">
      <aside className="control-panel">
        <div>
          <p className="section-kicker">Creator</p>
          <h1 className="text-4xl font-semibold leading-none tracking-[-0.05em]">
            Compose the invoice.
          </h1>
        </div>

        <label className="logo-drop">
          <input accept="image/*" className="sr-only" onChange={handleLogoUpload} type="file" />
          <span className="text-sm font-semibold">Upload company logo</span>
          <span className="text-xs text-[var(--soft)]">PNG, JPG, or SVG previewed on the invoice</span>
        </label>

        <div className="field-stack">
          <label>
            Template
            <select
              value={draft.templateId}
              onChange={(event) => updateField("templateId", event.target.value)}
            >
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            Company
            <input
              value={draft.companyName}
              onChange={(event) => updateField("companyName", event.target.value)}
            />
          </label>
          <label>
            Company details
            <textarea
              rows={3}
              value={draft.companyDetails}
              onChange={(event) => updateField("companyDetails", event.target.value)}
            />
          </label>
          <label>
            Client
            <input
              value={draft.clientName}
              onChange={(event) => updateField("clientName", event.target.value)}
            />
          </label>
          <label>
            Client details
            <textarea
              rows={3}
              value={draft.clientDetails}
              onChange={(event) => updateField("clientDetails", event.target.value)}
            />
          </label>
        </div>
      </aside>

      <div className="invoice-workbench">
        <div className="export-toolbar">
          <div>
            <p className="section-kicker">Export</p>
            <h2>Preview and generate PDF</h2>
          </div>
          <button className="button-primary" onClick={exportPdf} type="button">
            Export PDF
          </button>
        </div>

        <div className="meta-bar">
          <label>
            Invoice No.
            <input
              value={draft.invoiceNumber}
              onChange={(event) => updateField("invoiceNumber", event.target.value)}
            />
          </label>
          <label>
            Issue
            <input
              type="date"
              value={draft.issueDate}
              onChange={(event) => updateField("issueDate", event.target.value)}
            />
          </label>
          <label>
            Due
            <input
              type="date"
              value={draft.dueDate}
              onChange={(event) => updateField("dueDate", event.target.value)}
            />
          </label>
          <label>
            Currency
            <select value={draft.currency} onChange={(event) => updateField("currency", event.target.value)}>
              <option>USD</option>
              <option>EUR</option>
              <option>SEK</option>
              <option>CNY</option>
              <option>THB</option>
            </select>
          </label>
          <label>
            Tax %
            <input
              min="0"
              type="number"
              value={draft.taxRate}
              onChange={(event) => updateField("taxRate", Number(event.target.value))}
            />
          </label>
        </div>

        <div className="line-editor">
          <div className="flex items-center justify-between gap-4">
            <h2>Line items</h2>
            <button className="mini-button" onClick={addItem} type="button">
              Add item
            </button>
          </div>
          <div className="mt-4 grid gap-3">
            {draft.items.map((item) => (
              <div className="line-row" key={item.id}>
                <input
                  aria-label="Description"
                  value={item.description}
                  onChange={(event) => updateItem(item.id, "description", event.target.value)}
                />
                <input
                  aria-label="Quantity"
                  min="0"
                  type="number"
                  value={item.quantity}
                  onChange={(event) => updateItem(item.id, "quantity", event.target.value)}
                />
                <input
                  aria-label="Price"
                  min="0"
                  type="number"
                  value={item.price}
                  onChange={(event) => updateItem(item.id, "price", event.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        <article
          className={`invoice-preview template-${selectedTemplate.id}`}
          data-template={selectedTemplate.id}
          data-tone={selectedTemplate.tone}
          style={{ "--template-accent": selectedTemplate.accent } as React.CSSProperties}
        >
          <header className="invoice-preview-header">
            <div className="brand-block">
              {logo ? (
                <Image
                  alt={`${draft.companyName} logo`}
                  height={82}
                  src={logo}
                  unoptimized
                  width={82}
                />
              ) : (
                <span>Logo</span>
              )}
              <div>
                <p>{draft.companyName}</p>
                <pre>{draft.companyDetails}</pre>
              </div>
            </div>
            <div className="invoice-title">
              <span>{selectedTemplate.code}</span>
              <h2>Invoice</h2>
              <p>{draft.invoiceNumber}</p>
            </div>
          </header>

          <section className="invoice-parties">
            <div>
              <span>Bill to</span>
              <h3>{draft.clientName}</h3>
              <pre>{draft.clientDetails}</pre>
            </div>
            <div className="invoice-dates">
              <p>
                <span>Issued</span>
                {draft.issueDate}
              </p>
              <p>
                <span>Due</span>
                {draft.dueDate}
              </p>
              <p>
                <span>Template</span>
                {selectedTemplate.name}
              </p>
            </div>
          </section>

          {selectedTemplate.id === "shenzhen-ledger" ? (
            <section className="dense-ledger-strip" aria-label="Invoice approval metadata">
              <p>
                <span>Tax schema</span>
                VAT / service tax
              </p>
              <p>
                <span>Approval</span>
                Finance office
              </p>
              <p>
                <span>Settlement</span>
                Wire transfer
              </p>
              <p>
                <span>Archive</span>
                CN-2026-Q2
              </p>
            </section>
          ) : null}

          <table className="invoice-table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {draft.items.map((item) => (
                <tr key={item.id}>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{money(item.price, draft.currency)}</td>
                  <td>{money(item.quantity * item.price, draft.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <section className="invoice-footer">
            <p>{draft.notes}</p>
            <div className="totals">
              <p>
                <span>Subtotal</span>
                {money(subtotal, draft.currency)}
              </p>
              <p>
                <span>Tax</span>
                {money(tax, draft.currency)}
              </p>
              <strong>
                <span>Total</span>
                {money(total, draft.currency)}
              </strong>
            </div>
          </section>
        </article>
      </div>
    </section>
  );
}

export default function InvoiceCreator() {
  return (
    <Suspense fallback={<div className="p-8">Loading invoice creator...</div>}>
      <Workspace />
    </Suspense>
  );
}
