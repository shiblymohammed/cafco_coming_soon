/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'wood': {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#bfa094',
          600: '#a18072',
          700: '#977669',
          800: '#846358',
          900: '#43302b',
        },
        'brown': {
          50: '#fdf8f6',
          100: '#f2e8e5',
          200: '#eaddd7',
          300: '#e0cec7',
          400: '#d2bab0',
          500: '#8B4513',
          600: '#A0522D',
          700: '#CD853F',
          800: '#DEB887',
          900: '#D2691E',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'wood-gradient': 'linear-gradient(45deg, #8B4513, #D2691E, #CD853F, #DEB887)',
        'dark-wood': 'radial-gradient(circle at 25% 25%, rgba(139, 69, 19, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(160, 82, 45, 0.1) 0%, transparent 50%)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradientShift 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(139, 69, 19, 0.3), 0 0 40px rgba(139, 69, 19, 0.2)' },
          '100%': { boxShadow: '0 0 30px rgba(139, 69, 19, 0.5), 0 0 60px rgba(139, 69, 19, 0.3)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(139, 69, 19, 0.3), 0 0 40px rgba(139, 69, 19, 0.2), 0 0 60px rgba(139, 69, 19, 0.1)',
        'glow-lg': '0 0 30px rgba(139, 69, 19, 0.4), 0 0 60px rgba(139, 69, 19, 0.3), 0 0 90px rgba(139, 69, 19, 0.2)',
        'inner-glow': 'inset 0 0 20px rgba(139, 69, 19, 0.2)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      backgroundSize: {
        '300': '300% 300%',
      },
    },
  },
  plugins: [],
}