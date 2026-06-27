import { validarNomeCompleto, validarSenhaForte } from "../../util/validators.js";
import { configurarToggleSenha } from "../../util/password-toggle.js";
import { User } from "../../model/user.js";
import { salvarUsuario } from "../../service/api.js";

configurarToggleSenha("togglePassword1", "inputPassword", "iconeSenha1");
configurarToggleSenha("togglePassword2", "inputConfirmPassword", "iconeSenha2");

const formCadastro = document.getElementById("formCadastro");

if (formCadastro) {
  formCadastro.addEventListener("submit", async function (event) {
    event.preventDefault();

    const nome = document.getElementById("inputName").value.trim();
    const email = document.getElementById("inputEmail").value;
    const senha = document.getElementById("inputPassword").value;
    const confirmaSenha = document.getElementById("inputConfirmPassword").value;

    // Validações
    if (!validarNomeCompleto(nome)) {
      alert("Por favor, insira seu nome completo (nome e sobrenome).");
      return;
    }
    if (!validarSenhaForte(senha)) {
      alert("A senha deve conter letras e números e ter no mínimo 6 caracteres.");
      return;
    }
    if (senha !== confirmaSenha) {
      alert("As senhas digitadas não coincidem.");
      return;
    }

    const novoUsuario = new User(nome, email, senha);

    try {
      await salvarUsuario(novoUsuario);

      const usuarios = JSON.parse(localStorage.getItem("users") || "[]");
      usuarios.push(novoUsuario);
      localStorage.setItem("users", JSON.stringify(usuarios));

      alert("Cadastro realizado com sucesso!");

      formCadastro.reset();
      window.location.href = "../login/login.html";
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Erro ao conectar com o servidor. Tente novamente mais tarde.");
    }
  });
}
