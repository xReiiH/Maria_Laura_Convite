const RSVP_SHEET_NAME = "Confirmações";
const RSVP_HEADERS = ["Data/Hora", "Nome", "Presença", "Origem", "User Agent"];

function doGet() {
  return ContentService.createTextOutput("RSVP Maria Laura ativo.");
}

function doPost(e) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = spreadsheet.getSheetByName(RSVP_SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(RSVP_SHEET_NAME);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(RSVP_HEADERS);
    }

    const parameters = e && e.parameter ? e.parameter : {};
    sheet.appendRow([
      sanitizeValue(parameters.enviadoEm, 100),
      sanitizeValue(parameters.nome, 120),
      sanitizeValue(parameters.presenca, 10),
      sanitizeValue(parameters.origem, 500),
      sanitizeValue(parameters.userAgent, 500)
    ]);

    return jsonResponse({ success: true });
  } catch (error) {
    return jsonResponse({ success: false, error: "Não foi possível registrar a confirmação." });
  } finally {
    if (lock.hasLock()) {
      lock.releaseLock();
    }
  }
}

function sanitizeValue(value, maxLength) {
  let sanitized = String(value || "")
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .trim()
    .slice(0, maxLength);

  if (/^[=+\-@]/.test(sanitized)) {
    sanitized = "'" + sanitized;
  }

  return sanitized;
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
