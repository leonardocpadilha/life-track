# 🎨 Design System - LifeTrack

Este documento define a identidade visual do LifeTrack, priorizando uma interface moderna, limpa e focada na organização e reflexão sobre momentos pessoais.

### 1. Framework Base

- **Framework escolhido:** Bootstrap.

- **Motivação:** Permite a construção rápida de interfaces responsivas, com sistema de grid consolidado e fácil customização de componentes como botões, formulários e cards.

### 2. Paleta de Cores

As cores equilibram interatividade (ação) e neutralidade (leitura e reflexão).

- **Cor Primária (Ação/Destaque):** `#50AFF2` _(Azul Primário)_.
  - _Uso:_ Botões principais, links ativos, ícones, elementos interativos e feedback positivo (confirmações, ações concluídas).

- **Cor de Alerta/Exclusão:** `#F25050` _(Vermelho Suave)_.
  - _Uso:_ Ações destrutivas (excluir, sair, avisos irreversíveis).

- **Texto Principal:** `#464554` _(Cinza Escuro)_.
  - _Uso:_ Títulos, headings e conteúdo principal.

- **Texto Secundário:** `#767586` _(Cinza Médio)_.
  - _Uso:_ Descrições, informações auxiliares e placeholders.

- **Background Geral:** `#F8F8F8` _(Branco Suave)_.
  - _Uso:_ Fundo da aplicação.

- **Superfícies:**
  - `#FFFFFF` _(Branco)_ → Cards principais.
  - `#F2F4F6` _(Cinza Suave)_ → Inputs e elementos secundários.

- **Neutros de Controle:**
  - `#EBEEF4` _(Branco Neutro)_ → Botões secundários / cancelar.

### 3. Tipografia

A tipografia combina expressividade (títulos) com legibilidade (interface). As fontes são importadas via Google Fonts para garantir consistência visual e fácil implementação.

- **Títulos e Destaques:** `Outfit, sans-serif` (Peso: 700).
  - _Uso:_ Headings (H1–H6) e destaques visuais.

- **Interface e Texto:** `Poppins, sans-serif` (Pesos: 400, 500, 600).
  - _Uso:_ Botões, inputs, labels e textos descritivos.

### 4. Estrutura Visual

Define o estilo base dos elementos visuais.

- **Cards e Containers**
  - Fundo branco.
  - Bordas arredondadas (14px–20px).
  - Sombra suave (baixo nível de elevação).

- **Modais (Floating Panels)**
  - Fundo branco.
  - Bordas arredondadas (20px–24px).
  - Sombra média.
  - Conteúdo centralizado.

### 5. Componentes Base

Elementos visuais reutilizáveis da aplicação.

- **Botões**
  - Primário (.btn-primary):
    - Cor primária.
    - Border-radius: 12px.
    - Usado para ações principais (ex: registrar momento).

  - Secundário / Cancelamento:
    - Fundo neutro `#EBEEF4`.
    - Baixa ênfase visual.

  - Destrutivo:
    - Cor vermelha.
    - Uso restrito a ações irreversíveis.

- **Inputs e Formulários**
  - Fundo cinza `#F2F4F6`.
  - Sem bordas pesadas.
  - Padding interno confortável (14px–18px).
  - Labels:
    - Poppins SemiBold.
    - Tamanho reduzido.
    - Uppercase.

- **Cards de Momento**
  - Fundo branco `#FFFFFF`.
  - Bordas arredondadas.
  - Sombra leve.
  - Conteúdo organizado em:
    - Título.
    - Descrição.
    - Metadados (data, local, tags).

- **Tags / Badges**
  - Formato: rounded-pill.
  - Uso: categorização (categorias, tags, sentimentos, locais).
  - Podem incluir ícones para reforço visual.

- **Área de Upload**
  - Estilo drag-and-drop.
  - Borda tracejada (2px dashed).
  - Destaque com cor primária.

### 6. Ícones

Os ícones do LifeTrack são fornecidos via Iconify, permitindo acesso a múltiplas bibliotecas com padronização visual.

- **Estilo predominante:** Outline (traço leve), priorizando consistência visual.

- **Uso**
  - Navegação (registrar momento, timeline e jornada).
  - Ações (adicionar e excluir).
  - Metadados (categoria, tag, sentimento e local).

- **Cores**
  - Primária `#50AFF2` → ações principais.
  - Cinza `#464554` → estados neutros.
  - Vermelho `#F25050` → ações destrutivas.

### 7. Padrões de Interação

Regras de comportamento da interface da aplicação.

- **Filtros e Seleção**
  - Filtros rápidos em formato de pílula.
  - Podem incluir ícones à esquerda para reforço visual e facilitar identificação.
  - Estado ativo utiliza cor primária.
  - Seleções devem ser visualmente destacadas com contraste claro.

- **Feedback do Sistema**
  - Sucesso:
    - Ícone positivo.
    - Mensagem clara e objetiva.
  
  - Erro/Alerta:
    - Uso de cor vermelha.
    - Comunicação direta sobre impacto da ação.

### 8. Diretrizes de Uso

Regras para manter a consistência na aplicação.

  - Priorizar o uso da cor primária apenas para ações principais.
  - Manter superfícies limpas e com baixo ruído visual.
  - Evitar excesso de cores simultâneas na mesma tela.
  - Garantir contraste adequado entre texto e fundo.
  - Utilizar feedback visual claro para ações do usuário.
  - Priorizar ícones de uma mesma família visual para evitar inconsistência entre estilos.
