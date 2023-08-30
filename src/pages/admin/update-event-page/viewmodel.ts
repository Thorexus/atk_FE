import AdminRepository from 'modules/admin/admin.repository';
import AdminService from 'modules/admin/admin.service';
import EventRepository from 'modules/event/event.repository';
import EventService from 'modules/event/event.service';
import Event from 'modules/event/model/event';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EventTimeType } from '../create-event-page/viewmodel';
import { ADMIN_ROUTE } from 'common/constants/route-path';
import { toaster } from 'common/base-ui/toast/toaster';
import UpdateEventDTO from 'modules/admin/dto/update-event-dto';

export const useViewModel = () => {
  const [eventDetail, setEventDetail] = useState<Event>({} as Event);
  const [isLoading, setisLoading] = useState(true);

  const params = useParams();
  const navigate = useNavigate();

  const getEventDetail = (eventId: number) => {
    const eventRepository = new EventRepository(new EventService());

    eventRepository.getEventDetail(eventId).then(res => {
      setEventDetail(res);
      setisLoading(false);
    });
  };

  const handleEditEvent = async (values: Record<string, string>) => {
    const adminReposity = new AdminRepository(new AdminService());

    const eventTime = values.time as unknown as EventTimeType;
    const eventTimeClose = values.timeClose as unknown as EventTimeType;

    const updateEventPayload = new UpdateEventDTO({
      id: parseInt(params.id!),
      name: values.name,
      floor: parseInt(values.floor),
      room: values.room,
      date: new Date(values.date).toISOString(),
      hour: eventTime.hour,
      minute: eventTime.minute,
      description: values.description,
      dateClose: new Date(values.dateClose).toISOString(),
      hrClose: eventTimeClose.hour,
      minuteClose: eventTimeClose.minute,
    });

    return await adminReposity
      .updateEvent(updateEventPayload)
      .then(() => {
        navigate(ADMIN_ROUTE.DASHBOARD);

        toaster('success', 'แก้ไขอีเวนท์สำเร็จ', 'อีเวนท์ถูกบันทึก');
      })
      .catch(() => {
        toaster('error', 'แก้ไขอีเวนท์ไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้ง');
      });
  };

  useEffect(() => {
    getEventDetail(parseInt(params.id!));
  }, [params.id]);

  return {
    handleEditEvent,
    eventDetail,
    isLoading,
  };
};
