/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        serif: ['Oswald', 'sans-serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      colors: {
        // Light mode colors
        'light-primary': '#9b2226',
        'light-primary-hover': '#660708',
        'light-secondary': '#f8c136',
        'light-background': '#ffffff',
        'light-card': '#ffffff',
        'light-text': '#1a1a1a',
        'light-muted': '#6b7280',
        
        // Dark mode colors
        'dark-primary': '#e45a21',
        'dark-primary-hover': '#cc4e1a',
        'dark-secondary': '#f8c136',
        'dark-background': '#121212',
        'dark-card': '#1e1e1e',
        'dark-elevated': '#2d2d2d',
        'dark-text': '#f5f5f5',
        'dark-muted': '#a1a1a1',
      },
      backgroundColor: {
        'dark-primary': '#121212',
        'dark-secondary': '#1e1e1e',
        'dark-tertiary': '#2d2d2d',
      },
      textColor: {
        'dark-primary': '#f5f5f5',
        'dark-secondary': '#d4d4d4',
        'dark-muted': '#a1a1a1',
      },
    },
  },
  plugins: [],
};