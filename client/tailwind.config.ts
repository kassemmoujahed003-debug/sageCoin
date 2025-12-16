import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#182231',
        'secondary-surface': '#355060',
        'accent': '#CFE2F3',
        'base-white': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        alexandria: ['Alexandria', 'Inter', 'system-ui', 'sans-serif'],
        'dg-modal3at': ['DG-Modal3at', 'Alexandria', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config

