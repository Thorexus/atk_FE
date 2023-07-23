import { useContextAuthManager } from 'common/authentication';
import { toaster } from 'common/base-ui/toast/toaster';
import Event from 'modules/event/model/event';
import UserRepository from 'modules/user/user.repository';
import UserService from 'modules/user/user.service';
import { useState } from 'react';

export const useViewModel = ({
  event,
  setIsOpen,
}: {
  event: Event;
  setIsOpen: (value: boolean) => void;
}) => {
  const [file, setFile] = useState<FileList>({} as FileList);
  const [isUploading, setIsUploading] = useState(false);

  const { userInfo } = useContextAuthManager();

  const handleUpdateAtk = () => {
    setIsUploading(true);

    const formData = new FormData();

    formData.append('files.image', file.item(0) as File);
    formData.append(
      'data',
      `{"name": "${
        file.item(0)?.name
      }", "uploader": ${userInfo.getId()}, "event_id": ${event.getId()}}`,
    );

    const userRepository = new UserRepository(new UserService());

    userRepository
      .updateAtkImage(formData)
      .then(() => {
        toaster('success', 'อัพโหลดสำเร็จ', 'ผลตรวจถูกแก้ไข');

        setIsOpen(false);
        setIsUploading(false);
      })
      .catch(() => {
        toaster('error', 'อัพโหลดไม่สำเร็ต', 'กรุณาลองใหม่อีกครั้ง');
        setIsUploading(false);
      });
  };

  return { file, setFile, handleUpdateAtk, isUploading };
};
