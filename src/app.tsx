import { Navigate, history, createSearchParams } from "umi";

import { queryCurrent, queryMenu } from "@/apis";

import "antd/dist/antd.css";
import { isLogin } from "./utils/auth";
import { inWhiteList } from "./utils/whiteList";
import { fullPath } from "./utils/path";
import { normalizeMenu } from "./utils/menu";

export async function getInitialState(): Promise<any> {
  console.log("get init state");

  const { pathname } = window.location;

  // sso页面不处理, 直接oldRender()
  if (/^\/sso/.test(pathname)) {
    return {};
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
  if (isLogin()) {
    try {
      const menuData = await queryMenu();
      const menu = normalizeMenu(menuData);

      // 获取用户信息
      const currentUser = await queryCurrent();

      console.log("initState:", { menu, currentUser });

      return { menu, currentUser };
    } catch (e) {
      return {};
    }
  }

  return {};
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
