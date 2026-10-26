import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/panel.ts",
  output: {
    file: "../custom_components/smart_heating_schedule/frontend/smart-heating-schedule-panel.js",
    format: "es",
    inlineDynamicImports: true,
  },
  plugins: [
    nodeResolve(),
    typescript({ tsconfig: "./tsconfig.json", include: ["src/**/*.ts"] }),
    terser({ format: { comments: false } }),
  ],
};
