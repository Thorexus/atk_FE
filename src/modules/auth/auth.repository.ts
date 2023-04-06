import AuthService from './auth.service';
import LoginDAO from './dao/login.dao';
import LoginDTO from './dto/login.dto';

export default class AuthRepository {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  login = async (data: LoginDTO) => {
    return await this.authService.login(data).then(res => {
      return new LoginDAO({
        token: res.data.token,
        user: res.data.user,
      }).getBodyJSON();
    });
  };
}
