const API_URL = "http://localhost:3000";

export const salvarUsuario = async (usuario) => {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });
        return await response.json();
    } catch (error) {
        console.error("Erro ao salvar no JSON Server:", error);
        throw error;
    }
};

export const buscarUsuarios = async () => {
    const response = await fetch("http://localhost:3000/users");
    return await response.json();
};