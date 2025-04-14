// 运行时配置
import { Button, Result } from 'antd';
import Login from './components/BasicComponents/Login/Login';
import iconPng from './favicon.jpeg';
import { UserInfo } from './services/user/typings';
import { UserAPI } from './services/user/UserController';

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<
  (UserInfo & { isLogin: boolean }) | { isLogin: boolean }
> {
  try {
    const userInfo = await UserAPI.getUserDetail();
    const { data } = userInfo;
    if (data) {
      return { ...data, isLogin: true };
    } else {
      return { isLogin: false };
    }
  } catch (e) {
    console.error('get user info error', e);
    return { isLogin: false };
  }
}

export const layout = ({
  initialState,
}: {
  initialState: (UserInfo & { isLogin: boolean }) | { isLogin: boolean };
}) => {
  const { isLogin } = initialState;
  return {
    logo: iconPng,
    menu: {
      locale: false,
    },
    rightContentRender: () => <Login />,
    layout: 'top',
    unAccessible: (
      <Result
        status={`${isLogin ? '403' : '404'}`}
        title={`${isLogin ? '403' : '未登录'}`}
        subTitle={
          isLogin
            ? '抱歉，你无权访问此页面，如需使用，请联系管理员添加权限'
            : '请先登录再查看'
        }
        extra={
          <Button
            type="primary"
            onClick={() => {
              if (isLogin) {
                window.location.href = '/home';
              } else {
                window.location.href = '/login';
              }
            }}
          >
            {isLogin ? '返回首页' : '登录'}
          </Button>
        }
      />
    ),
  };
};
