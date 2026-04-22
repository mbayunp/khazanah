const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Tentukan lokasi folder penyimpanan
const uploadDir = path.join(__dirname, '../../public/uploads');

// Buat folder jika belum ada
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

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

module.exports = upload;