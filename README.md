# life-track

### Autor: Leonardo Correa Padilha

Aplicação web responsiva desenvolvida com foco no registro, organização, visualização e análise de eventos pessoais ao longo do tempo. A aplicação permite ao usuário registrar momentos importantes da sua vida, categorizá-los e acompanhá-los em uma linha do tempo interativa, além de gerar insights e resumos que ajudam na compreensão da sua jornada pessoal. O frontend da aplicação foi desenvolvido com HTML, CSS e JavaScript e o backend foi simulado pela implementação de uma API Fake, usando o JSON Server.

## 📘 Documentação do Projeto

Para entender as regras de negócio, o escopo e a arquitetura técnica da aplicação, consulte os documentos abaixo:

- [📄 Product Requirements Document (PRD)](./docs/prd.md) - Visão geral, atores e histórias de usuário.
- [🛠️ Especificação Técnica (Tech Spec)](./docs/spec.md) - Diagrama de banco de dados (DER), dicionário de dados e rotas da API (JSON Server).

## 🎨 Design

- [🎨 Design System](./docs/design-system.md) - Identidade visual da aplicação.
- [💻 Protótipo no Figma](https://www.figma.com/design/xWeGRx2fSVAAECq6SKbszB/Life-Track?m=auto&t=jOXPX95QAdSKibzz-1) - Telas interativas da aplicação no Figma.

## 🌐 Site em Produção - GitHub Pages

Em andamento.

## 💻 Tecnologias e Dependências

**Framework CSS:**

- **Bootstrap** - A escolha do Bootstrap no desenvolvimento do LifeTrack foi motivada pela necessidade de criar uma interface moderna, responsiva e consistente de forma ágil. Como o projeto envolve múltiplas telas e interações, o uso deste framework permite acelerar o processo de construção visual, oferecendo componentes prontos e padronizados que garantem coerência estética em toda a aplicação. Além disso, o sistema de grid do Bootstrap facilita a adaptação da interface para diferentes tamanhos de tela, assegurando uma boa experiência tanto em dispositivos móveis quanto em desktops.

**JavaScript:**

- **jQuery** - Para manipulação do DOM, tratamento de eventos, validação de formulários e requisições AJAX.
- **JSON Server** - Para simular uma API REST, permitindo persistir, consultar, editar e excluir eventos da aplicação.

**API's Públicas:**

- **Cloudinary API** - A escolha do Cloudinary no LifeTrack foi guiada pela necessidade de oferecer uma experiência visual fluida e consistente no registro de momentos. O Cloudinary permite otimizar automaticamente as imagens, garantindo carregamento rápido e qualidade adequada em diferentes dispositivos e condições de conexão, contribuindo diretamente para a experiência do usuário.

- **Mapbox API** - A adoção do Mapbox está diretamente relacionada à necessidade de tornar o registro de localização mais simples, rápido e intuitivo para o usuário. Por meio do recurso de autocomplete, a API permite que o usuário encontre e selecione lugares com facilidade a partir de poucas letras digitadas, reduzindo o esforço manual e evitando inconsistências no preenchimento. Além disso, a padronização dos locais selecionados contribui para uma experiência mais organizada e coerente dentro da timeline, reforçando o papel da localização como um elemento contextual relevante em cada registro.

## ✅ Checklist | Indicadores de Desempenho (ID) dos Resultados de Aprendizagem (RA)

### RA1 - Utilizar Frameworks CSS para estilização de elementos HTML e criação de layouts responsivos.

- [ ] ID 01 - Prototipa interfaces adaptáveis para no mínimo os tamanhos de tela mobile e desktop, usando ferramentas de design tradicionais (Figma, Quant UX ou Sketch) ou IA (Stitch).
- [ ] ID 02 - Implementa layout responsivo com Framework CSS (Bootstrap, Materialize, Tailwind + DaisyUI) usando Flexbox ou Grid do próprio framework.
- [ ] ID 03 - Implementa layout responsivo com CSS puro, usando Flexbox ou Grid Layout.
- [ ] ID 04 - Utiliza componentes prontos de um Framework CSS (ex.: card, button) e componentes JavaScript do framework (ex.: modal, carousel).
- [ ] ID 05 - Cria layout fluido usando unidades relativas (vw, vh, %, em, rem) no lugar de unidades fixas (px).
- [ ] ID 06 - Aplica um Design System consistente (cores, tipografia, padrões de componentes) em toda a aplicação.
- [ ] ID 07 - Utiliza Sass (SCSS) com ou sem framework, aplicando variáveis, mixins e funções para modularizar o código.
- [ ] ID 08 - Aplica tipografia responsiva (media queries mobile first) ou tipografia fluida (função clamp() + unidades relativas).
- [ ] ID 09 – Aplica técnicas de responsividade de imagens usando CSS (object-fit, containers com unidades relativas).
- [ ] ID 10 – Otimiza imagens usando formatos modernos (WebP) e carregamento adaptativo (srcset, picture, ou parâmetros do Cloudinary).

### RA2 - Realizar tratamento de formulários e aplicar validações customizadas no lado cliente.

- [ ] ID 11 - Implementa validação HTML nativa (campos obrigatórios, tipos, limites de caracteres) com mensagens de erro/sucesso no lado cliente.
- [ ] ID 12 - Aplica expressões regulares (REGEX) para validações customizadas (e-mail, telefone, datas, etc.)
- [ ] ID 13 - Utiliza elementos de seleção em formulários (checkbox, radio, select) para coleta de dados.
- [ ] ID 14 - Implementa leitura e escrita no Web Storage (localStorage/sessionStorage) para persistir dados localmente.

### RA3 - Aplicar ferramentas para otimização do processo de desenvolvimento web.

- [x] ID 15 - Configura ambiente com Node.js e NPM para gerenciamento de pacotes e dependências.
- [x] ID 16 - Utiliza boas práticas de versionamento no Git/GitHub (branch main ou branches específicos, uso de .gitignore).
- [ ] ID 17 - Mantém um README.md padronizado, conforme template da disciplina, com checklist preenchido.
- [ ] ID 18 - Organiza arquivos do projeto de forma modular, seguindo padrão de exemplo fornecido.
- [ ] ID 19 - Configura linters e formatadores (ESLint, Prettier) para manter qualidade e padronização do código.

### RA4 - Aplicar bibliotecas de funções e componentes em JavaScript para aprimorar a interatividade de páginas web.

- [ ] ID 20 - Utiliza jQuery para manipulação do DOM e interatividade (eventos, animações, manipulação de elementos)
- [ ] ID 21 - Integra e configura um plugin jQuery relevante (ex.: jQuery Mask Plugin).

### RA5 - Efetuar requisições assíncronas para uma API fake e APIs públicas, permitindo a obtenção e manipulação de dados dinamicamente.

- [ ] ID 22 - Realiza requisições assíncronas para uma API fake (ex.: JSON Server) para persistir dados de um formulário.
- [ ] ID 23 - Realiza requisições assíncronas para uma API fake para exibir dados na página.
- [ ] ID 24 - Realiza requisições assíncronas para APIs públicas reais (OpenWeather, ViaCEP etc.), exibindo os dados e tratando erros.

## 📖 Manual de Execução

Em andamento.

## 📱 Telas de Aplicação

Em andamento.
