import AuthAxios from 'common/axios/auth-axios';
import {
  AllEventResponse,
  EventResponse,
  UserResponse,
} from '../data-contractor';
import GetAllEventDTO from './dto/get-all-event.dto';
import { getAccessToken } from 'common/axios/token';
import ApproveAtkDTO from './dto/approve-atk.dto';

export default class EventService extends AuthAxios {
  constructor() {
    super({ baseURL: process.env.REACT_APP_API });
  }

  getAllEvent = (data: GetAllEventDTO) => {
    return this.post<AllEventResponse>(
      `/events/info/${getAccessToken()}`,
      data.getBodyJSON(),
    );
  };

  getEventDetail = (id: number) => {
    return this.post<EventResponse>(`/events/detail/${getAccessToken()}`, {
      id,
    });
  };

  removeEvent = (id: number) => {
    return this.post<EventResponse>(`/events/delete/${getAccessToken()}`, {
      id,
    });
  };

  getParticipants = (id: number) => {
    return this.post<UserResponse[]>(
      `/events/getGuestList/${getAccessToken()}`,
      {
        id,
        status: 'ALL',
      },
    );
  };

  approveAtk = (data: ApproveAtkDTO) => {
    return this.post<any>(`/clients/approve/status`, data.getBodyJSON());
  };
}
