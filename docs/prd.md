# 📄 Product Requirements Document (PRD) - LifeTrack - Timeline Pessoal

## 1. Visão Geral e Objetivo
O LifeTrack é uma aplicação web responsiva que permite aos usuários registrar, organizar e visualizar eventos pessoais por meio de uma linha do tempo interativa. O grande diferencial do sistema é a funcionalidade de retrospectiva anual (Wrapped), que não é armazenada no banco de dados, mas sim gerada dinamicamente no front-end a partir dos eventos cadastrados. Essa retrospectiva utiliza filtros e cálculos para apresentar insights relevantes, como categorias mais frequentes e principais momentos registrados. Além disso, a aplicação permite a associação de imagens aos eventos, tornando a experiência mais visual e significativa.

O projeto de aplicação tem como objetivo unir organização pessoal com visualização de dados através de registros estruturados de eventos pessoais, proporcionando uma experiência simples, intuitiva e visualmente atrativa.

## 2. Atores do Sistema
- **Visitante:** Usuário não autenticado (ou em primeiro acesso) que pode visualizar a estrutura básica da aplicação, mais ainda não possui eventos cadastrados.
- **Usuário:** Usuário principal da aplicação que cadastra, visualiza, edita e exclui eventos pessoais. É responsável por alimentar o sistema com dados que serão utilizados na construção da linha do tempo e da retrospectiva anual.
- **Sistema:** Ator invisível responsável por processar os dados inseridos pelo usuário, organizar os eventos cronologicamente e gerar automaticamente a retrospectiva (Wrapped), aplicando regras de análise como contagem de eventos, identificação de padrões e agrupamento por categorias e períodos.

## 3. Histórias de Usuário e Escopo
Abaixo estão as funcionalidades principais do MVP (Minimum Viable Product), escritas sob a perspectiva do usuário final.

### 👤 Épico 1: Cadastro e Gerenciamento de Eventos
- **US01 - Criar Evento com Foto:** Como um Usuário, quero adicionar uma imagem e preencher um formulário com informações de um evento (título, data, categoria e descrição) para registrá-lo na minha linha do tempo.
  - _Critérios de Aceitação:_ O formulário deve permitir upload ou URL de imagem; todos os campos obrigatórios devem ser preenchidos; o sistema deve exibir mensagem de sucesso após cadastro.
- **US02 - Excluir Evento:** Como um Usuário, quero excluir um evento da minha timeline para remover informações indesejadas.
  - _Critérios de Aceitação:_ Deve haver confirmação antes da exclusão; a lista deve ser atualizada automaticamente.

### 📆 Épico 2: Visualização da Timeline
- **US03 - Visualizar Eventos:** Como um Usuário, quero visualizar meus eventos com imagens organizados na timeline em ordem cronológica para acompanhar minha trajetória ao longo do tempo.
  - _Critérios de Aceitação:_ Os eventos devem ser exibidos em ordem de data; a exibição deve ser em formato de cards; cada card pode conter imagem.
- **US04 - Filtrar Eventos:** Como um Usuário, quero filtrar eventos por categoria para visualizar apenas tipos específicos de momentos.
  - _Critérios de Aceitação:_ O sistema deve permitir selecionar categorias; apenas eventos da categoria escolhida devem ser exibidos.

### 🎞 Épico 3: Retrospectiva Anual (Wrapped)
- **US05 - Gerar Retrospectiva:** Como um Usuário, quero visualizar um resumo dos meus eventos em um determinado ano para entender minha atividade ao longo do período.
  - _Critérios de Aceitação:_ O sistema deve filtrar eventos por ano; deve exibir os resultados de forma visual.
- **US06 - Visualizar Estatísticas:** Como um Usuário, quero ver informações como quantidade data do evento, categoria mais e mês mais ativo.
  - _Critérios de Aceitação:_ O sistema deve calcular corretamente os dados; as informações devem ser exibidas em formato visual (cards ou carrossel); os dados devem refletir os eventos cadastrados.
