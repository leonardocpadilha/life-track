import { buscarMomentos } from "./service/api.js";

// Função para montar o HTML do card
function montarCard(momento) {
  const detalhes = [];
  if (momento.categoria) detalhes.push(momento.categoria);
  if (momento.tags && momento.tags.length > 0) {
    momento.tags.forEach((tag) => detalhes.push(tag));
  }
  if (momento.localizacao)
    detalhes.push(`<iconify-icon icon="material-symbols:location-on"></iconify-icon> ${momento.localizacao}`);
  if (momento.sentimento)
    detalhes.push(`<iconify-icon icon="${momento.sentimento}"></iconify-icon>`);

  const pilsHtml = detalhes
    .map((item) => `<span class="badge rounded-pill pill-details d-flex align-items-center gap-1">${item}</span>`)
    .join("");

  return `
    <div class="moment-wrapper py-md-2">
        <div class="moment-header d-flex align-items-center position-relative mb-3">
            <div class="moment-date m-0">${new Date(momento.data).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }).toUpperCase()}</div>
            <button type="button" class="btn btn-lt-delete rounded-pill position-absolute start-50 translate-middle-x" onclick="excluirMomento('${momento.id}')">
                &times; Excluir 
            </button>
        </div>
        <div class="card moment-card d-flex flex-column gap-1 p-3">
            <div class="moment-image">
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

    // Calcula a largura de um card para rolar exatamente uma unidade
    const getCardWidth = () => container.querySelector('.moment-wrapper')?.offsetWidth || 300;

    btnRight.addEventListener("click", () => {
        const cardWidth = container.querySelector('.moment-wrapper').offsetWidth;
        container.scrollBy({ left: getCardWidth(), behavior: 'smooth' });
        requestAnimationFrame(atualizarAtivo);
    });

    btnLeft.addEventListener("click", () => {
        container.scrollBy({ left: -getCardWidth(), behavior: 'smooth' });
        requestAnimationFrame(atualizarAtivo);
    });
}

async function carregarTimeline() {
  try {
    const momentos = await buscarMomentos();
    const container = document.getElementById("timelineContainer");

    if (momentos.length === 0) {
      container.innerHTML = "<p class='text-center'>Nenhum momento registrado ainda.</p>";
      return;
    }

    momentos.sort((a, b) => new Date(a.criadoEm) - new Date(b.criadoEm));

    container.innerHTML = momentos.map(m => montarCard(m)).join("");

    requestAnimationFrame(atualizarAtivo);

    const cards = document.querySelectorAll(".moment-card");

    cards.forEach(card => {
      const precisaExpandir = card.scrollHeight > 450;

      if (!precisaExpandir) {
        card.classList.add("no-expand");
      }

      card.addEventListener("click", toggleCard);
    });

    inicializarCarrossel();

    requestAnimationFrame(() => {
      atualizarAtivo();
    });

  } catch (error) {
    console.error("Erro ao carregar timeline:", error);
  }
}

function toggleCard(e) {
  const card = e.currentTarget;

  if (card.classList.contains("no-expand")) return;

  card.classList.toggle("expanded");
}

function atualizarAtivo() {
  const container = document.getElementById("timelineContainer");
  const cards = document.querySelectorAll(".moment-card");

  if (!container || cards.length === 0) return;

  const containerRect = container.getBoundingClientRect();

  let maisVisivel = cards[0];
  let maiorArea = 0;

  cards.forEach(card => {
    const rect = card.getBoundingClientRect();

    const overlap =
      Math.max(
        0,
        Math.min(rect.right, containerRect.right) -
        Math.max(rect.left, containerRect.left)
      );

    if (overlap > maiorArea) {
      maiorArea = overlap;
      maisVisivel = card;
    }
  });

  cards.forEach(c => c.classList.remove("active-card"));
  maisVisivel.classList.add("active-card");
}

window.excluirMomento = async (id) => {
  if (confirm("Deseja realmente excluir este momento?")) {
    await fetch(`http://localhost:3000/momentos/${id}`, { method: "DELETE" });
    carregarTimeline();
  }
};

document.addEventListener("DOMContentLoaded", carregarTimeline);