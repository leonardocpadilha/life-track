# 🛠️ Especificação Técnica (Tech Spec) - LifeTrack
Este documento descreve o modelo de dados da aplicação LifeTrack.

## 1. Modelo de Dados (Diagram ER)
Abaixo está o Diagrama Entidade-Relacionamento (DER) que representa a estrutura de dados da aplicação LifeTrack, evidenciando as principais entidades e seus relacionamentos.

```mermaid
erDiagram
USER {
int id
string nome
}

EVENT {
int id
string titulo
string descricao
date data
string categoria
string imagem_url
int user_id
}

WRAPPED {
int id
int ano
int total_eventos
string categoria_mais_frequente
string mes_mais_ativo
int user_id
}

USER ||--o{ EVENT : possui
USER ||--o{ WRAPPED : gera
```

## 2. Dicionário de Dados
