# 📄 Product Requirements Document (PRD) - LifeTrack - Timeline Pessoal

## 1. Visão Geral e Objetivo
O LifeTrack é uma aplicação web responsiva que permite aos usuários registrar, organizar e visualizar eventos pessoais por meio de uma linha do tempo interativa. O grande diferencial do sistema é a funcionalidade de retrospectiva anual (Wrapped), que analisa os dados cadastrados e apresenta insights sobre a trajetória do usuário, como períodos mais ativos, categorias predominantes e principais momentos registrados. Além disso, a aplicação permite a associação de imagens aos eventos, tornando a experiência mais visual e significativa.

O projeto de aplicação tem como objetivo unir organização pessoal com visualização de dados através de registros estruturados de eventos pessoais, proporcionando uma experiência simples, intuitiva e visualmente atrativa.

## 2. Atores do Sistema
- **Visitante:** Usuário não autenticado (ou em primeiro acesso) que pode visualizar a estrutura básica da aplicação, mais ainda não possui eventos cadastrados.
- **Usuário:** Usuário principal da aplicação que cadastra, visualiza, edita e exclui eventos pessoais. É responsável por alimentar o sistema com dados que serão utilizados na construção da linha do tempo e da retrospectiva anual.
- **Sistema:** Ator invisível responsável por processar os dados inseridos pelo usuário, organizar os eventos cronologicamente e gerar automaticamente a retrospectiva (Wrapped), aplicando regras de análise como contagem de eventos, identificação de padrões e agrupamento por categorias e períodos.

## 3. Histórias de Usuário e Escopo
Abaixo estão as funcionalidades principais do MVP (Minimum Viable Product), escritas sob a perspectiva do usuário final.

### 👤 Épico 1: Cadastro e Gerenciamento de Eventos
- **US01 - Criar Evento com Foto:** Como um Usuário, quero adicionar uma imagem e preencher um formulário com informações de um evento (título, data, categoria e descrição) para registrá-lo na minha linha do tempo.
  - _Critérios de Aceitação:_ O formulário deve permitir upload ou URL de imagem; o sistema deve validar o formato (jpg, png, webp); todos os campos obrigatórios devem ser preenchidos; a data deve ser válida; o evento deve ser salvo na API; o sistema deve exibir mensagem de sucesso após cadastro.
- **US02 - Editar Evento:** Como um Usuário, quero editar um evento já cadastrado para corrigir ou atualizar informações.
  - _Critérios de Aceitação:_ O sistema deve carregar os dados do evento no formulário; após edição, os dados devem ser atualizados na API; alterações devem refletir na timeline.
- **US03 - Excluir Evento:** Como um Usuário, quero excluir um evento da minha timeline para remover informações indesejadas.
  - _Critérios de Aceitação:_ Deve haver confirmação antes da exclusão; o evento deve ser removido da API; a lista deve ser atualizada automaticamente.

### 📆 Épico 2: Visualização da Timeline
- **US04 - Visualizar Eventos:** Como um Usuário, quero visualizar meus eventos com imagens organizados na timeline em ordem cronológica para acompanhar minha trajetória ao longo do tempo.
  - _Critérios de Aceitação:_ Os eventos devem ser exibidos em ordem de data; a exibição deve ser em formato de cards; cada card pode conter imagem; a interface deve ser responsiva.
- **US05 - Filtrar Eventos:** Como um Usuário, quero filtrar eventos por categoria para visualizar apenas tipos específicos de momentos.
  - _Critérios de Aceitação:_ O sistema deve permitir selecionar categorias; apenas eventos da categoria escolhida devem ser exibidos; o filtro pode ser salvo no Web Storage.

### 🎞 Épico 3: Retrospectiva Anual (Wrapped)
- **US06 - Gerar Retrospectiva:** Como um Usuário, quero visualizar um resumo dos meus eventos em um determinado ano para entender minha atividade ao longo do período.
  - _Critérios de Aceitação:_ O sistema deve filtrar eventos por ano; deve calcular automaticamente os dados; deve exibir os resultados de forma visual.
- **US07 - Visualizar Estatísticas:** Como um Usuário, quero ver informações como quantidade total de eventos, categoria mais frequente e mês mais ativo.
  - _Critérios de Aceitação:_ O sistema deve calcular corretamente os dados; as informações devem ser exibidas em formato visual (cards ou carrossel); os dados devem refletir os eventos cadastrados.
- **US08 - Navegar pelo Wrapped:** Como um Usuário, quero navegar entre diferentes insights da retrospectiva para entender melhor meus dados.
  - _Critérios de Aceitação:_ Deve haver navegação entre slides (ex: carrossel); cada slide deve apresentar uma informação relevante.
