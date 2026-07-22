-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: localhost    Database: blog_mind
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `blog_mind`
--

/*!40000 DROP DATABASE IF EXISTS `blog_mind`*/;

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `blog_mind` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `blog_mind`;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('0b35dd6e-31ab-4508-9d94-8a7026656ccb','b1b3f29ef5401f6bcb72b984386465f2a8155341b95a19ecb828c3d6bb5fdf63','2026-07-21 19:06:09.703','20260721190609_add_tags',NULL,NULL,'2026-07-21 19:06:09.435',1),('52ee163e-e224-4ad9-bb65-f1e520b3698b','0ff3a45261ef779fe7b7ee4d5ab921d243220b0562f2a93b557cf9e15c31adde','2026-07-21 20:41:16.968','20260721204116_add_engagement',NULL,NULL,'2026-07-21 20:41:16.371',1),('8b6e7881-3a3d-4725-a44b-26e0b50c7d62','1bfe4e6963b1efdc6fe8219ab473247121a489c91c19883b887079c5909f8a4c','2026-07-21 18:46:36.037','20260721184635_init',NULL,NULL,'2026-07-21 18:46:35.146',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article_likes`
--

DROP TABLE IF EXISTS `article_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_likes` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `article_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `article_likes_article_id_user_id_key` (`article_id`,`user_id`),
  KEY `article_likes_user_id_idx` (`user_id`),
  CONSTRAINT `article_likes_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `article_likes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_likes`
--

LOCK TABLES `article_likes` WRITE;
/*!40000 ALTER TABLE `article_likes` DISABLE KEYS */;
INSERT INTO `article_likes` VALUES ('05437a4d-fc68-4b3d-9c8c-41708f488650','bca7b771-6d3d-4456-bc11-94e2590788fb','420e0b86-d88e-4cbb-9c36-dc05e7d3bbb9','2026-07-22 03:05:41.146'),('0f8040f7-81b1-466c-88a5-14250c1c386c','c2f92634-c36e-4e46-b27d-24b63dd5b9d9','5f7f21f6-d04b-410b-ba8c-166bc9499a97','2026-07-22 03:05:41.172'),('1057f18d-a7e6-45cd-b668-ddf3ef0e33f5','e3d735ba-e362-40c6-9ad7-3c0000a5686d','5f7f21f6-d04b-410b-ba8c-166bc9499a97','2026-07-22 03:05:41.152'),('2b7b5e6c-a6b4-45e4-9172-ce5c4e258076','27627d19-0677-468f-80b6-16c9141acaec','420e0b86-d88e-4cbb-9c36-dc05e7d3bbb9','2026-07-22 03:05:41.116'),('549304d8-f7e6-434a-946c-654226746912','99deb5c6-d0e1-4b8b-9a42-e8a3dc20a03b','420e0b86-d88e-4cbb-9c36-dc05e7d3bbb9','2026-07-22 03:05:41.128'),('713a0b79-a159-4c37-9d40-0198f369aeae','99deb5c6-d0e1-4b8b-9a42-e8a3dc20a03b','b8fd518d-da1e-451e-b02c-7365c2de52fa','2026-07-22 03:05:41.133'),('81237ec2-9949-46e0-bfa8-04e3f7779fc1','27627d19-0677-468f-80b6-16c9141acaec','5f7f21f6-d04b-410b-ba8c-166bc9499a97','2026-07-22 03:05:41.106'),('86bb35d6-3042-4691-947a-4a77c6c0d13a','99deb5c6-d0e1-4b8b-9a42-e8a3dc20a03b','5f7f21f6-d04b-410b-ba8c-166bc9499a97','2026-07-22 03:05:41.122'),('bb4211f6-b274-4c35-8905-1bfa283918bc','bca7b771-6d3d-4456-bc11-94e2590788fb','5f7f21f6-d04b-410b-ba8c-166bc9499a97','2026-07-22 03:05:41.141'),('d344b302-37b9-4b4a-970d-4e4e009e3626','5d6b930e-be45-47a9-9aff-c34a49c64706','5f7f21f6-d04b-410b-ba8c-166bc9499a97','2026-07-22 03:05:41.100'),('d739280c-b0c7-449b-842b-39e372cbdcaf','e3d735ba-e362-40c6-9ad7-3c0000a5686d','b8fd518d-da1e-451e-b02c-7365c2de52fa','2026-07-22 03:05:41.166'),('e58e1d37-72e5-4499-9794-5ed5e8c78733','e3d735ba-e362-40c6-9ad7-3c0000a5686d','420e0b86-d88e-4cbb-9c36-dc05e7d3bbb9','2026-07-22 03:05:41.159'),('ed4816e7-8ea3-486f-a893-23e0613b07e2','9411a115-cdeb-46f1-b001-5fe564306af1','5f7f21f6-d04b-410b-ba8c-166bc9499a97','2026-07-22 03:05:41.137');
/*!40000 ALTER TABLE `article_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article_saves`
--

DROP TABLE IF EXISTS `article_saves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_saves` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `article_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `article_saves_article_id_user_id_key` (`article_id`,`user_id`),
  KEY `article_saves_user_id_idx` (`user_id`),
  CONSTRAINT `article_saves_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `article_saves_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_saves`
--

LOCK TABLES `article_saves` WRITE;
/*!40000 ALTER TABLE `article_saves` DISABLE KEYS */;
INSERT INTO `article_saves` VALUES ('5d6f10d5-fea3-439e-ade4-1d2181b22daf','5d6b930e-be45-47a9-9aff-c34a49c64706','5f7f21f6-d04b-410b-ba8c-166bc9499a97','2026-07-22 03:05:41.195'),('d43c1219-e74a-4ee9-8f67-822b91b806fc','9411a115-cdeb-46f1-b001-5fe564306af1','84c3bbf1-997a-42ca-ab72-3e37f4359ed4','2026-07-22 03:05:41.199');
/*!40000 ALTER TABLE `article_saves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `article_tags`
--

DROP TABLE IF EXISTS `article_tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_tags` (
  `article_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tag_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`article_id`,`tag_id`),
  KEY `article_tags_tag_id_idx` (`tag_id`),
  CONSTRAINT `article_tags_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `article_tags_tag_id_fkey` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_tags`
--

LOCK TABLES `article_tags` WRITE;
/*!40000 ALTER TABLE `article_tags` DISABLE KEYS */;
INSERT INTO `article_tags` VALUES ('9411a115-cdeb-46f1-b001-5fe564306af1','085a1871-91a2-42cf-b5d8-7ad81a2eff82'),('c2f92634-c36e-4e46-b27d-24b63dd5b9d9','19e6607c-a949-4e6d-b1c0-6deec7db7d82'),('5d6b930e-be45-47a9-9aff-c34a49c64706','1cb9f41e-5b7c-438f-ade4-39c2d6c39bf7'),('27627d19-0677-468f-80b6-16c9141acaec','26be4271-c1c6-4fe0-87bd-29e2ce896a04'),('9411a115-cdeb-46f1-b001-5fe564306af1','2ae3d4c4-a922-4761-9ee9-21c176cb1283'),('5d6b930e-be45-47a9-9aff-c34a49c64706','2ba2ac44-e117-4e0e-a1b5-c2ee608a3bbc'),('99deb5c6-d0e1-4b8b-9a42-e8a3dc20a03b','2d0018d7-2693-490e-b215-ed23085b733e'),('c2f92634-c36e-4e46-b27d-24b63dd5b9d9','322e48fb-a5b0-4bfa-9cbf-76d213284d97'),('e3d735ba-e362-40c6-9ad7-3c0000a5686d','33d4edde-1d80-4e42-b0da-e89d40d51f85'),('9411a115-cdeb-46f1-b001-5fe564306af1','37319b90-c66f-4b88-8d38-7bfda96bbdb4'),('27627d19-0677-468f-80b6-16c9141acaec','38a8e6c0-9eee-4ea7-a31b-0de309a86bcf'),('e3d735ba-e362-40c6-9ad7-3c0000a5686d','45e51ea4-8db9-4d1f-81a3-1941ea9fb16f'),('27627d19-0677-468f-80b6-16c9141acaec','84b3d310-c749-431f-aadc-aec76227da31'),('c2f92634-c36e-4e46-b27d-24b63dd5b9d9','84b3d310-c749-431f-aadc-aec76227da31'),('e3d735ba-e362-40c6-9ad7-3c0000a5686d','8cd2ccf5-cc6e-4ec5-a319-5681bc3f96d7'),('bca7b771-6d3d-4456-bc11-94e2590788fb','9b87020e-1930-4779-86b8-7d3afc4444ee'),('bca7b771-6d3d-4456-bc11-94e2590788fb','d443b3bb-7ff9-46cc-adbc-ac545da7dedb'),('bca7b771-6d3d-4456-bc11-94e2590788fb','d8d310e4-2fa7-462a-b7bb-b6bc8965bf69'),('99deb5c6-d0e1-4b8b-9a42-e8a3dc20a03b','e65c4c32-e2cd-4c77-bfd4-c584248e001b'),('5d6b930e-be45-47a9-9aff-c34a49c64706','f7bac555-7cf6-4c2e-8b64-145318ad17c7'),('bca7b771-6d3d-4456-bc11-94e2590788fb','fee0eecf-cf1c-4e5a-b600-dcc04479c286');
/*!40000 ALTER TABLE `article_tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `summary` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `cover_image` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `category` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `reading_time` int NOT NULL DEFAULT '0',
  `views` int NOT NULL DEFAULT '0',
  `author_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `articles_author_id_idx` (`author_id`),
  KEY `articles_category_idx` (`category`),
  KEY `articles_created_at_idx` (`created_at`),
  CONSTRAINT `articles_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES ('27627d19-0677-468f-80b6-16c9141acaec','Boas práticas de Desenvolvimento Web','Pilares para construir aplicações web modernas e sustentáveis.','## Boas práticas de Desenvolvimento Web\n\nConstruir aplicações web modernas exige atenção a performance, acessibilidade e experiência do usuário.\n\nDivida a interface em componentes reutilizáveis. Isso reduz duplicação e facilita a manutenção.\n\nUsar TypeScript ajuda a prevenir uma classe inteira de bugs em tempo de compilação.',NULL,'Desenvolvimento web',1,187,'84c3bbf1-997a-42ca-ab72-3e37f4359ed4','2026-07-22 03:05:41.030','2026-07-22 03:05:41.030'),('5d6b930e-be45-47a9-9aff-c34a49c64706','O Futuro da Inteligência Artificial em 2025','Tendências e inovações que estão moldando o futuro da IA.','## O Futuro da Inteligência Artificial em 2025\n\nA inteligência artificial continua a evoluir em um ritmo acelerado. Neste artigo, vamos explorar as principais tendências e inovações que estão moldando o futuro da IA.\n\nOs modelos de linguagem estão se tornando cada vez mais sofisticados, capazes de entender e gerar texto com precisão impressionante.\n\nCom o avanço da IA, questões éticas se tornam cada vez mais importantes. É crucial desenvolver sistemas responsáveis e transparentes.',NULL,'Inteligência Artificial',1,342,'84c3bbf1-997a-42ca-ab72-3e37f4359ed4','2026-07-22 03:05:41.019','2026-07-22 03:05:41.019'),('9411a115-cdeb-46f1-b001-5fe564306af1','Docker na prática: containerizando sua aplicação','Do zero ao primeiro container rodando em minutos.','## Docker na prática\n\nContainers empacotam sua aplicação e suas dependências, garantindo que ela rode igual em qualquer ambiente.\n\nUm Dockerfile bem escrito é o primeiro passo para um deploy reproduzível.\n\nCom docker-compose, você sobe banco de dados e aplicação com um único comando.',NULL,'DevOps',1,421,'420e0b86-d88e-4cbb-9c36-dc05e7d3bbb9','2026-07-22 03:05:41.048','2026-07-22 03:05:41.048'),('99deb5c6-d0e1-4b8b-9a42-e8a3dc20a03b','Introdução ao TypeScript para quem vem do JavaScript','Como a tipagem estática melhora a qualidade do seu código.','## Introdução ao TypeScript\n\nTypeScript adiciona tipagem estática ao JavaScript, ajudando a detectar erros antes mesmo de rodar o código.\n\nComece tipando funções e interfaces. Aos poucos o compilador vira seu maior aliado.\n\nFerramentas como o strict mode elevam ainda mais a segurança do seu código.',NULL,'Desenvolvimento web',1,254,'420e0b86-d88e-4cbb-9c36-dc05e7d3bbb9','2026-07-22 03:05:41.039','2026-07-22 03:05:41.039'),('bca7b771-6d3d-4456-bc11-94e2590788fb','Construindo APIs REST com Node e Express','Arquitetura em camadas para APIs escaláveis e testáveis.','## Construindo APIs REST\n\nSeparar a aplicação em rotas, controllers, services e repositories deixa o código organizado e testável.\n\nValide toda entrada e trate erros de forma centralizada para respostas consistentes.\n\nAutenticação com JWT e senhas com bcrypt são o básico de segurança que você não pode ignorar.',NULL,'Backend',1,298,'5f7f21f6-d04b-410b-ba8c-166bc9499a97','2026-07-22 03:05:41.058','2026-07-22 03:05:41.058'),('c2f92634-c36e-4e46-b27d-24b63dd5b9d9','React Hooks: pensando em componentes','useState, useEffect e a arte de compor lógica reutilizável.','## React Hooks\n\nHooks permitem usar estado e efeitos em componentes de função, deixando o código mais direto.\n\nExtraia lógica repetida em hooks customizados para reutilizar entre telas.\n\nCuidado com as dependências dos efeitos para evitar renders desnecessários.',NULL,'Frontend',1,213,'b8fd518d-da1e-451e-b02c-7365c2de52fa','2026-07-22 03:05:41.074','2026-07-22 03:05:41.074'),('e3d735ba-e362-40c6-9ad7-3c0000a5686d','Prisma: o ORM que você vai gostar de usar','Migrações, tipagem forte e produtividade no acesso a dados.','## Prisma ORM\n\nO Prisma gera um client totalmente tipado a partir do seu schema, reduzindo erros de runtime.\n\nAs migrações versionadas contam a história da evolução do seu banco de dados.\n\nRelacionamentos e queries complexas ficam legíveis e seguros.',NULL,'Backend',1,176,'5f7f21f6-d04b-410b-ba8c-166bc9499a97','2026-07-22 03:05:41.067','2026-07-22 03:05:41.067');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment_likes`
--

DROP TABLE IF EXISTS `comment_likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_likes` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `comment_likes_comment_id_user_id_key` (`comment_id`,`user_id`),
  KEY `comment_likes_user_id_idx` (`user_id`),
  CONSTRAINT `comment_likes_comment_id_fkey` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_likes_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_likes`
--

LOCK TABLES `comment_likes` WRITE;
/*!40000 ALTER TABLE `comment_likes` DISABLE KEYS */;
INSERT INTO `comment_likes` VALUES ('751a028d-cf95-4b95-a615-bf0dbea11a97','cc7d6261-a7db-4b27-bd94-89165d6cba16','420e0b86-d88e-4cbb-9c36-dc05e7d3bbb9','2026-07-22 03:05:41.184'),('8c0129b0-e932-4f48-a5ef-8f5098c3e216','cc7d6261-a7db-4b27-bd94-89165d6cba16','84c3bbf1-997a-42ca-ab72-3e37f4359ed4','2026-07-22 03:05:41.179'),('d0e12396-3a75-419b-8211-858180185090','7ffb704d-6419-4b22-9fdd-df7389506d57','b8fd518d-da1e-451e-b02c-7365c2de52fa','2026-07-22 03:05:41.190');
/*!40000 ALTER TABLE `comment_likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `article_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `author_id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  KEY `comments_article_id_idx` (`article_id`),
  KEY `comments_author_id_idx` (`author_id`),
  CONSTRAINT `comments_article_id_fkey` FOREIGN KEY (`article_id`) REFERENCES `articles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_author_id_fkey` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES ('2bbcd598-6ece-4af4-ac2c-4fe509d5ba87','Isso mudou minha forma de pensar sobre o tema.','99deb5c6-d0e1-4b8b-9a42-e8a3dc20a03b','b8fd518d-da1e-451e-b02c-7365c2de52fa','2026-07-22 03:05:41.090'),('333e4622-bccd-4c93-85d6-b7b8cc6cdd01','Excelente conteúdo, aguardo a continuação!','9411a115-cdeb-46f1-b001-5fe564306af1','5f7f21f6-d04b-410b-ba8c-166bc9499a97','2026-07-22 03:05:41.094'),('7ffb704d-6419-4b22-9fdd-df7389506d57','Concordo com os pontos sobre ética.','27627d19-0677-468f-80b6-16c9141acaec','420e0b86-d88e-4cbb-9c36-dc05e7d3bbb9','2026-07-22 03:05:41.086'),('cc7d6261-a7db-4b27-bd94-89165d6cba16','Ótimo artigo, muito esclarecedor!','5d6b930e-be45-47a9-9aff-c34a49c64706','5f7f21f6-d04b-410b-ba8c-166bc9499a97','2026-07-22 03:05:41.082');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `newsletter_subscribers`
--

DROP TABLE IF EXISTS `newsletter_subscribers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `newsletter_subscribers` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(160) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  PRIMARY KEY (`id`),
  UNIQUE KEY `newsletter_subscribers_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `newsletter_subscribers`
--

LOCK TABLES `newsletter_subscribers` WRITE;
/*!40000 ALTER TABLE `newsletter_subscribers` DISABLE KEYS */;
INSERT INTO `newsletter_subscribers` VALUES ('79f241a4-8923-4ee7-93c6-7eb80e5e1f4a','leitor1@example.com','2026-07-22 03:05:41.205'),('c9012661-b346-402c-a75f-0505a5b873a6','leitor2@example.com','2026-07-22 03:05:41.205');
/*!40000 ALTER TABLE `newsletter_subscribers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tags` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(60) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tags_name_key` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES ('d8d310e4-2fa7-462a-b7bb-b6bc8965bf69','API'),('9b87020e-1930-4779-86b8-7d3afc4444ee','Backend'),('8cd2ccf5-cc6e-4ec5-a319-5681bc3f96d7','Banco de dados'),('26be4271-c1c6-4fe0-87bd-29e2ce896a04','Boas práticas'),('37319b90-c66f-4b88-8d38-7bfda96bbdb4','Containers'),('085a1871-91a2-42cf-b5d8-7ad81a2eff82','DevOps'),('2ae3d4c4-a922-4761-9ee9-21c176cb1283','Docker'),('d443b3bb-7ff9-46cc-adbc-ac545da7dedb','Express'),('84b3d310-c749-431f-aadc-aec76227da31','Frontend'),('f7bac555-7cf6-4c2e-8b64-145318ad17c7','Futuro'),('19e6607c-a949-4e6d-b1c0-6deec7db7d82','Hooks'),('1cb9f41e-5b7c-438f-ade4-39c2d6c39bf7','IA'),('e65c4c32-e2cd-4c77-bfd4-c584248e001b','JavaScript'),('2ba2ac44-e117-4e0e-a1b5-c2ee608a3bbc','Machine Learning'),('fee0eecf-cf1c-4e5a-b600-dcc04479c286','Node'),('45e51ea4-8db9-4d1f-81a3-1941ea9fb16f','ORM'),('38a8e6c0-9eee-4ea7-a31b-0de309a86bcf','Performance'),('33d4edde-1d80-4e42-b0da-e89d40d51f85','Prisma'),('322e48fb-a5b0-4bfa-9cbf-76d213284d97','React'),('2d0018d7-2693-490e-b215-ed23085b733e','TypeScript');
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(160) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `bio` varchar(500) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('user','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updated_at` datetime(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('420e0b86-d88e-4cbb-9c36-dc05e7d3bbb9','Carlos Souza','carlos@example.com','$2b$10$l0aGfKr42oofNZG6/XLhSOTNvG.Ovo1fjyqd7eTiypAIwBcRl4Iqu',NULL,'Engenheiro de software e fã de DevOps.','user','2026-07-22 03:05:41.005','2026-07-22 03:05:41.005'),('5f7f21f6-d04b-410b-ba8c-166bc9499a97','Marie Smith','marie@example.com','$2b$10$l0aGfKr42oofNZG6/XLhSOTNvG.Ovo1fjyqd7eTiypAIwBcRl4Iqu',NULL,'Escritora de tecnologia e entusiasta de IA.','user','2026-07-22 03:05:41.000','2026-07-22 03:05:41.000'),('84c3bbf1-997a-42ca-ab72-3e37f4359ed4','John Doe','john@example.com','$2b$10$l0aGfKr42oofNZG6/XLhSOTNvG.Ovo1fjyqd7eTiypAIwBcRl4Iqu',NULL,'Desenvolvedor Full Stack apaixonado por tecnologia.','admin','2026-07-22 03:05:40.994','2026-07-22 03:05:40.994'),('b8fd518d-da1e-451e-b02c-7365c2de52fa','Ana Lima','ana@example.com','$2b$10$l0aGfKr42oofNZG6/XLhSOTNvG.Ovo1fjyqd7eTiypAIwBcRl4Iqu',NULL,'Frontend developer e designer.','user','2026-07-22 03:05:41.012','2026-07-22 03:05:41.012');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-07-22  0:05:41
