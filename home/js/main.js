const menuButton = document.querySelector("#menuToggle");
const menu = document.querySelector("#mainMenu");
const menuLinks = document.querySelectorAll(".menu a");
const tipsButton = document.querySelector("#tipsButton");
const tipsPanel = document.querySelector("#tipsPanel");

if (menuButton && menu) {
  menuButton.addEventListener("click", function () {
    menu.classList.toggle("active");
  });
}

menuLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    if (menu) {
      menu.classList.remove("active");
    }
  });
});

if (tipsButton && tipsPanel) {
  tipsButton.addEventListener("click", function () {
    const isHidden = tipsPanel.hasAttribute("hidden");

    if (isHidden) {
      tipsPanel.removeAttribute("hidden");
      tipsButton.textContent = "Ocultar consejos";
    } else {
      tipsPanel.setAttribute("hidden", "");
      tipsButton.textContent = "Ver consejos";
    }
  });
}
