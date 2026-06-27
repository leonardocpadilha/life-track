import { buscarMomentos } from "../../service/api.js";

let todosMomentos = [];
let filtroDataInicio = "";
let filtroDataFim = "";

function formatarDataMomento(data) {
  if (!data) return "";

  const [ano, mes, dia] = data.split("-").map(Number);

  return new Date(ano, mes - 1, dia)
    .toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
    })
    .toUpperCase();
}

// Função para montar o HTML do card
function montarCard(momento) {
  const detalhes = [];

  if (momento.categoria) detalhes.push(momento.categoria);

  if (momento.tags && momento.tags.length > 0) {
    momento.tags.forEach((tag) => detalhes.push(tag));
  }

  if (momento.localizacao) {
    detalhes.push(
      `<iconify-icon icon="material-symbols:location-on"></iconify-icon> ${momento.localizacao}`,
    );
  }

  if (momento.sentimento) {
    detalhes.push(`<iconify-icon icon="${momento.sentimento}"></iconify-icon>`);
  }

  const pilsHtml = detalhes
    .map(
      (item) =>
        `<span class="badge rounded-pill pill-details d-flex align-items-center gap-1">${item}</span>`,
    )
    .join("");

  const favoritoHtml = momento.favorito
    ? `<div class="moment-favorite-icon">
        <iconify-icon icon="mdi:heart"></iconify-icon>
      </div>`
    : "";

  return `
    <div class="moment-wrapper py-md-2">
        <div class="moment-header d-flex align-items-center position-relative mb-3">
            <div class="moment-date m-0">${formatarDataMomento(momento.data)}</div>
            <button type="button" class="btn btn-lt-delete rounded-pill position-absolute start-50 translate-middle-x" onclick="excluirMomento('${momento.id}')">
                &times; Excluir 
            </button>
        </div>
        <div class="card moment-card d-flex flex-column gap-1 p-3">
            <div class="moment-image">
                ${favoritoHtml}
                <img src="${momento.foto}" class="img-fluid img-card" alt="${momento.titulo}" loading="lazy">
            </div>
            <div class="moment-details d-flex flex-wrap gap-2 mb-2">
                ${pilsHtml}
            </div>
            <div class="moment-content">
                <div class="content-title"><h3>${momento.titulo}</h3></div>
                <div class="moment-description" onclick="toggleDescricao(this)">
                  <p class="desc-text">${momento.descricao}</p>
                </div>
            </div>
        </div>
    </div>
  `;
}

// Inicializa a lógica dos botões usando a largura real de um card
function inicializarCarrossel() {
  const btnLeft = document.getElementById("btnPrev");
  const btnRight = document.getElementById("btnNext");
  const container = document.getElementById("timelineContainer");

  if (!btnLeft || !btnRight || !container) return;

  const getCardWidth = () =>
    container.querySelector(".moment-wrapper")?.offsetWidth || 300;

  btnRight.onclick = () => {
    container.scrollBy({ left: getCardWidth(), behavior: "smooth" });
  };

  btnLeft.onclick = () => {
    container.scrollBy({ left: -getCardWidth(), behavior: "smooth" });
  };
}

function rolarParaFinalTimeline() {
  const container = document.getElementById("timelineContainer");

  if (!container) return;

  container.scrollLeft = container.scrollWidth;
}

function filtrarMomentosPorData(momentos) {
  if (!filtroDataInicio && !filtroDataFim) {
    return momentos;
  }

  return momentos.filter((momento) => {
    if (!momento.data) return false;

    const dataMomento = String(momento.data).slice(0, 10);

    if (filtroDataInicio && momento.data < filtroDataInicio) return false;
    if (filtroDataFim && momento.data > filtroDataFim) return false;

    return true;
  });
}

function renderizarTimeline(momentos) {
  const container = document.getElementById("timelineContainer");

  if (!container) return;

  if (momentos.length === 0) {
    container.innerHTML =
      "<h4 class='text-center text-dark'>Ops! Nenhum momento encontrado nesse período</h4>";
    return;
  }

  container.innerHTML = momentos.map((m) => montarCard(m)).join("");

  const cards = document.querySelectorAll(".moment-card");

  cards.forEach((card) => {
    const precisaExpandir = card.scrollHeight > 450;

    if (!precisaExpandir) {
      card.classList.add("no-expand");
    }

    card.addEventListener("click", toggleCard);
  });

  inicializarCarrossel();

  requestAnimationFrame(rolarParaFinalTimeline);
}

async function carregarTimeline() {
  try {
    const momentos = await buscarMomentos();

    todosMomentos = momentos.sort((a, b) => a.data.localeCompare(b.data));

    if (todosMomentos.length === 0) {
      const container = document.getElementById("timelineContainer");
      container.innerHTML = "<p class='text-center'>Nenhum momento registrado ainda.</p>";
      return;
    }

    renderizarTimeline(filtrarMomentosPorData(todosMomentos));
  } catch (error) {
    console.error("Erro ao carregar timeline:", error);
  }
}

function toggleCard(e) {
  const card = e.currentTarget;
  const wrapper = card.closest(".moment-wrapper");
  const jaEstaAtivo = card.classList.contains("active-card");

  const cards = document.querySelectorAll(".moment-card");
  const wrappers = document.querySelectorAll(".moment-wrapper");

  cards.forEach((outroCard) => {
    outroCard.classList.remove("active-card");
    outroCard.classList.remove("expanded");
  });

  wrappers.forEach((outroWrapper) => {
    outroWrapper.classList.remove("active-moment");
  });

  if (jaEstaAtivo) return;

  card.classList.add("active-card");
  wrapper.classList.add("active-moment");

  if (!card.classList.contains("no-expand")) {
    card.classList.add("expanded");
  }
}

let momentoParaExcluirId = null;
let deleteMomentModal = null;

window.excluirMomento = (id) => {
  momentoParaExcluirId = id;

  const modalElement = document.getElementById("deleteMomentModal");

  if (!deleteMomentModal) {
    deleteMomentModal = new bootstrap.Modal(modalElement);
  }

  deleteMomentModal.show();
};

function aplicarFiltroData() {
  const inputDataInicio = document.getElementById("filterStartDate");
  const inputDataFim = document.getElementById("filterEndDate");

  filtroDataInicio = inputDataInicio?.value || "";
  filtroDataFim = inputDataFim?.value || "";

  renderizarTimeline(filtrarMomentosPorData(todosMomentos));

  const modalElement = document.getElementById("dateFilterModal");
  const modal = bootstrap.Modal.getInstance(modalElement);

  if (modal) {
    modal.hide();
  }
}

function limparFiltroData() {
  const inputDataInicio = document.getElementById("filterStartDate");
  const inputDataFim = document.getElementById("filterEndDate");

  filtroDataInicio = "";
  filtroDataFim = "";

  if (inputDataInicio) inputDataInicio.value = "";
  if (inputDataFim) inputDataFim.value = "";

  renderizarTimeline(todosMomentos);

  const modalElement = document.getElementById("dateFilterModal");
  const modal = bootstrap.Modal.getInstance(modalElement);

  if (modal) {
    modal.hide();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  carregarTimeline();

  const confirmDeleteButton = document.getElementById("confirmDeleteMoment");

  confirmDeleteButton.addEventListener("click", async () => {
    if (!momentoParaExcluirId) return;

    await fetch(`http://localhost:3000/momentos/${momentoParaExcluirId}`, {
      method: "DELETE",
    });

    momentoParaExcluirId = null;
    deleteMomentModal.hide();
    carregarTimeline();
  });

  const applyDateFilterButton = document.getElementById("applyDateFilter");
  const clearDateFilterButton = document.getElementById("clearDateFilter");

  if (applyDateFilterButton) {
    applyDateFilterButton.addEventListener("click", aplicarFiltroData);
  }

  if (clearDateFilterButton) {
    clearDateFilterButton.addEventListener("click", limparFiltroData);
  }
});
