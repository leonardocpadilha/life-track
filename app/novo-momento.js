// 1. IMPORTAÇÕES (No topo do arquivo)
import { uploadImagem, salvarMomento, buscarLocalizacao } from "./service/api.js";

// 2. SELEÇÃO DOS ELEMENTOS DO DOM
const form = document.querySelector(".new-moment-form");
const inputBusca = document.getElementById("inputBuscaLocalizacao");
const resultadosMapbox = document.getElementById("resultadosMapbox");

// 3. LÓGICA DO MAPBOX (Autocomplete)
// Você adiciona este bloco logo abaixo das seleções de elementos
inputBusca.addEventListener("input", async (e) => {
  const resultados = await buscarLocalizacao(e.target.value);
  resultadosMapbox.innerHTML = "";
  resultados.forEach((res) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "dropdown-item";
    btn.innerText = res.place_name;
    btn.onclick = () => {
      inputBusca.value = res.place_name;
      resultadosMapbox.innerHTML = "";
    };
    resultadosMapbox.appendChild(btn);
  });
});

// 4. LÓGICA DE ENVIO (O seu código original que já estava lá)
// Este bloco já existe no seu arquivo, só certifique-se de usar a função salvarMomento
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fileInput = document.getElementById("inputImage");
  const titulo = document.getElementById("inputTitle").value;
  const data = document.getElementById("inputDate").value;
  const descricao = document.getElementById("inputDescricao").value;
  const localizacaoEscolhida = inputBusca.value; // Pega o valor que foi selecionado no dropdown

  if (!fileInput.files[0]) {
    alert("Por favor, selecione uma imagem!");
    return;
  }

  try {
    alert("Enviando imagem para a nuvem...");

    const urlFoto = await uploadImagem(fileInput.files[0]);

    const novoMomento = {
      titulo,
      data,
      descricao,
      foto: urlFoto,
      localizacao: localizacaoEscolhida,
      criadoEm: new Date().toISOString(),
    };

    // Usa a função do api.js
    await salvarMomento(novoMomento);

    alert("Momento registrado com sucesso!");
    form.reset();
    window.location.href = "timeline.html";
  } catch (error) {
    console.error("Erro ao salvar:", error);
    alert("Ops, algo deu errado no upload ou no salvamento.");
  }
});
