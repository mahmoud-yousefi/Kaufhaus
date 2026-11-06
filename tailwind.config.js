/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f7f3ee',
          100: '#efe7dc',
          200: '#dfd1bc',
          300: '#cbb595',
          400: '#b5936c',
          500: '#9a744a',
          600: '#7f5c3a',
          700: '#64462e',
          800: '#4a3424',
          900: '#2f2118',
        },
        accent: {
          50: '#f2f7f5',
          500: '#2f6f5e',
          600: '#265a4c',
          700: '#1f493d',
        },
        ink: '#1a1a1a',
        paper: '#fafaf7',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,.04), 0 8px 24px rgba(0,0,0,.06)',
        lift: '0 12px 40px rgba(0,0,0,.12)',
      },
    },
  },
  plugins: [],
}
