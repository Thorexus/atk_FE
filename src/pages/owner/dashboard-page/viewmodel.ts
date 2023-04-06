import { getAccessToken } from 'common/axios/token';
import EventRepository from 'modules/event/event.repository';
import EventService from 'modules/event/event.service';
import Event from 'modules/event/model/event';
import GetTheirEventListDTO from 'modules/user/dto/get-their-event-list.dto';
import UserRepository from 'modules/user/user.repository';
import UserService from 'modules/user/user.service';

import { useEffect, useState } from 'react';

export const useViewModel = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isEventLoading, setIsEventLoading] = useState(true);
  const [eventDetailDrawerOpen, setEventDetailDrawerOpen] = useState(false);
  const [eventDetail, setEventDetail] = useState({} as Event);
  const [isGettingEventDetail, setIsGettingEventDetail] = useState(false);

  const payload = new GetTheirEventListDTO({
    token: getAccessToken() as string,
    limit: 1000,
    page: 1,
  });

  const getAllEvent = () => {
    const useRepository = new UserRepository(new UserService());

    useRepository.GetTheirEventList(payload).then(res => {
      setEvents(res);
      setIsEventLoading(false);
    });
  };

  const getEventDetail = (eventId: number) => {
    setIsGettingEventDetail(true);

    const eventRepository = new EventRepository(new EventService());

    eventRepository.getEventDetail(eventId).then(res => {
      setEventDetail(res);
      setIsGettingEventDetail(false);
    });
  };

  const handleViewEventDetail = (eventId: number) => {
    setEventDetailDrawerOpen(true);

    getEventDetail(eventId);
  };

  const handleLoadEventAfterDelete = () => {
    setIsEventLoading(true);

    const useRepository = new UserRepository(new UserService());

    const payload = new GetTheirEventListDTO({
      token: getAccessToken() as string,
      limit: 1000,
      page: 1,
    });

    useRepository.GetTheirEventList(payload).then(res => {
      setEvents(res);

      setIsEventLoading(false);
    });
  };

  useEffect(() => {
    getAllEvent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isEventLoading,
    handleViewEventDetail,
    events,
    eventDetailDrawerOpen,
    setEventDetailDrawerOpen,
    eventDetail,
    isGettingEventDetail,
    handleLoadEventAfterDelete,
  };
};
