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
INSERT INTO `article_likes` VALUES ('07c89160-087c-4bdc-a505-1b24a81d2f2d','e864aa3c-6c3d-4f50-8896-1d3be2658dbf','d52b6da6-c75f-46f8-89ac-0df9d5a19d0d','2026-07-22 01:09:22.863'),('150d868a-e975-48af-9c6d-4a3a756dd7e2','6d2cc4ba-a988-435d-941d-e73b9fcf1c50','712d4a8d-59fb-4bc2-94ae-84180211e37c','2026-07-22 01:09:22.872'),('2c0a5ba0-dd92-42ca-a15d-926c86a6aec9','83b7daf4-658e-43c9-acf6-a3887c0f3962','d52b6da6-c75f-46f8-89ac-0df9d5a19d0d','2026-07-22 01:09:22.906'),('598e6d37-583f-46f6-9d28-ebbb6b182228','8c754fd7-1fba-40b9-9267-0f3df717c152','712d4a8d-59fb-4bc2-94ae-84180211e37c','2026-07-22 01:09:22.848'),('6b8a3242-fd28-4b04-a86f-b71fa160e3cb','e864aa3c-6c3d-4f50-8896-1d3be2658dbf','712d4a8d-59fb-4bc2-94ae-84180211e37c','2026-07-22 01:09:22.857'),('765d87f1-b025-4465-9b36-b33a2eb8b1ce','9c9a2109-a7e1-4805-a905-887a0be7e9e1','712d4a8d-59fb-4bc2-94ae-84180211e37c','2026-07-22 01:09:22.925'),('a807e1db-6d77-4844-a1c5-a3fb98fa325a','d0a9c5c2-6f4f-431f-8bf5-49e713ad7263','712d4a8d-59fb-4bc2-94ae-84180211e37c','2026-07-22 01:09:22.892'),('ac4aaacf-cfe7-4a5a-ab3c-b7bfe697d6ca','6d2cc4ba-a988-435d-941d-e73b9fcf1c50','d52b6da6-c75f-46f8-89ac-0df9d5a19d0d','2026-07-22 01:09:22.880'),('b05b108c-c13b-4b8f-9562-d14da5af47b6','9617b20c-475a-478e-827d-0dd1b4a0af2a','97283008-d613-4478-8fe7-c4be51bf6d84','2026-07-22 01:09:22.921'),('e980230d-7e30-4350-b4ed-a2cd35654cba','6d2cc4ba-a988-435d-941d-e73b9fcf1c50','97283008-d613-4478-8fe7-c4be51bf6d84','2026-07-22 01:09:22.886'),('ed602496-2e29-4553-8b3d-aececc03b379','83b7daf4-658e-43c9-acf6-a3887c0f3962','712d4a8d-59fb-4bc2-94ae-84180211e37c','2026-07-22 01:09:22.898'),('f0da729f-0756-438a-9f4e-3b608d1b00d8','9617b20c-475a-478e-827d-0dd1b4a0af2a','712d4a8d-59fb-4bc2-94ae-84180211e37c','2026-07-22 01:09:22.910'),('f91c47d2-44c2-4fae-9a69-78a0b91cd57d','9617b20c-475a-478e-827d-0dd1b4a0af2a','d52b6da6-c75f-46f8-89ac-0df9d5a19d0d','2026-07-22 01:09:22.914');
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
INSERT INTO `article_saves` VALUES ('278b6eaa-69ab-4217-913a-f5e7b2a5f2e4','d0a9c5c2-6f4f-431f-8bf5-49e713ad7263','460ba30e-758a-4a34-9dcf-b94b21f3e322','2026-07-22 01:09:22.964'),('ac80ad32-e7a6-4ba5-9460-d87021636a9f','8c754fd7-1fba-40b9-9267-0f3df717c152','712d4a8d-59fb-4bc2-94ae-84180211e37c','2026-07-22 01:09:22.956');
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
INSERT INTO `article_tags` VALUES ('9617b20c-475a-478e-827d-0dd1b4a0af2a','0e6a9151-6169-45dc-973a-0543b70854d0'),('83b7daf4-658e-43c9-acf6-a3887c0f3962','105e8853-9ee4-45be-8127-0d18759c6780'),('83b7daf4-658e-43c9-acf6-a3887c0f3962','1d06a556-927b-4db7-84d3-cbdb9c3cae1a'),('e864aa3c-6c3d-4f50-8896-1d3be2658dbf','21ea1b15-0914-4df7-95bc-34552139b9cc'),('83b7daf4-658e-43c9-acf6-a3887c0f3962','35d80236-b71f-46b7-a21f-6cbd9de54bd2'),('d0a9c5c2-6f4f-431f-8bf5-49e713ad7263','456b77a2-061e-4b69-b36f-54ad09e75005'),('6d2cc4ba-a988-435d-941d-e73b9fcf1c50','4701196b-df2c-4397-85e7-7cc30ed7ae09'),('9c9a2109-a7e1-4805-a905-887a0be7e9e1','53643f8a-3997-4a91-b7a0-429d59e79305'),('8c754fd7-1fba-40b9-9267-0f3df717c152','5855e6c8-b5c1-43f4-b306-2ebbc2b4eb73'),('8c754fd7-1fba-40b9-9267-0f3df717c152','704b6a81-9962-4d7b-b4c9-bd1b2e535c42'),('83b7daf4-658e-43c9-acf6-a3887c0f3962','738270d8-12c5-4599-ad1c-20ff112b92f4'),('9c9a2109-a7e1-4805-a905-887a0be7e9e1','7524dd7f-5436-4a38-b207-76239f1cc379'),('e864aa3c-6c3d-4f50-8896-1d3be2658dbf','7524dd7f-5436-4a38-b207-76239f1cc379'),('8c754fd7-1fba-40b9-9267-0f3df717c152','90b4fe89-987c-47d4-a3ab-7f45eacb9068'),('d0a9c5c2-6f4f-431f-8bf5-49e713ad7263','9a57d34b-125e-40ac-930d-59da366541ef'),('9617b20c-475a-478e-827d-0dd1b4a0af2a','ac75c8b8-7a57-4f2c-8301-fbb3bcf3914c'),('d0a9c5c2-6f4f-431f-8bf5-49e713ad7263','ad060bf9-1496-411d-a30b-facb0dfb0e95'),('e864aa3c-6c3d-4f50-8896-1d3be2658dbf','b5545944-0a3c-4805-9bb3-aafb8b00b233'),('9617b20c-475a-478e-827d-0dd1b4a0af2a','d195ac3b-2257-4232-8c38-c8a22c5baa91'),('9c9a2109-a7e1-4805-a905-887a0be7e9e1','d75b4c60-03f0-470f-be83-1b9b8ee944f1'),('6d2cc4ba-a988-435d-941d-e73b9fcf1c50','f4306885-67e0-4e63-8da2-9464a5b9aaf7');
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
INSERT INTO `articles` VALUES ('6d2cc4ba-a988-435d-941d-e73b9fcf1c50','Introducao ao TypeScript para quem vem do JavaScript','Como a tipagem estatica melhora a qualidade do seu codigo.','## Introducao ao TypeScript\n\nTypeScript adiciona tipagem estatica ao JavaScript, ajudando a detectar erros antes mesmo de rodar o codigo.\n\nComece tipando funcoes e interfaces. Aos poucos o compilador vira seu maior aliado.\n\nFerramentas como o strict mode elevam ainda mais a seguranca do seu codigo.',NULL,'Desenvolvimento web',1,254,'d52b6da6-c75f-46f8-89ac-0df9d5a19d0d','2026-07-22 01:09:22.771','2026-07-22 01:09:22.771'),('83b7daf4-658e-43c9-acf6-a3887c0f3962','Construindo APIs REST com Node e Express','Arquitetura em camadas para APIs escalaveis e testaveis.','## Construindo APIs REST\n\nSeparar a aplicacao em rotas, controllers, services e repositories deixa o codigo organizado e testavel.\n\nValide toda entrada e trate erros de forma centralizada para respostas consistentes.\n\nAutenticacao com JWT e senhas com bcrypt sao o basico de seguranca que voce nao pode ignorar.',NULL,'Backend',1,298,'712d4a8d-59fb-4bc2-94ae-84180211e37c','2026-07-22 01:09:22.792','2026-07-22 01:09:22.792'),('8c754fd7-1fba-40b9-9267-0f3df717c152','O Futuro da Inteligencia Artificial em 2025','Tendencias e inovacoes que estao moldando o futuro da IA.','## O Futuro da Inteligencia Artificial em 2025\n\nA inteligencia artificial continua a evoluir em um ritmo acelerado. Neste artigo, vamos explorar as principais tendencias e inovacoes que estao moldando o futuro da IA.\n\nOs modelos de linguagem estao se tornando cada vez mais sofisticados, capazes de entender e gerar texto com precisao impressionante.\n\nCom o avanco da IA, questoes eticas se tornam cada vez mais importantes. E crucial desenvolver sistemas responsaveis e transparentes.',NULL,'Inteligencia Artificial',1,342,'460ba30e-758a-4a34-9dcf-b94b21f3e322','2026-07-22 01:09:22.749','2026-07-22 01:09:22.749'),('9617b20c-475a-478e-827d-0dd1b4a0af2a','Prisma: o ORM que voce vai gostar de usar','Migracoes, tipagem forte e produtividade no acesso a dados.','## Prisma ORM\n\nO Prisma gera um client totalmente tipado a partir do seu schema, reduzindo erros de runtime.\n\nAs migracoes versionadas contam a historia da evolucao do seu banco de dados.\n\nRelacionamentos e queries complexas ficam legiveis e seguros.',NULL,'Backend',1,176,'712d4a8d-59fb-4bc2-94ae-84180211e37c','2026-07-22 01:09:22.805','2026-07-22 01:09:22.805'),('9c9a2109-a7e1-4805-a905-887a0be7e9e1','React Hooks: pensando em componentes','useState, useEffect e a arte de compor logica reutilizavel.','## React Hooks\n\nHooks permitem usar estado e efeitos em componentes de funcao, deixando o codigo mais direto.\n\nExtraia logica repetida em hooks customizados para reutilizar entre telas.\n\nCuidado com as dependencias dos efeitos para evitar renders desnecessarios.',NULL,'Frontend',1,213,'97283008-d613-4478-8fe7-c4be51bf6d84','2026-07-22 01:09:22.819','2026-07-22 01:09:22.819'),('d0a9c5c2-6f4f-431f-8bf5-49e713ad7263','Docker na pratica: containerizando sua aplicacao','Do zero ao primeiro container rodando em minutos.','## Docker na pratica\n\nContainers empacotam sua aplicacao e suas dependencias, garantindo que ela rode igual em qualquer ambiente.\n\nUm Dockerfile bem escrito e o primeiro passo para um deploy reproduzivel.\n\nCom docker-compose, voce sobe banco de dados e aplicacao com um unico comando.',NULL,'DevOps',1,421,'d52b6da6-c75f-46f8-89ac-0df9d5a19d0d','2026-07-22 01:09:22.780','2026-07-22 01:09:22.780'),('e864aa3c-6c3d-4f50-8896-1d3be2658dbf','Boas praticas de Desenvolvimento Web','Pilares para construir aplicacoes web modernas e sustentaveis.','## Boas praticas de Desenvolvimento Web\n\nConstruir aplicacoes web modernas exige atencao a performance, acessibilidade e experiencia do usuario.\n\nDivida a interface em componentes reutilizaveis. Isso reduz duplicacao e facilita a manutencao.\n\nUsar TypeScript ajuda a prevenir uma classe inteira de bugs em tempo de compilacao.',NULL,'Desenvolvimento web',1,187,'460ba30e-758a-4a34-9dcf-b94b21f3e322','2026-07-22 01:09:22.762','2026-07-22 01:09:22.762');
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
INSERT INTO `comment_likes` VALUES ('5fe16f6b-a38e-42bd-9a09-f536da28f0dc','6031efec-6204-47c9-bd07-64385a74ddd4','97283008-d613-4478-8fe7-c4be51bf6d84','2026-07-22 01:09:22.947'),('7ff3d038-44d6-46a0-bcb3-2a5041cc0685','579de952-922b-41b8-a653-54b789ef39e9','d52b6da6-c75f-46f8-89ac-0df9d5a19d0d','2026-07-22 01:09:22.941'),('9535e7fc-9d1e-474d-9e09-ad1e108dd2be','579de952-922b-41b8-a653-54b789ef39e9','460ba30e-758a-4a34-9dcf-b94b21f3e322','2026-07-22 01:09:22.932');
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
INSERT INTO `comments` VALUES ('579de952-922b-41b8-a653-54b789ef39e9','Otimo artigo, muito esclarecedor!','8c754fd7-1fba-40b9-9267-0f3df717c152','712d4a8d-59fb-4bc2-94ae-84180211e37c','2026-07-22 01:09:22.829'),('6031efec-6204-47c9-bd07-64385a74ddd4','Concordo com os pontos sobre etica.','e864aa3c-6c3d-4f50-8896-1d3be2658dbf','d52b6da6-c75f-46f8-89ac-0df9d5a19d0d','2026-07-22 01:09:22.835'),('6cea1292-7065-4ade-90d5-a94ef77688ff','Excelente conteudo, aguardo a continuacao!','d0a9c5c2-6f4f-431f-8bf5-49e713ad7263','712d4a8d-59fb-4bc2-94ae-84180211e37c','2026-07-22 01:09:22.844'),('ceb439e2-31ff-452b-8382-052fa3da2b9d','Isso mudou minha forma de pensar sobre o tema.','6d2cc4ba-a988-435d-941d-e73b9fcf1c50','97283008-d613-4478-8fe7-c4be51bf6d84','2026-07-22 01:09:22.840');
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
INSERT INTO `newsletter_subscribers` VALUES ('20400d96-0b81-4644-a48e-ee47da1472ea','leitor1@example.com','2026-07-22 01:09:22.976'),('420e1875-40e3-461a-9d67-03bb3ca1f4eb','leitor2@example.com','2026-07-22 01:09:22.976');
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
INSERT INTO `tags` VALUES ('35d80236-b71f-46b7-a21f-6cbd9de54bd2','API'),('105e8853-9ee4-45be-8127-0d18759c6780','Backend'),('ac75c8b8-7a57-4f2c-8301-fbb3bcf3914c','Banco de dados'),('21ea1b15-0914-4df7-95bc-34552139b9cc','Boas praticas'),('456b77a2-061e-4b69-b36f-54ad09e75005','Containers'),('9a57d34b-125e-40ac-930d-59da366541ef','DevOps'),('ad060bf9-1496-411d-a30b-facb0dfb0e95','Docker'),('1d06a556-927b-4db7-84d3-cbdb9c3cae1a','Express'),('7524dd7f-5436-4a38-b207-76239f1cc379','Frontend'),('5855e6c8-b5c1-43f4-b306-2ebbc2b4eb73','Futuro'),('53643f8a-3997-4a91-b7a0-429d59e79305','Hooks'),('704b6a81-9962-4d7b-b4c9-bd1b2e535c42','IA'),('f4306885-67e0-4e63-8da2-9464a5b9aaf7','JavaScript'),('90b4fe89-987c-47d4-a3ab-7f45eacb9068','Machine Learning'),('738270d8-12c5-4599-ad1c-20ff112b92f4','Node'),('d195ac3b-2257-4232-8c38-c8a22c5baa91','ORM'),('b5545944-0a3c-4805-9bb3-aafb8b00b233','Performance'),('0e6a9151-6169-45dc-973a-0543b70854d0','Prisma'),('d75b4c60-03f0-470f-be83-1b9b8ee944f1','React'),('4701196b-df2c-4397-85e7-7cc30ed7ae09','TypeScript');
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
INSERT INTO `users` VALUES ('460ba30e-758a-4a34-9dcf-b94b21f3e322','John Doe','john@example.com','$2b$10$PbExRdnHSFalq1Apdy/8keqNBR8ClTVUfUV24LggWOKYVtjbessEO',NULL,'Desenvolvedor Full Stack apaixonado por tecnologia.','admin','2026-07-22 01:09:22.730','2026-07-22 01:09:22.730'),('712d4a8d-59fb-4bc2-94ae-84180211e37c','Marie Smith','marie@example.com','$2b$10$PbExRdnHSFalq1Apdy/8keqNBR8ClTVUfUV24LggWOKYVtjbessEO',NULL,'Escritora de tecnologia e entusiasta de IA.','user','2026-07-22 01:09:22.737','2026-07-22 01:09:22.737'),('97283008-d613-4478-8fe7-c4be51bf6d84','Ana Lima','ana@example.com','$2b$10$PbExRdnHSFalq1Apdy/8keqNBR8ClTVUfUV24LggWOKYVtjbessEO',NULL,'Frontend developer e designer.','user','2026-07-22 01:09:22.745','2026-07-22 01:09:22.745'),('d52b6da6-c75f-46f8-89ac-0df9d5a19d0d','Carlos Souza','carlos@example.com','$2b$10$PbExRdnHSFalq1Apdy/8keqNBR8ClTVUfUV24LggWOKYVtjbessEO',NULL,'Engenheiro de software e fa de DevOps.','user','2026-07-22 01:09:22.741','2026-07-22 01:09:22.741');
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

-- Dump completed on 2026-07-21 22:09:34
