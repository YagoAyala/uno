# Lista de Tarefas 🗒️

Aplicação full-stack para gerenciamento de tarefas em estilo *kanban*.

[demo-video.webm](https://github.com/user-attachments/assets/f71e0c0e-a767-404f-a360-ca233e88cd5b)

---

## 💡 Visão geral

| Camada      | Techs-chave                                                                                           |
|-------------|--------------------------------------------------------------------------------------------------------|
| **Frontend**| React 18 (CRA), Material UI v5, Apollo Client 3, react-toastify, styled-components                     |
| **Backend** | Node 18, Apollo Server 4, GraphQL-Tools, Sequelize 6 (PostgreSQL)                                      |
| **Testes**  | Jest 29, Supertest                                                                                    |
| **Infra**   | `docker-compose` (PostgreSQL)|

---

## 🚀 Funcionalidades

### 🏗️ Core (CRUD + board)

* **Criar, renomear e excluir tarefas**

  * Valida duplicidade de nome e campos vazios no service do back-end.
* **Drag & drop de cards** entre colunas, com persistência imediata da nova posição no Postgres.
* **Reordenação de colunas (lanes)** — alteração do campo `position` no banco; reflete na UI na próxima consulta.
* **Conclusão automática**: ao mover o card para uma lane cujo `is_done = true`, o item é marcado como finalizado.
* **Prioridades coloridas**

  * Tabela `priorities` (`without_priority`, low, medium, high) com cor HEX por nível.
  * Selecionável no `TodoForm` e exibida como **Chip** no card.

### 🔍 Pesquisa, filtros e ordenação

| Recurso                   | Detalhes                                                                                               |
| ------------------------- | ------------------------------------------------------------------------------------------------------ |
| **Busca textual**         | *Debounce* de **400 ms** (`useDebounce`) + **realce** dos termos no resultado                          |
| **Filtro por prioridade** | “All / sem prioridade / baixa / média / alta”                                                          |
| **Filtro por status**     | “All / Done / Not done”                                                                                |
| **Ordenação dinâmica**    | - Prioridade **Low → High** ou **High → Low**<br>- Nome **A → Z** ou **Z → A**                         |
| **Composição de filtros** | Todos os filtros podem ser combinados com a busca; tudo processado client-side para evitar round-trips |
| **UI compacta**           | Ícone *filter list* abre `Popover` com `<Select>` empilhados                                           |

### 💎 UX & UI

* **Feedback instantâneo** com **react-toastify** (sucesso, erro, aviso).
* **Dark / Light mode** — toggle global (Material UI + Context API).
* **Highlight** de busca em cards (trecho amarelo translúcido, borda arredondada).
* Efeitos sutis de *hover* e *elevation* nas colunas/cards.

### ⚙️ Dev friendliness

* **Hot reload** (CRA) e `npm run start` no back-end.
* **Apollo Client** com cache configurado e `refetchQueries` nos mutations principais.
* **Testes** unitários + integração (Jest 29 / Supertest) usando SQLite-in-memory.
* **Docker Compose** apenas para Postgres, mas pronto para extensão full-stack.
* **Migrations + seeders** gerando dados demo (inclui níveis de prioridade com cores).

### Roadmap já iniciado
- Perfil **admin** com autenticação JWT (reordenação de lanes diretamente do board)
- **WebSockets / GraphQL Subscriptions** para sincronização em tempo real
- Deploy serverless (AWS SAM ou Serverless Framework) + S3/CloudFront
- Migração do Postgres local para **RDS/Aurora Serverless v2**
- **E2E Cypress** (smoke tests + screenshots na CI)

---

## 🗂️ Estrutura de pastas

```text
root/
├─ frontend/                 # React (Create-React-App)
│  ├─ public/
│  └─ src/
│      ├─ api/graphql/       # Apollo client + documents (.graphql / .js)
│      ├─ features/          # Slices orientados a domínio
│      │   ├─ lanes/         # Colunas do board
│      │   └─ todos/         # Cards e filtros
│      ├─ pages/             
│      ├─ ui/                # Componentes atômicos
│      ├─ contexts/          # React Contexts
│      └─ hooks/             # Hooks reutilizáveis
│
└─ serverless/               # API GraphQL (Node 18)
    ├─ docker-compose.yml    # Postgres local
    ├─ src/
    │   ├─ db/               # Sequelize (config, migrations, seeders)
    │   ├─ modules/          # Domain-driven modules (model, repo, service, resolver)
    │   ├─ schema.js         # MergeTypes
    │   └─ server.js         
    └─ tests/                # Unit + integration (Jest + Supertest)
````

> A pasta `.github/workflows` contém o pipeline de CI; `.vscode/` traz *launch configs* e *settings*.

---

## ⚙️ Variáveis de ambiente

| Arquivo           | Chave                                             | Exemplo                                   |
| ----------------- | ------------------------------------------------- | ----------------------------------------- |
| `frontend/.env`   | `REACT_APP_GRAPHQL_URI`                           | `http://localhost:4000/graphql`           |
| `serverless/.env` | `DB_HOST` `DB_PORT` `DB_NAME` `DB_USER` `DB_PASS` | `localhost` `5432` `tododb` `todo` `todo` |
| `serverless/.env` | `PORT` **(opcional)**                             | `4000`                                    |

---

## 🏃‍♂️ Como rodar (dev)

### 1. Subir Postgres com Docker Compose

```bash
cd serverless
docker compose up -d          # inicia banco em 5432
```

### 2. Backend

```bash
cd serverless
npm install
npm start                     # http://localhost:4000/graphql
```

### 3. Frontend

```bash
cd frontend
yarn
yarn start                    # http://localhost:3000
```

### 4. Migrations & seeders

```bash
cd serverless
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

---

## 🧪 Testes

```bash
# unit + integration (coverage)
cd serverless
npm test -- --watch             # ou `npm run test:ci`
```

---

## 📦 Scripts úteis

| Diretório           | Comando      | Descrição                                  |
| ------------------- | ------------ | ------------------------------------------ |
| serverless          | `npm start`  | Inicia Apollo Server (hot-reload em dev)   |
| serverless          | `npm test`   | Jest + cobertura                           |
| frontend            | `yarn start` | CRA com HMR                                |
