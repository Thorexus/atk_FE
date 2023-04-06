import BaseDTO from 'common/service/dto/base.dto';

export type UpdateUesrPayloadData = {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  birthDate: string;
  token: string;
};

class UpdateUserDTO implements BaseDTO {
  private user: UpdateUesrPayloadData;

  constructor(data: UpdateUesrPayloadData) {
    this.user = data;
  }

  getBodyJSON = () => {
    return {
      id: this.user.id,
      name: this.user.name,
      lastname: this.user.lastname,
      email: this.user.email,
      phone: this.user.phone,
      active: true,
      date_of_birth: this.user.birthDate,
      token: this.user.token,
    };
  };
}

export default UpdateUserDTO;
