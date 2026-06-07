/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        obsidian: '#080810',
        vault: '#7C3AED',
        molten: '#F59E0B'
      },
      fontFamily: {
        heading: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        body: ['"DM Sans"', 'Inter', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 35px rgba(124, 58, 237, 0.35)',
        gold: '0 0 35px rgba(245, 158, 11, 0.28)'
      },
      animation: {
        shimmer: 'shimmer 1.8s linear infinite',
        float: 'float 7s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2.6s ease-in-out infinite'
      },
      keyframes: {
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        pulseGlow: { '0%,100%': { boxShadow: '0 0 22px rgba(124,58,237,.35)' }, '50%': { boxShadow: '0 0 48px rgba(245,158,11,.4)' } }
      }
    }
  },
  plugins: []
}
