// Responsabilidade: controlar a reprodução de música do convite.
(() => {
  const audio = document.getElementById("background-music");
  const toggle = document.getElementById("music-toggle");
  const toggleText = toggle?.querySelector(".music-toggle__text");

  if (!audio || !toggle || typeof audio.play !== "function") {
    return;
  }

  const updateToggle = (isPlaying) => {
    const label = isPlaying ? "Pausar música" : "Ativar música";

    toggle.classList.toggle("is-playing", isPlaying);
    toggle.setAttribute("aria-pressed", String(isPlaying));
    toggle.setAttribute("aria-label", label);
    toggle.title = label;

    if (toggleText) {
      toggleText.textContent = label;
    }
  };

  const removeFirstGestureListeners = () => {
    document.removeEventListener("click", handleFirstGesture);
    document.removeEventListener("touchstart", handleFirstGesture);
    document.removeEventListener("keydown", handleFirstGesture);
  };

  const playMusic = () => {
    let playRequest;

    try {
      playRequest = audio.play();
    } catch (error) {
      updateToggle(false);
      return;
    }

    if (!playRequest || typeof playRequest.then !== "function") {
      updateToggle(!audio.paused);
      return;
    }

    playRequest
      .then(() => updateToggle(true))
      .catch(() => updateToggle(false));
  };

  const handleFirstGesture = (event) => {
    if (event.target === toggle || toggle.contains(event.target)) {
      return;
    }

    removeFirstGestureListeners();
    playMusic();
  };

  const handleToggle = () => {
    removeFirstGestureListeners();

    if (audio.paused) {
      playMusic();
      return;
    }

    audio.pause();
  };

  try {
    audio.volume = 0.25;
  } catch (error) {
    updateToggle(false);
  }
  audio.addEventListener("play", () => updateToggle(true));
  audio.addEventListener("pause", () => updateToggle(false));
  audio.addEventListener("error", () => updateToggle(false));
  toggle.addEventListener("click", handleToggle);
  document.addEventListener("click", handleFirstGesture);
  document.addEventListener("touchstart", handleFirstGesture, { passive: true });
  document.addEventListener("keydown", handleFirstGesture);
  updateToggle(false);
})();
