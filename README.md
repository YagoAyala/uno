
# UNO Challenge · Lista de Tarefas 🗒️

Repositório-base do desafio técnico da **UNO**.  
A aplicação inclui:

| Camada | Tecnologias principais |
| ------ | ---------------------- |
| **Frontend** | React 18 (Create-React-App), Material UI v5, Apollo Client 3, react-toastify, styled-components |
| **Backend** | Node 18, Apollo Server 4, GraphQL-Tools, Sequelize 6 (PostgreSQL), dotenv |
| **Teste**   | Jest 29 + Supertest |
| **Infra**   | `docker-compose` (container único para **PostgreSQL**) |

---

## Estrutura de pastas

```text
uno/
├─ .github/            # Workflows de CI
├─ .vscode/            # Configs de debug/format
├─ docker-compose.yml  # ▶︎ só o banco
├─ frontend/           # React 18 (CRA)
│  ├─ public/
│  └─ src/
│      ├─ components/      # Dialogs, listas, etc.
│      ├─ context/         # Toasts + tema claro/escuro
│      ├─ graphql/         # Queries & mutations
│      └─ App.js
└─ serverless/         # API GraphQL (Node 18)
   └─ src/
       ├─ modules/
       │   └─ todo/            # *.type.graphql · resolver · service · model
       ├─ db.js                # Conexão Sequelize/Postgres :contentReference[oaicite:2]{index=2}
       ├─ schema.js            # Merge dinâmico de schema/resolvers :contentReference[oaicite:3]{index=3}
       └─ server.js            # Bootstrap Apollo Server :contentReference[oaicite:4]{index=4}
````

---

## Variáveis de ambiente

### `frontend/.env`

```env
REACT_APP_GRAPHQL_URI=http://localhost:4000/graphql
```

### `serverless/.env`

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tododb
DB_USER=todo
DB_PASS=todo
PORT=4000          # opcional (padrão 4000)
```

> O backend cria e sincroniza as tabelas sozinho se o banco estiver acessível. ([GitHub][1])

---

## Executando localmente

### 1. Backend (npm)

```bash
cd serverless
npm install
npm start            # http://localhost:4000/graphql
```

### 2. Frontend (Yarn)

```bash
cd ../frontend
yarn
yarn start           # http://localhost:3000
```

---

## Executando com Docker Compose (somente Postgres)

```bash
# na raiz do projeto
docker-compose up -d   # inicia o serviço 'db'
# ... rode backend e frontend normalmente em terminais separados ...
docker-compose down    # encerra o container
```

---

## Funcionalidades atuais

* **Adicionar & listar tarefas** (já implementado).
* **Editar, remover, filtrar, validar duplicados / vazio** – requisitos a serem desenvolvidos nos módulos `todo`.
  A lógica de negócio vive no **service** e a persistência no **repository** usando Sequelize. ([GitHub][2])

---

## Scripts úteis

| Diretório  | Script       | Descrição                |
| ---------- | ------------ | ------------------------ |
| serverless | `npm start`  | Apollo Server (prod/dev) |
| serverless | `npm test`   | Jest + cobertura         |
| frontend   | `yarn start` | CRA com HMR              |
| frontend   | `yarn test`  | React Testing Library    |

---

## Próximos passos sugeridos

| Ideia                              | Benefício                     |
| ---------------------------------- | ----------------------------- |
| Migrations com `sequelize-cli`     | Versão controlada do schema   |
| Autenticação JWT                   | Multiusuário & segurança      |
| Docker Compose completo (app + db) | On-boarding em 1 comando      |
| E2E (Playwright/Cypress)           | Cobertura do fluxo do usuário |
| Observabilidade (Winston/Sentry)   | Logs & rastreamento de erros  |

---