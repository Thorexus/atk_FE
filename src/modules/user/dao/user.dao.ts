import BaseDAO from 'common/service/dao/base.dao';
import { TestStatusEnum, UserResponse } from '../../data-contractor/index';

export enum UserRoleEnum {
  ADMIN = 'admin',
  OWNER = 'owner',
  GUEST = 'guest',
}

export type UserResponseDAO = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  role: UserRoleEnum;
  image: string;
  phone: string;
  status: TestStatusEnum;
  atkImage?: string;
  userAtkImage?: string;
  birthDate: string;
  reuploadAtkStatus?: TestStatusEnum;
  reuploadAtkImage?: string;
};

export default class UserDAO implements BaseDAO<UserResponseDAO> {
  private response;

  constructor(data: UserResponse) {
    this.response = data;
  }

  getBodyJSON = () => {
    return {
      id: this.response.id,
      name: this.response.name,
      lastname: this.response.lastname,
      email: this.response.email,
      role: this.response.role,
      image: this.response.profile_image,
      phone: this.response.phone,
      status: this.response.status,
      atkImage: this.response.atk_image,
      userAtkImage: this.response.user_atk_image,
      birthDate: this.response.date_of_birth,
      reuploadAtkStatus: this.response.reupload_status,
      reuploadAtkImage: this.response.atk_image_reupload,
    };
  };
}
