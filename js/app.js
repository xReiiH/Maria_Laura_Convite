// Responsabilidade: inicializar a aplicação e coordenar os módulos.
(() => {
  const markPageAsReady = () => {
    document.body.classList.add("is-ready");
  };

  if (document.readyState === "complete") {
    markPageAsReady();
    return;
  }

  window.addEventListener("load", markPageAsReady, { once: true });
})();
