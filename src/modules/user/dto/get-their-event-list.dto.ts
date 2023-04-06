import BaseDTO from 'common/service/dto/base.dto';

type GetAllEventPayloadData = {
  token: string;
  limit?: number;
  page: number;
};

export default class GetTheirEventListDTO implements BaseDTO {
  private token: string;
  private limit?: number;
  private page: number;

  constructor(data: GetAllEventPayloadData) {
    this.token = data.token;
    this.limit = data.limit;
    this.page = data.page;
  }

  getBodyJSON = () => {
    return {
      token: this.token,
      limit: this.limit || 100,
      page: this.page,
    };
  };
}
