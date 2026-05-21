const filterButtons = document.querySelectorAll("[data-filter]");
const productItems = document.querySelectorAll(".product-item");
const catalogCount = document.querySelector("#catalogCount");
const productCards = document.querySelectorAll(".product-card");
const productModalElement = document.querySelector("#productModal");
const modalImage = document.querySelector("#modalImage");
const modalTitle = document.querySelector("#modalTitle");
const modalText = document.querySelector("#modalText");
const modalCategory = document.querySelector("#modalCategory");
const contactForm = document.querySelector("#contactForm");
const formMessage = document.querySelector("#formMessage");
const randomTipButton = document.querySelector("#randomTipButton");
const randomTip = document.querySelector("#randomTip");

function updateCatalogCount() {
  if (!catalogCount || productItems.length === 0) {
    return;
  }

  const visibleProducts = Array.from(productItems).filter(function (item) {
    return !item.classList.contains("is-hidden");
  });

  catalogCount.textContent = "Mostrando " + visibleProducts.length + " de " + productItems.length + " productos.";
}

if (filterButtons.length > 0 && productItems.length > 0) {
  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const selectedCategory = button.dataset.filter;

      filterButtons.forEach(function (currentButton) {
        currentButton.classList.remove("active");
      });

      button.classList.add("active");

      productItems.forEach(function (item) {
        const productCategory = item.dataset.category;
        const shouldShow = selectedCategory === "todos" || selectedCategory === productCategory;
        item.classList.toggle("is-hidden", !shouldShow);
      });

      updateCatalogCount();
    });
  });

  updateCatalogCount();
}

if (productCards.length > 0 && productModalElement && window.bootstrap) {
  const productModal = new bootstrap.Modal(productModalElement);

  productCards.forEach(function (card) {
    card.addEventListener("click", function () {
      const item = card.closest(".product-item");
      const image = card.querySelector("img");
      const title = card.querySelector(".card-title");
      const text = card.querySelector(".card-text");
      const category = item ? item.dataset.category : "producto";

      modalImage.src = image.src;
      modalImage.alt = image.alt;
      modalTitle.textContent = title.textContent;
      modalText.textContent = text.textContent;
      modalCategory.textContent = category;

      productModal.show();
    });
  });
}

function setInvalid(field, message) {
  const feedback = field.parentElement.querySelector(".invalid-feedback");

  field.classList.toggle("is-invalid", Boolean(message));
  field.classList.toggle("is-valid", !message && field.value.trim() !== "");

  if (feedback) {
    feedback.textContent = message;
  }
}

function validateContactForm() {
  const name = contactForm.querySelector("#nombre");
  const phone = contactForm.querySelector("#telefono");
  const email = contactForm.querySelector("#correo");
  const product = contactForm.querySelector("#tipoProducto");
  const message = contactForm.querySelector("#mensaje");
  let isValid = true;

  [name, phone, email, product, message].forEach(function (field) {
    setInvalid(field, "");
  });

  if (name.value.trim().length < 3) {
    setInvalid(name, "Escribe un nombre de al menos 3 caracteres.");
    isValid = false;
  }

  if (!/^[0-9\s+()-]{7,}$/.test(phone.value.trim())) {
    setInvalid(phone, "Escribe un telefono valido.");
    isValid = false;
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
    setInvalid(email, "Escribe un correo valido.");
    isValid = false;
  }

  if (product.value === "") {
    setInvalid(product, "Selecciona un producto de interes.");
    isValid = false;
  }

  if (message.value.trim().length < 10) {
    setInvalid(message, "El mensaje debe tener al menos 10 caracteres.");
    isValid = false;
  }

  return isValid;
}

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    formMessage.className = "alert d-none mb-0";
    formMessage.textContent = "";

    if (!validateContactForm()) {
      formMessage.className = "alert alert-danger mb-0";
      formMessage.textContent = "Revisa los campos marcados antes de enviar.";
      return;
    }

    const customerName = contactForm.querySelector("#nombre").value.trim();
    const product = contactForm.querySelector("#tipoProducto").value;

    formMessage.className = "alert alert-success mb-0";
    formMessage.textContent = "Gracias, " + customerName + ". Tu solicitud sobre " + product + " fue validada correctamente. Te contactaremos pronto.";
    contactForm.reset();

    contactForm.querySelectorAll(".is-valid").forEach(function (field) {
      field.classList.remove("is-valid");
    });
  });
}

const tips = [
  "Para habitaciones, combina una tela liviana con una opcion que aporte privacidad.",
  "En oficinas conviene priorizar persianas que reduzcan reflejos en pantallas.",
  "Gira los tapetes cada cierto tiempo para que el desgaste sea uniforme.",
  "Los tonos claros ayudan a que espacios pequenos se sientan mas amplios.",
  "Antes de lavar cortinas, aspira el polvo para evitar manchas sobre la tela.",
  "Si tienes mascotas, elige tapetes faciles de aspirar y con fibras resistentes."
];

if (randomTipButton && randomTip) {
  randomTipButton.addEventListener("click", function () {
    const currentTip = randomTip.textContent;
    let nextTip = tips[Math.floor(Math.random() * tips.length)];

    if (tips.length > 1) {
      while (nextTip === currentTip) {
        nextTip = tips[Math.floor(Math.random() * tips.length)];
      }
    }

    randomTip.textContent = nextTip;
  });
}
