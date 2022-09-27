import { Navigate, history, createSearchParams } from "umi";

import { queryMenu } from "@/apis";

import "antd/dist/antd.css";
import { isLogin } from "./utils/auth";
import { inWhiteList } from "./utils/whiteList";
import { fullPath } from "./utils/path";

export async function getInitialState() {
  console.log("get init state");

  const { pathname } = window.location;

  // sso页面不处理, 直接oldRender()
  if (/^\/sso/.test(pathname)) {
    return;
  }

  // 未登陆且不在白名单
  if (!isLogin() && !inWhiteList(pathname)) {
    history.replace({
      pathname: "/user/login",
      search: createSearchParams({ redirect: fullPath() }).toString(),
    });
  }

  // 已登陆
  // 对于登陆页以外的页面要获取菜单数据, 用于权限
  if (isLogin() && !/^\/user/.test(pathname)) {
    try {
      const menuData = await queryMenu();
      console.log({ menuData });
      return { menuData };
    } catch (e) {
      return;
    }
  }
}

export function patchClientRoutes({ routes }) {
  routes[0].routes.unshift({
    path: "/",
    element: <Navigate to="/docs" replace />,
  });

  routes[0].routes.push({
    path: "*",
    element: <Navigate to="/notFound" replace />,
  });
}
