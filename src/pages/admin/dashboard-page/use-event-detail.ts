import { useState } from 'react';
import EventRepository from 'modules/event/event.repository';
import EventService from 'modules/event/event.service';
import Event from 'modules/event/model/event';

export const useEventDetail = () => {
  const [eventDetailDrawerOpen, setEventDetailDrawerOpen] = useState(false);
  const [isGettingEventDetail, setIsGettingEventDetail] = useState(false);
  const [eventDetail, setEventDetail] = useState({} as Event);

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

  return {
    eventDetailDrawerOpen,
    setEventDetailDrawerOpen,
    handleViewEventDetail,
    isGettingEventDetail,
    eventDetail,
  };
};
