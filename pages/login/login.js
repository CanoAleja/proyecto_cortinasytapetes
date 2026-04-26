const loginForm = document.querySelector("#loginForm");
const message = document.querySelector("#message");

const correctUser = "admin";
const correctPassword = "1234";

loginForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const usuario = document.querySelector("#usuario").value;
  const password = document.querySelector("#password").value;

  if (usuario === correctUser && password === correctPassword) {
    window.location.href = "../../home/index.html";
  } else {
    message.textContent = "Usuario o password incorrecto";
  }
});
