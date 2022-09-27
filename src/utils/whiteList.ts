// 白名单指的是不需要权限接口的页面, 像中台项目的首页'/'需要展示菜单数据, 那么就不属于白名单
export const inWhiteList = (pathname) => {
  // 401, 404
  if (/^\/40/.test(pathname)) {
    return true;
  }

  // 用户页
  if (/^\/user/.test(pathname)) {
    return true;
  }

  // dashboard
  if (/^\/dashboard/.test(pathname)) {
    return true;
  }

  // sso
  if (/^\/sso/.test(pathname)) {
    return true;
  }

  return false;
};
