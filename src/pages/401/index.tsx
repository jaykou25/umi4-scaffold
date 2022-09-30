import { Button, Result } from "antd";
import { history } from "umi";

const NoAuthPage: React.FC = () => (
  <Result
    status="403"
    title="401"
    subTitle="您没有权限访问的该页面."
    extra={
      <Button type="primary" onClick={() => history.push("/")}>
        返回首页
      </Button>
    }
  />
);

export default NoAuthPage;
