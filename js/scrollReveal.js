// Responsabilidade: controlar revelações de conteúdo durante a rolagem.
(() => {
  if (window.__scrollRevealInitialized) {
    return;
  }

  window.__scrollRevealInitialized = true;

  const revealGroups = [
    [".section-header"],
    [".info-card"],
    [".countdown"],
    [".gallery-photo"],
    [".family-message"],
    [".rsvp-intro"],
    [".rsvp-card"]
  ];
  const delayClasses = ["reveal-delay-1", "reveal-delay-2", "reveal-delay-3"];
  const targets = [];

  revealGroups.forEach(([selector]) => {
    document.querySelectorAll(selector).forEach((element, index) => {
      if (element.classList.contains("reveal")) {
        return;
      }

      element.classList.add("reveal");
      const delayClass = delayClasses[index];

      if (delayClass) {
        element.classList.add(delayClass);
      }

      targets.push(element);
    });
  });

  if (!targets.length) {
    return;
  }

  if (!("IntersectionObserver" in window)) {
    targets.forEach((element) => element.classList.add("reveal--visible"));
    return;
  }

  let remainingTargets = targets.length;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("reveal--visible");
      observer.unobserve(entry.target);
      remainingTargets -= 1;

      if (remainingTargets === 0) {
        observer.disconnect();
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -4%"
  });

  targets.forEach((element) => observer.observe(element));
})();
