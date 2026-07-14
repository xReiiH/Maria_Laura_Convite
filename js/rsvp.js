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

  const createSuccessCard = () => {
    let successCard = formCard.querySelector(".rsvp-success");

    if (successCard) {
      return successCard;
    }

    successCard = document.createElement("article");
    successCard.className = "rsvp-success card";
    successCard.hidden = true;
    successCard.tabIndex = -1;
    successCard.setAttribute("aria-live", "polite");

    const title = document.createElement("h3");
    title.textContent = "🎉 Presença registrada!";

    const firstMessage = document.createElement("p");
    firstMessage.textContent = "Obrigado pela confirmação.";

    const secondMessage = document.createElement("p");
    secondMessage.textContent = "Estamos muito felizes por compartilhar esse momento com você.";

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

    return successCard;
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

  const wait = (milliseconds) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));

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
      userAgent: navigator.userAgent || ""
    };

    setSubmitting(true);

    try {
      if (!window.GoogleSheets) {
        throw new Error("Serviço de confirmação indisponível.");
      }

      const [result] = await Promise.all([window.GoogleSheets.send(payload), wait(800)]);

      if (!result?.success) {
        throw new Error(result?.error || "Não foi possível enviar a confirmação.");
      }

      if (result.simulated) {
        console.info("RSVP simulado: configure a URL do Google Apps Script em js/googleSheets.js para enviar respostas reais.");
      }

      setSubmitting(false);
      form.hidden = true;

      const successCard = createSuccessCard();
      successCard.hidden = false;
      successCard.focus();
    } catch (error) {
      setSubmitting(false);
      status.textContent = "Não foi possível registrar sua confirmação. Verifique sua conexão e tente novamente.";
    }
  });
})();
