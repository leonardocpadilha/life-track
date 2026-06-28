import { buscarUsuarios } from "../../service/api.js";
import { configurarToggleSenha } from "../../util/password-toggle.js";

configurarToggleSenha("togglePassword", "inputPassword", "iconeSenha");

const formLogin = document.querySelector("form");

// --- LOGIN DO USUÁRIO ---
if (formLogin) {
  formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("inputEmail").value;
    const senha = document.getElementById("inputPassword").value;

    if (!email || !senha) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    //Busca os usuários cadastrados e valida as credenciais
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
      alert("Erro ao conectar com o servidor. Tente novamente mais tarde.");
    }
  });
}
