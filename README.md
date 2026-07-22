# Blog Mind — Backend

API REST do sistema de blog full-stack desenvolvido para o **Case de Estágio da Mind Group**.
Consumida pelo [blog-mind-frontend](https://github.com/DayvisonResende/blog-mind-frontend).

## Stack

- **Node.js + Express 5** · **TypeScript** (strict)
- **MySQL 8** com **Prisma** (ORM, migrações e tipagem)
- **bcrypt** (bcryptjs) + **JWT** — autenticação
- **Multer + Sharp** — upload e compressão da imagem de capa
- **Zod** — validação de entrada
- **Helmet, CORS, rate-limit** — segurança
- **Vitest + Supertest** — testes automatizados

## Pré-requisitos

- Node.js LTS (18+)
- MySQL 8 rodando localmente
- Git

## 1. Instalação

```bash
git clone https://github.com/DayvisonResende/blog-mind-backend.git
cd blog-mind-backend
npm install
```

## 2. Variáveis de ambiente

Crie um arquivo `.env` na raiz a partir do `.env.example`:

```env
PORT=3333
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=blog_mind

DATABASE_URL="mysql://root:sua_senha@localhost:3306/blog_mind"

JWT_SECRET=troque_por_um_segredo_forte_e_aleatorio
JWT_EXPIRES=1d
```

> `TEST_DATABASE_URL` (banco `blog_mind_test`) é opcional e usado apenas pelos testes.

## 3. Banco de dados

Você pode subir o banco de **duas formas**:

### Opção A — Importar o dump (mais rápido para avaliação)

O dump com estrutura + dados de exemplo está em `database/dump.sql`:

```bash
# cria o banco
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS blog_mind;"

# importa estrutura e dados
mysql -u root -p blog_mind < database/dump.sql
```

### Opção B — Migrations + seed (do zero)

```bash
npx prisma migrate deploy   # cria as tabelas
npx prisma db seed          # popula com dados de exemplo
```

## 4. Executar

```bash
npm run dev      # desenvolvimento (hot-reload) — http://localhost:3333
npm run build    # compila para dist/
npm start        # roda o build de produção
```

Verifique em `http://localhost:3333/health`.

## Credenciais de teste (seed)

Todos os usuários usam a senha **`senha123`**:

| E-mail | Papel |
|---|---|
| `john@example.com` | admin |
| `marie@example.com` | user |
| `carlos@example.com` | user |
| `ana@example.com` | user |

## Scripts

| Comando | Descrição |
|---|---|
| `npm run dev` | Servidor em desenvolvimento |
| `npm run build` / `npm start` | Build e execução de produção |
| `npm test` | Testes (Vitest + Supertest) |
| `npm run lint` | ESLint |
| `npx prisma studio` | Visualizador do banco no navegador |

## Principais endpoints

Rotas protegidas exigem `Authorization: Bearer <token>`.

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| POST | `/auth/register` | Público | Cadastro |
| POST | `/auth/login` | Público | Login (retorna JWT) |
| GET | `/auth/me` | Protegido | Usuário logado |
| PUT | `/users/me` | Protegido | Atualiza perfil |
| GET | `/articles?page=&limit=&search=&category=` | Público | Lista (paginação, busca, filtro) |
| GET | `/categories` | Público | Categorias |
| GET | `/articles/:id` | Público | Detalhe (incrementa views) |
| POST | `/articles` | Protegido | Cria (multipart com capa) |
| PUT | `/articles/:id` | Autor | Edita |
| DELETE | `/articles/:id` | Autor | Remove |
| GET | `/users/me/articles` | Protegido | Meus artigos |
| GET | `/dashboard/stats` | Protegido | Estatísticas |
| GET | `/dashboard/activity` | Protegido | Atividade recente |
| GET | `/articles/:id/comments` | Público | Lista comentários |
| POST | `/articles/:id/comments` | Protegido | Comenta |
| DELETE | `/comments/:id` | Autor | Remove comentário |
| POST | `/articles/:id/like` | Protegido | Curtir/descurtir artigo (toggle) |
| POST | `/comments/:id/like` | Protegido | Curtir/descurtir comentário (toggle) |
| POST | `/articles/:id/save` | Protegido | Salvar/remover (toggle) |
| POST | `/newsletter/subscribe` | Público | Inscrição na newsletter |

## Decisões técnicas

- **Imagem de capa:** armazenamento **local** (multer + sharp, máx. 1600px, qualidade 80), salvando o caminho no banco — dump leve. As imagens ficam em `uploads/` (fora do Git).
- **Tempo de leitura:** calculado no backend (~200 palavras/min), armazenado em `reading_time`.
- **Curtidas/salvar:** restrição única por par (alvo, usuário); a rota funciona como toggle.
- **Segurança:** senhas com bcrypt (salt 10), JWT com expiração, queries parametrizadas (Prisma), validação com Zod, sanitização de comentários (anti-XSS), CORS restrito, Helmet e rate limiting em `/auth`.

## Arquitetura

```
src/
  config/        # env e conexão Prisma
  routes/        # definição das rotas
  controllers/   # entrada/saída HTTP
  services/      # regra de negócio (classes)
  repositories/  # acesso a dados
  middlewares/   # auth, upload, validação, rate-limit, erros
  dtos/          # request/response DTOs (esconde senha)
  utils/         # tempo de leitura, hash, jwt, imagem, sanitização
prisma/          # schema, migrations e seed
database/dump.sql
```

---

Desenvolvido por [Dayvison Resende](https://github.com/DayvisonResende).
