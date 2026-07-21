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
INSERT INTO `_prisma_migrations` VALUES ('8b6e7881-3a3d-4725-a44b-26e0b50c7d62','1bfe4e6963b1efdc6fe8219ab473247121a489c91c19883b887079c5909f8a4c','2026-07-21 18:46:36.037','20260721184635_init',NULL,NULL,'2026-07-21 18:46:35.146',1);
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
INSERT INTO `article_likes` VALUES ('8fd84b7e-90e7-4137-b637-0ab667fcbea6','d66b1ca6-d0a7-4f7e-bfd4-0fc768e25952','105b73e1-f498-443e-9daf-0be8cab54f4e','2026-07-21 18:48:20.252');
/*!40000 ALTER TABLE `article_likes` ENABLE KEYS */;
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
INSERT INTO `articles` VALUES ('13a66f7c-03ff-4a69-b1e5-1f926b509790','Boas praticas de Desenvolvimento Web','Pilares para construir aplicacoes web modernas e sustentaveis.','## Boas praticas de Desenvolvimento Web\n\nConstruir aplicacoes web modernas exige atencao a performance, acessibilidade\ne experiencia do usuario. Vamos ver alguns pilares importantes.\n\n## Componentizacao\n\nDivida a interface em componentes reutilizaveis. Isso reduz duplicacao e\nfacilita a manutencao do codigo ao longo do tempo.\n\n## Tipagem forte\n\nUsar TypeScript ajuda a prevenir uma classe inteira de bugs em tempo de\ncompilacao, deixando o codigo mais seguro e legivel.',NULL,'Desenvolvimento web',1,87,'ce87073f-7f3e-4c19-bf21-a3285cb07102','2026-07-21 18:48:20.240','2026-07-21 18:48:20.240'),('d66b1ca6-d0a7-4f7e-bfd4-0fc768e25952','O Futuro da Inteligencia Artificial em 2025','Tendencias e inovacoes que estao moldando o futuro da IA.','## O Futuro da Inteligencia Artificial em 2025\n\nA inteligencia artificial continua a evoluir em um ritmo acelerado. Neste artigo,\nvamos explorar as principais tendencias e inovacoes que estao moldando o futuro da IA.\n\n## Modelos de Linguagem Avancados\n\nOs modelos de linguagem como GPT-4 e alem estao se tornando cada vez mais\nsofisticados, capazes de entender e gerar texto com precisao impressionante.\n\n## Automacao Inteligente\n\nA automacao esta alcancando novos patamares com sistemas de IA que podem\ntomar decisoes complexas e adaptar-se a novas situacoes.\n\n## Etica e Responsabilidade\n\nCom o avanco da IA, questoes eticas se tornam cada vez mais importantes. E\ncrucial desenvolver sistemas responsaveis e transparentes.',NULL,'Desenvolvimento web',1,122,'ce87073f-7f3e-4c19-bf21-a3285cb07102','2026-07-21 18:48:20.235','2026-07-21 18:48:20.235');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
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
INSERT INTO `comments` VALUES ('41a8f79d-757d-4b43-9654-2500f01970d0','Otimo artigo, muito esclarecedor!','d66b1ca6-d0a7-4f7e-bfd4-0fc768e25952','105b73e1-f498-443e-9daf-0be8cab54f4e','2026-07-21 18:48:20.248'),('b558758e-def6-4d47-bfbf-41f3f92f27ae','Concordo com os pontos sobre etica.','d66b1ca6-d0a7-4f7e-bfd4-0fc768e25952','105b73e1-f498-443e-9daf-0be8cab54f4e','2026-07-21 18:48:20.248');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
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
INSERT INTO `users` VALUES ('105b73e1-f498-443e-9daf-0be8cab54f4e','Marie Smith','marie@example.com','$2b$10$0MxzTyRVg0N0ep31e1icNue6n5RyemNG3G6wCEkOk3W2jX0eBPxby',NULL,'Escritora de tecnologia e entusiasta de IA.','user','2026-07-21 18:48:20.228','2026-07-21 18:48:20.228'),('ce87073f-7f3e-4c19-bf21-a3285cb07102','John Doe','john@example.com','$2b$10$0MxzTyRVg0N0ep31e1icNue6n5RyemNG3G6wCEkOk3W2jX0eBPxby',NULL,'Desenvolvedor Full Stack apaixonado por tecnologia e inovacao.','admin','2026-07-21 18:48:20.220','2026-07-21 18:48:20.220');
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

-- Dump completed on 2026-07-21 15:50:52
