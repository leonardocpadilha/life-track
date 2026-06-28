import { buscarMomentosDoUsuario } from "../../service/api.js";
import { protegerPagina, configurarNavbarUsuario } from "../../util/auth.js";

const usuarioLogado = protegerPagina();
configurarNavbarUsuario();

const MIN_MOMENTOS_PARA_INSIGHTS = 5;

const SENTIMENTOS_LABELS = {
  "material-symbols:sentiment-very-satisfied-outline": "Feliz",
  "material-symbols:sentiment-calm-outline": "Tranquilo",
  "material-symbols:favorite-outline": "Apaixonado",
  "material-symbols:celebration-outline": "Empolgado",
  "material-symbols:volunteer-activism-outline": "Grato",
  "material-symbols:workspace-premium-outline": "Orgulhoso",
  "material-symbols:sentiment-frustrated-outline": "Frustrado",
  "material-symbols:sentiment-sad-outline": "Triste",
  "material-symbols:sentiment-surprised-outline": "Surpreso",
  "material-symbols:sentiment-angry-outline": "Raiva",
  "material-symbols:bedtime-outline": "Cansado",
};

function formatarSentimento(sentimento) {
  return SENTIMENTOS_LABELS[sentimento] || sentimento;
}

$(document).ready(() => {
  carregarJornada();
});

async function carregarJornada() {
  try {
    const momentos = await buscarMomentosDoUsuario(usuarioLogado.id);
    renderizarJornada(momentos || []);
  } catch (error) {
    console.error("Erro ao carregar jornada:", error);
    $("#journeyCards").html(
      "<p class='text-center'>Não foi possível carregar sua jornada.</p>",
    );
  }
}

function renderizarJornada(momentos) {
  const $container = $("#journeyCards");

  if (momentos.length < MIN_MOMENTOS_PARA_INSIGHTS) {
    $container.html(montarEstadoInicial(momentos.length));
    return;
  }

  const insights = gerarInsights(momentos);

  $container.html(insights.map((insight) => montarCardInsight(insight)).join(""));
}

function gerarInsights(momentos) {
  const insights = [];

  insights.push(gerarInsightTotal(momentos));

  const categoria = obterMaisFrequente(momentos.map((m) => m.categoria).filter(Boolean));
  if (categoria) insights.push(gerarInsightCategoria(categoria));

  const tags = obterMaisFrequente(
    momentos.flatMap((m) => (Array.isArray(m.tags) ? m.tags : [])),
  );
  if (tags) insights.push(gerarInsightTag(tags, momentos));

  const sentimento = obterMaisFrequente(
    momentos.map((m) => m.sentimento).filter(Boolean),
  );
  if (sentimento) insights.push(gerarInsightSentimento(sentimento));

  const localizacoes = obterLocalizacoesUnicas(momentos);
  if (localizacoes.length > 0)
    insights.push(gerarInsightLocalizacao(localizacoes, momentos));

  return insights;
}

function gerarInsightTotal(momentos) {
  const momentoComFoto = [...momentos].reverse().find((momento) => momento.foto);

  return {
    tipo: "media",
    titulo: `Sua jornada já reúne ${momentos.length} momentos.`,
    texto: "Cada registro ajuda a formar um retrato mais completo da sua história.",
    imagem: momentoComFoto?.foto,
    alt: "Imagem de um momento registrado",
  };
}

function gerarInsightCategoria(categoria) {
  return {
    tipo: "texto",
    badge: categoria.valor,
    titulo:
      categoria.total === 1
        ? `Você começou a organizar sua jornada com a categoria ${categoria.valor}.`
        : `${categoria.valor} é a categoria mais presente na sua jornada.`,
    texto:
      categoria.total === 1
        ? "Esse detalhe já ajuda a dar forma aos seus registros."
        : `Ela aparece em ${categoria.total} momentos registrados.`,
  };
}

function gerarInsightTag(tag, momentos) {
  const momentoComTag = momentos.find((momento) => {
    return (
      Array.isArray(momento.tags) && momento.tags.includes(tag.valor) && momento.foto
    );
  });

  return {
    tipo: "media",
    titulo:
      tag.total === 1
        ? `A tag ${formatarTag(tag.valor)} já aparece na sua jornada.`
        : `A tag ${formatarTag(tag.valor)} apareceu ${tag.total} vezes.`,
    texto: "Aparecendo em diferentes momentos da sua jornada.",
    imagem: momentoComTag?.foto,
    alt: `Imagem relacionada à tag ${formatarTag(tag.valor)}`,
  };
}

function gerarInsightSentimento(sentimento) {
  const sentimentoLabel = formatarSentimento(sentimento.valor);

  return {
    tipo: "texto",
    badge: "SENTIMENTO",
    titulo:
      sentimento.total === 1
        ? `${sentimentoLabel} já aparece entre os sentimentos da sua jornada.`
        : `${sentimentoLabel} foi o sentimento mais presente nos seus registros.`,
    texto:
      sentimento.total === 1
        ? "Com o tempo, seus registros podem revelar padrões emocionais mais claros."
        : `Cada momento carregou uma emoção. Esta foi a que mais acompanhou sua jornada. Foram ${sentimento.total} momentos.`,
  };
}

function gerarInsightLocalizacao(localizacoes, momentos) {
  const momentoComLocalizacao = momentos.find((momento) => {
    return momento.localizacao && momento.foto;
  });

  return {
    tipo: "localizacao-media",
    titulo:
      localizacoes.length === 1
        ? `${localizacoes[0]} já aparece como um dos lugares da sua jornada.`
        : `Você registrou momentos em ${localizacoes.length} lugares diferentes.`,
    imagem: momentoComLocalizacao?.foto,
    alt: "Imagem de um momento com localização registrada",
    locais: localizacoes,
  };
}

function obterMaisFrequente(valores) {
  if (valores.length === 0) return null;

  const contagem = new Map();

  valores.forEach((valor) => {
    contagem.set(valor, (contagem.get(valor) || 0) + 1);
  });

  return Array.from(contagem, ([valor, total]) => ({ valor, total })).sort(
    (a, b) => b.total - a.total,
  )[0];
}

function obterLocalizacoesUnicas(momentos) {
  const locais = new Set();

  momentos.forEach((momento) => {
    if (!momento.localizacao) return;

    locais.add(extrairCidade(momento.localizacao));
  });

  return Array.from(locais);
}

function extrairCidade(localizacao) {
  return localizacao.split(",")[0].trim();
}

function formatarTag(tag) {
  return tag.startsWith("#") ? tag : `#${tag}`;
}

function montarCardInsight(insight) {
  if (insight.tipo === "media" && insight.imagem) {
    return montarCardMedia(insight);
  }

  if (insight.tipo === "localizacao-media" && insight.imagem) {
    return montarCardLocalizacaoMedia(insight);
  }

  return montarCardTexto(insight);
}

function montarCardMedia(insight) {
  return `
    <article class="journey-card journey-card--media">
      <div class="row align-items-center">
        <div class="col-12 col-md-7 mb-2 mb-md-0">
          <div class="journey-card_image journey-card_image-wrapper">
            <img
              src="${insight.imagem}"
              loading="lazy"
              class="img-fluid journey-card_image journey-image"
              alt="${insight.alt}"
            />
          </div>
        </div>
        <div class="col-12 col-md-5">
          <div class="journey-card_content">
            <h2 class="journey-card_title text-center text-md-start">${insight.titulo}</h2>
            <p class="journey-card_text text-center text-md-start">${insight.texto}</p>
          </div>
        </div>
      </div>
    </article>
  `;
}

function montarCardTexto(insight) {
  const badge = insight.badge
    ? `<span class="badge rounded-pill mb-2">${insight.badge}</span>`
    : "";

  return `
    <article class="journey-card journey-card--text">
      <div class="row align-items-center">
        <div class="col-12">
          <div class="journey-card_content">
            ${badge}
            <h2 class="journey-card_title">${insight.titulo}</h2>
            <p class="journey-card_text">${insight.texto}</p>
          </div>
        </div>
      </div>
    </article>
  `;
}

function montarCardLocalizacaoMedia(insight) {
  const locaisHtml = insight.locais
    .map((local) => `<span class="badge rounded-pill">${local}</span>`)
    .join("");

  return `
    <article class="journey-card journey-card--media">
      <div class="row align-items-center">
        <div class="col-12 col-md-7 mb-2 mb-md-0">
          <div class="journey-card_image journey-card_image-wrapper">
            <img
              src="${insight.imagem}"
              loading="lazy"
              class="img-fluid journey-card_image journey-image"
              alt="${insight.alt}"
            />
          </div>
        </div>
        <div class="col-12 col-md-5">
          <div class="journey-card_content">
            <h2 class="journey-card_title text-center text-md-start">${insight.titulo}</h2>
            <div class="journey-card_locations d-flex flex-wrap justify-content-center justify-content-md-start gap-2">
              ${locaisHtml}
            </div>
          </div>
        </div>
      </div>
    </article>
  `;
}

function montarEstadoInicial(totalMomentos) {
  return `
    <h3 class="journey-card_title text-center text-primary">Sua jornada ainda está começando.</h3>
    <p class="journey-card_text text-center text-dark">
      Você registrou ${totalMomentos} ${totalMomentos === 1 ? "momento" : "momentos"}.
      Registre pelo menos 5 momentos para revelar seus primeiros insights.
    </p>
  `;
}
