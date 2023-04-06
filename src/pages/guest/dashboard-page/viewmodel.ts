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
  const [isGettingEventDetail, setIsGettingEventDetail] = useState(false);
  const [eventDetail, setEventDetail] = useState({} as Event);

  const getTheirEventList = () => {
    const userRepository = new UserRepository(new UserService());

    const payload = new GetTheirEventListDTO({
      token: getAccessToken() as string,
      page: 1,
    });

    userRepository
      .GetTheirEventList(payload)
      .then(res => {
        setEvents(res);
        setIsEventLoading(false);
      })
      .catch(() => {
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

  useEffect(() => {
    getTheirEventList();
  }, []);

  return {
    events,
    isEventLoading,
    eventDetailDrawerOpen,
    setEventDetailDrawerOpen,
    isGettingEventDetail,
    eventDetail,
    handleViewEventDetail,
  };
};
