import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

// Rollup bundler config
export default {
  input: 'src/dvb-home-assistant.ts',
  output: {
    dir: 'dist',
    format: 'es',
    entryFileNames: 'dvb-home-assistant.js', 
    sourcemap: true,
  },
  plugins: [
    nodeResolve(), // Locates modules in node_modules
    typescript(), // Converts TypeScript to JavaScript
    terser(), // Minifies the output JavaScript
  ]
}