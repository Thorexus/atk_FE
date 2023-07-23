import { toaster } from 'common/base-ui/toast/toaster';
import EventRepository from 'modules/event/event.repository';
import EventService from 'modules/event/event.service';
import { useEffect, useState } from 'react';

export type detailModalType =
  | 'detail'
  | 'remove'
  | 'atk-upload'
  | 'profile-upload'
  | 'update-atk-upload';

export const useViewModel = ({
  initViewType,
  fetchParentData,
  isOpen,
  setIsOpen,
}: {
  initViewType: detailModalType;
  fetchParentData?: () => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const [viewType, setViewType] = useState(initViewType);
  const [isRemovingEvent, setIsRemovingEvent] = useState(false);

  const handleRemoveEvent = (eventId: number) => {
    setIsRemovingEvent(true);
    const eventRepository = new EventRepository(new EventService());

    eventRepository
      .removeEvent(eventId)
      .then(res => {
        if (res) {
          setIsOpen(false);
          fetchParentData && fetchParentData();
          toaster('success', 'ลบอีเวนท์สำเร็จ', 'อีเวนท์ถูกลบจากระบบ');
        } else {
          toaster('error', 'ลบอีเวนท์ไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้ง');
        }

        setIsRemovingEvent(false);
      })
      .catch(() => {
        setIsRemovingEvent(false);

        toaster('error', 'ลบอีเวนท์ไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้ง');
      });
    return;
  };

  useEffect(() => {
    return () => {
      setViewType('detail');
    };
  }, [isOpen]);

  return { viewType, setViewType, handleRemoveEvent, isRemovingEvent };
};
