/**
 * Google Apps Script collegato al foglio "Lead atavicoLabs" (contatti del sito).
 * Deploy: Extensions > Apps Script > incolla > Deploy > New deployment
 *   Tipo: Web app | Esegui come: Me | Chi ha accesso: Chiunque
 * Poi imposta in Vercel/.env.local: LEAD_WEBHOOK_URL (URL /exec) e LEAD_WEBHOOK_SECRET (uguale a SECRET qui sotto).
 */
const SECRET = 'CAMBIA_QUESTO_SEGRETO';

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.secret !== SECRET) return out({ ok: false });
    SpreadsheetApp.getActiveSpreadsheet()
      .getSheets()[0]
      .appendRow([new Date(), d.name, d.email, d.company, d.workflow, (d.tools || []).join(', '), d.locale, d.page]);
    return out({ ok: true });
  } catch (err) {
    return out({ ok: false });
  }
}

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
