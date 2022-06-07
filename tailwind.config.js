const appearance = require('./src/data/appearance.json')
const colors = appearance.branding.colors

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    colors: {
      "primary": colors.primary,
      "accent": colors.accent,
      "background": colors.background,
      "textLight": colors.textLight,
      "textDark": colors.textDark,
      "black": '#000000',
      "white": "#FFFFFF"
    }
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          paddingLeft: '20px',
          paddingRight: '20px',
          '@screen xl': {
            maxWidth: '1300px',
          },
        }
      })
    }
  ],
}
