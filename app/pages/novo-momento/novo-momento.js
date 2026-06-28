import { uploadImagem, salvarMomento, buscarLocalizacao } from "../../service/api.js";
import { protegerPagina, configurarNavbarUsuario } from "../../util/auth.js";

const usuarioLogado = protegerPagina();
configurarNavbarUsuario();

const inputData = document.getElementById('inputDate');

if (inputData) {
    const hoje = new Date();
    const dataFormatada = hoje.toLocaleDateString('en-CA');
    inputData.value = dataFormatada;
}

const form = document.querySelector(".new-moment-form");
const inputBusca = document.getElementById("inputBuscaLocalizacao");
const resultadosMapbox = document.getElementById("resultadosMapbox");
const containerPills = document.getElementById("container-pills");
const inputTag = document.querySelector(
  'input[placeholder="Digite e pressione enter..."]',
);

const estado = {
  categoria: null,
  tags: [],
  sentimento: null,
  localizacao: null,
};

$(".dropify").dropify({
  messages: {
    default: "Arraste uma imagem ou clique para escolher",
    replace: "Arraste ou clique para trocar",
    remove: "Remover",
    error: "Ops, algo deu errado.",
  },
  error: {
    fileSize: "A imagem deve ter no máximo 5MB.",
    fileExtension: "Use apenas imagens JPG, JPEG, PNG ou WEBP.",
  },
});

// 1. FILTRAGEM
function configurarPesquisa(idInput, classeItens) {
  const input = document.getElementById(idInput);
  if (!input) return;

  input.addEventListener("input", (e) => {
    const termo = e.target.value.toLowerCase().trim();
    document.querySelectorAll(`.${classeItens}`).forEach((item) => {
      const texto = (item.dataset.search || item.textContent).toLowerCase().trim();
      item.classList.toggle("hidden", !texto.includes(termo));
    });
  });
}

// 3. RENDERIZAÇÃO
function renderizarPills() {
  containerPills.innerHTML = "";
  if (estado.categoria)
    criarPillVisual(
      estado.categoria,
      () => {
        estado.categoria = null;
        renderizarPills();
      },
      false,
    );
  if (estado.localizacao)
    criarPillVisual(
      estado.localizacao,
      () => {
        estado.localizacao = null;
        renderizarPills();
      },
      false,
    );
  if (estado.sentimento)
    criarPillVisual(
      estado.sentimento,
      () => {
        estado.sentimento = null;
        renderizarPills();
      },
      true,
    );
  estado.tags.forEach((tag) => {
    criarPillVisual(tag, () => {
      estado.tags = estado.tags.filter((t) => t !== tag);
      renderizarPills();
    });
  });
}

function criarPillVisual(conteudo, onRemove, ehIcone) {
  const pill = document.createElement("span");
  pill.className = "pill-actions";
  const display = ehIcone ? `<iconify-icon icon="${conteudo}"></iconify-icon>` : conteudo;
  pill.innerHTML = `${display} <iconify-icon icon="material-symbols:close" style="cursor:pointer"></iconify-icon>`;
  pill.querySelector("iconify-icon[icon='material-symbols:close']").onclick = onRemove;
  containerPills.appendChild(pill);
}

// Ativações
configurarPesquisa("inputBuscaCategoria", "category-option");
configurarPesquisa("inputBuscaSentimento", "feeling-option");

// ... (Restante do seu código original de Tags, Mapbox, Submit e Cliques permanece inalterado)

// INPUT TAGS
inputTag.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    if (estado.tags.length >= 5) {
      alert("Você pode adicionar no máximo 5 tags por momento!");
      return;
    }

    const rawValue = inputTag.value.trim();
    const valor = rawValue.startsWith("#") ? rawValue : `#${rawValue}`;
    if (valor !== "#" && !estado.tags.includes(valor)) {
      estado.tags.push(valor);
      inputTag.value = "";
      renderizarPills();
    }
  }
});

// MAPBOX
inputBusca.addEventListener("input", async (e) => {
  const resultados = await buscarLocalizacao(e.target.value);
  resultadosMapbox.innerHTML = "";
  resultados.forEach((res) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "dropdown-item";
    btn.innerText = res.place_name;
    btn.onclick = () => {
      estado.localizacao = res.place_name;
      inputBusca.value = res.place_name;
      resultadosMapbox.innerHTML = "";
      renderizarPills();
    };
    resultadosMapbox.appendChild(btn);
  });
});

// CLIQUE CATEGORIA E SENTIMENTO
document.querySelectorAll(".category-option, .feeling-option").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.classList.contains("category-option")) {
      estado.categoria = btn.innerText.trim();
    } else if (btn.classList.contains("feeling-option")) {
      // Pega o valor do atributo, garantindo que não seja nulo
      const valor = btn.getAttribute("data-value");
      if (valor) estado.sentimento = valor;
    }
    renderizarPills();
  });
});

// ENVIO
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const inputTitle = document.getElementById("inputTitle");
  const inputDescricao = document.getElementById("inputDescricao");
  const fileInput = document.getElementById("inputImage");

  if (inputTitle.value.length > 35) {
    return alert("O título deve ter no máximo 35 caracteres.");
  }

  if (inputDescricao.value.length > 400) {
    return alert("A descrição deve ter no máximo 400 caracteres.");
  }

  if (!fileInput.files[0]) return alert("Por favor, insira uma imagem ao seu momento!");

  try {
    // Mostra um aviso visual se a rede for lenta (opcional, mas recomendado)
    const btnSubmit = e.target.querySelector('button[type="submit"]');
    if (btnSubmit) btnSubmit.disabled = true;

    const urlFoto = await uploadImagem(fileInput.files[0]);

    if (!urlFoto) throw new Error("Falha ao obter URL da imagem");

    await salvarMomento({
      usuarioId: usuarioLogado.id,
      titulo: document.getElementById("inputTitle").value,
      data: document.getElementById("inputDate").value,
      descricao: document.getElementById("inputDescricao").value,
      foto: urlFoto,
      categoria: estado.categoria,
      tags: estado.tags,
      sentimento: estado.sentimento,
      localizacao: estado.localizacao,
      favorito: document.getElementById("inputFavorito").checked,
      criadoEm: new Date().toISOString(),
    });
    
    alert("Seu momento foi registrado!");
    
  } catch (error) {
    // Mantemos apenas um alerta amigável
    alert("Ops, não foi possível salvar o momento. Tente novamente.");

    // Habilitamos o botão novamente caso ocorra erro
    const btnSubmit = e.target.querySelector('button[type="submit"]');
    if (btnSubmit) btnSubmit.disabled = false;
  }
});

