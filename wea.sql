-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 207.148.102.63.vultrusercontent.com
-- Generation Time: Oct 21, 2022 at 03:12 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `wea`
--

-- --------------------------------------------------------

--
-- Table structure for table `approveds`
--

CREATE TABLE `approveds` (
  `transactionHash` char(100) CHARACTER SET ascii NOT NULL,
  `chainId` int(11) NOT NULL,
  `symbol` char(10) CHARACTER SET ascii NOT NULL,
  `owner` char(100) CHARACTER SET ascii NOT NULL,
  `spender` char(100) CHARACTER SET armscii8 NOT NULL,
  `note` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `transfereds`
--

CREATE TABLE `transfereds` (
  `transactionHash` char(100) CHARACTER SET ascii NOT NULL,
  `chainId` int(11) NOT NULL,
  `symbol` char(10) CHARACTER SET ascii NOT NULL,
  `fromAddress` char(100) CHARACTER SET ascii NOT NULL,
  `toAddress` char(100) CHARACTER SET ascii NOT NULL,
  `amount` char(100) CHARACTER SET ascii NOT NULL,
  `note` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `transfererrors`
--

CREATE TABLE `transfererrors` (
  `id` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `error` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`error`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `approveds`
--
ALTER TABLE `approveds`
  ADD PRIMARY KEY (`transactionHash`);

--
-- Indexes for table `transfereds`
--
ALTER TABLE `transfereds`
  ADD PRIMARY KEY (`transactionHash`);

--
-- Indexes for table `transfererrors`
--
ALTER TABLE `transfererrors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `transfererrors`
--
ALTER TABLE `transfererrors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
