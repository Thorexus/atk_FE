import BaseDTO from 'common/service/dto/base.dto';

type UpdateEventPayloadData = {
  id: number;
  name: string;
  floor: number;
  room: string;
  date: string;
  hour: string;
  minute: string;
  description: string;
};

export default class UpdateEventDTO implements BaseDTO {
  private event: UpdateEventPayloadData;

  constructor(data: UpdateEventPayloadData) {
    this.event = data;
  }

  getBodyJSON = () => {
    return {
      id: this.event.id,
      name: this.event.name,
      floor: this.event.floor,
      room: this.event.room,
      date_open: this.event.date,
      hr_open: this.event.hour,
      minute_open: this.event.minute,
      description: this.event.description,
    };
  };
}
