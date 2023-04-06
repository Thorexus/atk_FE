import { getAccessToken } from 'common/axios/token';
import { removeToken } from 'common/axios/token';
import { useEffect, useMemo, useState } from 'react';
import isEmpty from 'lodash/isEmpty';
import User from 'modules/user/model/user';
import UserRepository from 'modules/user/user.repository';
import UserService from 'modules/user/user.service';
import { useNavigate } from 'react-router-dom';
import { PUBLIC_ROUTE } from 'common/constants/route-path';

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<User>({} as User);
  const navigate = useNavigate();

  const logout = () => {
    setIsLoggedIn(false);
    removeToken();
    localStorage.removeItem('userId');
    navigate(PUBLIC_ROUTE.LOGIN);
  };

  useEffect(() => {
    const token = getAccessToken();
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      const userRepository = new UserRepository(new UserService());

      userRepository.getUserInfo(userId).then(res => {
        setUserInfo(res);
      });

      setIsLoggedIn(true);
    } else {
      logout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isLoading = useMemo(() => {
    if (
      isLoggedIn &&
      isEmpty(userInfo) &&
      getAccessToken() &&
      localStorage.getItem('userId')
    ) {
      return true;
    }

    return false;
  }, [userInfo, isLoggedIn]);

  return {
    isLoggedIn,
    setIsLoggedIn,
    userInfo,
    setUserInfo,
    isLoading,
    logout,
  };
};
