/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors : {
      yellow : {
        400 : '#FFD700',
      },
      green : {
        600 : '#008000',
      },
      red:{
        400 : '#F87171', 
        500 : '#EF4444',
        600 : '#DC2626',
        700 : '#B91C1C',
        800 : '#991B1B',
      },
      background:{
        primary : '#17153B',
        secondary : '#402E7A',
      },
      white : '#FFFFFF', 
      black : '#000000',
      blue : {
        500 : '#3B82F6',
        700 : '#2563EB',
        800 : '#1A2130'
      },
      gray : {
        400 : '#D1D5DB',
        600 : '#6B7280',
        800 : '#1F2937',
        900 : '#111827',
      },
    }
  },
  plugins: [],
}

