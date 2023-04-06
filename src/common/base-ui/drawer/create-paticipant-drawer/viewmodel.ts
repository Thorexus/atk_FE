import { useContextAuthManager } from 'common/authentication';
import { toaster } from 'common/base-ui/toast/toaster';
import AdminRepository from 'modules/admin/admin.repository';
import AdminService from 'modules/admin/admin.service';
import Event from 'modules/event/model/event';
import { useEffect, useState } from 'react';

export const useViewModel = ({
  event,
  isOpen,
  setIsOpen,
  fetchParentData,
}: {
  event: Event;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  fetchParentData: () => void;
}) => {
  const [file, setFile] = useState<FileList>({} as FileList);
  const [isUploading, setIsUploading] = useState(false);

  const { userInfo } = useContextAuthManager();

  const handleCreateParticipant = () => {
    setIsUploading(true);

    const formData = new FormData();

    formData.append('files.excel', file.item(0) as File);
    formData.append(
      'data',
      `{"name": "${
        file.item(0)?.name
      }", "uploader": ${userInfo.getId()}, "event_id": ${event.getId()}}`,
    );

    const adminRepository = new AdminRepository(new AdminService());

    adminRepository
      .createParticipant(formData)
      .then(() => {
        toaster('success', 'เพิ่มผู้เข้าร่วมาำเร็จ', 'ผู้เข้าร่วมถูกบันทึก');

        fetchParentData();
        setIsOpen(false);
        setIsUploading(false);
      })
      .catch(() => {
        toaster('error', 'เพิ่มผู้เข้าไม่ร่วมาำเร็จ', 'กรุณาลองใหม่อีกครั้ง');
        setIsUploading(false);
      });
  };

  useEffect(() => {
    return () => {
      setFile({} as FileList);
      setIsUploading(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return { handleCreateParticipant, file, setFile, isUploading };
};
