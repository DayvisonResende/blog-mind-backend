import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { calculateReadingTime } from '../src/utils/readingTime';

const prisma = new PrismaClient();

/** Senha em texto puro usada por todos os usuarios de teste (documentada no README). */
const SENHA_PADRAO = 'senha123';

const artigoIaConteudo = `## O Futuro da Inteligencia Artificial em 2025

A inteligencia artificial continua a evoluir em um ritmo acelerado. Neste artigo,
vamos explorar as principais tendencias e inovacoes que estao moldando o futuro da IA.

## Modelos de Linguagem Avancados

Os modelos de linguagem como GPT-4 e alem estao se tornando cada vez mais
sofisticados, capazes de entender e gerar texto com precisao impressionante.

## Automacao Inteligente

A automacao esta alcancando novos patamares com sistemas de IA que podem
tomar decisoes complexas e adaptar-se a novas situacoes.

## Etica e Responsabilidade

Com o avanco da IA, questoes eticas se tornam cada vez mais importantes. E
crucial desenvolver sistemas responsaveis e transparentes.`;

const artigoWebConteudo = `## Boas praticas de Desenvolvimento Web

Construir aplicacoes web modernas exige atencao a performance, acessibilidade
e experiencia do usuario. Vamos ver alguns pilares importantes.

## Componentizacao

Divida a interface em componentes reutilizaveis. Isso reduz duplicacao e
facilita a manutencao do codigo ao longo do tempo.

## Tipagem forte

Usar TypeScript ajuda a prevenir uma classe inteira de bugs em tempo de
compilacao, deixando o codigo mais seguro e legivel.`;

async function main() {
  console.log('🌱 Iniciando seed...');

  // Limpa os dados na ordem correta (respeitando as FKs)
  await prisma.articleLike.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.article.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash(SENHA_PADRAO, 10);

  // Usuarios
  const john = await prisma.user.create({
    data: {
      name: 'John Doe',
      email: 'john@example.com',
      password: passwordHash,
      role: 'admin',
      bio: 'Desenvolvedor Full Stack apaixonado por tecnologia e inovacao.',
    },
  });

  const marie = await prisma.user.create({
    data: {
      name: 'Marie Smith',
      email: 'marie@example.com',
      password: passwordHash,
      role: 'user',
      bio: 'Escritora de tecnologia e entusiasta de IA.',
    },
  });

  // Artigos
  const artigoIa = await prisma.article.create({
    data: {
      title: 'O Futuro da Inteligencia Artificial em 2025',
      summary: 'Tendencias e inovacoes que estao moldando o futuro da IA.',
      content: artigoIaConteudo,
      category: 'Desenvolvimento web',
      readingTime: calculateReadingTime(artigoIaConteudo),
      views: 122,
      authorId: john.id,
    },
  });

  await prisma.article.create({
    data: {
      title: 'Boas praticas de Desenvolvimento Web',
      summary: 'Pilares para construir aplicacoes web modernas e sustentaveis.',
      content: artigoWebConteudo,
      category: 'Desenvolvimento web',
      readingTime: calculateReadingTime(artigoWebConteudo),
      views: 87,
      authorId: john.id,
    },
  });

  // Comentarios no artigo de IA
  await prisma.comment.createMany({
    data: [
      { content: 'Otimo artigo, muito esclarecedor!', articleId: artigoIa.id, authorId: marie.id },
      { content: 'Concordo com os pontos sobre etica.', articleId: artigoIa.id, authorId: marie.id },
    ],
  });

  // Curtida no artigo de IA
  await prisma.articleLike.create({
    data: { articleId: artigoIa.id, userId: marie.id },
  });

  console.log('✅ Seed concluido:');
  console.log(`   Usuarios: 2 (senha de todos: "${SENHA_PADRAO}")`);
  console.log('   Artigos: 2 | Comentarios: 2 | Curtidas: 1');
}

main()
  .catch((e) => {
    console.error('❌ Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
