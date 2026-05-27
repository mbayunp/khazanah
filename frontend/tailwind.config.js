/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        khazanah: {
          green: '#0F5B30', // New Emerald DEFAULT
          gold: '#C5A85C',  // New Gold DEFAULT
          dark: '#082F19',  // New Emerald dark
          light: '#F0F6F2', // New Emerald soft
        },
        emerald: {
          DEFAULT: '#0F5B30',
          dark: '#082F19',
          soft: '#F0F6F2',
        },
        gold: {
          DEFAULT: '#C5A85C',
          soft: '#E5D3A1',
        },
        sand: {
          DEFAULT: '#FAF6EE',
        },
        tealJofisah: '#1E7F8A',
        roseSholehah: '#D47A8E',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
        amiri: ['Amiri', 'serif'],
      },
      boxShadow: {
        'premium': '0 10px 40px rgba(0, 0, 0, 0.08)',
        'gold-glow': '0 0 30px rgba(197, 168, 92, 0.25)',
        'emerald-glow': '0 0 30px rgba(15, 91, 48, 0.2)',
      }
    },
  },
  plugins: [],
}