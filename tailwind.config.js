module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        'thin': '0.5px',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

