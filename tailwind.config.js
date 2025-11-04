/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  safelist: [
  'bg-day-bg', 'text-day-text',
  'bg-night-bg', 'text-night-text',
  'bg-day-panel', 'bg-night-panel',
  'bg-day-soft', 'bg-night-soft',
  'text-night-text', 'text-day-text'
],
  theme: {
    extend: {
      // 🔹 COLORI BASE (per retrocompatibilità)
      colors: {
        bg: '#0b1220',
        panel: '#121a2b',
        panelSoft: '#0f1725',
        accent: '#4fd1c5',
        accentSoft: '#9be7de',
        text: '#ffffff',

        // 🔹 COLORI MODALITÀ GIORNO
        day: {
          bg: '#88C9E8',        // sfondo cielo
          panel: '#A6D6EB',     // pannelli chiari
          soft: '#B9E2F1',      // toni più chiari
          accent: '#2C8CD1',    // pulsanti / link
          text: '#0B2436',      // testo scuro
        },

        // 🔹 COLORI MODALITÀ NOTTE
        night: {
          bg: '#0b1220',
          panel: '#121a2b',
          soft: '#0f1725',
          accent: '#4fd1c5',
          text: '#ffffff',
        },
      },

      // 🔹 Effetti ombra personalizzati
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.25)',
      },

      // 🔹 Font di default
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
        ],
      },
    },
  },
  plugins: [],
}
