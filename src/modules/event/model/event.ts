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
  eventStatus: TestStatusEnum;
  dateClose: string;
  hourClose: string;
  minuteClose: string;
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

  getDateClose = () =>
    `${DateTime.fromJSDate(new Date(this.event.dateClose)).toFormat(
      'ccc dd, LLL',
    )}`;

  getTime = () => `${this.event.hour}:${this.event.minute} น.`;

  getTimeClose = () => `${this.event.hourClose}:${this.event.minuteClose} น.`;

  getLocation = () => `ชั้น ${this.event.floor} ห้อง ${this.event.room}`;

  getDescription = () => this.event.description;
  // + this.event.ownerAmount!
  // + this.event.ownerAmount!
  getParticipants = () =>
    this.event.guestAmount! > 0
      ? `${this.event.guestAmount!} คน`
      : 'ยังไม่มีผู้เข้าร่วม';
  // + this.event.ownerAmount!
  getPassCheckParticipants = () =>
    `ผ่านการตรวจ ${this.event.passCheckParticipants} / ${this.event
      .guestAmount!} คน`;

  getUserAtkStatus = () => this.event.userAtkStatus;

  getUserAtkImage = () => this.event.userAtkImage;

  getFloor = () => this.event.floor;

  getRoom = () => this.event.room;

  getHour = () => this.event.hour;

  getMinute = () => this.event.minute;

  getHourClose = () => this.event.hourClose;

  getMinuteClose = () => this.event.minuteClose;

  getUnFormatDate = () => this.event.date;

  getUnFormatDateClose = () => this.event.dateClose;

  getEventStatus = () => this.event.eventStatus;
}
