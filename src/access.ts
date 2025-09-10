// import { Role } from './constants';
import { ACCESS_ROLE } from './constants';
import { UserInfo } from './services/user/typings';

export default (initialState: UserInfo & { isLogin: boolean }) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access

  return {
    isLogin: !!initialState?.isLogin,
    isAdmin: !!initialState?.role_list?.find((item) =>
      ACCESS_ROLE.includes(item?.role),
    ),
  };
};
