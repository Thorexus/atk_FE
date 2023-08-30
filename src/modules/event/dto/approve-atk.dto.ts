import BaseDTO from 'common/service/dto/base.dto';
import { TestStatusEnum } from 'modules/data-contractor';

type GetAllEventPayloadData = {
  token: string;
  userId: number;
  eventId: number;
  status: TestStatusEnum;
  statusType: 'upload' | 'reupload';
};

export default class ApproveAtkDTO implements BaseDTO {
  private token: string;
  private userId: number;
  private eventId: number;
  private status: TestStatusEnum;
  private statusType: 'upload' | 'reupload';

  constructor(data: GetAllEventPayloadData) {
    this.token = data.token;
    this.userId = data.userId;
    this.eventId = data.eventId;
    this.status = data.status;
    this.statusType = data.statusType;
  }

  getBodyJSON = () => {
    return {
      token: this.token,
      user_id: this.userId,
      event_id: this.eventId,
      status: this.status,
      status_type: this.statusType,
    };
  };
}
