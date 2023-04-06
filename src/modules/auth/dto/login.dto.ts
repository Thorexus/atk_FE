import BaseDTO from 'common/service/dto/base.dto';

export type LoginPayloadData = {
  email: string;
  password: string;
};

class LoginDTO implements BaseDTO {
  email: string;
  password: string;

  constructor(data: LoginPayloadData) {
    this.email = data.email;
    this.password = data.password;
  }

  getBodyJSON = () => {
    return {
      email: this.email,
      password: this.password,
    };
  };
}

export default LoginDTO;
