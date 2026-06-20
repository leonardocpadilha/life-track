export function configurarToggleSenha(idBotao, idInput, idIcone) {
    const botaoToggle = document.getElementById(idBotao);
    const inputSenha = document.getElementById(idInput);
    const icone = document.getElementById(idIcone);

    if (botaoToggle && inputSenha && icone) {
        botaoToggle.addEventListener("click", () => {
            if (inputSenha.type === "password") {
                inputSenha.type = "text";
                icone.setAttribute("icon", "heroicons-solid:eye-slash");
            } else {
                inputSenha.type = "password";
                icone.setAttribute("icon", "heroicons-solid:eye");
            }
        });
    }
}