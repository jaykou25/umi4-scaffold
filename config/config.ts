import proxy from "./proxy";

const { REACT_APP_ENV } = process.env;

export const SITE = {
  name: "资源经营平台",
  desc: "资源公司经营平台",
};

export default {
  npmClient: "yarn",
  proxy: proxy[REACT_APP_ENV || "dev"],
  initialState: {},
  model: {},
  plugins: [
    "@umijs/plugins/dist/initial-state.js",
    "@umijs/plugins/dist/model.js",
  ],
};