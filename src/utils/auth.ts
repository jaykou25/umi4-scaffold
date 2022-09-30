import ls from "./localStorage";

const key = "umi4-token";

export const getToken = () => {
  return ls.get(key);
};

export const setToken = (token: string) => {
  ls.set(key, token);
};

export const clearToken = () => {
  ls.remove(key);
};

export const isLogin = () => {
  return !!getToken();
};

/**
 *
 * 判断路径是否在返回的menu列表里
 */
export function pathInMenu(path, authedPaths: any = []) {
  return authedPaths.some(
    (authedPath) =>
      authedPath.path === path || pathInMenu(path, authedPath.children || [])
  );
}
