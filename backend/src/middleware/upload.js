const multer = require('multer');
const path = require('path');
<<<<<<< HEAD
const fs = require('fs');

// Tentukan lokasi folder penyimpanan
const uploadDir = path.join(__dirname, '../../public/uploads');

// Buat folder jika belum ada
=======
const fs = require('fs'); // Modul bawaan Node.js untuk membaca/membuat folder

// Tentukan lokasi folder penyimpanan (absolute path)
// Mengarah ke: backend/public/uploads
const uploadDir = path.join(__dirname, '../../public/uploads');

// Cek apakah folder tersebut sudah ada. Jika belum, buat secara otomatis!
>>>>>>> 664b17580807ab2abe3415669c17297d2005b759
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

<<<<<<< HEAD
// Konfigurasi penyimpanan file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        // Ambil nama file asli, bersihkan spasi, lalu tambahkan timestamp
        const cleanName = path.basename(file.originalname, path.extname(file.originalname)).replace(/\s+/g, '_');
        cb(null, `${cleanName}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Filter file dinamis (Terima Gambar & PDF)
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'application/pdf' // Izinkan PDF untuk upload CV
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`Tipe file tidak valid (${file.mimetype}). Hanya gambar (JPG/PNG) dan dokumen (PDF) yang diizinkan.`), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // Maksimal 5MB (cukup untuk gambar resolusi tinggi atau PDF)
    }
});

=======
// Konfigurasi tempat penyimpanan dan nama file
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir); // Gunakan folder yang sudah dipastikan eksis
    },
    filename: function (req, file, cb) {
        // Format: timestamp-namafileasli.ext (contoh: 1774839004356.png)
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Filter hanya untuk mengizinkan tipe file gambar
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Hanya file gambar yang diizinkan!'), false);
    }
};

const upload = multer({ 
    storage: storage, 
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 
    }
});


>>>>>>> 664b17580807ab2abe3415669c17297d2005b759
module.exports = upload;