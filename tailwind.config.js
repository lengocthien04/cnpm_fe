/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Add your source folder's paths here for Tailwind to purge unused styles
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#7373DC", // Custom primary blue color
        "primary-blue-unhover": "#5A77D6", // Custom unhovered blue color
        "primary-purple": "#EADDFF",
        "button-color": "#0B4FB7",
        "alert-red": "#E74C3C", // Custom alert red color
        "primary-background": "#FCF8F8", // Custom green color for success messages, etc.
        "secondary-gray": "#B0B0B0", // Secondary gray for borders or background elements
      },
      spacing: {
        128: "32rem", // Adding custom spacing (e.g., for width or height)
        144: "36rem", // Another custom spacing
      },
      fontSize: {
        xxs: "0.625rem", // Custom font size for very small text
        xxl: "2rem", // Custom extra-large font size
      },
      borderRadius: {
        "4xl": "2rem", // Custom border radius for large elements
      },
      boxShadow: {
        primary: "0 4px 6px rgba(0, 0, 0, 0.1)", // Custom box shadow for cards or containers
      },
    },
  },
  plugins: [],
};
