import { Navigate, history, createSearchParams } from "umi";

import { queryCurrent, queryMenu } from "@/apis";

import "antd/dist/antd.css";
import { isLogin } from "./utils/auth";
import { inWhiteList } from "./utils/whiteList";
import { fullPath } from "./utils/path";
import { normalizeMenu } from "./utils/menu";

declare global {
  interface Window {
    routes: any;
  }
}

export async function getInitialState(): Promise<any> {
  console.log("get init state");

  const { pathname } = window.location;
  const initialState: any = {
    routes: normalizeMenu(window.routes, (item) => {
      return { ...item, path: "/" + item.path };
    }),
  };

  // sso页面不处理, 直接oldRender()
  if (/^\/sso/.test(pathname)) {
    return initialState;
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

      initialState.menu = menu;
      initialState.currentUser = currentUser;

      return initialState;
    } catch (e) {
      return initialState;
    }
  }

  return initialState;
}

export function patchClientRoutes({ routes }) {
  // 增加一个wrapper组件, 用于权限控制
  routes[0].routes.forEach((route: any) => {
    route.wrappers = ["@/wrappers/auth"];
  });

  routes[0].routes.unshift({
    path: "/",
    element: <Navigate to="/docs" replace />,
  });

  routes[0].routes.push({
    path: "*",
    element: <Navigate to="/404" replace />,
  });

  window.routes = routes[0].routes;
}
