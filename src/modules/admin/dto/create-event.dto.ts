import BaseDTO from 'common/service/dto/base.dto';

type CreateEventPayloadData = {
  name: string;
  floor: number;
  room: string;
  date: string;
  hour: string;
  minute: string;
  description: string;
  dateClose: string;
  hrClose: string;
  minuteClose: string;
};

export default class CreateEventDTO implements BaseDTO {
  private event: CreateEventPayloadData;

  constructor(data: CreateEventPayloadData) {
    this.event = data;
  }

  getBodyJSON = () => {
    return {
      name: this.event.name,
      floor: this.event.floor,
      room: this.event.room,
      date_open: this.event.date,
      hr_open: this.event.hour,
      minute_open: this.event.minute,
      description: this.event.description,
      date_close: this.event.dateClose,
      hr_close: this.event.hrClose,
      minute_close: this.event.minuteClose,
    };
  };
}
