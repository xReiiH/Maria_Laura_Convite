// Responsabilidade: controlar a contagem regressiva do evento.
(() => {
  const eventDate = new Date("2026-08-22T19:00:00-03:00");
  const elements = {
    daysFeatured: document.getElementById("countdown-days-featured"),
    days: document.getElementById("countdown-days"),
    hours: document.getElementById("countdown-hours"),
    minutes: document.getElementById("countdown-minutes"),
    seconds: document.getElementById("countdown-seconds")
  };

  const updateElement = (element, value) => {
    if (element) {
      element.textContent = value;
    }
  };

  const updateCountdown = () => {
    const difference = eventDate.getTime() - Date.now();

    if (difference <= 0) {
      Object.values(elements).forEach((element) => updateElement(element, "Hoje é o grande dia!"));
      return true;
    }

    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    updateElement(elements.daysFeatured, String(days));
    updateElement(elements.days, String(days));
    updateElement(elements.hours, String(hours).padStart(2, "0"));
    updateElement(elements.minutes, String(minutes).padStart(2, "0"));
    updateElement(elements.seconds, String(seconds).padStart(2, "0"));

    return false;
  };

  const hasCountdownElements = Object.values(elements).some(Boolean);

  if (hasCountdownElements && !updateCountdown()) {
    const intervalId = window.setInterval(() => {
      if (updateCountdown()) {
        window.clearInterval(intervalId);
      }
    }, 1000);
  }
})();
