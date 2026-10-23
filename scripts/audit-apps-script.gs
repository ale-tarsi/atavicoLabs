/**
 * Google Apps Script collegato al foglio "Audit atavicoLabs" (store dei report audit).
 * Deploy: Extensions > Apps Script > incolla > Deploy > New deployment
 *   Tipo: Web app | Esegui come: Me | Chi ha accesso: Chiunque
 * Poi imposta in Vercel/.env.local: AUDIT_STORE_URL (URL /exec) e AUDIT_STORE_SECRET (uguale a SECRET qui sotto).
 */
const SECRET = 'CAMBIA_QUESTO_SEGRETO';

const AUDIT_COLS = [
  'id', 'created_at', 'email', 'url', 'locale', 'status', 'unlocked',
  'stripe_session_id', 'paid_at', 'ip_address', 'error_message',
  'pagespeed_data', 'ai_report',
];
const JSON_COLS = ['pagespeed_data', 'ai_report'];
const CELL_LIMIT = 49000; // Google Sheets: max 50.000 caratteri per cella

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    if (d.secret !== SECRET) return out({ ok: false });
    return out(handleAudit(d));
  } catch (err) {
    return out({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

function out(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

// ─── Store audit ────────────────────────────────────────────────────────────

function auditSheet() {
  const sh = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
  if (sh.getLastRow() === 0) {
    const header = sh.getRange(1, 1, 1, AUDIT_COLS.length);
    header.setNumberFormat('@');
    header.setValues([AUDIT_COLS]);
    sh.setFrozenRows(1);
  }
  return sh;
}

function toCell(col, v) {
  if (v === null || v === undefined) return '';
  let s;
  if (JSON_COLS.indexOf(col) !== -1) s = JSON.stringify(v);
  else if (col === 'unlocked') s = String(!!v);
  else s = String(v);
  if (s.length > CELL_LIMIT) throw new Error('cell_too_large:' + col);
  return s;
}

function rowToObj(row) {
  const o = {};
  AUDIT_COLS.forEach(function (c, i) {
    const v = row[i];
    o[c] = v === '' || v === undefined ? null : v;
  });
  o.unlocked = o.unlocked === 'true' || o.unlocked === true;
  JSON_COLS.forEach(function (c) {
    if (o[c]) o[c] = JSON.parse(o[c]);
  });
  return o;
}

function findRow(sh, id) {
  const last = sh.getLastRow();
  if (last < 2) return -1;
  const ids = sh.getRange(2, 1, last - 1, 1).getValues();
  for (let i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === String(id)) return i + 2;
  }
  return -1;
}

function writeRow(sh, rowIdx, cells) {
  const r = sh.getRange(rowIdx, 1, 1, cells.length);
  r.setNumberFormat('@'); // testo semplice: niente date/numeri auto-convertiti
  r.setValues([cells]);
}

function handleAudit(d) {
  const sh = auditSheet();

  if (d.action === 'audit_get') {
    const idx = findRow(sh, d.id);
    if (idx === -1) return { ok: true, row: null };
    const row = sh.getRange(idx, 1, 1, AUDIT_COLS.length).getValues()[0];
    return { ok: true, row: rowToObj(row) };
  }

  if (d.action === 'audit_count') {
    const last = sh.getLastRow();
    let emailCount = 0;
    let ipCount = 0;
    if (last >= 2) {
      const rows = sh.getRange(2, 1, last - 1, AUDIT_COLS.length).getValues();
      const iCreated = AUDIT_COLS.indexOf('created_at');
      const iEmail = AUDIT_COLS.indexOf('email');
      const iIp = AUDIT_COLS.indexOf('ip_address');
      rows.forEach(function (r) {
        if (String(r[iCreated]) < String(d.since)) return;
        if (d.email && String(r[iEmail]).toLowerCase() === String(d.email).toLowerCase()) emailCount++;
        if (d.ip && String(r[iIp]) === String(d.ip)) ipCount++;
      });
    }
    return { ok: true, emailCount: emailCount, ipCount: ipCount };
  }

  // Scritture: una alla volta
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    if (d.action === 'audit_create') {
      const cells = AUDIT_COLS.map(function (c) { return toCell(c, d.row[c]); });
      writeRow(sh, sh.getLastRow() + 1, cells);
      return { ok: true };
    }

    if (d.action === 'audit_update') {
      const idx = findRow(sh, d.id);
      if (idx === -1) return { ok: false, error: 'not_found' };
      const current = rowToObj(sh.getRange(idx, 1, 1, AUDIT_COLS.length).getValues()[0]);
      const merged = {};
      AUDIT_COLS.forEach(function (c) {
        merged[c] = Object.prototype.hasOwnProperty.call(d.patch, c) ? d.patch[c] : current[c];
      });
      writeRow(sh, idx, AUDIT_COLS.map(function (c) { return toCell(c, merged[c]); }));
      return { ok: true };
    }
  } finally {
    lock.releaseLock();
  }

  return { ok: false, error: 'unknown_action' };
}
