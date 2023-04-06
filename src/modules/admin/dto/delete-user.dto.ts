import BaseDTO from 'common/service/dto/base.dto';

type DeleteUserData = {
  id: number;
  token: string;
};

export type DeleteUserPayloadData = {
  data: DeleteUserData;
};

class DeleteUserDTO implements BaseDTO {
  private data: DeleteUserData;

  constructor(data: DeleteUserPayloadData) {
    this.data = data.data;
  }

  getBodyJSON = () => {
    return {
      data: this.data,
    };
  };
}

export default DeleteUserDTO;
