import GetAllEventDAO from '../event/dao/get-all-event.dao';
import Event from '../event/model/event';
import UserDAO from './dao/user.dao';
import GetTheirEventListDTO from './dto/get-their-event-list.dto';
import User from './model/user';
import UserService from './user.service';

export default class UserRepository {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  getUserInfo = async (data: string) => {
    return await this.userService.getUserInfo(data).then(res => {
      const user = new UserDAO({ ...res.data.user });

      return new User({ ...user.getBodyJSON() });
    });
  };

  GetTheirEventList = async (data: GetTheirEventListDTO) => {
    return await this.userService.GetTheirEventList(data).then(res => {
      const eventResponse = new GetAllEventDAO({
        ...res.data,
      }).getBodyJSON();

      return eventResponse.data.map(item => new Event(item));
    });
  };

  uploadAtkImage = (data: FormData) => {
    return this.userService.uploadAtkImage(data);
  };
}
