-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: inventory
-- ------------------------------------------------------
-- Server version	8.0.41

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
-- Table structure for table `issued_items`
--

DROP TABLE IF EXISTS `issued_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `issued_items` (
  `issue_id` int NOT NULL AUTO_INCREMENT,
  `item` varchar(255) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `issued_by` varchar(255) DEFAULT NULL,
  `issue_date` date DEFAULT NULL,
  `issued_to` varchar(255) DEFAULT NULL,
  `item_id` int NOT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `units` varchar(50) DEFAULT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `domain` varchar(100) DEFAULT NULL,
  `category_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`issue_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `issued_items`
--

LOCK TABLES `issued_items` WRITE;
/*!40000 ALTER TABLE `issued_items` DISABLE KEYS */;
INSERT INTO `issued_items` VALUES (1,'milku',1,'Logged-in User','2025-03-23','lok',0,NULL,NULL,NULL,NULL,NULL),(2,'milku',5,'ggr','2025-03-24','vd',0,NULL,NULL,NULL,NULL,NULL),(3,'milku',5,'ggr','2025-03-24','vd',0,NULL,NULL,NULL,NULL,NULL),(4,'milku',5,'ggr','2025-03-24','vd',0,NULL,NULL,NULL,NULL,NULL),(5,'milk',1,'manager','2025-03-26','lokesh',0,NULL,NULL,NULL,NULL,NULL),(6,'milk',1,'manager','2025-03-26','lokesh',0,NULL,NULL,NULL,NULL,NULL),(7,'milk',1,'manager','2025-03-26','lokesh',0,NULL,NULL,NULL,NULL,NULL),(8,'milk',1,'Unknown User','2025-03-26','hh',0,NULL,NULL,NULL,NULL,NULL),(9,'milk',1,'Unknown User','2025-03-26','hh',0,NULL,NULL,NULL,NULL,NULL),(10,'milk',1,'Unknown User','2025-03-26','hh',0,NULL,NULL,NULL,NULL,NULL),(11,'milk',1,'Unknown User','2025-03-26','jk',0,NULL,NULL,NULL,NULL,NULL),(12,'milk',1,'Unknown User','2025-03-26','tt',0,NULL,NULL,NULL,NULL,NULL),(13,'paneer',1,'Unknown User','2025-03-26','abc',0,NULL,NULL,NULL,NULL,NULL),(14,'milk',1,'Unknown User','2025-03-26','xz',0,NULL,NULL,NULL,NULL,NULL),(15,'milk',1,'Unknown User','2025-03-26','lokesh',0,NULL,NULL,NULL,NULL,NULL),(16,'milk',1,'Unknown User','2025-03-26','lokesh',0,NULL,NULL,NULL,NULL,NULL),(17,'milk',1,'Unknown User','2025-03-26','lok',0,NULL,NULL,NULL,NULL,NULL),(18,'milk',1,'Unknown User','2025-03-26','aa',0,NULL,NULL,NULL,NULL,NULL);
/*!40000 ALTER TABLE `issued_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `name` varchar(100) NOT NULL,
  `brand` varchar(50) DEFAULT NULL,
  `quantity` int DEFAULT '0',
  `units` varchar(50) DEFAULT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `description` text,
  `domain` varchar(100) DEFAULT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(50) DEFAULT NULL,
  `supplier_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES ('milk','vijaya brand',33,'ltrs',40.00,'qassa','Hostel Canteen',1,'Dairy','S101'),('Potato','organic',10,'KGS',50.00,'Vegetables','Hostel Canteen',2,'vegetables','S102'),('paneer','vijaya',9,'KGS',67.00,'No.1','Hostel Canteen',3,'Dairy','S101'),('Rice','Bell',250,'kgs',80.00,NULL,'Hostel Canteen',4,'Grains','S101'),('Milk','Heritage',46,'ltrs',40.00,NULL,'Hostel Canteen',5,'Dairy','S111'),('Paneer','Heritage',20,'ltrs',70.00,NULL,'Hostel Canteen',6,'Dairy','S111'),('Ghee','Heritage',20,'ltrs',50.00,NULL,'Hostel Canteen',7,'Dairy','S111'),('Curd','Heritage',20,'ltrs',40.00,NULL,'Hostel Canteen',8,'Dairy','S111'),('Butter','Heritage',20,'ltrs',30.00,NULL,'Hostel Canteen',9,'Dairy','S111'),('Tomato','Organic',50,'kgs',80.00,NULL,'Hostel Canteen',10,'Vegetables','S112'),('Potato','Organic',40,'kgs',60.00,NULL,'Hostel Canteen',11,'Vegetables','S112'),('Chillis','Organic',30,'kgs',70.00,NULL,'Hostel Canteen',12,'Vegetables','S112'),('Ginger','Organic',20,'kgs',50.00,NULL,'Hostel Canteen',13,'Vegetables','S112'),('Carrot','Organic',20,'kgs',40.00,NULL,'Hostel Canteen',14,'Vegetables','S112'),('Beetroot','Organic',50,'kgs',30.00,NULL,'Hostel Canteen',15,'Vegetables','S112'),('Bottle guard','Organic',40,'kgs',80.00,NULL,'Hostel Canteen',16,'Vegetables','S112'),('Capcicum','Organic',30,'kgs',60.00,NULL,'Hostel Canteen',17,'Vegetables','S112'),('Ladies finger','Organic',5,'kgs',70.00,NULL,'Hostel Canteen',18,'Vegetables','S112'),('White Urad dal','aashirvaad',5,'kgs',50.00,NULL,'Hostel Canteen',19,'Pulses','S100'),('Toor dal','aashirvaad',6,'kgs',40.00,NULL,'Hostel Canteen',20,'Pulses','S100'),('Chana dal','aashirvaad',8,'kgs',30.00,NULL,'Hostel Canteen',21,'Pulses','S100'),('Chickpea','aashirvaad',3,'kgs',80.00,NULL,'Hostel Canteen',22,'Pulses','S100'),('Green peas','aashirvaad',5,'kgs',60.00,NULL,'Hostel Canteen',23,'Pulses','S100'),('Rice flour','aashirvaad',7,'kgs',70.00,NULL,'Hostel Canteen',24,'Flours','S100'),('Wheat flour','aashirvaad',9,'kgs',50.00,NULL,'Hostel Canteen',25,'Flours','S100'),('gram flour','aashirvaad',23,'kgs',40.00,NULL,'Hostel Canteen',26,'Flours','S100'),('Maida','aashirvaad',70,'kgs',30.00,NULL,'Hostel Canteen',27,'Flours','S100'),('Chilli powder','aashirvaad',60,'kgs',80.00,NULL,'Hostel Canteen',28,'Provisions','S101'),('Turmeric powder','aashirvaad',67,'kgs',60.00,NULL,'Hostel Canteen',29,'Provisions','S101'),('Sugar','aashirvaad',8,'kgs',70.00,NULL,'Hostel Canteen',30,'Provisions','S101'),('Salt','aashirvaad',67,'kgs',50.00,NULL,'Hostel Canteen',31,'Provisions','S101'),('Pepper','aashirvaad',90,'kgs',40.00,NULL,'Hostel Canteen',32,'Provisions','S101'),('Jaggery','aashirvaad',89,'kgs',30.00,NULL,'Hostel Canteen',33,'Provisions','S101');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchases`
--

DROP TABLE IF EXISTS `purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchases` (
  `purchase_id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(100) NOT NULL,
  `supplier_id` varchar(10) NOT NULL,
  `purchase_date` date NOT NULL,
  `quantity` int NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `total_cost` decimal(10,2) NOT NULL,
  PRIMARY KEY (`purchase_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
INSERT INTO `purchases` VALUES (1,'Milk','S111','2025-03-25',20,40.00,800.00),(2,'Milk','S111','2025-03-25',2,40.00,80.00),(3,'Milk','S111','2025-03-25',2,30.00,60.00),(4,'Milk','S111','2025-03-25',2,40.00,80.00);
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requests` (
  `request_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `item_name` varchar(100) NOT NULL,
  `request_date` date NOT NULL,
  `quantity_requested` int NOT NULL,
  `status` enum('Pending','Approved','Rejected','Issued') DEFAULT 'Pending',
  `manager_notes` text,
  PRIMARY KEY (`request_id`),
  KEY `user_id` (`user_id`),
  KEY `item_name` (`item_name`),
  CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `supplier_id` varchar(10) NOT NULL,
  `supplier_name` varchar(100) NOT NULL,
  `contact_person` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `address` text,
  PRIMARY KEY (`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES ('S100','Metro','A','9865772360','Vijayawada'),('S101','Sri Anjaneya General Stores','b','6555890245','Bapatla'),('S102','Om Sai Traders','c','9800833674','Bapatla'),('S103','Sandeep Poultry farm and chicken centre','d','8555904456','Bapatla'),('S104','Suneetha Pickles','e','7785310056','Bapatla'),('S105','Sri Shanmuka Gas Agency','f','9809957316','Bapatla'),('S106','Sri Guru Bangalore bakery','g','8220745122','Bapatla'),('S107','Sri Lakshmi Srinivasa Rice Mill','h','7555677809','Bapatla'),('S108','Balaji Egg Centre','i','8345790214','Bapatla'),('S109','Sri Sai Yogananda chemical works','j','9994679207','Bapatla'),('S110','Surya Nagarjuna sweets','k','7665498023','Bapatla'),('S111','Vijaya Dairy','l','8990256184','Bapatla'),('S112','Green farm','m','6008932189','Chirala');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('Admin','Manager','Staff') NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin@example.com','9876543210','hashed_password_1','Admin','2025-03-15 18:18:18'),(2,'manager1','manager1@example.com','9876543211','hashed_password_2','Manager','2025-03-15 18:18:18'),(3,'staff1','staff1@example.com','9876543212','hashed_password_3','Staff','2025-03-15 18:18:18'),(15,'lokeshpeddimsetti','lokesh@inventory.com','9876543312','$2b$10$Nf.xrJ9PkAE2xQi7PizWOeyD80BdGk.7AD68Atdi3JuChIydbdKNS','Staff','2025-03-22 17:10:42'),(16,'srujana','srujana@234.com','9876543318','$2b$10$5HiKEMyi48hYJRa.5xNmSOSn1S49KP1kaD4XVoYpyKphV7Yn3iUJe','Admin','2025-03-22 17:12:21'),(17,'admin3','admin3@example.com','9876543210','$2b$10$j2/S2n/ghV0ab68pK/ZIRO.H26tF735SmspFBnfU.qGIlyG5ey0yG','Admin','2025-03-22 17:14:50'),(18,'manager2','manager@gmail.com','9567898765','$2b$10$eFGcpbh28KfiWynsy4M6Y.OqZj1uQa0gPb6DE7YS3u2mVGoBYAaO.','Manager','2025-03-22 17:18:32'),(19,'admin6','admin6@example.com','9567898760','$2b$10$NNWi1sXhWqteHG80E8DvRObOda69krba0bgMa/.ep.5aPKz5l4sEe','Admin','2025-03-22 17:32:55'),(20,'saisrujana','srujana@2345gmail.com','9567898768','$2b$10$se83Qaq19NuGhdtHb3IVv.YMBBOurvOU92rqTULAn/lgmkGlQcprq','Manager','2025-03-24 06:19:23');
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

-- Dump completed on 2025-03-26 21:39:03
