// Responsabilidade: enviar respostas RSVP ao Google Apps Script configurado.
window.GoogleSheets = (() => {
  const PLACEHOLDER_URL = "COLE_AQUI_A_URL_DO_GOOGLE_APPS_SCRIPT";
  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxMQDBqOWhhZa4WpPZafyImruGQakj94qsnnYD56dD6Jonr2-O3jyeLYGHrHN8VQ3mg/exec";
  const endpoint = WEB_APP_URL;
  const REQUEST_TIMEOUT = 12000;

  const isConfigured = () => endpoint !== PLACEHOLDER_URL && endpoint.endsWith("/exec");

  const send = async (payload) => {
    if (!isConfigured()) {
      return { success: false, error: "Endpoint do Google Apps Script não configurado." };
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
    const body = new URLSearchParams(
      Object.entries(payload).map(([key, value]) => [key, String(value ?? "")])
    );

    try {
      console.log("[GoogleSheets] Endpoint:", endpoint);
      console.log("[GoogleSheets] Enviando requisição...");
      // Em mode "no-cors", a resposta é opaque: o navegador confirma apenas que aceitou a requisição.
      // Por isso, a interface usa uma confirmação otimista após o POST ser aceito pelo navegador.
      await fetch(endpoint, {
        method: "POST",
        mode: "no-cors",
        body,
        signal: controller.signal
      });
      console.log("[GoogleSheets] Requisição concluída.");

      return { success: true };
    } catch (error) {
      const errorMessage = error?.name === "AbortError" ? "Tempo limite excedido." : "Não foi possível enviar a confirmação.";
      return { success: false, error: errorMessage };
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  return Object.freeze({ isConfigured, send });
})();
