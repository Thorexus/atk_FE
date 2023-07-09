import BaseDAO from 'common/service/dao/base.dao';
import { EventResponse, TestStatusEnum } from 'modules/data-contractor';

export type EventDetailResponseDAO = {
  id: number;
  name: string;
  description: string;
  date: string;
  floor: number;
  room: string;
  hour: string;
  minute: string;
  status: TestStatusEnum;
  guestAmount?: number;
  ownerAmount?: number;
  passCheckParticipants?: number;
  userAtkImage?: string;
  userAtkStatus?: TestStatusEnum;
};

export default class EventDetailDAO implements BaseDAO<EventDetailResponseDAO> {
  private response;

  constructor(data: EventResponse) {
    this.response = data;
  }

  getBodyJSON = () => ({
    id: this.response.id,
    name: this.response.name,
    description: this.response.description,
    date: this.response.date_open,
    floor: this.response.floor,
    room: this.response.room,
    hour: this.response.hr_open,
    minute: this.response.minute_open,
    status: this.response.event_status,
    guestAmount: this.response.guest_amount,
    ownerAmount: this.response.owner_amount,
    passCheckParticipants: this.response.guest_pass_check,
    userAtkImage: this.response.user_atk_image,
    userAtkStatus: this.response.user_atk_status,
  });
}
