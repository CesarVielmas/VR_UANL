-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: vr_uanl
-- ------------------------------------------------------
-- Server version	8.0.40

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
-- Table structure for table `__efmigrationshistory`
--

DROP TABLE IF EXISTS `__efmigrationshistory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `__efmigrationshistory` (
  `MigrationId` varchar(150) NOT NULL,
  `ProductVersion` varchar(32) NOT NULL,
  PRIMARY KEY (`MigrationId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `__efmigrationshistory`
--

LOCK TABLES `__efmigrationshistory` WRITE;
/*!40000 ALTER TABLE `__efmigrationshistory` DISABLE KEYS */;
INSERT INTO `__efmigrationshistory` VALUES ('20250109072840_DB_CREATE_1','8.0.8');
/*!40000 ALTER TABLE `__efmigrationshistory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `authusers`
--

DROP TABLE IF EXISTS `authusers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `authusers` (
  `IdAuthUser` int NOT NULL AUTO_INCREMENT,
  `UserName` varchar(100) NOT NULL,
  `UserPassword` varchar(100) NOT NULL,
  `UserLevel` tinyint unsigned NOT NULL,
  `UserConectionDate` datetime(6) NOT NULL,
  PRIMARY KEY (`IdAuthUser`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authusers`
--

LOCK TABLES `authusers` WRITE;
/*!40000 ALTER TABLE `authusers` DISABLE KEYS */;
/*!40000 ALTER TABLE `authusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buttoninformations`
--

DROP TABLE IF EXISTS `buttoninformations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buttoninformations` (
  `IdButtonInformation` int NOT NULL,
  `ButtonLarge` decimal(4,3) NOT NULL,
  `ButtonHigh` decimal(4,3) NOT NULL,
  `ButtonWidth` decimal(4,3) NOT NULL,
  `PositionX` decimal(5,3) NOT NULL,
  `PositionY` decimal(4,3) NOT NULL,
  `PositionZ` decimal(5,3) NOT NULL,
  `RotationSideX` decimal(6,3) NOT NULL,
  `RotationSideY` decimal(6,3) NOT NULL,
  `RotationSideZ` decimal(6,3) NOT NULL,
  `OptionalImage` longtext,
  `NameCompleteFaculty` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`IdButtonInformation`),
  CONSTRAINT `FK_ButtonInformations_Escenes_IdButtonInformation` FOREIGN KEY (`IdButtonInformation`) REFERENCES `escenes` (`IdEscene`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buttoninformations`
--

LOCK TABLES `buttoninformations` WRITE;
/*!40000 ALTER TABLE `buttoninformations` DISABLE KEYS */;
/*!40000 ALTER TABLE `buttoninformations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buttonredirects`
--

DROP TABLE IF EXISTS `buttonredirects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buttonredirects` (
  `IdButtonRedirect` int NOT NULL,
  `ButtonLarge` decimal(4,3) NOT NULL,
  `ButtonHigh` decimal(4,3) NOT NULL,
  `ButtonWidth` decimal(4,3) NOT NULL,
  `PositionX` decimal(5,3) NOT NULL,
  `PositionY` decimal(4,3) NOT NULL,
  `PositionZ` decimal(5,3) NOT NULL,
  `RotationSideX` decimal(6,3) NOT NULL,
  `RotationSideY` decimal(6,3) NOT NULL,
  `RotationSideZ` decimal(6,3) NOT NULL,
  `HorientationButton` longtext NOT NULL,
  `EsceneId` int DEFAULT NULL,
  PRIMARY KEY (`IdButtonRedirect`),
  KEY `IX_ButtonRedirects_EsceneId` (`EsceneId`),
  CONSTRAINT `FK_ButtonRedirects_Escenes_EsceneId` FOREIGN KEY (`EsceneId`) REFERENCES `escenes` (`IdEscene`),
  CONSTRAINT `FK_ButtonRedirects_Escenes_IdButtonRedirect` FOREIGN KEY (`IdButtonRedirect`) REFERENCES `escenes` (`IdEscene`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buttonredirects`
--

LOCK TABLES `buttonredirects` WRITE;
/*!40000 ALTER TABLE `buttonredirects` DISABLE KEYS */;
/*!40000 ALTER TABLE `buttonredirects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `escenes`
--

DROP TABLE IF EXISTS `escenes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `escenes` (
  `IdEscene` int NOT NULL AUTO_INCREMENT,
  `NamePositionScene` varchar(500) NOT NULL,
  `NameScene` varchar(500) NOT NULL,
  `ImageScene` longtext NOT NULL,
  `UniversityId` int NOT NULL,
  PRIMARY KEY (`IdEscene`),
  UNIQUE KEY `IX_Escenes_NamePositionScene` (`NamePositionScene`),
  KEY `IX_Escenes_UniversityId` (`UniversityId`),
  CONSTRAINT `FK_Escenes_Universities_UniversityId` FOREIGN KEY (`UniversityId`) REFERENCES `universities` (`IdUniversity`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `escenes`
--

LOCK TABLES `escenes` WRITE;
/*!40000 ALTER TABLE `escenes` DISABLE KEYS */;
/*!40000 ALTER TABLE `escenes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `universities`
--

DROP TABLE IF EXISTS `universities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `universities` (
  `IdUniversity` int NOT NULL AUTO_INCREMENT,
  `NameFaculty` varchar(30) NOT NULL,
  `NameCompleteFaculty` varchar(500) NOT NULL,
  `LogoFaculty` longtext NOT NULL,
  `ImageFaculty` longtext NOT NULL,
  `AuthUserIdAuthUser` int DEFAULT NULL,
  PRIMARY KEY (`IdUniversity`),
  UNIQUE KEY `IX_Universities_NameCompleteFaculty` (`NameCompleteFaculty`),
  UNIQUE KEY `IX_Universities_NameFaculty` (`NameFaculty`),
  KEY `IX_Universities_AuthUserIdAuthUser` (`AuthUserIdAuthUser`),
  CONSTRAINT `FK_Universities_AuthUsers_AuthUserIdAuthUser` FOREIGN KEY (`AuthUserIdAuthUser`) REFERENCES `authusers` (`IdAuthUser`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `universities`
--

LOCK TABLES `universities` WRITE;
/*!40000 ALTER TABLE `universities` DISABLE KEYS */;
/*!40000 ALTER TABLE `universities` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-09  1:37:36
