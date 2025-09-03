<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/intl-tel-input@23.7.3/build/css/intlTelInput.css">
<script src="https://cdn.jsdelivr.net/npm/intl-tel-input@23.7.3/build/js/intlTelInput.min.js"></script>
<style>
  .iti__country-container{ z-index: 9999999; }
  .iti { width: 100%; }
  .personalized_error { border-color: #e63946 !important; }
  .iti input {
  padding-left: 60px !important;
}
</style>

<script>
  const DEFAULT_DDI = "+1";
  const DEFAULT_COUNTRY = "us"; // "br" para Brasil, "pt", "es", etc.
  const INPUT_IDS = ["input_1756813359"];

  function mountAll() {
    INPUT_IDS.forEach((inputId) => {
      document.querySelectorAll(".e_formulario #"+inputId).forEach(initIfNeeded);
      document.querySelectorAll(".gpc_modal .e_formulario #"+inputId).forEach(initIfNeeded);
    });
  }

  function initIfNeeded(input) {
    if (input.dataset.itiInitialized === "1") return;
    InstallDDI(input);
    input.dataset.itiInitialized = "1";
  }

  const observer = new MutationObserver(() => mountAll());
  observer.observe(document.body, { childList: true, subtree: true });

  document.body.addEventListener("click", (e) => {
    if (e.target.closest(".link_popup")) {
      setTimeout(mountAll, 300);
    }
  });

  document.addEventListener("DOMContentLoaded", mountAll);

  function InstallDDI(input) {
    const wrapper = input.closest(".gpc_campos") || input.parentElement;
    if (wrapper) wrapper.style.zIndex = "9999999";
    const fieldset = input.closest("fieldset");
    if (fieldset) fieldset.style.zIndex = "9999999";

    const iti = window.intlTelInput(input, {
      initialCountry: DEFAULT_COUNTRY,
      nationalMode: false,        
      formatOnDisplay: true,
      strictMode: true,        
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@23.7.3/build/js/utils.js",
      customPlaceholder: (ph) => ph
    });

    input.addEventListener("input", () => clearError(input));

    input.addEventListener("countrychange", () => {
      clearError(input);
    });

    input.addEventListener("blur", () => {
      normalizeAndValidate(input, iti);
    });

    const form = input.closest("form");
    if (form) {
      const originalSubmit = form.onsubmit;
      form.onsubmit = (e) => {
        const ok = normalizeAndValidate(input, iti);
        if (!ok) {
          e.preventDefault();
          return false;
        }
        if (typeof originalSubmit === "function") {
          return originalSubmit.call(form, e);
        }
      };
    }
  }

  function normalizeAndValidate(input, iti) {
    try {
      const value = iti.getNumber();
      if (value) input.value = value;
    } catch (_) {
    }

    if (iti.isValidNumber()) {
      clearError(input);
      return true;
    } else {
      setError(input, "Telefone inválido");
      return false;
    }
  }

  function setError(input, message) {
    input.classList.add("personalized_error");
    const box = input.closest(".gpc_campos");
    const error = box ? box.querySelector(".gpc_campos-erro") : null;
    if (error) error.setAttribute("data-gtt", message || "Telefone inválido");
  }

  function clearError(input) {
    input.classList.remove("personalized_error");
    const box = input.closest(".gpc_campos");
    const error = box ? box.querySelector(".gpc_campos-erro") : null;
    if (error) error.setAttribute("data-gtt", "");
  }
</script>
