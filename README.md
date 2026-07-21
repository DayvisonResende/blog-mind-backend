# Blog Mind — Backend

API REST do sistema de blog full-stack desenvolvido para o Case de Estágio da **Mind Group**.
Consumida pelo [blog-mind-frontend](https://github.com/DayvisonResende/blog-mind-frontend).

> 🚧 Projeto em desenvolvimento — este README será completado ao longo das fases.

## Stack

- **Node.js + Express** · **TypeScript** (`strict`)
- **MySQL 8** — acesso via **Prisma** (ORM)
- **bcrypt + JWT** — autenticação
- **Multer + Sharp** — upload e compressão da imagem de capa
- **Helmet, CORS, rate-limit** — segurança

## Pré-requisitos

- Node.js LTS (18+)
- MySQL 8
- Cliente de banco (MySQL Workbench / DBeaver) — opcional

## Variáveis de ambiente

Crie um arquivo `.env` na raiz a partir do `.env.example`:

```env
PORT=3333
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=blog_mind
JWT_SECRET=troque_por_um_segredo_forte
JWT_EXPIRES=1d
```

## Instalação e execução

```bash
# instalar dependências
npm install

# rodar em desenvolvimento (hot-reload)
npm run dev

# build de produção
npm run build && npm start
```

A API sobe em `http://localhost:3333` (padrão).

## Banco de dados — importar o dump

O dump com estrutura + dados de seed está em `database/dump.sql`.

```bash
# criar o banco
mysql -u root -p -e "CREATE DATABASE blog_mind;"

# importar o dump
mysql -u root -p blog_mind < database/dump.sql
```

## Estrutura

```
src/
  config/        # conexão do banco e variáveis de ambiente
  routes/        # definição das rotas
  controllers/   # entrada/saída HTTP
  services/      # regra de negócio (classes)
  repositories/  # acesso a dados
  middlewares/   # auth, upload (multer/sharp), tratamento de erros
  dtos/          # request/response DTOs (esconde campos sensíveis)
  utils/         # ex.: cálculo de tempo de leitura
  types/         # tipagens
database/dump.sql # dump para a equipe avaliadora
uploads/          # imagens (armazenamento local)
```

## Principais endpoints

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| POST | `/auth/register` | Público | Cadastro |
| POST | `/auth/login` | Público | Login; retorna JWT |
| GET | `/auth/me` | Protegido | Usuário logado |
| PUT | `/users/me` | Protegido | Atualiza perfil |
| GET | `/articles` | Público | Lista (paginação, busca, filtro) |
| GET | `/articles/:id` | Público | Detalhe (incrementa views) |
| POST | `/articles` | Protegido | Cria (multipart com a capa) |
| PUT | `/articles/:id` | Protegido (autor) | Edita |
| DELETE | `/articles/:id` | Protegido (autor) | Remove |
| GET | `/articles/:id/comments` | Público | Lista comentários |
| POST | `/articles/:id/comments` | Protegido | Comenta |
| POST | `/articles/:id/like` | Protegido | Curtir/descurtir (toggle) |

_(lista completa será detalhada ao longo do desenvolvimento)_

## Decisões técnicas

- **Imagem de capa:** armazenamento **local** (multer + sharp), salvando o caminho no banco — dump mais leve.
- **Tempo de leitura:** calculado no backend (~200 palavras/min), armazenado em `reading_time`.
- **Curtidas:** restrição única por `(artigo, usuário)`; rota funciona como toggle.

## Credenciais de teste

_(preencher com o usuário/senha do seed)_

---

Desenvolvido por [Dayvison Resende](https://github.com/DayvisonResende).
