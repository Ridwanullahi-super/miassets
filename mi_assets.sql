-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 05, 2023 at 10:51 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mi_assets`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `surname` varchar(25) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `other_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(25) NOT NULL,
  `address` text DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `password` varchar(225) DEFAULT NULL,
  `country` varchar(225) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `surname`, `first_name`, `other_name`, `phone_number`, `address`, `email`, `photo`, `password`, `country`, `state`) VALUES
(6, 'Asimiyu', 'Ridwan', 'Akanni', '07049578284', 'Kishi', 'asimiyuridwan5@gamil.com', NULL, '$2b$10$j1CYJwfzR3yvZ785P/HdMu63rmlgNIEGg.DO.Nb4G2kz4OkxYwX6W', NULL, NULL),
(7, 'Abdulyekeen', 'Shuaib', 'Opeyemi', '08101845602', 'oke-iho', 'shuaibopeyemi@yahoo.com', NULL, '$2b$10$8Fmz/5oMSAYG9JTxEOHZt.WDR5uALYWQZjWoz7VxGnst.FJVBNb1C', NULL, NULL),
(8, 'Raheem', 'Waliu', 'Adewuyi', '07017693127', 'igbo-ora', 'waliuraheem5@gmail.com', NULL, '$2b$10$CPGHFFC4pSB2C6lprtxKhem9Wl0.4nu3ra2s7I55VBcDzwgXv2FfC', 'nigeria', 'Oyo'),
(14, 'abdulbasheer', 'abdulrahman', '', '09087654321', 'kishi', 'abdulbasheerabdulrahman@gmail.com', NULL, '$2b$10$A35zzk/xkjQgm0ZWol3oRukrgLvztQYHkV7x7Ff27jyftkY4Otr9G', NULL, NULL),
(15, 'asimiyu', 'ridwan', 'Adewuyi', '+2347049578284', 'ibadan nigeria', 'asimiyuridwan@gmail.com', NULL, '$2b$10$W47nwTsfNEOPzpjwFYvajucuboIlFZ1n0hWgOYzP76xRXhEMcksJy', 'Nigeria', 'oyo');

-- --------------------------------------------------------

--
-- Table structure for table `fixed_assets`
--

CREATE TABLE `fixed_assets` (
  `id` int(11) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `address` varchar(25) NOT NULL,
  `seria_number` varchar(255) DEFAULT NULL,
  `company_name` varchar(255) DEFAULT NULL,
  `buyers_name` varchar(25) NOT NULL,
  `amount` int(11) NOT NULL,
  `current_amount` varchar(255) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `lifespan` varchar(25) DEFAULT NULL,
  `expense` varchar(225) DEFAULT NULL,
  `savage_value` varchar(252) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `fixed_assets`
--

INSERT INTO `fixed_assets` (`id`, `name`, `address`, `seria_number`, `company_name`, `buyers_name`, `amount`, `current_amount`, `admin_id`, `lifespan`, `expense`, `savage_value`, `user_id`) VALUES
(25, 'bulk', 'room 6', '3453', 'elsalam', 'ridwan', 120000, '230000', 8, '3', '1000', '1', NULL),
(27, 'arranger', 'tech-u', 'qwertg', 'adeck', 'super', 1200001, '1310000', 8, '4', '', '12', NULL),
(28, 'gwagone', 'ibadan nigeria', 'sddfghjk1', 'SuperCoded', 'Adekunle', 1210000, '1300000', 8, '3', '100', '', NULL),
(29, 'Bag', 'school bag', '3456b', 'ffg', 'super', 20000, '10000', 8, '2', '100', '1', NULL),
(32, 'bulk', 'kosho', 'fghjk4', 'LAWHAB', 'super', 5000000, '340000', 15, '5', '800', '50000', NULL),
(33, 'filling station', 'lagos', 'hjki', 'bikek', 'mujeeb', 50000, '10000', 15, '2', '2100', '5000', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `login`
--

CREATE TABLE `login` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `renters`
--

CREATE TABLE `renters` (
  `id` int(11) UNSIGNED NOT NULL,
  `surname` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `other_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(300) NOT NULL,
  `email` varchar(300) NOT NULL,
  `address` varchar(300) NOT NULL,
  `rent_time` varchar(11) DEFAULT NULL,
  `due_time` varchar(11) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `fixed_asset_id` int(11) UNSIGNED DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `renters`
--

INSERT INTO `renters` (`id`, `surname`, `first_name`, `other_name`, `phone_number`, `email`, `address`, `rent_time`, `due_time`, `admin_id`, `fixed_asset_id`, `user_id`) VALUES
(17, 'Asimiyu', 'Ridwan', '', '0987654321', 'asimiyuridwan5@gmail.com', 'ibadan nigeria', '2020-12-12', '1202-12-22', 8, 25, NULL),
(18, 'Asimiyu', 'Ridwan', '', '090678934135', 'asimiyuridwan5@gmail.com', 'ibadan nigeria', '2020-12-13', '2023-12-02', 8, 27, NULL),
(25, 'Asimiyu', 'Ridwan', '', '0908765432', 'asimiyuridwan5@gmail.com', 'ibadan Nigeria', '2021-12-12', '2024-12-20', 15, 32, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `surname` varchar(25) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `other_name` varchar(255) DEFAULT NULL,
  `phone_number` varchar(25) NOT NULL,
  `address` text DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `password` varchar(225) DEFAULT NULL,
  `country` varchar(225) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `surname`, `first_name`, `other_name`, `phone_number`, `address`, `email`, `photo`, `password`, `country`, `state`) VALUES
(16, 'olayiwola', 'ridwan', 'Adewuyi', '09087654321', 'ibadan nigeria', 'olayiwola@gmail.com', NULL, '$2b$10$qABpXYopblo0ANpw.7fEJOBtBRirwLVgXGxhCD.sIcu.fdUvbL4UG', NULL, NULL),
(17, 'olayiwola', 'ridwan', 'Akanni', '07049578284', 'ibadan nigeria', 'asimiyuridwan@gmail.com', NULL, '$2b$10$n.Um0A5YKLB0nOJY17w23efVTz7lsmznUg.ZYPqalVtVdhDn5nKvq', NULL, NULL),
(18, '', '', '', '', '', 'asimiyuridwan@gmail.com', NULL, '$2b$10$DLOSIl.bJlwtN0RtY8S3D.inmF1BZMBlMUaI8FyaEJQrbVAUjJ7fS', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `fixed_assets`
--
ALTER TABLE `fixed_assets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`admin_id`),
  ADD KEY `fixed_assets_userID_ibfk_1` (`user_id`);

--
-- Indexes for table `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `renters`
--
ALTER TABLE `renters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`admin_id`),
  ADD KEY `FK_fixed_asset_renter` (`fixed_asset_id`),
  ADD KEY `renters_UserID_ibfk_1` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `fixed_assets`
--
ALTER TABLE `fixed_assets`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `login`
--
ALTER TABLE `login`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `renters`
--
ALTER TABLE `renters`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `fixed_assets`
--
ALTER TABLE `fixed_assets`
  ADD CONSTRAINT `fixed_assets_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fixed_assets_userID_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `login`
--
ALTER TABLE `login`
  ADD CONSTRAINT `login_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `renters`
--
ALTER TABLE `renters`
  ADD CONSTRAINT `FK_fixed_asset_renter` FOREIGN KEY (`fixed_asset_id`) REFERENCES `fixed_assets` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `renters_UserID_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `renters_admin_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `renters_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admins` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
