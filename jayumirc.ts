import { defineConfig } from "umi";

export default defineConfig({
  initialState: {},
  model: {},
  plugins: [
    "@umijs/plugins/dist/initial-state.js",
    "@umijs/plugins/dist/model.js",
  ],
});
