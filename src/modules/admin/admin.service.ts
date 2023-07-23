import AuthAxios from 'common/axios/auth-axios';
import { getAccessToken } from 'common/axios/token';
import CreateEventDTO from './dto/create-event.dto';
import UpdateEventDTO from './dto/update-event-dto';
import UpdateUserDTO from './dto/update-user.dto';
import SendAlertEmailDTO from './dto/send-alert-email.dto';

class AdminService extends AuthAxios {
  constructor() {
    super({ baseURL: process.env.REACT_APP_API });
  }

  createEvent = (data: CreateEventDTO) => {
    return this.post<CreateEventDTO>(
      `/events/create/token=${getAccessToken()}`,
      data.getBodyJSON(),
    );
  };

  updateEvent = (data: UpdateEventDTO) => {
    return this.post<UpdateEventDTO>(
      `/events/edit/token=${getAccessToken()}`,
      data.getBodyJSON(),
    );
  };

  createParticipant = (data: FormData) => {
    return this.post('/uploadfile/excel', data);
  };

  deleteUser = ({ id, token }: { id: number; token: string }) => {
    return this.post('/clients/user/delete', { id, token });
  };

  uploadProfileImage = (data: FormData) => {
    return this.post('/uploadfile/image/profile', data);
  };

  updateUser = (data: UpdateUserDTO) => {
    return this.post('/clients/user/update', data.getBodyJSON());
  };

  sendAlertEmail = (data: SendAlertEmailDTO) => {
    return this.post(`/events/edit/${getAccessToken()}`, data.getBodyJSON());
  };
}

export default AdminService;
