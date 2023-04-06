import { DateTime } from 'luxon';
import { TestStatusEnum } from 'modules/data-contractor';

type EventModel = {
  id: number;
  name: string;
  description: string;
  floor: number;
  room: string;
  date: string;
  hour: string;
  minute: string;
  status: TestStatusEnum;
  guestAmount?: number;
  ownerAmount?: number;
  passCheckParticipants?: number;
  userAtkStatus?: TestStatusEnum;
  userAtkImage?: string;
};

export default class Event {
  private event;

  constructor(data: EventModel) {
    this.event = data;
  }

  getId = () => this.event.id;

  getName = () => this.event.name;

  getDate = () =>
    `${DateTime.fromJSDate(new Date(this.event.date)).toFormat('ccc dd, LLL')}`;

  getTime = () => `${this.event.hour}:${this.event.minute} น.`;

  getLocation = () => `ชั้น ${this.event.floor} ห้อง ${this.event.room}`;

  getDescription = () => this.event.description;

  getParticipants = () =>
    this.event.guestAmount! + this.event.ownerAmount! > 0
      ? `${this.event.guestAmount! + this.event.ownerAmount!} คน`
      : 'ยังไม่มีผู้เข้าร่วม';

  getPassCheckParticipants = () =>
    `ผ่านการตรวจ ${this.event.passCheckParticipants} / ${
      this.event.guestAmount! + this.event.ownerAmount!
    } คน`;

  getUserAtkStatus = () => this.event.userAtkStatus;

  getUserAtkImage = () => this.event.userAtkImage;

  getFloor = () => this.event.floor;

  getRoom = () => this.event.room;

  getHour = () => this.event.hour;

  getMinute = () => this.event.minute;

  getUnFormatDate = () => this.event.date;
}
