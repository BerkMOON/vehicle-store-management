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
      path: '/dashboard',
      name: '数据看板',
      component: './Dashboard',
      access: 'isAdmin',
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
      name: '流失提醒',
      path: '/loss-reminder',
      component: './LossReminder',
      access: 'isAdmin',
    },
    {
      name: '里程提醒',
      path: '/mileage-reminder',
      component: './MileageReminder',
      access: 'isAdmin',
    },
    {
      path: '/auditList',
      name: '事故列表',
      component: './AuditList',
      access: 'isAdmin',
    },
    {
      path: '/auditDetail/:clueId',
      name: '工单详情',
      component: './AuditList/Detail',
      hideInMenu: true,
      access: 'isAdmin',
    },
    {
      path: '/unused-device',
      name: '未上线设备',
      component: './UnusedDevice',
      access: 'isAdmin',
    },
    {
      path: '/old-device',
      name: '旧版本设备',
      component: './OldDevice',
      access: 'isAdmin',
    },
  ],
  npmClient: 'pnpm',
  proxy: {
    '/api': {
      // 标识需要进行转换的请求的url
      // target: 'http://192.168.8.232:8888',
      target: 'https://eda-store-test.ai-kaka.com:443',
      // target: 'https://s.ai-kaka.com:443', // 服务端域名
      changeOrigin: true, // 允许域名进行转换
    },
  },
});
