/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}',],
  theme: {
    extend: {
      screens: {
        phone: '320px',
        tablet: '768px',
        desktop: '1280px',
      },
      fontFamily: {
        'roboto-regular': ['Roboto-Regular', 'sans-serif'],
        // Add other font families if needed
      },
      colors: {
        primary: '#007aaa',
        secondary: '#f7bf1a',
      },
    },
  },
  plugins: [],
}

