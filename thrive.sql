CREATE DATABASE  IF NOT EXISTS `thrive_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */;
USE `thrive_db`;
-- MySQL dump 10.13  Distrib 8.0.13, for macos10.14 (x86_64)
--
-- Host: localhost    Database: thrive_db
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `rides`
--

DROP TABLE IF EXISTS `rides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `rides` (
  `id` int(12) unsigned NOT NULL AUTO_INCREMENT,
  `cust_id` int(12) unsigned NOT NULL,
  `driver_id` int(12) unsigned DEFAULT NULL,
  `coord_x` int(12) unsigned DEFAULT NULL,
  `coord_y` int(12) unsigned DEFAULT NULL,
  `status` varchar(20) DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rides`
--

LOCK TABLES `rides` WRITE;
/*!40000 ALTER TABLE `rides` DISABLE KEYS */;
/*!40000 ALTER TABLE `rides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `id` int(12) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `type` varchar(50) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `coord_x` int(12) unsigned DEFAULT NULL,
  `coord_y` int(12) unsigned DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'driver1','driver','b85aef08608180db9d4ddad38ae40545','driver1', NULL, NULL,'2019-07-26 17:53:53','2019-07-26 17:57:06'),(2,'driver2','driver','d95784faa6597a0253e483e500ced3ee','driver2', NULL, NULL,'2019-07-26 17:56:29','2019-07-26 17:57:06'),(3,'driver3','driver','e44435627359f4c3de71b538cdefdc14','driver3', NULL, NULL,'2019-07-26 17:56:36','2019-07-26 17:57:06'),(4,'driver4','driver','a727098b2711281f6bee057b613ccd5e','driver4', NULL, NULL,'2019-07-26 17:56:41','2019-07-26 17:57:06'),(5,'driver5','driver','bd5f2ceffd2ded0e3717135069b5a960','driver5', NULL, NULL,'2019-07-26 17:56:50','2019-07-26 17:57:06'),(6,'client1','client','a165dd3c2e98d5d607181d0b87a4c66b','client1', NULL, NULL,'2019-07-26 18:07:25','2019-07-26 18:07:25'),(7,'client2','client','2c66045d4e4a90814ce9280272e510ec','client2', NULL, NULL,'2019-07-26 18:07:28','2019-07-26 18:07:28');
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

-- Dump completed on 2019-07-27 10:30:20
