import { useContextAuthManager } from 'common/authentication';
import { toaster } from 'common/base-ui/toast/toaster';
import AdminRepository from 'modules/admin/admin.repository';
import AdminService from 'modules/admin/admin.service';
import UserRepository from 'modules/user/user.repository';
import UserService from 'modules/user/user.service';

import { useEffect, useState } from 'react';

export const useViewModel = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const [file, setFile] = useState<FileList>({} as FileList);
  const [isUploading, setIsUploading] = useState(false);

  const { userInfo, setUserInfo } = useContextAuthManager();

  const handleUploadProfileImage = () => {
    setIsUploading(true);

    const formData = new FormData();

    formData.append('files.image', file.item(0) as File);
    formData.append(
      'data',
      `{"name": "${file.item(0)?.name}", "uploader": ${userInfo.getId()}}`,
    );

    const adminRepository = new AdminRepository(new AdminService());

    const userRepository = new UserRepository(new UserService());

    const userId = localStorage.getItem('userId');

    adminRepository
      .uploadProfileImage(formData)
      .then(() => {
        toaster('success', 'อัพโหลดรูปโปรไฟล์สำเร็จ', 'รูปโปรไฟล์ถูกบันทึก');

        userRepository.getUserInfo(userId as string).then(res => {
          setUserInfo(res);
        });

        setIsOpen(false);
        setIsUploading(false);
      })
      .catch(() => {
        toaster('error', 'อัพโหลดรูปโปรไฟล์ไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้ง');
        setIsUploading(false);
      });
  };

  useEffect(() => {
    return () => {
      setFile({} as FileList);
      setIsUploading(false);
    };
  }, [isOpen]);

  return { handleUploadProfileImage, file, setFile, isUploading };
};
