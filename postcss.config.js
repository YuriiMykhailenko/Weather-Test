export default {
  plugins: {
    'postcss-import': {},
    'tailwindcss/nesting': {},
    tailwindcss: { config: './tailwind.config.js' },
    autoprefixer: {},
  },
};