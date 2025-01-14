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
INSERT INTO `__efmigrationshistory` VALUES ('20250113214513_DB_CREATE_2','8.0.8'),('20250114070529_DB_CREATE_3','8.0.8'),('20250114080102_DB_CREATE_4','8.0.8');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `authusers`
--

LOCK TABLES `authusers` WRITE;
/*!40000 ALTER TABLE `authusers` DISABLE KEYS */;
INSERT INTO `authusers` VALUES (1,'CesarVielmas','$2a$11$n1YXTws1QvsWNExcrVaDueypqnc9YQTuUtgaWSFoEmfKq8dVQfWpG',4,'2025-01-14 02:23:24.727327'),(3,'IvanAlvarado','$2a$11$Kx0LTEwUMyJWyA3V9M0Mq.VxMx10KH2lQJZ8MIsCAz.ktruFf.3FG',3,'2025-01-14 02:54:08.241669');
/*!40000 ALTER TABLE `authusers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buttoninformations`
--

DROP TABLE IF EXISTS `buttoninformations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buttoninformations` (
  `IdButtonInformation` int NOT NULL AUTO_INCREMENT,
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
  `TextInformation` varchar(500) DEFAULT NULL,
  `EsceneId` int DEFAULT NULL,
  PRIMARY KEY (`IdButtonInformation`),
  KEY `IX_ButtonInformations_EsceneId` (`EsceneId`),
  CONSTRAINT `FK_ButtonInformations_Escenes_EsceneId` FOREIGN KEY (`EsceneId`) REFERENCES `escenes` (`IdEscene`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buttoninformations`
--

LOCK TABLES `buttoninformations` WRITE;
/*!40000 ALTER TABLE `buttoninformations` DISABLE KEYS */;
INSERT INTO `buttoninformations` VALUES (1,1.250,1.500,1.000,10.000,-2.500,5.000,30.000,45.000,60.000,NULL,NULL,1),(2,1.250,1.500,1.000,10.000,-2.500,5.000,30.000,45.000,60.000,'https://http2.mlstatic.com/D_NQ_NP_860466-MLB45377590857_032021-O.webp','Texto de ejemplo para informacion 1',1);
/*!40000 ALTER TABLE `buttoninformations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buttonredirects`
--

DROP TABLE IF EXISTS `buttonredirects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `buttonredirects` (
  `IdButtonRedirect` int NOT NULL AUTO_INCREMENT,
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
  `PageToSenderIdEscene` int DEFAULT NULL,
  `TargetEsceneId` int DEFAULT NULL,
  PRIMARY KEY (`IdButtonRedirect`),
  KEY `IX_ButtonRedirects_EsceneId` (`EsceneId`),
  KEY `IX_ButtonRedirects_PageToSenderIdEscene` (`PageToSenderIdEscene`),
  KEY `IX_ButtonRedirects_TargetEsceneId` (`TargetEsceneId`),
  CONSTRAINT `FK_ButtonRedirects_Escenes_EsceneId` FOREIGN KEY (`EsceneId`) REFERENCES `escenes` (`IdEscene`) ON DELETE CASCADE,
  CONSTRAINT `FK_ButtonRedirects_Escenes_PageToSenderIdEscene` FOREIGN KEY (`PageToSenderIdEscene`) REFERENCES `escenes` (`IdEscene`),
  CONSTRAINT `FK_ButtonRedirects_Escenes_TargetEsceneId` FOREIGN KEY (`TargetEsceneId`) REFERENCES `escenes` (`IdEscene`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buttonredirects`
--

LOCK TABLES `buttonredirects` WRITE;
/*!40000 ALTER TABLE `buttonredirects` DISABLE KEYS */;
INSERT INTO `buttonredirects` VALUES (1,1.250,1.500,1.000,10.000,-2.500,5.000,30.000,45.000,60.000,'Left',1,2,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `escenes`
--

LOCK TABLES `escenes` WRITE;
/*!40000 ALTER TABLE `escenes` DISABLE KEYS */;
INSERT INTO `escenes` VALUES (1,'Pasillo_Principal','Pasillo Principal','https://th.bing.com/th/id/OIP.Z1Tcf_5U05cwTopmcekZugAAAA?rs=1&pid=ImgDetMain',1),(2,'Pasillo_Principal_2','Escaleras Principales','https://th.bing.com/th/id/OIP.G37UJehGFkAmrQXEM06C8QHaLH?rs=1&pid=ImgDetMain',1),(3,'Pasillo_Principal_3','Salon De Clases AB1','https://media.allure.com/photos/5890d754a08420c838db65e1/master/pass/WesWall1Edit.jpg',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `universities`
--

LOCK TABLES `universities` WRITE;
/*!40000 ALTER TABLE `universities` DISABLE KEYS */;
INSERT INTO `universities` VALUES (1,'FIME','Facultad De Ingenieria Mecanica y Electrica','https://th.bing.com/th/id/OIP.XmUGB0f9XDiQQVuNOGrZCAHaCk?rs=1&pid=ImgDetMain','https://th.bing.com/th/id/OIP.ay7HitP2l-ETq8L0vJ5uKAHaFi?pid=ImgDet&w=474&h=354&rs=1',3);
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

-- Dump completed on 2025-01-14  2:58:52
