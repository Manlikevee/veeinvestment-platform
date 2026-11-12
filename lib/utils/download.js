function trigger(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export function downloadText(filename, content) {
  trigger(new Blob([content], { type: "text/plain;charset=utf-8" }), filename);
}

export function downloadCsv(filename, headers, rows) {
  const escape = (value) => {
    const text = value === null || value === undefined ? "" : String(value);
    return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
  };
  const csv = [headers.map(escape).join(","), ...rows.map((row) => row.map(escape).join(","))].join("\n");
  trigger(new Blob([csv], { type: "text/csv;charset=utf-8;" }), filename);
}

function escapePdfText(text) {
  return String(text).replaceAll("\\", "\\\\").replaceAll("(", "\\(").replaceAll(")", "\\)");
}

/**
 * Produces a small, valid single-page PDF for demonstration downloads. No
 * financial document or live statement is generated or represented.
 */
export function downloadMockPdf({ filename = "vee-document.pdf", title = "Vee Investment", lines = [], footer = "Demonstration document — not a live financial record." }) {
  const contentLines = [
    "BT",
    "/F1 18 Tf",
    "50 790 Td",
    `(${escapePdfText(title)}) Tj`,
    "/F1 9 Tf",
    "0 -24 Td",
    `(${escapePdfText("Vee Investment · Demonstration document")}) Tj`,
    "0 -26 Td",
  ];
  lines.forEach((line) => {
    contentLines.push("/F1 10 Tf");
    contentLines.push(`(${escapePdfText(line)}) Tj`);
    contentLines.push("0 -18 Td");
  });
  contentLines.push("0 -18 Td");
  contentLines.push("/F1 8 Tf");
  contentLines.push(`(${escapePdfText(footer)}) Tj`);
  contentLines.push("ET");
  const stream = contentLines.join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, index) => {
    offsets.push(pdf.length);
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  trigger(new Blob([pdf], { type: "application/pdf" }), filename);
}

export function downloadJson(filename, data) {
  trigger(new Blob([JSON.stringify(data, null, 2)], { type: "application/json" }), filename);
}
