import PassWordField from 'common/base-ui/field/password-field';
import { Form } from 'react-final-form';
import TextField from 'common/base-ui/field/text-field';
import { useViewModel } from './viewmodel';
import PublicRoute from 'common/authentication/public-route';
import Button from 'common/base-ui/buttons/button';

const LoginPage = () => {
  const { handleLogin, loginValidate, isSubmitting } = useViewModel();

  return (
    <PublicRoute>
      <div className="flex h-screen items-center justify-center">
        <div className="w-full rounded-lg bg-white p-4">
          <p className="mb-4 font-bold text-2xl">เข้าสู่ระบบ</p>
          <Form
            onSubmit={handleLogin}
            validate={loginValidate}
            render={({ handleSubmit }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  name="email"
                  label="อีเมล์"
                  placeholder="อีเมล์"
                  className="mb-1"
                />
                <PassWordField
                  name="password"
                  label="รหัสผ่าน"
                  placeholder="รหัสผ่าน"
                />
                <Button
                  type="submit"
                  title=" เข้าสู่ระบบ"
                  onClick={() => null}
                  isLoading={isSubmitting}
                  className="mt-6 w-full"
                />
              </form>
            )}
          />
        </div>
      </div>
    </PublicRoute>
  );
};

export default LoginPage;
