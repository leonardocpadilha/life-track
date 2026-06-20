import { configurarToggleSenha } from "./util/password-toggle.js";

configurarToggleSenha("toggleSenha", "inputSenha", "iconeSenha");

const formLogin = document.querySelector("form");
if (formLogin) {
  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Login processado!");
  });
}
