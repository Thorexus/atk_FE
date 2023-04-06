import GetAllEventDTO from './dto/get-all-event.dto';
import GetAllEventDAO from './dao/get-all-event.dao';
import EventService from './event.service';
import Event from './model/event';
import EventDetailDAO from './dao/event-detail.dao';
import User from '../user/model/user';
import UserDAO from '../user/dao/user.dao';
import ApproveAtkDTO from './dto/approve-atk.dto';

export default class EventRepository {
  private eventService: EventService;

  constructor(eventService: EventService) {
    this.eventService = eventService;
  }

  getAllEvent = async (data: GetAllEventDTO) => {
    return await this.eventService.getAllEvent(data).then(res => {
      const eventResponse = new GetAllEventDAO({
        ...res.data,
      }).getBodyJSON();

      return {
        totalPage: eventResponse.totalPage,
        data: eventResponse.data.map(item => new Event(item as unknown as any)),
      };
    });
  };

  getEventDetail = async (id: number) => {
    return await this.eventService.getEventDetail(id).then(res => {
      const eventResponse = new EventDetailDAO(res.data);

      return new Event({
        ...eventResponse.getBodyJSON(),
      });
    });
  };

  removeEvent = async (id: number) => {
    return await this.eventService.removeEvent(id).then(res => {
      return res.data ? true : false;
    });
  };

  getParticipants = async (id: number) => {
    return await this.eventService.getParticipants(id).then(res => {
      const userList = res.data.map(item => new UserDAO({ ...item }));

      return userList.map(item => new User(item.getBodyJSON()));
    });
  };

  approveAtk = async (data: ApproveAtkDTO) => {
    return await this.eventService.approveAtk(data).then(res => {
      return res.data ? true : false;
    });
  };
}
