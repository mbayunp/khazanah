const multer = require('multer');
const path = require('path');
const fs = require('fs'); // Modul bawaan Node.js untuk membaca/membuat folder

// Tentukan lokasi folder penyimpanan (absolute path)
// Mengarah ke: backend/public/uploads
const uploadDir = path.join(__dirname, '../../public/uploads');

// Cek apakah folder tersebut sudah ada. Jika belum, buat secara otomatis!
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

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


module.exports = upload;