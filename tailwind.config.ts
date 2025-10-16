import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#ff6b00',
          50: '#fff3e8',
          100: '#ffe6d1',
          200: '#ffcca3',
          300: '#ffb375',
          400: '#ff9952',
          500: '#ff6b00',
          600: '#db5900',
          700: '#b74800',
          800: '#933900',
          900: '#7a2f00',
        },
      },
    },
  },
  plugins: [],
} satisfies Config


