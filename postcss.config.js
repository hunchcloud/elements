const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./docs/**/*.{html,md}", "./scripts/build-docs.js"],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  whitelist: ["::slotted"]
});

module.exports = {
  plugins: [
    require("tailwindcss")(),
    ...(process.env.NODE_ENV === "production" ? [purgecss] : [])
  ]
};
