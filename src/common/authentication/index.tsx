import {
  ADMIN_ROUTE,
  PUBLIC_ROUTE,
  OWNER_ROUTE,
} from '../constants/route-path';
import { createContext, useContext } from 'react';
import { useAuth } from './viewmodel';
import isEmpty from 'lodash/isEmpty';
import { GUEST_ROUTE } from '../constants/route-path';
import User from 'modules/user/model/user';
import { UserRoleEnum } from 'modules/user/dao/user.dao';

type RouteType = {
  publicPath: string;
  privatePath: string;
};

type AuthManagerProps = {
  children: React.ReactNode;
};

type ContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  userInfo: User;
  setUserInfo: (val: any) => void;
  isLoading: boolean;
  logout: () => void;
} & RouteType;

export const AuthManagerContext = createContext({} as ContextType);

const AuthManager = ({ children }: AuthManagerProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    isLoggedIn,
    setIsLoggedIn,
    userInfo,
    setUserInfo,
    isLoading,
    logout,
  } = useAuth();

  const getUserRole = () => {
    if (!isEmpty(userInfo)) {
      return userInfo.getRole();
    }
  };

  return (
    <AuthManagerContext.Provider
      value={{
        publicPath: PUBLIC_ROUTE.LOGIN,
        privatePath:
          getUserRole() === UserRoleEnum.ADMIN
            ? ADMIN_ROUTE.DASHBOARD
            : getUserRole() === UserRoleEnum.OWNER
            ? OWNER_ROUTE.DASHBOARD
            : GUEST_ROUTE.DASHBOARD,
        isLoggedIn,
        setIsLoggedIn,
        userInfo,
        setUserInfo,
        isLoading,
        logout,
      }}>
      {!isLoading && children}
    </AuthManagerContext.Provider>
  );
};

export const useContextAuthManager = () => {
  return useContext(AuthManagerContext);
};

export default AuthManager;
