import BaseDTO from 'common/service/dto/base.dto';

type GetAllEventPayloadData = {
  limit?: number;
  page: number;
};

export default class GetAllEventDTO implements BaseDTO {
  private limit?: number;
  private page: number;

  constructor(data: GetAllEventPayloadData) {
    this.limit = data.limit;
    this.page = data.page;
  }

  getBodyJSON = () => {
    return {
      limit: this.limit || 6,
      page: this.page,
    };
  };
}
