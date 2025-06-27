/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F0F0E3',
        primary: '#53A09D',
        secondary: '#3D7D7A',
        accent: '#9ED3D1',
        neutral: '#E0E0D8',
        textPrimary: '#333333',
        textSecondary: '#666666',
        textOnPrimary: '#FFFFFF',
      },
    },
  },
  plugins: [],
}
