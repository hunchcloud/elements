import rollupTypescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";

const isProduction = process.env.NODE_ENV === "production";

export default [
  {
    plugins: [rollupTypescript(), isProduction && terser()],
    input: "src/hunch-img.ts",
    output: {
      file: "dist/hunch-img.js",
      format: "umd"
    }
  }
];
