import { useLocation } from "umi";
import BasicLayout from "./basicLayout";
import BlankLayout from "./blankLayout";

export default function Layout(props) {
  /**
   * 大部分路由都走BasicLayout
   * 登录页, 404页等可以走其它路由
   */
  const { pathname } = useLocation();

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
