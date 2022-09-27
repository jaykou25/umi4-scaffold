export default {
  dev: {
    "/api/": {
      // target: 'http://172.30.10.34:8000', // 杨阳本地
      // target: 'http://172.30.30.15:8000', // 老莫本地
      // target: 'http://172.30.10.37:8000', // 耿卫本地
      target: "http://10.1.237.133:8000/", // 新测试环境
      // target: 'https://zyjy.wxmetro.net/', // 生产环境
      changeOrigin: true,
    },
    "/auth/": {
      // target: 'http://10.3.93.199:8000', // 杨阳本地
      // target: 'http://172.30.10.6:8000', // 老莫本地
      // target: 'http://172.30.10.37:8000', // 耿卫本地
      target: "http://10.1.237.133:8000/", //新测试环境
      // target: 'https://zyjy.wxmetro.net/', // 生产环境
      changeOrigin: true,
    },
  },
};
