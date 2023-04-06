import { getAccessToken } from 'common/axios/token';
import { toaster } from 'common/base-ui/toast/toaster';
import AdminRepository from 'modules/admin/admin.repository';
import AdminService from 'modules/admin/admin.service';
import User from 'modules/user/model/user';
import { useState } from 'react';

export const useViewModel = ({
  user,
  setIsOpen,
  fetchParentData,
}: {
  user: User;
  setIsOpen: (value: boolean) => void;
  fetchParentData?: () => void;
}) => {
  const [isRemovingUser, setisRemovingUser] = useState(false);

  const handleRemoveEvent = () => {
    setisRemovingUser(true);

    const adminRepository = new AdminRepository(new AdminService());

    adminRepository
      .deleteUser({
        id: user.getId(),
        token: getAccessToken() as string,
      })
      .then(() => {
        fetchParentData && fetchParentData();

        setisRemovingUser(false);
        setIsOpen(false);

        toaster('success', 'ลบผู้ใช้สำเร็จ');
      })
      .catch(() => {
        setisRemovingUser(false);

        toaster('error', 'ลบผู้ใช้ไม่สำเร็จ');
      });
  };

  return {
    handleRemoveEvent,
    isRemovingUser,
  };
};
