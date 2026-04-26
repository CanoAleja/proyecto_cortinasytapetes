console.log("Bienvenido a Cortinas y Tapetes");

const menuButton = document.querySelector("#menuToggle");
const menu = document.querySelector(".menu");
const menuLinks = document.querySelectorAll(".menu a");

menuButton.addEventListener("click", function () {
  menu.classList.toggle("active");
});

menuLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    const sectionId = link.getAttribute("href");

    if (!sectionId.startsWith("#")) {
      return;
    }

    const section = document.querySelector(sectionId);

    if (section) {
      event.preventDefault();

      section.scrollIntoView({
        behavior: "smooth"
      });

      menu.classList.remove("active");
    }
  });
});
