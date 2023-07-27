import { TestStatusEnum } from 'modules/data-contractor';
import EventRepository from 'modules/event/event.repository';
import EventService from 'modules/event/event.service';
import Event from 'modules/event/model/event';
import User from 'modules/user/model/user';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

export const useViewModel = () => {
  const [event, setEvent] = useState({} as Event);
  const [participants, setParticipants] = useState<User[]>([]);
  const [isGettingParticipant, setIsGettingParticipant] = useState(true);
  const [currentTab, setCurrentTab] = useState(TestStatusEnum.ALL);

  const params = useParams();

  const getEventDetail = () => {
    const eventRepository = new EventRepository(new EventService());

    eventRepository.getEventDetail(parseInt(params.id!)).then(res => {
      setEvent(res);
    });
  };

  const getParticipants = () => {
    setIsGettingParticipant(true);
    const eventRepository = new EventRepository(new EventService());

    eventRepository.getParticipants(parseInt(params.id!)).then(res => {
      setParticipants(res);
      setIsGettingParticipant(false);
    });
  };

  const participantList = useMemo(() => {
    switch (currentTab) {
      case TestStatusEnum.ALL:
        return participants;
      case TestStatusEnum.NOT_FOUND:
        return participants.filter(
          item =>
            item.getStatus() === TestStatusEnum.NOT_FOUND && item.getAtkImage(),
        );
      case TestStatusEnum.NOT_UPLOAD:
        return participants.filter(
          item =>
            item.getStatus() === TestStatusEnum.NOT_FOUND &&
            !item.getAtkImage(),
        );
      case TestStatusEnum.POSITIVE:
        return participants.filter(
          item => item.getStatus() === TestStatusEnum.POSITIVE,
        );
      case TestStatusEnum.NEGATIVE:
        return participants.filter(
          item => item.getStatus() === TestStatusEnum.NEGATIVE,
        );
      default:
        return [] as User[];
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participants, currentTab]);

  const tabDataAmount = useMemo(() => {
    const all = participants.length;

    const notFound = participants.filter(
      item =>
        item.getStatus() === TestStatusEnum.NOT_FOUND && item.getAtkImage(),
    ).length;

    const notUpload = participants.filter(
      item =>
        item.getStatus() === TestStatusEnum.NOT_FOUND && !item.getAtkImage(),
    ).length;

    const positive = participants.filter(
      item => item.getStatus() === TestStatusEnum.POSITIVE,
    ).length;

    const negative = participants.filter(
      item => item.getStatus() === TestStatusEnum.NEGATIVE,
    ).length;

    return [all, notFound, notUpload, negative, positive];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [participants]);

  useEffect(() => {
    getEventDetail();
    getParticipants();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  return {
    event,
    participants,
    isGettingParticipant,
    currentTab,
    setCurrentTab,
    participantList,
    tabDataAmount,
    getParticipants,
    getEventDetail,
  };
};
