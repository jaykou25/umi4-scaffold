import { clearToken } from "@/utils/auth";
import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Menu, Spin } from "antd";
import { history, useModel } from "umi";
import styles from "./index.less";

const defaultAvatarSrc =
  "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png";

const AvatarDropdown = () => {
  const { initialState } = useModel("@@initialState");
  const { currentUser } = initialState;
  const { user } = currentUser || {};

  const onMenuClick = (event) => {
    const { key } = event;

    if (key === "center") {
      history.push("/system/myCenter");

      return;
    }

    if (key === "logout") {
      handleLogout();

      return;
    }

    history.push(`/account/${key}`);
  };

  const handleLogout = () => {
    // 清除token
    clearToken();

    history.replace("/user/login");
  };

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {/* {menu && (
          <Menu.Item key="center">
            <UserOutlined />
            个人中心
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <SettingOutlined />
            个人设置
          </Menu.Item>
        )}
        {menu && <Menu.Divider />} */}

      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return user && user.nickName ? (
    <Dropdown overlay={menuHeaderDropdown} placement="bottomRight">
      <span className={`${styles.action} ${styles.account}`}>
        <Avatar
          size="small"
          className={styles.avatar}
          src={user.username === "admin" ? defaultAvatarSrc : user.avatar}
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>{user.nickName}</span>
      </span>
    </Dropdown>
  ) : (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );
};

export default AvatarDropdown;
