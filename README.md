
## 业务后台管理系统 

### 框架基于Umi4, ui基于Antd和Antd-ProComponent

## 使用

```bash
# 安装依赖
$ yarn install

# 启动服务
$ yarn dev  # visit http://localhost:8000
```

[umijs文档](https://umijs.org/)

## 框架结构
### 路由(Router)
默认使用约定式路由, 即pages文件夹中的页面会自动形成路由.

### 运行时修改路由
框架约定`src/app.tsx`为运行时配置. 在这里写入`patchClientRoutes`函数可以动态修改路由.

比如增加首页跳转和增加404页. (注意写法要参照react route v6, 跟老版本稍有不同)
```js
import { Navigate } from "umi";

export function patchClientRoutes({ routes }) {
  routes[0].routes.unshift({
    path: "/",
    element: <Navigate to="/docs" replace />,
  });

  routes[0].routes.push({
    path: "*",
    element: <Navigate to="/notFound" replace />,
  });
}
```

### 布局(Layout)
框架约定`layouts/index.tsx`为全局布局文件. 在这里可以通过`pathname`来指定页面使用哪种布局.

布局目前有基础布局(BasicLayout)和空布局(BlankLayout)两个, 基础布局包含左侧menu, 上侧header等. 目前大部分的页面使用基础布局. 空布局仅包含背景图等基础样式, 用于登录页和404页面等.

#### BasicLayout
基础布局中我们使用`ProLayout`组件, 并且版本号是`v6`; `"@ant-design/pro-layout": "^6",`

`v7`的版本目前来看不稳定, 保持观察. 等官网的https://preview.pro.ant.design/使用了v7版本后我们再换.

`v6`的api可以看它的源码, 源码地址: https://github.com/ant-design/pro-components/tree/%40ant-design/pro-layout%406.38.22, 把分支切换到`@ant-design/pro-layout@6.38.22`

ProLayout的api繁多, 代表它的每个部分都可以定制.


