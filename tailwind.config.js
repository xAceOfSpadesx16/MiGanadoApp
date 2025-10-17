/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        amber: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          800: '#92400e',
          900: '#78350f',
        },
        green: {
          50: '#f0fdf4',
          200: '#bbf7d0',
        },
        blue: {
          50: '#eff6ff',
          200: '#bfdbfe',
          900: '#1e3a8a',
        },
        purple: {
          50: '#faf5ff',
          200: '#e9d5ff',
        },
      },
    },
  },
  plugins: [],
};