-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 11 Apr 2026 pada 09.00
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

--
-- Dumping data untuk tabel `articles`
--

INSERT INTO `articles` (`id`, `title`, `slug`, `content`, `thumbnail`, `category`, `author_name`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Bayu', 'bayu', 'Bayu Ganteng', '/uploads/1775831129067.png', 'Lifestyle', 'Bayu', 'approved', '2026-04-10 14:25:29', '2026-04-10 14:25:34'),
(2, 'Kece', 'kece', 'Motor Ganteng', '/uploads/1775831446419.jpeg', 'Self Growth', 'Bayu', 'pending', '2026-04-10 14:30:46', '2026-04-10 14:30:46');

-- --------------------------------------------------------

--
-- Struktur dari tabel `event_reports`
--

CREATE TABLE `event_reports` (
  `id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `participants_count` int(11) DEFAULT 0,
  `tor_file` varchar(255) DEFAULT NULL,
  `documentation_file` varchar(255) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `tor_status` tinyint(1) DEFAULT 0,
  `doc_status` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `event_reports`
--

INSERT INTO `event_reports` (`id`, `program_id`, `participants_count`, `tor_file`, `documentation_file`, `notes`, `created_at`, `tor_status`, `doc_status`) VALUES
(1, 2, 12, NULL, NULL, NULL, '2026-04-11 05:41:08', 0, 0);

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
  `theme` varchar(255) DEFAULT NULL,
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

INSERT INTO `programs` (`id`, `title`, `theme`, `slug`, `category`, `description`, `date`, `location`, `quota`, `image`, `status`, `created_at`) VALUES
(1, '12', NULL, '12', 'Jumanji', '', '2026-04-10 18:28:00', 'zoom', 12, '/uploads/1775816856275.png', 'active', '2026-04-10 10:27:36'),
(2, 'Bayu', '', 'bayu', 'Jofisah', NULL, '2026-04-11 00:00:00', 'Online / Group WA', 0, NULL, 'active', '2026-04-11 05:41:08');

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
-- Struktur dari tabel `speakers`
--

CREATE TABLE `speakers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `gender` enum('L','P') DEFAULT 'P',
  `photo` varchar(255) DEFAULT NULL,
  `focus` text DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `instagram` varchar(255) DEFAULT NULL,
  `invitation_status` enum('belum','sudah','tidak_dibalas','jadwal_tidak_cocok') DEFAULT 'belum',
  `ratecard` int(11) DEFAULT 0,
  `benefits` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `speakers`
--

INSERT INTO `speakers` (`id`, `name`, `gender`, `photo`, `focus`, `bio`, `phone`, `instagram`, `invitation_status`, `ratecard`, `benefits`, `notes`, `created_at`, `updated_at`) VALUES
(1, 'Bayu', 'L', '/uploads/1775889963144.jpg', 'Self Improvment', 'Ganteng', '089663933263', '@m.bayunp', 'sudah', 150000, 'Gratis', 'Keren', '2026-04-11 06:41:49', '2026-04-11 06:46:03'),
(2, 'Nufus', 'P', '/uploads/1775890054122.png', 'Hijrah', 'Masyaallah', '45645646', '@afsja', 'belum', 2147483647, 'suami', 'ekhem', '2026-04-11 06:47:34', '2026-04-11 06:47:34');

-- --------------------------------------------------------

--
-- Struktur dari tabel `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `program_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `assigned_to` varchar(100) NOT NULL,
  `role` varchar(100) DEFAULT NULL,
  `status` enum('pending','done') DEFAULT 'pending',
  `deadline` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `tasks`
--

INSERT INTO `tasks` (`id`, `program_id`, `title`, `assigned_to`, `role`, `status`, `deadline`, `created_at`, `updated_at`) VALUES
(1, 1, 'Desain Poster Utama', 'Belum di-assign', 'Poster Designer', 'pending', NULL, '2026-04-11 05:15:37', '2026-04-11 05:15:37'),
(2, 1, 'Tulis Caption IG', 'Belum di-assign', 'Caption Writer', 'pending', NULL, '2026-04-11 05:15:37', '2026-04-11 05:15:37'),
(3, 1, 'Hubungi Pemateri', 'Belum di-assign', 'PIC Pemateri', 'pending', NULL, '2026-04-11 05:15:37', '2026-04-11 05:15:37'),
(4, 1, 'Siapkan Link Zoom/Lokasi', 'Belum di-assign', 'Host / Admin', 'pending', NULL, '2026-04-11 05:15:37', '2026-04-11 05:15:37'),
(5, 1, 'Siapkan Petugas Tilawah', 'Belum di-assign', 'Tilawah', 'pending', NULL, '2026-04-11 05:15:37', '2026-04-11 05:15:37'),
(6, 2, 'Tugas Pemateri', 'Bayu', 'Pemateri', 'pending', NULL, '2026-04-11 05:41:08', '2026-04-11 05:41:08'),
(7, 2, 'Tugas Host', 'Bayu', 'Host', 'pending', NULL, '2026-04-11 05:41:08', '2026-04-11 05:41:08'),
(8, 2, 'Tugas Tilawah', 'Bayu', 'Tilawah', 'pending', NULL, '2026-04-11 05:41:08', '2026-04-11 05:41:08'),
(9, 2, 'Tugas Poster', 'Bayu', 'Poster', 'pending', NULL, '2026-04-11 05:41:08', '2026-04-11 05:41:08'),
(10, 2, 'Tugas Caption', 'Bayu', 'Caption', 'pending', NULL, '2026-04-11 05:41:08', '2026-04-11 05:41:08'),
(11, 2, 'Tugas Diskusi', 'Bayu', 'Diskusi', 'pending', NULL, '2026-04-11 05:41:08', '2026-04-11 05:41:08');

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
-- Indeks untuk tabel `event_reports`
--
ALTER TABLE `event_reports`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `program_id` (`program_id`);

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
-- Indeks untuk tabel `speakers`
--
ALTER TABLE `speakers`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `program_id` (`program_id`);

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `event_reports`
--
ALTER TABLE `event_reports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `participants`
--
ALTER TABLE `participants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `programs`
--
ALTER TABLE `programs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

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
-- AUTO_INCREMENT untuk tabel `speakers`
--
ALTER TABLE `speakers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `event_reports`
--
ALTER TABLE `event_reports`
  ADD CONSTRAINT `event_reports_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`id`) ON DELETE CASCADE;

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

--
-- Ketidakleluasaan untuk tabel `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`program_id`) REFERENCES `programs` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
