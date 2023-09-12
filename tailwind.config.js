/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html', "./src/**/*.jsx"],
  theme: {
    extend: {
      colors: {
        "primary-100": "#4ce060",
        "primary-200": "#46d459",
        "middle-100": "#fabb05",
        "danger-100": "#fe0324",
        "more-100": "#593fff",
        "more-200": "#593fffd6",
        "black-100": "#333333",
        "black-200": "#5c5c5c",
        "black-300": "#b3b3b3",
        "white-200": "#f2f2f2",
        "white-300": "#e5e5e5",
      },
      boxShadow: {
        "100": "0px 13px 27px -5px rgba(50, 50, 93, 0.25), 0px 8px 16px -8px rgba(0, 0, 0, 0.3)",
        "200": "0px 3px 8px rgba(0, 0, 0, 0.24)",
      },
    },
  },
  plugins: [],
}

