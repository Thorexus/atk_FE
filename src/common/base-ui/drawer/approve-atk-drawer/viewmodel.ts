import { getAccessToken } from 'common/axios/token';
import { toaster } from 'common/base-ui/toast/toaster';
import { TestStatusEnum } from 'modules/data-contractor';
import ApproveAtkDTO from 'modules/event/dto/approve-atk.dto';
import EventRepository from 'modules/event/event.repository';
import EventService from 'modules/event/event.service';
import Event from 'modules/event/model/event';
import User from 'modules/user/model/user';

export const useViewModel = ({
  user,
  event,
  fetchParentData,
  setIsOpen,
}: {
  user: User;
  event: Event;
  fetchParentData?: () => void;
  setIsOpen: (value: boolean) => void;
}) => {
  const handleApproveAtk = async (values: Record<string, string>) => {
    const eventRepository = new EventRepository(new EventService());

    const payload = new ApproveAtkDTO({
      token: getAccessToken() as string,
      userId: user.getId(),
      eventId: event.getId(),
      status: values.atkStatus as TestStatusEnum,
    });

    return await eventRepository
      .approveAtk(payload)
      .then(res => {
        fetchParentData && fetchParentData();

        setIsOpen(false);
        toaster('success', 'ยืนยันผลตรวจสำเร็จ', 'ผลตรวจถูกบันทึก');
      })
      .catch(() => {
        toaster('error', 'เกิดข้อผิดพลาด', 'กรุณาลองใหม่อีกครั้ง');
      });
  };

  return { handleApproveAtk };
};
