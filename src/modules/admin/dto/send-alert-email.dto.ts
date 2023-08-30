import BaseDTO from 'common/service/dto/base.dto';

type SendAlertEmailPayload = {
  id: number;
  description: string;
};

export default class SendAlertEmailDTO implements BaseDTO {
  private id: number;
  private description: string;

  constructor(data: SendAlertEmailPayload) {
    this.id = data.id;
    this.description = data.description;
  }

  getBodyJSON = () => {
    return {
      id: this.id,
      description: this.description,
    };
  };
}
