import { TestStatusEnum } from 'modules/data-contractor';
import { UserRoleEnum } from '../dao/user.dao';

export type UserModel = {
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
  userAtkStatus?: TestStatusEnum;
  birthDate: string;
};

export default class User {
  private user: UserModel;

  constructor(data: UserModel) {
    this.user = data;
  }

  getId = () => this.user.id;

  getName = () => this.user.name;

  getLastName = () => this.user.lastname;

  getFullName = () => {
    if (this.user.name && this.user.lastname) {
      return `${this.user.name} ${this.user.lastname}`;
    } else if (this.user.name && !this.user.lastname) {
      return this.user.name;
    } else if (!this.user.name && this.user.lastname) {
      return this.user.lastname;
    } else {
      return 'ไม่พบข้อมูล';
    }
  };

  getEmail = () => this.user.email;

  getDisplayEmail = () => {
    return this.user.email || 'ไม่พบข้อมูล';
  };

  getRole = () => this.user.role;

  getRoleToString = () => {
    switch (this.user.role) {
      case UserRoleEnum.ADMIN:
        return 'ผู้ดูแลระบบ';
      case UserRoleEnum.OWNER:
        return 'ผู้จัดงาน';
      case UserRoleEnum.GUEST:
        return 'ผู้เข้าร่วม';
      default:
        return 'ไม่พบข้อมูล';
    }
  };

  getImage = () => this.user.image;

  getPhoneNumber = () => this.user.phone;

  getStatus = () => this.user.status;

  getAtkImage = () => this.user.atkImage;

  getUserAtkImage = () => this.user.userAtkImage;

  getUserAtkStatus = () => this.user.userAtkStatus;

  getBirthDate = () => this.user.birthDate;
}
