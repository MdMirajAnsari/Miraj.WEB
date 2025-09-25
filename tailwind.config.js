/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'about': "url('/assets/backgrounds/about-bg.jpg')",
        'tech': "url('/assets/backgrounds/tech-bg.jpg')",
        'experience': "url('/assets/backgrounds/experience-bg.jpg')",
        'experienceLight': "url('/assets/backgrounds/experience-light-bg.jpg')",
      },
      colors: {
        primary: '#3498db',
        secondary: '#2c3e50',
        tertiary: '#f5f5f5',
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'lora': ['Lora', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

