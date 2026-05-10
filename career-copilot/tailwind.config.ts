import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0a66c2',
          light: '#e8f1fb',
          dark: '#004182',
        },
        success: { DEFAULT: '#057642', bg: '#f0faf4' },
        warning: { DEFAULT: '#b45309', bg: '#fef3c7' },
        danger:  { DEFAULT: '#cc1016', bg: '#fde8e9' },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
