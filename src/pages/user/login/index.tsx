import { LockTwoTone, UserOutlined, ProfileOutlined } from "@ant-design/icons";
import { Alert, Input, Form, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import ProForm, { ProFormText } from "@ant-design/pro-form";
import type { ProFormInstance } from "@ant-design/pro-form";
import { history, useModel } from "umi";
import Logo from "@/assets/metro_logo.png";

import styles from "./index.less";
import { encrypt } from "@/utils/jsencrypt";
import { postLogin, queryCode } from "@/apis";
import { SITE } from "../../../../config/config";
import { isLogin, setToken } from "@/utils/auth";
import { goto } from "@/utils/login";

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const UserLogin: React.FC<any> = () => {
  const [codeData, setCodeData] = useState<{ img: string; uuid: string }>({
    img: "",
    uuid: "",
  });
  const [status, setStatus] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const formRef = useRef<ProFormInstance>();

  const { refresh } = useModel("@@initialState");

  useEffect(() => {
    // 获取code
    handleQueryCode();
  }, []);

  const handleQueryCode = () => {
    queryCode().then((res: any) => {
      setCodeData(res);
    });
  };

  const handleSubmit = (values: any) => {
    const payload = {
      ...values,
      password: encrypt(values.password),
      uuid: codeData.uuid,
    };

    setSubmitting(true);

    postLogin(payload)
      .then((res: any) => {
        setStatus(0);

        setToken(res.token);
        message.success("登录成功！");

        refresh();

        goto();
      })
      .catch((e) => {
        const { message } = e;
        handleQueryCode();

        if (message === "验证码错误") {
          setStatus(2);
        } else if (message === "验证码不存在或已过期") {
          setStatus(3);
        } else {
          setStatus(1);
        }

        // 登录失败清除验证码
        formRef?.current?.setFieldsValue({ code: "" });
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div>
      <div className={styles.top}>
        <div className={styles.header}>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => {
              if (!isLogin()) {
                message.info("请先登录");
                return;
              }

              history.push("/");
            }}
          >
            <img alt="logo" className={styles.logo} src={Logo} />
            <span className={styles.title}>{SITE.name}</span>
          </div>
        </div>
        <div className={styles.desc}>{`欢迎登陆${SITE.name}`}</div>
      </div>

      <div className={styles.main}>
        <ProForm
          formRef={formRef}
          initialValues={{
            autoLogin: true,
          }}
          isKeyPressSubmit={true}
          submitter={{
            render: (_, dom) => dom.pop(),
            submitButtonProps: {
              loading: submitting,
              size: "large",
              style: {
                width: "100%",
              },
            },
          }}
          onFinish={(values) => {
            handleSubmit(values);
            return Promise.resolve();
          }}
        >
          {status === 1 && !submitting && (
            <LoginMessage content={"账户或密码错误"} />
          )}
          {status === 2 && !submitting && (
            <LoginMessage content={"验证码错误"} />
          )}
          {status === 3 && !submitting && (
            <LoginMessage content={"验证码过期"} />
          )}
          <ProFormText
            name="username"
            fieldProps={{
              size: "large",
              prefix: <UserOutlined className={styles.prefixIcon} />,
              autoFocus: true,
            }}
            placeholder="用户名"
            rules={[
              {
                required: true,
                message: "请输入用户名!",
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: "large",
              prefix: <LockTwoTone className={styles.prefixIcon} />,
            }}
            placeholder={"密码"}
            rules={[
              {
                required: true,
                message: "请输入密码!",
              },
            ]}
          />
          <Form.Item>
            <div className="flexRow">
              <Form.Item name="code">
                <Input
                  size="large"
                  prefix={<ProfileOutlined className={styles.prefixIcon} />}
                  autoComplete="off"
                />
              </Form.Item>
              <div
                style={{
                  cursor: "pointer",
                  marginLeft: "10px",
                  marginBottom: "24px",
                }}
              >
                <img onClick={handleQueryCode} src={codeData.img} />
              </div>
            </div>
          </Form.Item>
        </ProForm>
      </div>
    </div>
  );
};

export default UserLogin;
