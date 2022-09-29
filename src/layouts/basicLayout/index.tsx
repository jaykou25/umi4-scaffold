import layoutSettings from "../../../config/defaultSettings";
import { ProLayout, DefaultFooter } from "@ant-design/pro-layout";
import { Outlet, useModel, Link, useLocation } from "umi";
import MetroLogo from "@/assets/metro_logo.png";
import { SITE } from "../../../config/config";

import styles from "./styles.less";
import RightContent from "@/components/GlobalHeader/RightContent";

const BasicLayout = () => {
  const { initialState, loading } = useModel("@@initialState");
  const { menu } = initialState;
  const { pathname } = useLocation();
  return (
    <div className={styles.basicLayout}>
      <ProLayout
        {...layoutSettings}
        iconfontUrl="//at.alicdn.com/t/c/font_2751876_06t78vzrj35g.js"
        loading={loading}
        logo={MetroLogo}
        title={SITE.name}
        siderWidth={220}
        route={{ routes: menu }}
        menuItemRender={(menuItemProps, defaultDom) => {
          if (
            menuItemProps.isUrl ||
            !menuItemProps.path ||
            pathname === menuItemProps.path
          ) {
            return defaultDom;
          }

          return <Link to={menuItemProps.path}>{defaultDom}</Link>;
        }}
        // 修改面包屑的数据, 默认没有首页数据
        breadcrumbRender={(routers = []) => {
          return [
            {
              path: "/",
              breadcrumbName: "首页",
            },
            ...routers,
          ];
        }}
        // 渲染面包屑, 这是Antd Breadcrumb的api, 在pro-layout里没有
        itemRender={(route, params, routes, paths) => {
          const first = routes.indexOf(route) === 0;
          return first ? (
            <Link to={route.path}>{route.breadcrumbName}</Link>
          ) : (
            <span>{route.breadcrumbName}</span>
          );
        }}
        footerRender={() => {
          return (
            <DefaultFooter
              copyright={`${new Date().getFullYear()} 资源开发有限公司`}
              links={[]}
            />
          );
        }}
        rightContentRender={() => <RightContent />}
      >
        <Outlet />
      </ProLayout>
    </div>
  );
};

export default BasicLayout;
