-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 10 Apr 2026 pada 16.22
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `khazanah_db`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `articles`
--

CREATE TABLE `articles` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `category` varchar(100) NOT NULL,
  `author_name` varchar(100) NOT NULL,
  `status` enum('draft','pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `participants`
--

CREATE TABLE `participants` (
  `id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `whatsapp` varchar(20) NOT NULL,
  `registered_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `programs`
--

CREATE TABLE `programs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `category` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `date` datetime NOT NULL,
  `location` varchar(255) NOT NULL,
  `quota` int(11) DEFAULT 0,
  `image` varchar(255) DEFAULT NULL,
  `status` enum('draft','active','full') DEFAULT 'draft',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `programs`
--

INSERT INTO `programs` (`id`, `title`, `slug`, `category`, `description`, `date`, `location`, `quota`, `image`, `status`, `created_at`) VALUES
(1, '12', '12', 'Jumanji', '', '2026-04-10 18:28:00', 'zoom', 12, '/uploads/1775816856275.png', 'active', '2026-04-10 10:27:36');

-- --------------------------------------------------------

--
-- Struktur dari tabel `program_comments`
--

CREATE TABLE `program_comments` (
  `id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT 'Hamba Allah',
  `text` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `program_comments`
--

INSERT INTO `program_comments` (`id`, `program_id`, `name`, `text`, `created_at`) VALUES
(1, 1, 'Bayu', '12312312c ewdssad', '2026-04-10 10:34:43');

-- --------------------------------------------------------

--
-- Struktur dari tabel `ruang_comments`
--

CREATE TABLE `ruang_comments` (
  `id` int(11) NOT NULL,
  `curhat_id` int(11) NOT NULL,
  `sender_name` varchar(100) DEFAULT 'Hamba Allah',
  `comment_text` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `ruang_comments`
--

INSERT INTO `ruang_comments` (`id`, `curhat_id`, `sender_name`, `comment_text`, `created_at`) VALUES
(1, 1, 'Sobat Jofisah', 'Tetap semangat ukhti! Cari circle baru seperti ikut kajian rutin tanpa memusuhi teman lama.', '2026-04-10 10:26:18'),
(2, 2, 'Hamba Allah', 'Semangat! Ingat lelahnya menuntut ilmu itu bernilai ibadah jika niatnya lillah.', '2026-04-10 10:26:18'),
(3, 1, '123', '123', '2026-04-10 10:28:17');

-- --------------------------------------------------------

--
-- Struktur dari tabel `ruang_curhat`
--

CREATE TABLE `ruang_curhat` (
  `id` int(11) NOT NULL,
  `sender_name` varchar(100) DEFAULT 'Hamba Allah',
  `message` text NOT NULL,
  `admin_response` text DEFAULT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `ruang_curhat`
--

INSERT INTO `ruang_curhat` (`id`, `sender_name`, `message`, `admin_response`, `status`, `created_at`) VALUES
(1, 'Akhwat Galau', 'Min, bagaimana caranya agar kita bisa tetap istiqomah di lingkungan pertemanan yang kurang mendukung?', NULL, 'approved', '2026-04-10 10:26:18'),
(2, 'Mahasiswa Tingkat Akhir', 'Doakan skripsiku lancar ya teman-teman. Kadang ngerasa *burnout* banget.', NULL, 'approved', '2026-04-10 10:26:18');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','staff') DEFAULT 'admin',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'bayu', 'admin@bayu', '$2b$10$5jYQ7uaVfvOn5r14lw3yGOFKFx4KybZ.AJfSKeHnmoV3MY6pRfsKW', 'admin', '2026-04-10 10:26:58');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `articles`
--
ALTER TABLE `articles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indeks untuk tabel `participants`
--
ALTER TABLE `participants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indeks untuk tabel `programs`
--
ALTER TABLE `programs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Indeks untuk tabel `program_comments`
--
ALTER TABLE `program_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `program_id` (`program_id`);

--
-- Indeks untuk tabel `ruang_comments`
--
ALTER TABLE `ruang_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `curhat_id` (`curhat_id`);

--
-- Indeks untuk tabel `ruang_curhat`
--
ALTER TABLE `ruang_curhat`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `articles`
--
ALTER TABLE `articles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `participants`
--
ALTER TABLE `participants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `programs`
--
ALTER TABLE `programs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `program_comments`
--
ALTER TABLE `program_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `ruang_comments`
--
ALTER TABLE `ruang_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT untuk tabel `ruang_curhat`
--
ALTER TABLE `ruang_curhat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `participants`
--
ALTER TABLE `participants`
  ADD CONSTRAINT `participants_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `program_comments`
--
ALTER TABLE `program_comments`
  ADD CONSTRAINT `program_comments_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`id`) ON DELETE CASCADE;

--
-- Ketidakleluasaan untuk tabel `ruang_comments`
--
ALTER TABLE `ruang_comments`
  ADD CONSTRAINT `ruang_comments_ibfk_1` FOREIGN KEY (`curhat_id`) REFERENCES `ruang_curhat` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
