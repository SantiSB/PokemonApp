import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Colores basados en Pokémon
        primary: {
          50: '#ffe5f0', // Rosa claro (Jigglypuff)
          100: '#ffccd9',
          200: '#ff99b3',
          300: '#ff668c',
          400: '#ff3366',
          500: '#ff0040', // Rosa fuerte (Jigglypuff)
          600: '#cc0033',
          700: '#990026',
          800: '#66001a',
          900: '#33000d',
        },
        secondary: {
          50: '#e0f2fe', // Azul claro (Squirtle)
          100: '#b3e5fc',
          200: '#80d4fa',
          300: '#4dc3f7',
          400: '#26b3f5',
          500: '#00a3f4', // Azul (Squirtle)
          600: '#0083c1',
          700: '#00638f',
          800: '#00425c',
          900: '#002130',
        },
        accent: {
          50: '#fff4cc', // Amarillo claro (Pikachu)
          100: '#ffea99',
          200: '#ffe066',
          300: '#ffd633',
          400: '#ffcc00',
          500: '#e6b800', // Amarillo (Pikachu)
          600: '#b38f00',
          700: '#806600',
          800: '#4d3d00',
          900: '#1a1500',
        },
        danger: {
          50: '#ffe5e5', // Rojo claro (Charmander)
          100: '#ffcccc',
          200: '#ff9999',
          300: '#ff6666',
          400: '#ff3333',
          500: '#ff0000', // Rojo (Charmander)
          600: '#cc0000',
          700: '#990000',
          800: '#660000',
          900: '#330000',
        },
        // Agrega más colores según otros Pokémon o tipos si lo deseas
      },
    },
  },
  plugins: [],
}

export default config
