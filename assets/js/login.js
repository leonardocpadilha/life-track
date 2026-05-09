const inputSenha = document.getElementById("inputSenha");
const botaoToggle = document.getElementById("toggleSenha");
const icone = document.getElementById("iconeSenha");

botaoToggle.addEventListener("click", () => {

    if (inputSenha.type === "password") {

        inputSenha.type = "text";

        iconeSenha.setAttribute(
            "icon",
            "heroicons-solid:eye-slash"
        );

    } else {

        inputSenha.type = "password";

        iconeSenha.setAttribute(
            "icon",
            "heroicons-solid:eye"
        );

    }

});