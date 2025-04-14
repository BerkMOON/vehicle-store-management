import { defineConfig } from '@umijs/max';

export default defineConfig({
  esbuildMinifyIIFE: true,
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '易达安系统',
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: './Home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
      hideInMenu: true,
    },
    {
      name: '登录',
      path: '/login',
      component: './Login',
      layout: false,
    },
    {
      name: '设备列表',
      path: '/device',
      component: './Device',
      access: 'isAdmin',
    },
    {
      name: '看板',
      path: '/dashboard',
      component: './Dashboard',
      access: 'isAdmin',
    },
  ],
  npmClient: 'pnpm',
  proxy: {
    '/api': {
      // 标识需要进行转换的请求的url
      target: 'http://47.121.134.143:8888', // 服务端域名
      changeOrigin: true, // 允许域名进行转换
    },
    '/admin': {
      // 标识需要进行转换的请求的url
      target: 'http://47.121.134.143:8888', // 服务端域名
      changeOrigin: true, // 允许域名进行转换
    },
  },
});
