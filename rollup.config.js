import rollupTypescript from "@rollup/plugin-typescript";

const isProduction = process.env.NODE_ENV === "production";

const entries = isProduction
  ? ["src/index.ts", "src/hunch-img.ts", "src/hunch-carousel.ts"]
  : ["src/index.ts"];

export default entries.map(input => ({
  plugins: [rollupTypescript()],
  input,
  output: {
    dir: "dist",
    format: "umd"
  }
}));
