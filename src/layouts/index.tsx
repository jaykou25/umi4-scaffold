import { pathInMenu } from "@/utils/auth";
import { inWhiteList } from "@/utils/whiteList";
import { useLocation, useModel, Navigate } from "umi";
import BasicLayout from "./basicLayout";
import BlankLayout from "./blankLayout";

export default function Layout() {
  const { initialState } = useModel("@@initialState");
  const { menu = [], routes } = initialState || {};
  const { pathname } = useLocation();
  console.log("in layout", { routes, menu, pathname });

  /**
   * 在这里做页面的权限控制(已登录的情况下)
   * 未登录的情况在app.tsx里就会拦截掉
   */
  if (!inWhiteList(pathname)) {
    if (!pathInMenu(pathname, routes)) {
      console.log("in 404");
      return <Navigate to="/404" replace />;
    }

    if (
      !pathInMenu(pathname, menu.concat([{ path: "/" }, { path: "/docs" }]))
    ) {
      console.log("in 401");
      return <Navigate to="/401" replace />;
    }
  }

  /**
   * 大部分路由都走BasicLayout
   * 登录页, 404页等可以走其它路由
   */

  // 401页面
  if (/^\/401/.test(pathname)) {
    return <BlankLayout />;
  }

  // sso
  if (/^\/sso/.test(pathname)) {
    return <BlankLayout />;
  }

  // 登陆页面
  if (/^\/user/.test(pathname)) {
    return <BlankLayout />;
  }

  // 正常业务页面
  return <BasicLayout />;
}
