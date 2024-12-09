/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center : true,
    },
    extend: {
      fontFamily: {
        "Vazir": "Vazir",
        "Vazir-Thin":"Vazir-Thin",
        "Vazir-Medium": "Vazir-Medium",
        "Vazir-Bold": "Vazir-Bold",
        "Vazir-ExtraBold": "Vazir-ExtraBold",
      },
      colors:{
        "Primary" : "#a62626"
      },
      gridTemplateColumns:{
        custom : "repeat(auto-fit, minmax(200px, 1fr))"
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-1%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },

      },
      animation: {
        slideDown: 'slideDown 0.4s ease-out',

      }

    },
  },
  plugins: [],
};
