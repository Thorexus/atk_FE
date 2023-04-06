import BaseDAO from 'common/service/dao/base.dao';
import { LoginResponse } from 'modules/data-contractor';
import { UserRoleEnum } from 'modules/user/dao/user.dao';

export type LoginResponseDAO = {
  token: string;
  user: {
    id: number;
    name: string;
    lastname: string;
    email: string;
    role: UserRoleEnum;
    image: string;
    phone: string;
  };
};

export default class LoginDAO implements BaseDAO<LoginResponseDAO> {
  private response;

  constructor(data: LoginResponse) {
    this.response = data;
  }

  getBodyJSON = () => ({
    token: this.response.token,
    user: {
      ...this.response.user,
      image: this.response.user.profile_image,
    },
  });
}
