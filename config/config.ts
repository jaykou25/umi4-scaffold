import proxy from "./proxy";

const { REACT_APP_ENV } = process.env;

export const SITE = {
  name: "资源经营平台",
  desc: "资源公司经营平台",
};

export default {
  npmClient: "yarn",
  proxy: proxy[REACT_APP_ENV || "dev"],
  plugins: [
    "@umijs/plugins/dist/initial-state.js",
    "@umijs/plugins/dist/model.js",
    "umi-plugin-keep-alive",
  ],
  initialState: {},
  model: {},
};
