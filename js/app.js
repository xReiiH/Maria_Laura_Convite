// Responsabilidade: inicializar a aplicação e coordenar os módulos.
(() => {
  const markPageAsReady = () => {
    document.body.classList.add("is-ready");
  };

  if (document.readyState !== "loading") {
    markPageAsReady();
    return;
  }

  document.addEventListener("DOMContentLoaded", markPageAsReady, { once: true });
})();
