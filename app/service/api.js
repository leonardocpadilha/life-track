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
      body: JSON.stringify(usuario),
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
    body: JSON.stringify(momento),
  });
  return await response.json();
};

// --- API CLOUDINARY ---
export const uploadImagem = async (arquivo) => {
  const formData = new FormData();
  formData.append("file", arquivo);
  formData.append("upload_preset", "ml_default");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();

    if (!response.ok) {
      // Isso vai imprimir no console exatamente o que o Cloudinary recusou
      console.error("Cloudinary retornou erro:", data);
      return null;
    }

    return data.secure_url;
  } catch (error) {
    console.error("Erro na requisição Fetch:", error);
    return null;
  }
};

// --- API MAPBOX ---
export const buscarLocalizacao = async (query) => {
  if (!query) return [];
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(query)}.json?access_token=${MAPBOX_TOKEN}&language=pt-BR&limit=5`;
  const response = await fetch(url);
  const data = await response.json();
  return data.features;
};

// --- ADICIONE ISSO NO SEU api.js ---
export const buscarMomentos = async () => {
  const response = await fetch(`${API_URL}/momentos`);
  if (!response.ok) throw new Error("Erro ao buscar momentos");
  return await response.json();
};
