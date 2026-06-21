const API_URL = "http://localhost:3000";
const CLOUD_NAME = "docmbz5tz";
const UPLOAD_PRESET = "ml_default";
const MAPBOX_TOKEN = "MEU_TOKEN";

// --- FUNÇÕES DE USUÁRIO ---
export const salvarUsuario = async (usuario) => {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(usuario)
        });
        return await response.json();
    } catch (error) {
        console.error("Erro ao salvar usuário:", error);
        throw error;
    }
};

export const buscarUsuarios = async () => {
    const response = await fetch(`${API_URL}/users`);
    return await response.json();
};

// --- FUNÇÕES DE MOMENTOS ---
export const salvarMomento = async (momento) => {
    const response = await fetch(`${API_URL}/momentos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(momento)
    });
    return await response.json();
};

// --- API CLOUDINARY ---
export const uploadImagem = async (arquivo) => {
    const formData = new FormData();
    formData.append("file", arquivo);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData
    });
    const data = await response.json();
    return data.secure_url;
};

// --- API MAPBOX ---
export const buscarLocalizacao = async (query) => {
    if (!query) return [];
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_TOKEN}&language=pt-BR&limit=5`;
    const response = await fetch(url);
    const data = await response.json();
    return data.features;
};