module.exports = {
  content: ["./src/**/*.{html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      textTransform: {
        capitalize: 'capitalize',
      },
    },
  },
  plugins: [require('tailwindcss-animated')],
}