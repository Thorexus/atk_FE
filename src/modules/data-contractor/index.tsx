import { UserRoleEnum } from 'modules/user/dao/user.dao';

export enum TestStatusEnum {
  ALL = 'ALL',
  NOT_UPLOAD = 'not_upload',
  NOT_FOUND = 'result not found',
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
}

export type LoginResponse = {
  token: string;
  user: UserResponse;
};

export interface UserResponse {
  id: number;
  name: string;
  lastname: string;
  email: string;
  role: UserRoleEnum;
  profile_image: string;
  phone: string;
  status: TestStatusEnum;
  atk_image?: string;
  user_atk_image?: string;
  user_atk_status?: TestStatusEnum;
  date_of_birth: string;
  reupload_status?: TestStatusEnum;
  atk_image_reupload?: string;
}

export interface GetUserInfoResponse {
  status: string;
  user: UserResponse;
}

export interface EventResponse {
  id: number;
  date_open: string;
  hr_open: string;
  minute_open: string;
  name: string;
  floor: number;
  room: string;
  event_status: TestStatusEnum;
  description: string;
  guest_amount?: number;
  owner_amount?: number;
  guest_pass_check?: number;
  user_atk_status?: TestStatusEnum;
  user_atk_image?: string;
  date_close: string;
  hr_close: string;
  minute_close: string;
  // atk_image?: string;
  reupload_status?: TestStatusEnum;
  atk_image_reupload?: string;
}

export interface AllEventResponse {
  totalPage: number;
  data: EventResponse[];
}
