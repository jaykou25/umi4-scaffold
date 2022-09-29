import request from "@/utils/request";

export async function queryMenu(): Promise<any> {
  return request("/api/menus/build");
}

export async function queryCurrent(): Promise<any> {
  return request("/auth/info");
}

export async function queryCode() {
  return request(`/auth/code`);
}

export async function postLogin(data) {
  return request("/auth/login", {
    method: "post",
    data,
  });
}
