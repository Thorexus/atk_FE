import AuthAxios from 'common/axios/auth-axios';
import GetTheirEventListDTO from './dto/get-their-event-list.dto';
import { AllEventResponse, GetUserInfoResponse } from 'modules/data-contractor';

export default class UserService extends AuthAxios {
  constructor() {
    super({ baseURL: process.env.REACT_APP_API });
  }

  getUserInfo = (data: string) =>
    this.get<GetUserInfoResponse>(`/clients/info/${data}`);

  GetTheirEventList = (data: GetTheirEventListDTO) => {
    return this.post<AllEventResponse>(
      `/clients/event/list`,
      data.getBodyJSON(),
    );
  };

  uploadAtkImage = (data: FormData) => {
    return this.post('uploadfile/image/atk', data);
  };
}
