/**
 * Export and Download Utilities
 * Enables genuine CSV, JSON, and formatted Print/PDF document generation
 * for public sector reports, data tables, and briefing gazettes.
 */

export interface ExportColumn<T> {
  header: string;
  accessor: (item: T) => string | number | boolean | null | undefined;
}

/**
 * Trigger browser download of CSV string
 */
export function downloadCSV<T>(
  data: T[], 
  columns: ExportColumn<T>[], 
  filename: string
): void {
  const headers = columns.map(c => `"${c.header.replace(/"/g, '""')}"`).join(',');
  const rows = data.map(item => 
    columns.map(c => {
      const val = c.accessor(item);
      const str = val === null || val === undefined ? '' : String(val);
      return `"${str.replace(/"/g, '""')}"`;
    }).join(',')
  );

  const csvContent = '\uFEFF' + [headers, ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  triggerBlobDownload(blob, `${filename.replace(/[^a-z0-9_-]+/gi, '_')}.csv`);
}

/**
 * Trigger browser download of JSON object
 */
export function downloadJSON(data: any, filename: string): void {
  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  triggerBlobDownload(blob, `${filename.replace(/[^a-z0-9_-]+/gi, '_')}.json`);
}

/**
 * Trigger generic browser download
 */
function triggerBlobDownload(blob: Blob, fullFilename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fullFilename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

/**
 * Generate a printable executive government gazette / dossier
 */
export function printExecutiveReport(title: string, subtitle: string, sections: { title: string; content: string | string[][] }[]): void {
  const printWindow = window.open('', '_blank');
  if (!printWindow) {
    window.print();
    return;
  }

  const sectionsHtml = sections.map(sec => {
    if (Array.isArray(sec.content)) {
      const tableRows = sec.content.map((row, idx) => {
        const isHeader = idx === 0;
        return `<tr>${row.map(cell => `<${isHeader ? 'th' : 'td'} style="padding: 6px 10px; border: 1px solid #cbd5e1; font-size: 11px;">${cell}</${isHeader ? 'th' : 'td'}>`).join('')}</tr>`;
      }).join('');
      return `
        <div style="margin-bottom: 24px;">
          <h3 style="font-size: 14px; font-weight: bold; margin-bottom: 8px; color: #102c49; text-transform: uppercase; border-bottom: 2px solid #b45309; padding-bottom: 4px;">${sec.title}</h3>
          <table style="width: 100%; border-collapse: collapse; text-align: left;">${tableRows}</table>
        </div>
      `;
    }
    return `
      <div style="margin-bottom: 20px;">
        <h3 style="font-size: 14px; font-weight: bold; margin-bottom: 8px; color: #102c49; text-transform: uppercase; border-bottom: 2px solid #b45309; padding-bottom: 4px;">${sec.title}</h3>
        <p style="font-size: 12px; line-height: 1.6; color: #334155;">${sec.content}</p>
      </div>
    `;
  }).join('');

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title} - Government of Maharashtra</title>
        <style>
          @page { size: A4; margin: 20mm; }
          body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; color: #0f172a; margin: 0; padding: 24px; }
          .header { border-bottom: 3px double #102c49; padding-bottom: 12px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: flex-end; }
          .emblem { font-size: 11px; font-weight: bold; color: #b45309; text-transform: uppercase; letter-spacing: 1px; }
          .title { font-size: 20px; font-weight: 800; color: #102c49; margin: 4px 0; }
          .subtitle { font-size: 12px; color: #64748b; }
          .footer { margin-top: 40px; border-top: 1px solid #cbd5e1; padding-top: 8px; font-size: 10px; color: #94a3b8; display: flex; justify-content: space-between; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>
            <div class="emblem">महाराष्ट्र शासन • Government of Maharashtra</div>
            <div class="title">${title}</div>
            <div class="subtitle">${subtitle}</div>
          </div>
          <div style="text-align: right; font-size: 11px; color: #64748b;">
            <div><strong>Date of Gazette:</strong> ${new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</div>
            <div><strong>Classification:</strong> Official Academic Prototype</div>
          </div>
        </div>
        ${sectionsHtml}
        <div class="footer">
          <span>Maharashtra State Labour Market Intelligence Platform (MS-LMI)</span>
          <span>Verified Snapshot Digest</span>
        </div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}
