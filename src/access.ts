import { PERMISSION_CODE } from './constants/permission';
import { UserSelfInfo } from './services/user/typings';

export default (initialState: UserSelfInfo & { isLogin: boolean }) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access

  return {
    isLogin: !!initialState?.isLogin,
    // 用户管理
    userList: () => {
      const userModule = initialState?.authority?.find(
        (authority) => authority.code === PERMISSION_CODE.USER_MODULE,
      );
      return !!userModule?.children.find(
        (child) => child.code === PERMISSION_CODE.USER_MANAGER,
      );
    },
  };
};
