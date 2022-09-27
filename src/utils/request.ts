/**
 * @description [ axios 请求封装]
 */

import axios, { AxiosError } from "axios";
import { history } from "umi";
import { notification } from "antd";
import { clearToken, getToken } from "@/utils/auth";

const service = axios.create({
  baseURL: "/api", // 由nginx转发
});

// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    config.headers["Authorization"] = getToken();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptors
service.interceptors.response.use(
  (response: any) => {
    const { data } = response;

    return data;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    const message = error.response?.data.message;

    // 登录过期
    if (status === 401) {
      notification.info({ message: "登录过期" });
      clearToken();
      history.replace("/user/login");
      return;
    }

    notification.error({ message: "系统错误", description: message });
    return Promise.reject("系统错误");
  }
);

export default service;
