/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          charcoal: '#111827',
          white: '#FFFFFF',
          lightGray: '#F3F4F6',
          teal: '#00BFA5',
          purple: '#7E57C2',
          orange: '#FB8C00',
          green: '#43A047',
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #00BFA5 0%, #7E57C2 50%, #FB8C00 100%)',
        'gradient-dark': 'linear-gradient(135deg, #111827 0%, #1F2937 100%)',
        'gradient-light': 'linear-gradient(135deg, #F3F4F6 0%, #E5E7EB 100%)',
      },
      boxShadow: {
        'glow-teal': '0 0 20px rgba(0, 191, 165, 0.6)',
        'glow-purple': '0 0 20px rgba(126, 87, 194, 0.6)',
        'glow-orange': '0 0 20px rgba(251, 140, 0, 0.6)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropFilter: {
        'glass': 'blur(4px)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 191, 165, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 191, 165, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      transitionDuration: {
        '300': '300ms',
        '500': '500ms',
      },
    },
  },
  plugins: [],
}
