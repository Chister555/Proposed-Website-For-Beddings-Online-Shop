/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html"],
  theme: {
    screens:{
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      
    },

    container:{
      center: true,
      padding: '1rem'
    },
    extend: {
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
        
      },
      colors:{
        'primary': "#c78f7c",
        'secondary': "#c28571"
      },
      boxShadow: {
        'dark-custom': '0 8px 12px rgba(0, 0, 0, 0.4)'
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}

