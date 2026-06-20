import { validarNomeCompleto, validarSenhaForte } from "./util/validators.js";
import { configurarToggleSenha } from "./util/password-toggle.js";

configurarToggleSenha("toggleSenha1", "inputPassword", "iconeSenha1");
configurarToggleSenha("toggleSenha2", "inputConfirmPassword", "iconeSenha2");

const formCadastro = document.getElementById("formCadastro");
if (formCadastro) {
  formCadastro.addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("inputName").value.trim();
    const senha = document.getElementById("inputPassword").value;
    const confirmaSenha = document.getElementById("inputConfirmPassword").value;

    if (!validarNomeCompleto(nome)) {
      alert("Por favor, insira nome e sobrenome.");
      return;
    }
    if (!validarSenhaForte(senha)) {
      alert("Senha fraca. Use letras e números (mínimo 6 caracteres).");
      return;
    }
    if (senha !== confirmaSenha) {
      alert("As senhas não coincidem.");
      return;
    }

    alert("Cadastro validado!");
  });
}
