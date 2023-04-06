import { useEffect, useMemo, useState } from 'react';
import EventRepository from 'modules/event/event.repository';
import Event from 'modules/event/model/event';
import EventService from 'modules/event/event.service';
import GetAllEventDTO from 'modules/event/dto/get-all-event.dto';

export const useViewmModel = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoadingMoreEvent, setIsLoadingMoreEvent] = useState(false);
  const [isEventLoading, setIsEventLoading] = useState(true);

  const getAllEvent = (page: number) => {
    const eventRepository = new EventRepository(new EventService());

    eventRepository
      .getAllEvent(new GetAllEventDTO({ page }))
      .then(res => {
        setTotalPage(res.totalPage);
        setEvents([...events, ...res.data]);

        setCurrentPage(page);
        setIsLoadingMoreEvent(false);
        setIsEventLoading(false);
      })
      .catch(() => {
        setIsLoadingMoreEvent(false);
        setIsEventLoading(false);
      });
  };

  const handleLoadMoreEvent = () => {
    getAllEvent(currentPage + 1);
    setIsLoadingMoreEvent(true);
  };

  const canLoadMoreEvent = useMemo(() => {
    if (totalPage > currentPage) {
      return true;
    }

    return false;
  }, [totalPage, currentPage]);

  useEffect(() => {
    getAllEvent(currentPage + 1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadEventAfterDelete = () => {
    setIsEventLoading(true);

    const eventRepository = new EventRepository(new EventService());

    eventRepository
      .getAllEvent(
        new GetAllEventDTO({
          limit: currentPage * 6,
          page: 1,
        }),
      )
      .then(res => {
        setTotalPage(res.totalPage);
        setEvents(res.data);

        setIsLoadingMoreEvent(false);
        setIsEventLoading(false);
      })
      .catch(() => {
        setIsLoadingMoreEvent(false);
        setIsEventLoading(false);
      });
  };

  return {
    events,
    handleLoadMoreEvent,
    canLoadMoreEvent,
    isLoadingMoreEvent,
    isEventLoading,
    handleLoadEventAfterDelete,
  };
};
