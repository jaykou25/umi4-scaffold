import { Outlet } from "umi";
import { DefaultFooter } from "@ant-design/pro-layout";
import styles from "./styles.less";

const BlankLayout = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <DefaultFooter
        copyright={`${new Date().getFullYear()} 资源开发有限公司`}
        links={[]}
      />
    </div>
  );
};

export default BlankLayout;
