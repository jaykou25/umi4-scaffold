const getEnv = () => {
  const { host } = window.location;
  if (/zyjy.wxmetro.net/.test(host)) {
    return "prod";
  }

  if (/play.ttnote.cn/.test(host)) {
    return "beta";
  }

  if (/10.1.237.132/.test(host)) {
    return "beta";
  }

  return "dev";
};

export const baseSrc = () => {
  const baseSrcMap = {
    dev: "http://10.1.237.132",
    beta: "http://play.ttnote.cn",
    prod: "https://zyjy.wxmetro.net",
  };

  return baseSrcMap[getEnv()];
};

export const ssoSite = () => {
  return getEnv() === "prod"
    ? "http://cas.wxmetro.net/wxportalcas/login?service=http://zyjy.wxmetro.net/sso"
    : "http://10.1.13.28:7004/wxportalcas/login?service=http://10.1.237.132/sso";
};
