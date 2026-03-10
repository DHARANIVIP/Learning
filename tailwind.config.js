/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          bg: '#F2F2F2',
          secondary: '#E8E6DF',
          card: '#FFFFFF',
          text: '#1A1A1A',
          muted: '#555555',
          accent: '#000000',
        },
        'neutral-muted': '#555555',
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        sunset: '#F97316', 
      },
      boxShadow: {
        'subtle': '0 6px 18px rgba(0, 0, 0, 0.06)',
        'premium': '0 10px 30px -10px rgba(0, 0, 0, 0.1)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'card': '0 6px 18px rgba(0, 0, 0, 0.06)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
      },
      backgroundImage: {
        'mesh-gradient': 'radial-gradient(at 0% 0%, hsla(210, 40%, 96%, 1) 0, transparent 50%), radial-gradient(at 50% 0%, hsla(215, 25%, 90%, 1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(220, 30%, 95%, 1) 0, transparent 50%)',
      }

    },
  },
  plugins: [],
}
