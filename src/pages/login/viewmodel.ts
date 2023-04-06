import useValidationSchema from 'common/libs/validation';
import * as yup from 'yup';
import { useContextAuthManager } from 'common/authentication';
import { useState } from 'react';
import AuthRepository from 'modules/auth/auth.repository';
import AuthService from 'modules/auth/auth.service';
import LoginDTO from 'modules/auth/dto/login.dto';
import {
  getAccessToken,
  removeToken,
  saveAccessToken,
} from '../../common/axios/token';
import { toaster } from 'common/base-ui/toast/toaster';
import User, { UserModel } from 'modules/user/model/user';

export const useViewModel = () => {
  const { setIsLoggedIn, setUserInfo } = useContextAuthManager();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loginValidationSchema = yup.object({
    email: yup
      .string()
      // .email('รูปแบบของอีเมล์ไม่ถูกต้อง')
      .required('กรุณากรอกอีเมล์'),
    password: yup
      .string()
      .min(8, 'รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัว')
      .required('กรุณากรอกรหัสผ่าน'),
  });

  const loginValidate = useValidationSchema(loginValidationSchema);

  const handleLogin = async (values: { [key: string]: string }) => {
    setIsSubmitting(true);
    const authRepository = new AuthRepository(new AuthService());

    const payloadData = {
      email: values.email,
      password: values.password,
    };
    authRepository
      .login(new LoginDTO(payloadData))
      .then(res => {
        if (getAccessToken()) {
          removeToken();
        }

        saveAccessToken(res.token);
        localStorage.setItem('userId', res.user.id.toString());
        setUserInfo(new User(res.user as unknown as UserModel));
        setIsLoggedIn(true);

        toaster('success', 'เข้าสู่ระบบสำเร็จ', 'ยินดีต้องรับ');
      })
      .catch(() => {
        setIsSubmitting(false);

        toaster('error', 'เกิดข้อผิดพลาด', 'กรุณาลองใหม่อีกครั้ง');
      });
  };

  return { handleLogin, loginValidate, isSubmitting };
};
