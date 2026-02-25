/* ═══════════════════════════════════════
   PDF Audit Report Generator (client-side)
   Uses jsPDF to create a branded PDF report
   ═══════════════════════════════════════ */

import { jsPDF } from "jspdf";

interface PDFModuleResult {
  name: string;
  score: number;
  maxScore: number;
  items: { label: string; status: "ok" | "warn" | "fail"; detail: string; points: number; maxPoints: number }[];
}

interface PDFAuditData {
  url: string;
  domain: string;
  date: string;
  totalScore: number;
  modules: PDFModuleResult[];
  businessType: { type: string; label: string; description: string; signals: string[] };
  pkg: { name: string; categoryLabel: string; priceNetto: number; color: string };
  recommendation: { reason: string; prognosis: string };
  priorities: { level: string; text: string; packageAction: string }[];
}

const COLORS = {
  bg: [3, 1, 22] as [number, number, number],
  cardBg: [12, 10, 42] as [number, number, number],
  accent: [155, 98, 255] as [number, number, number],
  green: [34, 197, 94] as [number, number, number],
  yellow: [251, 191, 36] as [number, number, number],
  red: [239, 68, 68] as [number, number, number],
  orange: [249, 115, 22] as [number, number, number],
  blue: [59, 130, 246] as [number, number, number],
  white: [255, 255, 255] as [number, number, number],
  dim: [152, 162, 179] as [number, number, number],
  muted: [102, 112, 133] as [number, number, number],
};

function scoreColor(score: number): [number, number, number] {
  if (score >= 71) return COLORS.green;
  if (score >= 41) return COLORS.yellow;
  return COLORS.red;
}

function statusIcon(status: "ok" | "warn" | "fail"): string {
  if (status === "ok") return "[OK]";
  if (status === "warn") return "[!]";
  return "[X]";
}

export function generateAuditPDF(data: PDFAuditData): string {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = 210;
  const margin = 20;
  const contentW = pageW - margin * 2;
  let y = 0;

  function checkPage(needed: number) {
    if (y + needed > 275) {
      doc.addPage();
      y = 20;
      // Page background
      doc.setFillColor(...COLORS.bg);
      doc.rect(0, 0, 210, 297, "F");
    }
  }

  // ── Page 1: Cover ──
  doc.setFillColor(...COLORS.bg);
  doc.rect(0, 0, 210, 297, "F");

  // Header accent line
  doc.setFillColor(...COLORS.accent);
  doc.rect(0, 0, 210, 3, "F");

  // Logo / Brand
  y = 30;
  doc.setTextColor(...COLORS.accent);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("ADAWARDS.PL", margin, y);
  doc.setTextColor(...COLORS.muted);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Agencja SEO & Digital Marketing", margin, y + 5);

  // Title
  y = 60;
  doc.setTextColor(...COLORS.white);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("Raport audytu SEO", margin, y);

  y += 12;
  doc.setTextColor(...COLORS.dim);
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text(data.domain, margin, y);

  y += 8;
  doc.setFontSize(10);
  doc.setTextColor(...COLORS.muted);
  doc.text(data.date, margin, y);

  // Score circle area
  y = 110;
  const sc = scoreColor(data.totalScore);
  doc.setFillColor(sc[0], sc[1], sc[2]);
  doc.circle(pageW / 2, y, 28, "F");
  doc.setTextColor(...COLORS.bg);
  doc.setFontSize(36);
  doc.setFont("helvetica", "bold");
  doc.text(String(data.totalScore), pageW / 2, y + 4, { align: "center" });
  doc.setFontSize(10);
  doc.text("/100", pageW / 2, y + 13, { align: "center" });

  y += 40;
  doc.setTextColor(...COLORS.white);
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  const scoreLabel = data.totalScore >= 71 ? "Dobry wynik" : data.totalScore >= 41 ? "Wymaga poprawy" : "Wymaga pilnej interwencji";
  doc.text(scoreLabel, pageW / 2, y, { align: "center" });

  // Module scores summary
  y += 16;
  const modW = contentW / 4;
  data.modules.forEach((mod, i) => {
    const pct = Math.round((mod.score / mod.maxScore) * 100);
    const mc = scoreColor(pct);
    const x = margin + modW * i + modW / 2;

    doc.setTextColor(mc[0], mc[1], mc[2]);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(`${pct}%`, x, y, { align: "center" });

    doc.setTextColor(...COLORS.muted);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.text(mod.name, x, y + 5, { align: "center" });
  });

  // Business type
  y += 22;
  doc.setFillColor(COLORS.cardBg[0], COLORS.cardBg[1], COLORS.cardBg[2]);
  doc.roundedRect(margin, y, contentW, 24, 3, 3, "F");

  doc.setTextColor(...COLORS.accent);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("PROFIL TWOJEJ FIRMY", margin + 8, y + 8);

  doc.setTextColor(...COLORS.white);
  doc.setFontSize(12);
  doc.text(data.businessType.label, margin + 8, y + 16);

  doc.setTextColor(...COLORS.muted);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text(data.businessType.description, margin + 80, y + 16);

  // URL
  y += 32;
  doc.setTextColor(...COLORS.muted);
  doc.setFontSize(8);
  doc.text(`URL: ${data.url}`, margin, y);

  // Footer
  doc.setTextColor(...COLORS.muted);
  doc.setFontSize(7);
  doc.text("adawards.pl | mastermarketing.io/seo-oferta | Raport wygenerowany automatycznie", pageW / 2, 288, { align: "center" });

  // ── Page 2+: Module details ──
  data.modules.forEach((mod) => {
    doc.addPage();
    doc.setFillColor(...COLORS.bg);
    doc.rect(0, 0, 210, 297, "F");
    doc.setFillColor(...COLORS.accent);
    doc.rect(0, 0, 210, 2, "F");

    y = 20;

    // Module header
    const modPct = Math.round((mod.score / mod.maxScore) * 100);
    const mc = scoreColor(modPct);

    doc.setTextColor(mc[0], mc[1], mc[2]);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(mod.name, margin, y);

    doc.setTextColor(...COLORS.muted);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`${modPct}% (${mod.score}/${mod.maxScore} pkt)`, margin + 80, y);

    // Score bar
    y += 6;
    doc.setFillColor(30, 30, 60);
    doc.roundedRect(margin, y, contentW, 4, 2, 2, "F");
    doc.setFillColor(mc[0], mc[1], mc[2]);
    doc.roundedRect(margin, y, contentW * (modPct / 100), 4, 2, 2, "F");

    y += 14;

    // Items
    mod.items.forEach((item) => {
      checkPage(22);

      const statusCol = item.status === "ok" ? COLORS.green : item.status === "warn" ? COLORS.yellow : COLORS.red;

      // Status indicator
      doc.setFillColor(statusCol[0], statusCol[1], statusCol[2]);
      doc.circle(margin + 3, y + 1, 2, "F");

      // Label
      doc.setTextColor(...COLORS.white);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text(item.label, margin + 10, y + 2);

      // Points
      doc.setTextColor(...COLORS.muted);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(`${item.points}/${item.maxPoints} pkt`, margin + contentW - 5, y + 2, { align: "right" });

      // Detail
      y += 6;
      doc.setTextColor(...COLORS.dim);
      doc.setFontSize(8);
      const lines = doc.splitTextToSize(item.detail, contentW - 15);
      doc.text(lines, margin + 10, y + 1);
      y += lines.length * 4 + 6;
    });

    // Footer
    doc.setTextColor(...COLORS.muted);
    doc.setFontSize(7);
    doc.text("adawards.pl | Raport audytu SEO", pageW / 2, 288, { align: "center" });
  });

  // ── Priorities page ──
  if (data.priorities.length > 0) {
    doc.addPage();
    doc.setFillColor(...COLORS.bg);
    doc.rect(0, 0, 210, 297, "F");
    doc.setFillColor(...COLORS.accent);
    doc.rect(0, 0, 210, 2, "F");

    y = 20;
    doc.setTextColor(...COLORS.white);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Priorytetowe zalecenia", margin, y);

    y += 12;

    data.priorities.forEach((p) => {
      checkPage(24);

      const levelColor = p.level === "critical" ? COLORS.red : p.level === "important" ? COLORS.yellow : COLORS.green;
      const levelLabel = p.level === "critical" ? "KRYTYCZNE" : p.level === "important" ? "WAŻNE" : "OPCJONALNE";

      // Card bg
      doc.setFillColor(COLORS.cardBg[0], COLORS.cardBg[1], COLORS.cardBg[2]);
      const textLines = doc.splitTextToSize(p.text, contentW - 16);
      const cardH = 12 + textLines.length * 4 + 8;
      doc.roundedRect(margin, y, contentW, cardH, 2, 2, "F");

      // Left border
      doc.setFillColor(levelColor[0], levelColor[1], levelColor[2]);
      doc.rect(margin, y, 2, cardH, "F");

      // Level label
      doc.setTextColor(levelColor[0], levelColor[1], levelColor[2]);
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      doc.text(levelLabel, margin + 8, y + 6);

      // Text
      doc.setTextColor(...COLORS.dim);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text(textLines, margin + 8, y + 12);

      // Action
      doc.setTextColor(...COLORS.accent);
      doc.setFontSize(7);
      doc.text(`-> ${p.packageAction}`, margin + 8, y + 12 + textLines.length * 4 + 2);

      y += cardH + 6;
    });

    doc.setTextColor(...COLORS.muted);
    doc.setFontSize(7);
    doc.text("adawards.pl | Raport audytu SEO", pageW / 2, 288, { align: "center" });
  }

  // ── Recommendation page ──
  doc.addPage();
  doc.setFillColor(...COLORS.bg);
  doc.rect(0, 0, 210, 297, "F");
  doc.setFillColor(...COLORS.accent);
  doc.rect(0, 0, 210, 2, "F");

  y = 20;
  doc.setTextColor(...COLORS.white);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Rekomendacja", margin, y);

  y += 14;

  // Package card
  doc.setFillColor(COLORS.cardBg[0], COLORS.cardBg[1], COLORS.cardBg[2]);
  doc.roundedRect(margin, y, contentW, 60, 3, 3, "F");

  doc.setTextColor(...COLORS.accent);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text(data.pkg.categoryLabel.toUpperCase(), margin + 10, y + 10);

  doc.setTextColor(...COLORS.white);
  doc.setFontSize(16);
  doc.text(`Rekomendacja: ${data.pkg.name}`, margin + 10, y + 20);

  doc.setTextColor(...COLORS.orange);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text(`${data.pkg.priceNetto.toLocaleString("pl")} zl netto / mies.`, margin + 10, y + 32);

  doc.setTextColor(...COLORS.dim);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const reasonLines = doc.splitTextToSize(data.recommendation.reason, contentW - 20);
  doc.text(reasonLines, margin + 10, y + 42);

  y += 70;

  // Prognosis
  doc.setFillColor(34, 197, 94, 0.1);
  doc.setFillColor(15, 30, 20);
  doc.roundedRect(margin, y, contentW, 28, 3, 3, "F");
  doc.setFillColor(...COLORS.green);
  doc.rect(margin, y, 2, 28, "F");

  doc.setTextColor(...COLORS.green);
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.text("PROGNOZA", margin + 10, y + 8);

  doc.setTextColor(...COLORS.dim);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const progLines = doc.splitTextToSize(data.recommendation.prognosis, contentW - 20);
  doc.text(progLines, margin + 10, y + 16);

  y += 40;

  // CTA
  doc.setTextColor(...COLORS.white);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Gotowy na wzrost?", margin, y);

  y += 8;
  doc.setTextColor(...COLORS.dim);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Skontaktuj sie z nami:", margin, y);

  y += 8;
  doc.setTextColor(...COLORS.accent);
  doc.setFontSize(10);
  doc.text("mastermarketing.io/seo-oferta", margin, y);

  y += 6;
  doc.setTextColor(...COLORS.dim);
  doc.text("arkadiussixer@gmail.com", margin, y);

  // Footer
  doc.setTextColor(...COLORS.muted);
  doc.setFontSize(7);
  doc.text("adawards.pl | mastermarketing.io/seo-oferta | Raport wygenerowany automatycznie", pageW / 2, 288, { align: "center" });

  // Return as base64 data URI
  return doc.output("datauristring");
}

export function downloadAuditPDF(data: PDFAuditData, filename?: string): void {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  // Reuse the generation logic by creating the PDF inline
  const dataUri = generateAuditPDF(data);

  // Convert data URI to blob and download
  const byteString = atob(dataUri.split(",")[1]);
  const mimeString = dataUri.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename || `audyt-seo-${data.domain}-${new Date().toISOString().slice(0, 10)}.pdf`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function getAuditPDFBase64(data: PDFAuditData): string {
  const dataUri = generateAuditPDF(data);
  // Return just the base64 part
  return dataUri.split(",")[1];
}
