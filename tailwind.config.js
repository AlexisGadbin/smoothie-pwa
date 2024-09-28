/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      fontFamily: {
        noto: ['Noto Sans', 'sans-serif']
      },
      colors: {
        primary: {
          50: '#EDEEFF',
          100: '#DEE1FF',
          200: '#C3C7FF',
          300: '#9FA2FF',
          400: '#8079FF',
          500: '#6F5AFA',
          600: '#613CEF',
          700: '#5935D5',
          800: '#4428AB',
          900: '#3A2986',
          950: '#23184E'
        }
      },
      height: {
        tabbar: '64px'
      },
      padding: {
        tabbar: '20px'
      },
      spacing: {
        tabbar: '64px'
      }
    }
  },
  plugins: []
}
