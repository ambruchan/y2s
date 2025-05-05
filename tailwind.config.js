/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6edf5',
          100: '#ccdaeb',
          200: '#99b6d6',
          300: '#6691c2',
          400: '#336dad',
          500: '#003876', // PSG Blue
          600: '#002d5e',
          700: '#002247',
          800: '#00162f',
          900: '#000b18',
        },
        secondary: {
          50: '#fee7e8',
          100: '#fecfd2',
          200: '#fd9fa4',
          300: '#fc6f77',
          400: '#fb3f49',
          500: '#e30613', // PSG Red
          600: '#b6050f',
          700: '#88040b',
          800: '#5b0208',
          900: '#2d0104',
        },
        neutral: {
          50: '#f8f9fa',
          100: '#f1f3f5',
          200: '#e9ecef',
          300: '#dee2e6',
          400: '#ced4da',
          500: '#adb5bd',
          600: '#6c757d',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
        },
        success: {
          500: '#28a745',
          600: '#218838',
        },
        warning: {
          500: '#ffc107',
          600: '#e0a800',
        },
        error: {
          500: '#dc3545',
          600: '#c82333',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        '7xl': '5rem',
        '8xl': '6rem',
        '9xl': '7rem',
      },
      height: {
        'screen-75': '75vh',
        'screen-85': '85vh',
      },
      width: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};