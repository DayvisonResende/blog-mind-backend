import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { calculateReadingTime } from '../src/utils/readingTime';

const prisma = new PrismaClient();

/** Senha em texto puro usada por todos os usuarios de teste (documentada no README). */
const SENHA_PADRAO = 'senha123';

function body(title: string, paragraphs: string[]): string {
  return [`## ${title}`, ...paragraphs].join('\n\n');
}

const artigos = [
  {
    title: 'O Futuro da Inteligencia Artificial em 2025',
    summary: 'Tendencias e inovacoes que estao moldando o futuro da IA.',
    category: 'Inteligencia Artificial',
    tags: ['IA', 'Machine Learning', 'Futuro'],
    views: 342,
    content: body('O Futuro da Inteligencia Artificial em 2025', [
      'A inteligencia artificial continua a evoluir em um ritmo acelerado. Neste artigo, vamos explorar as principais tendencias e inovacoes que estao moldando o futuro da IA.',
      'Os modelos de linguagem estao se tornando cada vez mais sofisticados, capazes de entender e gerar texto com precisao impressionante.',
      'Com o avanco da IA, questoes eticas se tornam cada vez mais importantes. E crucial desenvolver sistemas responsaveis e transparentes.',
    ]),
  },
  {
    title: 'Boas praticas de Desenvolvimento Web',
    summary: 'Pilares para construir aplicacoes web modernas e sustentaveis.',
    category: 'Desenvolvimento web',
    tags: ['Frontend', 'Boas praticas', 'Performance'],
    views: 187,
    content: body('Boas praticas de Desenvolvimento Web', [
      'Construir aplicacoes web modernas exige atencao a performance, acessibilidade e experiencia do usuario.',
      'Divida a interface em componentes reutilizaveis. Isso reduz duplicacao e facilita a manutencao.',
      'Usar TypeScript ajuda a prevenir uma classe inteira de bugs em tempo de compilacao.',
    ]),
  },
  {
    title: 'Introducao ao TypeScript para quem vem do JavaScript',
    summary: 'Como a tipagem estatica melhora a qualidade do seu codigo.',
    category: 'Desenvolvimento web',
    tags: ['TypeScript', 'JavaScript'],
    views: 254,
    content: body('Introducao ao TypeScript', [
      'TypeScript adiciona tipagem estatica ao JavaScript, ajudando a detectar erros antes mesmo de rodar o codigo.',
      'Comece tipando funcoes e interfaces. Aos poucos o compilador vira seu maior aliado.',
      'Ferramentas como o strict mode elevam ainda mais a seguranca do seu codigo.',
    ]),
  },
  {
    title: 'Docker na pratica: containerizando sua aplicacao',
    summary: 'Do zero ao primeiro container rodando em minutos.',
    category: 'DevOps',
    tags: ['Docker', 'DevOps', 'Containers'],
    views: 421,
    content: body('Docker na pratica', [
      'Containers empacotam sua aplicacao e suas dependencias, garantindo que ela rode igual em qualquer ambiente.',
      'Um Dockerfile bem escrito e o primeiro passo para um deploy reproduzivel.',
      'Com docker-compose, voce sobe banco de dados e aplicacao com um unico comando.',
    ]),
  },
  {
    title: 'Construindo APIs REST com Node e Express',
    summary: 'Arquitetura em camadas para APIs escalaveis e testaveis.',
    category: 'Backend',
    tags: ['Node', 'Express', 'API', 'Backend'],
    views: 298,
    content: body('Construindo APIs REST', [
      'Separar a aplicacao em rotas, controllers, services e repositories deixa o codigo organizado e testavel.',
      'Valide toda entrada e trate erros de forma centralizada para respostas consistentes.',
      'Autenticacao com JWT e senhas com bcrypt sao o basico de seguranca que voce nao pode ignorar.',
    ]),
  },
  {
    title: 'Prisma: o ORM que voce vai gostar de usar',
    summary: 'Migracoes, tipagem forte e produtividade no acesso a dados.',
    category: 'Backend',
    tags: ['Prisma', 'ORM', 'Banco de dados'],
    views: 176,
    content: body('Prisma ORM', [
      'O Prisma gera um client totalmente tipado a partir do seu schema, reduzindo erros de runtime.',
      'As migracoes versionadas contam a historia da evolucao do seu banco de dados.',
      'Relacionamentos e queries complexas ficam legiveis e seguros.',
    ]),
  },
  {
    title: 'React Hooks: pensando em componentes',
    summary: 'useState, useEffect e a arte de compor logica reutilizavel.',
    category: 'Frontend',
    tags: ['React', 'Hooks', 'Frontend'],
    views: 213,
    content: body('React Hooks', [
      'Hooks permitem usar estado e efeitos em componentes de funcao, deixando o codigo mais direto.',
      'Extraia logica repetida em hooks customizados para reutilizar entre telas.',
      'Cuidado com as dependencias dos efeitos para evitar renders desnecessarios.',
    ]),
  },
];

async function main() {
  console.log('🌱 Iniciando seed...');

  // Limpa na ordem correta das FKs.
  await prisma.commentLike.deleteMany();
  await prisma.articleLike.deleteMany();
  await prisma.articleSave.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.articleTag.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.article.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash(SENHA_PADRAO, 10);
  const mk = (name: string, email: string, role: 'user' | 'admin', bio: string) =>
    prisma.user.create({ data: { name, email, password: passwordHash, role, bio } });

  const john = await mk('John Doe', 'john@example.com', 'admin', 'Desenvolvedor Full Stack apaixonado por tecnologia.');
  const marie = await mk('Marie Smith', 'marie@example.com', 'user', 'Escritora de tecnologia e entusiasta de IA.');
  const carlos = await mk('Carlos Souza', 'carlos@example.com', 'user', 'Engenheiro de software e fa de DevOps.');
  const ana = await mk('Ana Lima', 'ana@example.com', 'user', 'Frontend developer e designer.');

  const authors = [john, john, carlos, carlos, marie, marie, ana];

  const created = [];
  for (let i = 0; i < artigos.length; i++) {
    const a = artigos[i];
    const article = await prisma.article.create({
      data: {
        title: a.title,
        summary: a.summary,
        content: a.content,
        category: a.category,
        readingTime: calculateReadingTime(a.content),
        views: a.views,
        authorId: authors[i].id,
        tags: {
          create: a.tags.map((name) => ({
            tag: {
              connectOrCreate: { where: { name }, create: { name } },
            },
          })),
        },
      },
    });
    created.push(article);
  }

  const [iaArticle] = created;
  const comentadores = [marie, carlos, ana];
  const textos = [
    'Otimo artigo, muito esclarecedor!',
    'Concordo com os pontos sobre etica.',
    'Isso mudou minha forma de pensar sobre o tema.',
    'Excelente conteudo, aguardo a continuacao!',
  ];

  // Comentarios distribuidos nos primeiros artigos.
  const comments = [];
  for (let i = 0; i < 4; i++) {
    const comment = await prisma.comment.create({
      data: {
        content: textos[i],
        articleId: created[i % created.length].id,
        authorId: comentadores[i % comentadores.length].id,
      },
    });
    comments.push(comment);
  }

  // Curtidas em artigos (par unico artigo/usuario).
  const likers = [marie, carlos, ana, john];
  for (let i = 0; i < created.length; i++) {
    for (let j = 0; j <= i % 3; j++) {
      await prisma.articleLike.create({
        data: { articleId: created[i].id, userId: likers[j].id },
      });
    }
  }

  // Curtidas em comentarios.
  await prisma.commentLike.create({ data: { commentId: comments[0].id, userId: john.id } });
  await prisma.commentLike.create({ data: { commentId: comments[0].id, userId: carlos.id } });
  await prisma.commentLike.create({ data: { commentId: comments[1].id, userId: ana.id } });

  // Artigos salvos.
  await prisma.articleSave.create({ data: { articleId: iaArticle.id, userId: marie.id } });
  await prisma.articleSave.create({ data: { articleId: created[3].id, userId: john.id } });

  // Inscricoes na newsletter.
  await prisma.newsletterSubscriber.createMany({
    data: [{ email: 'leitor1@example.com' }, { email: 'leitor2@example.com' }],
  });

  console.log('✅ Seed concluido:');
  console.log(`   Usuarios: 4 (senha de todos: "${SENHA_PADRAO}")`);
  console.log(`   Artigos: ${created.length} | Comentarios: ${comments.length}`);
  console.log('   + curtidas, comentarios curtidos, artigos salvos e newsletter');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
