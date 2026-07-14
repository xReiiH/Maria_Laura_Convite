// Responsabilidade: enviar respostas RSVP ao Google Apps Script configurado.
window.GoogleSheets = (() => {
  const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxMQDBqOWhhZa4WpPZafyImruGQakj94qsnnYD56dD6Jonr2-O3jyeLYGHrHN8VQ3mg/exec";
  const REQUEST_TIMEOUT = 12000;

  const isConfigured = () => WEB_APP_URL !== "https://script.google.com/macros/s/AKfycbxMQDBqOWhhZa4WpPZafyImruGQakj94qsnnYD56dD6Jonr2-O3jyeLYGHrHN8VQ3mg/exec";

  const send = async (payload) => {
    if (!isConfigured()) {
      return { success: true, simulated: true };
    }

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
    const body = new URLSearchParams(
      Object.entries(payload).map(([key, value]) => [key, String(value ?? "")])
    );

    try {
      // Em mode "no-cors", a resposta é opaque: o navegador confirma apenas que aceitou a requisição.
      // Por isso, a interface usa uma confirmação otimista após o POST ser aceito pelo navegador.
      await fetch(WEB_APP_URL, {
        method: "POST",
        mode: "no-cors",
        body,
        signal: controller.signal
      });

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
