-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 22, 2026 at 06:48 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotel`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `hotel_id` varchar(50) DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  `check_in` date DEFAULT NULL,
  `check_out` date DEFAULT NULL,
  `total_price` decimal(10,2) DEFAULT NULL,
  `status` enum('pending','confirmed','cancelled') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `hotel_id`, `room_id`, `check_in`, `check_out`, `total_price`, `status`, `created_at`) VALUES
(2, 12, '1', 2, '2026-06-22', '2026-06-25', 300000.00, 'pending', '2026-06-22 10:19:45'),
(3, 14, '1', 3, '2026-06-22', '2026-06-25', 300000.00, 'pending', '2026-06-22 10:22:32'),
(5, 12, '5', 22, '2026-06-22', '2026-06-23', 100000.00, 'cancelled', '2026-06-22 14:30:39'),
(6, 12, '3', 16, '2026-06-22', '2026-06-23', 200000.00, 'confirmed', '2026-06-22 14:30:53'),
(7, 12, '6', 27, '2026-06-22', '2026-06-23', 300000.00, 'confirmed', '2026-06-22 14:31:16'),
(8, 12, '5', 23, '2026-06-22', '2026-06-23', 200000.00, 'confirmed', '2026-06-22 14:31:30'),
(9, 9, '6', 26, '2026-06-22', '2026-06-23', 250000.00, 'confirmed', '2026-06-22 14:32:23'),
(12, 10, '5', 22, '2026-06-22', '2026-06-23', 100000.00, 'confirmed', '2026-06-22 14:33:20'),
(13, 10, '7', 28, '2026-06-22', '2026-06-23', 200000.00, 'confirmed', '2026-06-22 14:33:32'),
(14, 10, '6', 25, '2026-06-22', '2026-06-23', 200000.00, 'confirmed', '2026-06-22 14:35:33');

-- --------------------------------------------------------

--
-- Table structure for table `hotels`
--

CREATE TABLE `hotels` (
  `id` int(11) NOT NULL,
  `name` varchar(150) DEFAULT NULL,
  `location` varchar(150) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hotels`
--

INSERT INTO `hotels` (`id`, `name`, `location`, `description`) VALUES
(1, 'Hotel Mawar', 'Bandung', 'Hotel nyaman dekat pusat kota'),
(2, 'Hotel Luxury', 'Jakarta', 'hotel mewah pokoknya mah'),
(3, 'Hotel Sakura', 'Yogyakarta', 'Hotel estetik dengan nuansa Jepang'),
(4, 'Hotel Mama', 'Jakarta', 'hotel Mama'),
(5, 'Hotel Lalaland', 'Jakarta', 'hotel lala'),
(6, 'Hotel Citra', 'Surabaya', 'hotel Citra'),
(7, 'Hotel Update', 'Bogor', 'hotel di update'),
(8, 'Hotel No Suprise', 'Yogyakarta', 'No suprises pls');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) DEFAULT NULL,
  `amount` decimal(10,2) DEFAULT NULL,
  `payment_date` date DEFAULT NULL,
  `payment_method` varchar(50) DEFAULT NULL,
  `status` enum('paid','unpaid') DEFAULT 'unpaid'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `booking_id`, `amount`, `payment_date`, `payment_method`, `status`) VALUES
(19, 6, 200000.00, '2026-06-22', 'QRIS', 'paid'),
(21, 8, 200000.00, '2026-06-22', 'SHOPEEPAY', 'paid'),
(22, 9, 250000.00, '2026-06-22', 'SHOPEEPAY', 'paid'),
(25, 12, 100000.00, '2026-06-22', 'DANA', 'paid'),
(26, 13, 200000.00, '2026-06-22', 'SALDO GRAND', 'paid'),
(27, 14, 300000.00, '2026-05-19', 'CASH', 'paid');

-- --------------------------------------------------------

--
-- Table structure for table `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `hotel_id` int(11) DEFAULT NULL,
  `room_type_id` int(11) DEFAULT NULL,
  `room_number` varchar(10) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `rooms`
--

INSERT INTO `rooms` (`id`, `hotel_id`, `room_type_id`, `room_number`, `price`) VALUES
(1, 1, 1, '100', 150000.00),
(2, 1, 1, '101', 150000.00),
(3, 1, 1, '102', 150000.00),
(4, 1, 2, '103', 200000.00),
(5, 1, 2, '104', 200000.00),
(6, 1, 2, '105', 200000.00),
(7, 1, 3, '106', 300000.00),
(8, 1, 3, '107', 300000.00),
(9, 1, 3, '108', 300000.00),
(11, 2, 1, '101', 100000.00),
(12, 2, 2, '102', 125000.00),
(13, 2, 2, '103', 125000.00),
(14, 2, 3, '104', 200000.00),
(15, 2, 3, '105', 200000.00),
(16, 3, 1, '10', 200000.00),
(17, 3, 2, '11', 250000.00),
(18, 3, 3, '12', 300000.00),
(19, 4, 1, '300', 250000.00),
(20, 4, 2, '301', 350000.00),
(21, 4, 3, '302', 400000.00),
(22, 5, 1, '10', 100000.00),
(23, 5, 2, '11', 200000.00),
(24, 5, 3, '12', 300000.00),
(25, 6, 1, '20', 200000.00),
(26, 6, 2, '21', 250000.00),
(27, 6, 3, '22', 300000.00),
(28, 7, 1, '200', 200000.00),
(29, 7, 2, '201', 300000.00),
(30, 7, 3, '202', 400000.00),
(31, 8, 1, '100', 150000.00),
(32, 8, 2, '101', 200000.00);

-- --------------------------------------------------------

--
-- Table structure for table `room_types`
--

CREATE TABLE `room_types` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `room_types`
--

INSERT INTO `room_types` (`id`, `name`, `description`) VALUES
(1, 'Standard', 'Kamar standar dengan fasilitas dasar'),
(2, 'Deluxe', 'Kamar lebih luas dan nyaman'),
(3, 'Suite', 'Kamar mewah dengan ruang tamu');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `role`, `email`, `password`, `created_at`) VALUES
(1, 'Budi', 'customer', 'budi@gmail.com', '9c5fa085ce256c7c598f6710584ab25d', '2026-04-09 05:55:51'),
(2, 'ujang', 'customer', 'ujang@gmail.com', '698d51a19d8a121ce581499d7b701668', '2026-06-17 05:17:47'),
(3, 'dadang', 'customer', 'dadang@gmail.com', 'f63f1ed278d0cb8f2ede661328779791', '2026-06-07 10:23:39'),
(5, 'jajang', 'customer', 'jajang@gmail.com', 'c3c1b9ccf33321d32ff1c9bc88b94d73', '2026-06-17 05:18:15'),
(8, 'joji', 'customer', 'joji@gmail.com', '4dd6649c12d25b4f996b1c2de9eaef8d', '2026-06-17 05:21:12'),
(9, 'william', 'customer', 'william@gmail.com', '8a31fc89653c9f20d371bec97430d477', '2026-06-17 05:23:50'),
(10, 'raka', 'customer', 'raka@gmail.com', '13685e6d6e35eddae65f413f27d5578d', '2026-06-17 05:26:31'),
(11, 'admin', 'admin', 'admin@gmail.com', '0192023a7bbd73250516f069df18b500', '2026-06-17 05:42:31'),
(12, 'yanto', 'customer', 'yanto@gmail.com', 'b5d8b455512443450de17c04c4ef3b36', '2026-06-17 12:35:31'),
(14, 'jerry juniawan', 'customer', 'jerry@gmail.com', '750664a5394b899dac8bf17d0a27bda4', '2026-06-22 06:36:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `room_id` (`room_id`);

--
-- Indexes for table `hotels`
--
ALTER TABLE `hotels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_id` (`booking_id`);

--
-- Indexes for table `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hotel_id` (`hotel_id`),
  ADD KEY `room_type_id` (`room_type_id`);

--
-- Indexes for table `room_types`
--
ALTER TABLE `room_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `hotels`
--
ALTER TABLE `hotels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `room_types`
--
ALTER TABLE `room_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `rooms`
--
ALTER TABLE `rooms`
  ADD CONSTRAINT `rooms_ibfk_1` FOREIGN KEY (`hotel_id`) REFERENCES `hotels` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `rooms_ibfk_2` FOREIGN KEY (`room_type_id`) REFERENCES `room_types` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
