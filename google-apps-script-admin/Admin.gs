const ADMIN_SHEET_NAME = "Confirmações";
const ADMIN_TIME_ZONE = "America/Sao_Paulo";

function doGet() {
  return HtmlService
    .createTemplateFromFile("Admin")
    .evaluate()
    .setTitle("Confirmações — Maria Laura");
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getDashboardData() {
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

    if (!spreadsheet) {
      throw new Error("Planilha de confirmações indisponível.");
    }

    const sheet = spreadsheet.getSheetByName(ADMIN_SHEET_NAME);

    if (!sheet || sheet.getLastRow() < 2) {
      return createEmptyDashboard_();
    }

    // Lê somente Data/Hora, Nome e Presença. Origem e User Agent não saem do servidor.
    const values = sheet.getRange(2, 1, sheet.getLastRow() - 1, 3).getValues();
    const respostas = values
      .map((row) => createResponse_(row))
      .filter((response) => response !== null)
      .sort((first, second) => second.timestamp - first.timestamp)
      .map(({ timestamp, ...response }) => response);
    const confirmados = respostas.filter((response) => response.presenca === "Sim").length;
    const ausentes = respostas.filter((response) => response.presenca === "Não").length;
    const total = respostas.length;

    return {
      total,
      confirmados,
      ausentes,
      percentualConfirmacao: total ? Math.round((confirmados / total) * 100) : 0,
      respostas
    };
  } catch (error) {
    throw new Error("Não foi possível carregar as confirmações. Tente atualizar novamente.");
  }
}

function createEmptyDashboard_() {
  return {
    total: 0,
    confirmados: 0,
    ausentes: 0,
    percentualConfirmacao: 0,
    respostas: []
  };
}

function createResponse_(row) {
  const data = row[0];
  const nome = sanitizeText_(row[1], 120);
  const presenca = normalizeAttendance_(row[2]);

  if (!data && !nome && !presenca) {
    return null;
  }

  return {
    timestamp: getTimestamp_(data),
    dataHora: formatDate_(data),
    nome: nome || "Não informado",
    presenca: presenca || "Não informado"
  };
}

function sanitizeText_(value, maxLength) {
  return String(value === null || value === undefined ? "" : value)
    .replace(/[\u0000-\u001F\u007F]/g, " ")
    .trim()
    .slice(0, maxLength);
}

function normalizeAttendance_(value) {
  const normalized = sanitizeText_(value, 10).toLocaleLowerCase("pt-BR");

  if (normalized === "sim") {
    return "Sim";
  }

  if (normalized === "não" || normalized === "nao") {
    return "Não";
  }

  return "";
}

function getTimestamp_(value) {
  if (Object.prototype.toString.call(value) === "[object Date]" && !isNaN(value.getTime())) {
    return value.getTime();
  }

  const parsedDate = new Date(value);
  return isNaN(parsedDate.getTime()) ? 0 : parsedDate.getTime();
}

function formatDate_(value) {
  const timestamp = getTimestamp_(value);

  if (!timestamp) {
    return "Não informado";
  }

  return Utilities.formatDate(new Date(timestamp), ADMIN_TIME_ZONE, "dd/MM/yyyy HH:mm");
}
