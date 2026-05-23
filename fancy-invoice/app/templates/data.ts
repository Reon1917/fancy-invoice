export type TemplateTone = "nordic" | "editorial" | "dense" | "classic";

export type InvoiceTemplate = {
  id: string;
  name: string;
  code: string;
  origin: string;
  tone: TemplateTone;
  summary: string;
  density: string;
  bestFor: string;
  accent: string;
};

export const templates: InvoiceTemplate[] = [
  {
    id: "stockholm-minimal",
    name: "Stockholm Minimal",
    code: "SE-01",
    origin: "Swedish minimal",
    tone: "nordic",
    summary:
      "Quiet spacing, strict columns, and only the invoice data a client needs to approve payment fast.",
    density: "Low",
    bestFor: "Consultants, studios, boutiques",
    accent: "#2f6f63",
  },
  {
    id: "malmo-editorial",
    name: "Malmo Editorial",
    code: "SE-02",
    origin: "Nordic editorial",
    tone: "editorial",
    summary:
      "A more expressive layout with large numbering, signature blocks, and polished service descriptions.",
    density: "Medium",
    bestFor: "Creative retainers, agencies",
    accent: "#b64f2f",
  },
  {
    id: "shenzhen-ledger",
    name: "Shenzhen Ledger",
    code: "CN-88",
    origin: "Chinese high-volume",
    tone: "dense",
    summary:
      "High information volume with compact tables, bilingual-ready labels, tax fields, and approval metadata.",
    density: "High",
    bestFor: "Trading, logistics, manufacturing",
    accent: "#b8222b",
  },
  {
    id: "hong-kong-compact",
    name: "Hong Kong Compact",
    code: "HK-12",
    origin: "Commercial compact",
    tone: "classic",
    summary:
      "A formal business invoice that keeps banking, terms, stamps, and remittance details visible.",
    density: "High",
    bestFor: "B2B services, import/export",
    accent: "#2b4f88",
  },
];
