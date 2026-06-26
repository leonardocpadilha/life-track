import { uploadImagem, salvarMomento, buscarLocalizacao } from "./service/api.js";

const form = document.querySelector(".new-moment-form");
const inputBusca = document.getElementById("inputBuscaLocalizacao");
const resultadosMapbox = document.getElementById("resultadosMapbox");
const containerPills = document.getElementById("container-pills");
const inputTag = document.querySelector(
  'input[placeholder="Digite e pressione enter..."]',
);

// Elementos de Imagem
const inputImage = document.getElementById("inputImage");
const previewContainer = document.getElementById("previewContainer");
const previewImage = document.getElementById("previewImage");
const uploadContent = document.getElementById("uploadContent");

const estado = {
  categoria: null,
  tags: [],
  sentimento: null,
  localizacao: null,
};

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

// 2. LÓGICA DE IMAGEM (Pré-visualização)
inputImage.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    previewImage.src = event.target.result;

    // Remove a classe 'hidden' para mostrar a imagem e o container
    previewContainer.classList.remove("hidden");
    previewImage.classList.remove("hidden");

    // Adiciona a classe 'hidden' para esconder o conteúdo de upload
    uploadContent.classList.add("hidden");

    adicionarBotaoExcluir();
  };
  reader.readAsDataURL(file);
});

function adicionarBotaoExcluir() {
  if (document.getElementById("btnRemover")) return;

  const btnRemover = document.createElement("button");
  btnRemover.id = "btnRemover";
  btnRemover.type = "button";
  btnRemover.className = "btn btn-lt-alter-image";
  btnRemover.innerHTML = "Alterar Imagem";

  btnRemover.onclick = (e) => {
    e.preventDefault();

    // Inverte a lógica: esconde a imagem, mostra o conteúdo inicial
    previewContainer.classList.add("hidden");
    previewImage.classList.add("hidden");
    uploadContent.classList.remove("hidden");

    inputImage.value = "";
    btnRemover.remove();
  };

  previewContainer.appendChild(btnRemover);
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

  if (inputTitle.value.length > 50) {
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
      titulo: document.getElementById("inputTitle").value,
      data: document.getElementById("inputDate").value,
      descricao: document.getElementById("inputDescricao").value,
      foto: urlFoto,
      categoria: estado.categoria,
      tags: estado.tags,
      sentimento: estado.sentimento,
      localizacao: estado.localizacao,
      criadoEm: new Date().toISOString(),
    });

    window.location.href = "timeline.html";
  } catch (error) {
    // Mantemos apenas um alerta amigável
    alert("Ops, não foi possível salvar o momento. Tente novamente.");

    // Habilitamos o botão novamente caso ocorra erro
    const btnSubmit = e.target.querySelector('button[type="submit"]');
    if (btnSubmit) btnSubmit.disabled = false;
  }
});
