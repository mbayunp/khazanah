/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        khazanah: {
          green: '#18703E', // Warna hijau utama dari kubah dan teks logo
          gold: '#A88B42',  // Warna emas dari bulan sabit dan tulisan KREATIF
          dark: '#11522D',  // Hijau lebih gelap untuk efek hover
          light: '#F4F9F6', // Background lembut bernuansa hijau
        }
      }
    },
  },
  plugins: [],
}