import layoutSettings from "../../../config/defaultSettings";
import { ProLayout, DefaultFooter } from "@ant-design/pro-layout";
import { Outlet } from "umi";
import MetroLogo from "@/assets/metro_logo.png";
import { SITE } from "../../../config/config";

import styles from "./styles.less";

const BasicLayout = () => {
  return (
    <div className={styles.basicLayout}>
      <ProLayout
        {...layoutSettings}
        logo={MetroLogo}
        title={SITE.name}
        siderWidth={220}
        footerRender={() => {
          return (
            <DefaultFooter
              copyright={`${new Date().getFullYear()} 资源开发有限公司`}
              links={[]}
            />
          );
        }}
      >
        <Outlet />
      </ProLayout>
    </div>
  );
};

export default BasicLayout;
