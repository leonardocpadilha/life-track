# 📄 Product Requirements Document (PRD) - LifeTrack - Timeline Pessoal

## 1. Visão Geral e Objetivo
O LifeTrack é uma aplicação web responsiva que permite aos usuários registrar, organizar, visualizar e interpretar eventos pessoais ao longo do tempo. A aplicação possibilita o cadastro de momentos com informações estruturadas, como título, data, descrição, categoria, tags, sentimento e localização, promovendo uma organização mais rica e significativa dos registros. O sistema apresenta esses eventos por meio de uma linha do tempo interativa, permitindo ao usuário acompanhar sua trajetória de forma visual.

Como diferencial, o LifeTrack oferece uma funcionalidade de jornada do usuário, gerada dinamicamente no front-end a partir dos eventos cadastrados, sem necessidade de armazenamento adicional no banco de dados. Essa retrospectiva utiliza filtros e cálculos para apresentar insights relevantes, como quantidade total de momentos, categorias mais frequentes, tags mais utilizadas, locais visitados e padrões de comportamento ao longo do tempo. Além disso, o sistema gera mensagens interpretativas com base nos dados, proporcionando uma experiência mais reflexiva e personalizada ao usuário.

O projeto tem como objetivo unir organização pessoal, visualização de dados e interpretação de informações, oferecendo uma experiência simples, intuitiva e visualmente atrativa.

## 2. Atores do Sistema
- **Visitante:** Usuário não autenticado (ou em primeiro acesso) que pode visualizar a estrutura básica da aplicação, mais ainda não possui eventos cadastrados.
- **Usuário:** Usuário principal da aplicação, responsável por cadastrar, visualizar e excluir eventos pessoais. É também quem alimenta o sistema com dados que serão utilizados na construção da linha do tempo e na geração da jornada pessoal.
- **Sistema:** Ator invisível responsável por processar os dados inseridos pelo usuário, organizar os eventos cronologicamente e gerar automaticamente a jornada do usuário. O sistema aplica regras de análise como contagem de eventos, identificação de padrões, agrupamento por categorias, tags, períodos e localização, além de gerar mensagens interpretativas com base nesses dados.

## 3. Histórias de Usuário e Escopo
Abaixo estão as funcionalidades principais do MVP (Minimum Viable Product), escritas sob a perspectiva do usuário final.

### 👤 Épico 1: Cadastro e Gerenciamento de Eventos
- **US01 - Criar Evento com Foto:** Como um Usuário, quero adicionar uma imagem e preencher um formulário com informações de um momento pessoal (título, data, descrição, categoria, tags, sentimento e localização) para registrá-lo na minha linha do tempo.
  - _Critérios de Aceitação:_ O formulário deve permitir upload ou URL de imagem; todos os campos obrigatórios devem ser preenchidos; o sistema deve exibir mensagem de sucesso após cadastro.
- **US02 - Excluir Evento:** Como um Usuário, quero excluir um momento da minha timeline para remover informações indesejadas.
  - _Critérios de Aceitação:_ Deve haver confirmação antes da exclusão; a lista de eventos deve ser atualizada automaticamente após a remoção.

### 📆 Épico 2: Visualização da Timeline
- **US03 - Visualizar Eventos:** Como um Usuário, quero visualizar meus momentos cadastrados com imagens organizados na timeline em ordem cronológica para acompanhar minha trajetória ao longo do tempo.
  - _Critérios de Aceitação:_ Os eventos devem ser exibidos em ordem de data; a exibição deve ser em formato de cards; cada card pode conter imagem e informações resumidas do evento.
- **US04 - Filtrar Eventos:** Como um Usuário, quero filtrar meus momentos por diferentes critérios para visualizar apenas momentos específicos da minha timeline.
  - _Critérios de Aceitação:_ O sistema deve permitir filtros por data, categoria, tags, sentimento e localização; os eventos exibidos devem refletir os critérios selecionados; deve ser possível limpar ou redefinir os filtros aplicados.

### 🎞 Épico 3: Jornada do Usuário
- **US05 - Gerar Insights Sobre a Jornada do Usuário:** Como um Usuário, quero visualizar um resumo dos meus momentos em um determinado ano para entender minha atividade ao longo do tempo.
  - _Critérios de Aceitação:_ O sistema deve permitir seleção de período por ano ou mês(s); deve filtrar corretamente os eventos; deve apresentar os dados de forma visual e organizada.
- **US06 - Visualizar Estatísticas e Insights:** Como um Usuário, quero visualizar estatísticas e padrões dos meus eventos, como quantidade total de registros, categorias mais frequentes, tags mais utilizadas, locais visitados e mensagens interpretativas, para compreender melhor minha jornada ao longo do tempo.
  - _Critérios de Aceitação:_ O sistema deve calcular corretamente os dados com base nos eventos cadastrados; deve identificar padrões como categorias predominantes, tags recorrentes e distribuição por local; deve gerar mensagens interpretativas com base nos dados; a exibição deve ser visual, organizada e de fácil compreensão (cards ou seções).
