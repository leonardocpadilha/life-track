// Arquivo: app/login.js
import { buscarUsuarios } from "../../service/api.js";
import { configurarToggleSenha } from "../../util/password-toggle.js";

// Inicializa o toggle da senha primeiro
configurarToggleSenha("togglePassword", "inputPassword", "iconeSenha");

const formLogin = document.querySelector("form");

if (formLogin) {
  formLogin.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("inputEmail").value;
    const senha = document.getElementById("inputPassword").value;

    if (!email || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const usuarios = await buscarUsuarios();

      const usuarioEncontrado = usuarios.find(
        (u) => u.email === email && u.password === senha,
      );

      if (usuarioEncontrado) {
        localStorage.setItem(
          "userSession",
          JSON.stringify({
            id: usuarioEncontrado.id,
            nome: usuarioEncontrado.name,
            email: usuarioEncontrado.email,
          }),
        );

        alert("Bem-vindo!");
        window.location.href = "../novo-momento/novo-momento.html";
      } else {
        alert("E-mail ou senha incorretos.");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Erro de conexão. Certifique-se de que o JSON Server está rodando.");
    }
  });
}
