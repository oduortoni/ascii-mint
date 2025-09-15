/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'glass-black': 'rgba(0, 0, 0, 0.8)',
        'matrix-green': '#00ff41',
        'matrix-green-dim': '#00cc33',
        'ashy': '#6b7280',
        'ashy-light': '#9ca3af',
      },
      backdropBlur: {
        'glass': '10px',
      }
    },
  },
  plugins: [],
}