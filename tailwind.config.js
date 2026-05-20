/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'lula-gold': '#D4AF37',
        'lula-dark': '#0A0A0A',
        'lula-black': '#000000',
        'lula-cream': '#FFFDD0',
        'melome-black': '#1A1A1A',
        'melome-gold': '#C9A84C',
      },
      fontFamily: {
        'sans': ['Poppins', 'sans-serif'],
        'display': ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}