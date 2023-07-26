import { toaster } from 'common/base-ui/toast/toaster';
import { ADMIN_ROUTE } from 'common/constants/route-path';
import AdminRepository from 'modules/admin/admin.repository';
import AdminService from 'modules/admin/admin.service';
import CreateEventDTO from 'modules/admin/dto/create-event.dto';
import { useNavigate } from 'react-router-dom';

export type EventTimeType = {
  hour: string;
  minute: string;
};

export const useViewModel = () => {
  const navigate = useNavigate();

  const handleCreateEvent = async (values: Record<string, string>) => {
    const adminReposity = new AdminRepository(new AdminService());

    const eventTime = values.time as unknown as EventTimeType;
    const eventCloseTime = values.timeClose as unknown as EventTimeType;

    const createEventPayload = new CreateEventDTO({
      name: values.name,
      floor: parseInt(values.floor),
      room: values.room,
      date: new Date(values.date).toISOString(),
      hour: eventTime.hour,
      minute: eventTime.minute,
      description: values.description,
      dateClose: new Date(values.dateClose).toISOString(),
      hrClose: eventCloseTime.hour,
      minuteClose: eventCloseTime.minute,
    });

    return await adminReposity
      .createEvent(createEventPayload)
      .then(() => {
        navigate(ADMIN_ROUTE.DASHBOARD);

        toaster('success', 'สร้างอีเวนท์สำเร็จ', 'อีเวนท์ถูกบันทึก');
      })
      .catch(() => {
        toaster('error', 'สร้างอีเวนท์ไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้ง');
      });
  };

  return { handleCreateEvent };
};
