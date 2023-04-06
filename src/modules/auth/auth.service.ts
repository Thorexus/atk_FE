import AuthAxios from 'common/axios/auth-axios';
import LoginDTO from './dto/login.dto';
import { LoginResponse } from '../data-contractor';

export default class AuthService extends AuthAxios {
  constructor() {
    super({ baseURL: process.env.REACT_APP_API });
  }

  login = (data: LoginDTO) => {
    return this.post<LoginResponse>('/clients/login', data.getBodyJSON());
  };
}
