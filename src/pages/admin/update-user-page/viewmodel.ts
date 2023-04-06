import { getAccessToken } from 'common/axios/token';
import { toaster } from 'common/base-ui/toast/toaster';
import AdminRepository from 'modules/admin/admin.repository';
import AdminService from 'modules/admin/admin.service';
import UpdateUserDTO from 'modules/admin/dto/update-user.dto';
import User from 'modules/user/model/user';
import UserRepository from 'modules/user/user.repository';
import UserService from 'modules/user/user.service';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const useViewModel = () => {
  const [userInfo, setUserInfo] = useState({} as User);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();

  const getUserInfo = () => {
    const userRepository = new UserRepository(new UserService());

    userRepository.getUserInfo(params.userId!).then(res => {
      setUserInfo(res);
      setIsLoading(false);
    });
  };

  const handleUpdateUser = async (values: Record<string, string>) => {
    const adminRepository = new AdminRepository(new AdminService());

    const updateUserPayload = new UpdateUserDTO({
      id: parseInt(params.userId!),
      name: values.name,
      lastname: values.lastname,
      email: values.email,
      phone: values.phone,
      birthDate: values.birthdate,
      token: getAccessToken() as string,
    });

    return await adminRepository
      .updateUser(updateUserPayload)
      .then(() => {
        navigate(`/admin/event/${params.id}`);

        toaster('success', 'แก้ไขผู้ใช้สำเร็จ', 'ผู้ใช้ถูกบันทึก');
      })
      .catch(() => {
        toaster('error', 'แก้ไขผู้ใช้ไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้ง');
      });
  };

  useEffect(() => {
    getUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.userId]);

  return { handleUpdateUser, userInfo, isLoading };
};
