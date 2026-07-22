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
    title: 'O Futuro da Inteligência Artificial em 2025',
    summary: 'Tendências e inovações que estão moldando o futuro da IA.',
    category: 'Inteligência Artificial',
    tags: ['IA', 'Machine Learning', 'Futuro'],
    views: 342,
    content: body('O Futuro da Inteligência Artificial em 2025', [
      'A inteligência artificial continua a evoluir em um ritmo acelerado. Neste artigo, vamos explorar as principais tendências e inovações que estão moldando o futuro da IA.',
      'Os modelos de linguagem estão se tornando cada vez mais sofisticados, capazes de entender e gerar texto com precisão impressionante.',
      'Com o avanço da IA, questões éticas se tornam cada vez mais importantes. É crucial desenvolver sistemas responsáveis e transparentes.',
    ]),
  },
  {
    title: 'Boas práticas de Desenvolvimento Web',
    summary: 'Pilares para construir aplicações web modernas e sustentáveis.',
    category: 'Desenvolvimento web',
    tags: ['Frontend', 'Boas práticas', 'Performance'],
    views: 187,
    content: body('Boas práticas de Desenvolvimento Web', [
      'Construir aplicações web modernas exige atenção a performance, acessibilidade e experiência do usuário.',
      'Divida a interface em componentes reutilizáveis. Isso reduz duplicação e facilita a manutenção.',
      'Usar TypeScript ajuda a prevenir uma classe inteira de bugs em tempo de compilação.',
    ]),
  },
  {
    title: 'Introdução ao TypeScript para quem vem do JavaScript',
    summary: 'Como a tipagem estática melhora a qualidade do seu código.',
    category: 'Desenvolvimento web',
    tags: ['TypeScript', 'JavaScript'],
    views: 254,
    content: body('Introdução ao TypeScript', [
      'TypeScript adiciona tipagem estática ao JavaScript, ajudando a detectar erros antes mesmo de rodar o código.',
      'Comece tipando funções e interfaces. Aos poucos o compilador vira seu maior aliado.',
      'Ferramentas como o strict mode elevam ainda mais a segurança do seu código.',
    ]),
  },
  {
    title: 'Docker na prática: containerizando sua aplicação',
    summary: 'Do zero ao primeiro container rodando em minutos.',
    category: 'DevOps',
    tags: ['Docker', 'DevOps', 'Containers'],
    views: 421,
    content: body('Docker na prática', [
      'Containers empacotam sua aplicação e suas dependências, garantindo que ela rode igual em qualquer ambiente.',
      'Um Dockerfile bem escrito é o primeiro passo para um deploy reproduzível.',
      'Com docker-compose, você sobe banco de dados e aplicação com um único comando.',
    ]),
  },
  {
    title: 'Construindo APIs REST com Node e Express',
    summary: 'Arquitetura em camadas para APIs escaláveis e testáveis.',
    category: 'Backend',
    tags: ['Node', 'Express', 'API', 'Backend'],
    views: 298,
    content: body('Construindo APIs REST', [
      'Separar a aplicação em rotas, controllers, services e repositories deixa o código organizado e testável.',
      'Valide toda entrada e trate erros de forma centralizada para respostas consistentes.',
      'Autenticação com JWT e senhas com bcrypt são o básico de segurança que você não pode ignorar.',
    ]),
  },
  {
    title: 'Prisma: o ORM que você vai gostar de usar',
    summary: 'Migrações, tipagem forte e produtividade no acesso a dados.',
    category: 'Backend',
    tags: ['Prisma', 'ORM', 'Banco de dados'],
    views: 176,
    content: body('Prisma ORM', [
      'O Prisma gera um client totalmente tipado a partir do seu schema, reduzindo erros de runtime.',
      'As migrações versionadas contam a história da evolução do seu banco de dados.',
      'Relacionamentos e queries complexas ficam legíveis e seguros.',
    ]),
  },
  {
    title: 'React Hooks: pensando em componentes',
    summary: 'useState, useEffect e a arte de compor lógica reutilizável.',
    category: 'Frontend',
    tags: ['React', 'Hooks', 'Frontend'],
    views: 213,
    content: body('React Hooks', [
      'Hooks permitem usar estado e efeitos em componentes de função, deixando o código mais direto.',
      'Extraia lógica repetida em hooks customizados para reutilizar entre telas.',
      'Cuidado com as dependências dos efeitos para evitar renders desnecessários.',
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
  const carlos = await mk('Carlos Souza', 'carlos@example.com', 'user', 'Engenheiro de software e fã de DevOps.');
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
    'Ótimo artigo, muito esclarecedor!',
    'Concordo com os pontos sobre ética.',
    'Isso mudou minha forma de pensar sobre o tema.',
    'Excelente conteúdo, aguardo a continuação!',
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
