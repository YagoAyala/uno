
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
├─ .github/                       # Workflows de CI
│  └─ workflows/
├─ .vscode/                       # Configs de debug/format
├─ frontend/                      # React 18 (CRA)
│  ├─ public/
│  └─ src/
│      ├─ api/
│      │   └─ graphql/            # Apollo client + documents
│      │       ├─ client.js
│      │       └─ queries.js
│      ├─ features/               # “Domain-driven” slices
│      │   ├─ lanes/
│      │   └─ todos/
│      ├─ pages/
│      │   └─ BoardPage.jsx
│      ├─ ui/
│      │   └─ Card.jsx            # Átomos genéricos
│      ├─ ToastProvider.jsx       # Contexto de toasts
│      ├─ App.jsx
│      └─ index.jsx
└─ serverless/                    # API GraphQL (Node 18)
    ├─ docker-compose.yml         # Banco de dados local
    ├─ src/
    │   ├─ db/
    │   │   ├─ config.js          # Config Sequelize
    │   │   ├─ migrations/
    │   │   └─ seeders/
    │   ├─ modules/
    │   ├─ db.js                  # Conexão Sequelize/Postgres
    │   ├─ schema.js              # Merge dinâmico de 
    │   └─ server.js              # Lambda/Express handler
    └─ tests/
        ├─ integration/
        └─ unit/
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
cd serverless

docker-compose up -d   # inicia o serviço 'db'
# ... rode backend e frontend normalmente em terminais separados ...
docker-compose down    # encerra o container
```

---

## Rodando migrations e seeders (Sequelize CLI)

```bash
cd serverless

npx sequelize-cli db:migrate     # cria as tabelas

npx sequelize-cli db:seed:all    # popula tabelas com dados iniciais
```

---

## Funcionalidades atuais

* **Criar e listar tarefas** – inclusão de novos cards e exibição em tempo real.
* **Drag & drop de cards** – reorganize tarefas entre lanes usando `@hello-pangea/dnd`; a nova ordem é persistida no banco.
* **CRUD** – edição, exclusão, filtros e validações (duplicidade ou campos vazios). A regra de negócio reside no **service**; a persistência, no **repository** via Sequelize.
* **Notificações** – feedback imediato ao usuário com Toastify.
* **Ordenação de lanes** – é possível reordenar colunas e gravar a nova sequência no Postgres através do campo **position**.
* **Conclusão de tarefas** – um card é marcado como concluído automaticamente ao entrar em uma lane cujo atributo **is\_done** seja `true`.
* **Dark Mode** – Alternância de tema claro e escuro.

---

## Scripts úteis

| Diretório  | Script       | Descrição                |
| ---------- | ------------ | ------------------------ |
| serverless | `npm start`  | Apollo Server (prod/dev) |
| serverless | `npm test`   | Jest + cobertura         |
| frontend   | `yarn start` | CRA com HMR              |
| frontend   | `yarn test`  | React Testing Library    |

Thought for 8 seconds


## Próximos passos

* **Converter para PWA**
* **Perfil administrador**

  * Autenticação (JWT): `admin` pode alterar o campo **position** das lanes direto no board.
  * Telas de gestão em `/admin/lanes` com drag & drop e validação de limites.

* **Sincronização em tempo real**

  * Implementar **WebSockets / GraphQL Subscriptions** para que várias sessões compartilhem o mesmo board sem conflitos.
  * Estratégia de merge otimista + broadcasts: quando um usuário move um card, todos os clientes recebem o evento e atualizam a UI imediatamente.
  * Em caso de colisão, aplicar *last-write-wins* ou fila de operações com versão do documento.

* **Deploy em nuvem**

  * **Backend**: empacotar o serviço GraphQL em Lambda + API Gateway (WebSocket API para subs) via AWS SAM ou Serverless Framework.
  * **Frontend**: hospedar no S3 + CloudFront (ou Amplify). Integração contínua com GitHub Actions.

* **Banco de dados gerenciado**

  * Migrar o Postgres local para AWS RDS (Free Tier ou Aurora Serverless v2) e apontar `DB_HOST`, `DB_USER`, `DB_PASS` nos Lambdas.

* **Testes E2E com Cypress**

  * Criar suíte de smoke-tests (criar tarefa, mover card, concluir tarefa).
  * Executar na pipeline CI e gerar relatórios com screenshots para falhas.


---