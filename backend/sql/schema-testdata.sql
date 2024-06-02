CREATE DATABASE  IF NOT EXISTS `2021-forum` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `2021-forum`;
-- MySQL dump 10.13  Distrib 8.0.14, for macos10.14 (x86_64)
--
-- Host: localhost    Database: 2021-forum
-- ------------------------------------------------------
-- Server version	8.0.14

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
-- Table structure for table `posting`
--

DROP TABLE IF EXISTS `posting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `posting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(60) DEFAULT NULL,
  `content` varchar(1024) DEFAULT NULL,
  `author_id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_author_idx` (`author_id`),
  KEY `fk_parent_idx` (`parent_id`),
  CONSTRAINT `fk_author` FOREIGN KEY (`author_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_parent` FOREIGN KEY (`parent_id`) REFERENCES `posting` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posting`
--

LOCK TABLES `posting` WRITE;
/*!40000 ALTER TABLE `posting` DISABLE KEYS */;
INSERT INTO `posting` VALUES (86,'Maxime Qui Rem','Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',26,NULL,'2017-08-04 23:05:36'),(87,'Libero Dignissimos Repellat','In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.',26,NULL,'2018-02-01 11:00:50'),(88,NULL,'Tincidunt dui ut ornare lectus sit amet. Massa sed elementum tempus egestas. Et pharetra pharetra massa massa. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Tellus elementum sagittis vitae et leo duis ut diam quam. Pharetra vel turpis nunc eget lorem. Neque aliquam vestibulum morbi blandit cursus risus at ultrices. Amet consectetur adipiscing elit duis tristique sollicitudin nibh sit.',28,87,'2018-02-01 13:27:03'),(89,NULL,'Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla.',30,87,'2018-02-01 15:44:30'),(90,'Assumenda Saepe Non','Eu lobortis elementum nibh tellus. Arcu dictum varius duis at consectetur. Tempus urna et pharetra pharetra massa massa ultricies mi quis. Enim eu turpis egestas pretium aenean pharetra magna ac placerat. Fames ac turpis egestas maecenas pharetra. Turpis massa sed elementum tempus egestas. Consectetur libero id faucibus nisl tincidunt eget. Lorem mollis aliquam ut porttitor leo. Volutpat ac tincidunt vitae semper quis lectus nulla at volutpat.',28,NULL,'2018-01-30 03:51:53'),(91,'recusandae est consequatur','Gravida neque convallis a cras semper auctor neque vitae. Quis eleifend quam adipiscing vitae. Erat velit scelerisque in dictum non consectetur a erat. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Donec ultrices tincidunt arcu non sodales neque sodales.',28,NULL,'2018-02-09 02:49:36'),(92,'Consequatur Itaque Nesciunt','Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Dignissim enim sit amet venenatis urna cursus. Tellus molestie nunc non blandit massa enim nec dui nunc. Rhoncus est pellentesque elit ullamcorper dignissim.',30,NULL,'2018-02-21 12:00:20'),(93,NULL,'Odio aenean sed adipiscing diam donec adipiscing tristique risus.',29,92,'2018-02-27 06:06:20'),(94,NULL,'Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Scelerisque fermentum dui faucibus in.',29,92,'2018-02-27 06:06:20'),(95,NULL,'Et tortor at risus viverra adipiscing at. Tristique risus nec feugiat in fermentum posuere urna. Gravida rutrum quisque non tellus. Sed ullamcorper morbi tincidunt ornare massa. Odio aenean sed adipiscing diam donec adipiscing tristique risus. In nisl nisi scelerisque eu. Eu turpis egestas pretium aenean pharetra magna ac. Aliquet lectus proin nibh nisl condimentum id. Laoreet sit amet cursus sit amet dictum sit amet. Risus in hendrerit gravida rutrum.',27,92,'2018-03-01 02:42:00'),(96,NULL,'Commodo quis imperdiet massa tincidunt nunc pulvinar. Tellus id interdum velit laoreet id. Iaculis nunc sed augue lacus viverra vitae congue eu. Penatibus et magnis dis parturient montes nascetur. Interdum velit euismod in pellentesque. Sed adipiscing diam donec adipiscing tristique risus nec feugiat in. Odio ut enim blandit volutpat maecenas volutpat. Mattis nunc sed blandit libero volutpat. Aliquam purus sit amet luctus venenatis lectus magna fringilla urna. In iaculis nunc sed augue. Diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet.',29,95,'2018-03-02 22:30:11'),(97,NULL,'Tincidunt tortor aliquam nulla facilisi. Imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor. Ut porttitor leo a diam. Tincidunt ornare massa eget egestas purus.',29,95,'2018-03-03 12:15:07'),(98,NULL,'Auctor eu augue ut lectus. Purus in mollis nunc sed id semper risus. At urna condimentum mattis pellentesque id nibh tortor id aliquet. Diam donec adipiscing tristique risus nec feugiat in.',30,97,'2018-03-04 16:50:13'),(99,NULL,'Fermentum dui faucibus in ornare quam viverra orci. Tincidunt vitae semper quis lectus nulla at.',28,97,'2018-03-04 05:04:14'),(100,NULL,'Ultrices neque ornare aenean euismod elementum nisi quis eleifend quam. Sem viverra aliquet eget sit amet tellus. Aliquam faucibus purus in massa tempor nec feugiat nisl.',27,97,'2018-03-05 07:17:17'),(101,'Inventore Qui Explicabo','Eu mi bibendum neque egestas congue. A cras semper auctor neque vitae tempus quam pellentesque.',30,NULL,'2018-01-17 11:14:26'),(102,'Vel Alias Repellat','Pharetra massa massa ultricies mi quis. Id aliquet lectus proin nibh nisl condimentum id venenatis a. Aliquet bibendum enim facilisis gravida neque convallis a cras. Scelerisque mauris pellentesque pulvinar pellentesque. Auctor neque vitae tempus quam pellentesque nec nam aliquam. Tellus mauris a diam maecenas sed enim. Tempor id eu nisl nunc.',30,NULL,'2017-12-11 06:15:30');
/*!40000 ALTER TABLE `posting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(60) DEFAULT NULL,
  `lastname` varchar(60) DEFAULT NULL,
  `username` varchar(60) NOT NULL,
  `pwd` varchar(512) NOT NULL,
  `avatar` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (26,'Grady','Booch','gbo@oonet.com','$2b$10$mrPqooFJTgHeLNx7VlqtCezAgnkr599xNnA5z91RS3BSIxHjN4pH.','avatar09.svg'),(27,'Niklaus','Wirth','nw@inf.ethz.ch','$2b$10$mrPqooFJTgHeLNx7VlqtCezAgnkr599xNnA5z91RS3BSIxHjN4pH.','avatar04.svg'),(28,'Dennis','Ritchie','dr@bell.org','$2b$10$mrPqooFJTgHeLNx7VlqtCezAgnkr599xNnA5z91RS3BSIxHjN4pH.','avatar05.svg'),(29,'Edgar','Codd','ec@oxf.edu','$2b$10$mrPqooFJTgHeLNx7VlqtCezAgnkr599xNnA5z91RS3BSIxHjN4pH.','avatar06.svg'),(30,'Marie','Harrison','mh@bbc.co.uk','$2b$10$mrPqooFJTgHeLNx7VlqtCezAgnkr599xNnA5z91RS3BSIxHjN4pH.','avatar01.svg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vote`
--

DROP TABLE IF EXISTS `vote`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `vote` (
  `user_id` int(11) NOT NULL,
  `posting_id` int(11) NOT NULL,
  `isupvote` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`user_id`,`posting_id`),
  KEY `fk_posting_idx` (`posting_id`),
  CONSTRAINT `fk_posting` FOREIGN KEY (`posting_id`) REFERENCES `posting` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vote`
--

LOCK TABLES `vote` WRITE;
/*!40000 ALTER TABLE `vote` DISABLE KEYS */;
INSERT INTO `vote` VALUES (26,90,1),(27,87,0),(27,89,1),(27,92,0),(27,93,1),(27,94,1),(27,96,1),(27,97,1),(27,98,1),(27,99,1),(27,101,1),(27,102,0),(28,86,0),(28,95,0),(28,100,1),(29,86,1),(29,88,1),(29,91,0),(30,86,1);
/*!40000 ALTER TABLE `vote` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-02-03 18:13:06
