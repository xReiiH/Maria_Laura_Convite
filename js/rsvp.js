// Responsabilidade: controlar o fluxo de confirmação de presença.
(() => {
  const form = document.getElementById("rsvp-form");

  if (!form) {
    return;
  }

  const nameInput = form.elements.guestName;
  const attendanceInputs = Array.from(form.elements.attendance || []);
  const attendanceField = form.querySelector(".form-field--options");
  const submitButton = form.querySelector(".rsvp-form__submit");
  const GoogleSheets = window.GoogleSheets;
  const status = form.querySelector(".rsvp-form__status");
  const formCard = form.parentElement;
  const originalButtonText = submitButton?.textContent;

  const setError = (field, controls, messageText, errorKey) => {
    if (!field) {
      return;
    }

    const errorId = `rsvp-${errorKey}-error`;
    let error = field.querySelector(`[data-rsvp-error="${errorKey}"]`);

    if (!error) {
      error = document.createElement("p");
      error.dataset.rsvpError = errorKey;
      error.id = errorId;
      error.setAttribute("aria-live", "polite");
      field.append(error);
    }

    error.textContent = messageText;
    field.setAttribute("aria-invalid", "true");
    controls.filter(Boolean).forEach((control) => {
      control.setAttribute("aria-invalid", "true");
      control.setAttribute("aria-describedby", errorId);
    });
  };

  const clearError = (field, controls, errorKey) => {
    if (!field) {
      return;
    }

    field.removeAttribute("aria-invalid");
    field.querySelector(`[data-rsvp-error="${errorKey}"]`)?.remove();
    controls.filter(Boolean).forEach((control) => {
      control.removeAttribute("aria-invalid");
      control.removeAttribute("aria-describedby");
    });
  };

  const normalizeAttendance = (attendanceValue) => String(attendanceValue)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  const updateSuccessCard = (successCard, attendanceValue) => {
    const isConfirmed = normalizeAttendance(attendanceValue) === "sim";
    const title = successCard.querySelector("[data-rsvp-success-title]");
    const firstMessage = successCard.querySelector("[data-rsvp-success-first-message]");
    const secondMessage = successCard.querySelector("[data-rsvp-success-second-message]");

    title.textContent = isConfirmed ? "🎉 Presença confirmada!" : "Resposta registrada";
    firstMessage.textContent = isConfirmed ? "Obrigado pela confirmação." : "Obrigado por nos avisar.";
    secondMessage.textContent = isConfirmed
      ? "Estamos muito felizes por compartilhar esse momento com você."
      : "Sentiremos sua falta, mas agradecemos muito pelo carinho.";

    return title;
  };

  const createSuccessCard = (attendanceValue) => {
    let successCard = formCard.querySelector(".rsvp-success");

    if (successCard) {
      return { successCard, title: updateSuccessCard(successCard, attendanceValue) };
    }

    successCard = document.createElement("article");
    successCard.className = "rsvp-success card";
    successCard.hidden = true;
    successCard.tabIndex = -1;
    successCard.setAttribute("aria-live", "polite");

    const title = document.createElement("h3");
    title.dataset.rsvpSuccessTitle = "";
    title.tabIndex = -1;

    const firstMessage = document.createElement("p");
    firstMessage.dataset.rsvpSuccessFirstMessage = "";

    const secondMessage = document.createElement("p");
    secondMessage.dataset.rsvpSuccessSecondMessage = "";

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.className = "btn btn-secondary";
    editButton.textContent = "Editar resposta";
    editButton.addEventListener("click", () => {
      successCard.hidden = true;
      form.hidden = false;
      nameInput?.focus();
    });

    successCard.append(title, firstMessage, secondMessage, editButton);
    formCard.append(successCard);

    return { successCard, title: updateSuccessCard(successCard, attendanceValue) };
  };

  const validateForm = () => {
    const nameIsValid = Boolean(nameInput?.value.trim());
    const attendanceIsValid = attendanceInputs.some((input) => input.checked);

    if (!nameIsValid) {
      setError(nameInput?.closest(".form-field"), [nameInput], "Informe seu nome.", "name");
    } else {
      clearError(nameInput?.closest(".form-field"), [nameInput], "name");
    }

    if (!attendanceIsValid) {
      setError(attendanceField, attendanceInputs, "Selecione uma opção.", "attendance");
    } else {
      clearError(attendanceField, attendanceInputs, "attendance");
    }

    return { nameIsValid, attendanceIsValid };
  };

  const setSubmitting = (isSubmitting) => {
    submitButton.disabled = isSubmitting;
    submitButton.textContent = isSubmitting ? "Confirmando..." : originalButtonText;
  };

  nameInput?.addEventListener("input", () => {
    if (nameInput.value.trim()) {
      clearError(nameInput.closest(".form-field"), [nameInput], "name");
    }
  });

  attendanceInputs.forEach((input) => {
    input.addEventListener("change", () => {
      clearError(attendanceField, attendanceInputs, "attendance");
    });
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    status.textContent = "";

    const { nameIsValid, attendanceIsValid } = validateForm();

    if (!nameIsValid) {
      nameInput?.focus();
      return;
    }

    if (!attendanceIsValid) {
      attendanceInputs[0]?.focus();
      return;
    }

    const selectedAttendance = attendanceInputs.find((input) => input.checked);
    const payload = {
      nome: nameInput.value.trim(),
      presenca: selectedAttendance?.value === "sim" ? "Sim" : "Não",
      enviadoEm: new Date().toISOString(),
      origem: window.location.href,
      userAgent: navigator.userAgent
    };

    setSubmitting(true);

    try {
      if (!GoogleSheets) {
        throw new Error("Serviço de confirmação indisponível.");
      }

      console.log("[RSVP] Payload enviado:", payload);
      const result = await GoogleSheets.send(payload);

      if (result?.success !== true) {
        throw new Error(result?.error || "Não foi possível enviar a confirmação.");
      }

      setSubmitting(false);
      form.hidden = true;

      const { successCard, title } = createSuccessCard(payload.presenca);
      successCard.hidden = false;
      title.focus();
    } catch (error) {
      setSubmitting(false);
      status.textContent = "Não foi possível registrar sua confirmação. Verifique sua conexão e tente novamente.";
    }
  });
})();
