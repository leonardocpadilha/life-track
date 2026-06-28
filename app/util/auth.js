export function obterUsuarioLogado() {
  return JSON.parse(localStorage.getItem("userSession"));
}

export function protegerPagina() {
  const usuario = obterUsuarioLogado();

  if (!usuario) {
    window.location.href = "../../pages/login/login.html";
    return null;
  }

  return usuario;
}

export function configurarNavbarUsuario() {
  const usuario = obterUsuarioLogado();

  const nomeUsuario = document.getElementById("navbarUserName");
  const btnUserMenu = document.getElementById("btnUserMenu");
  const userDropdown = document.getElementById("userDropdown");
  const btnLogout = document.getElementById("btnLogout");

  if (usuario && nomeUsuario) {
    nomeUsuario.textContent = usuario.nome.split(" ")[0];
  }

  if (btnUserMenu && userDropdown) {
    btnUserMenu.addEventListener("click", () => {
      userDropdown.classList.toggle("hidden");
    });
  }

  if (btnLogout) {
    btnLogout.addEventListener("click", () => {
      localStorage.removeItem("userSession");
      window.location.href = "../../pages/login/login.html";
    });
  }
}