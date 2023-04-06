import PublicRoute from 'common/authentication/public-route';
import Button from 'common/base-ui/buttons/button';
import { PUBLIC_ROUTE } from 'common/constants/route-path';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <PublicRoute>
      <p>Not found !</p>
      <Button
        title=" Back to login"
        onClick={() => navigate(PUBLIC_ROUTE.LOGIN)}
      />
    </PublicRoute>
  );
};

export default NotFoundPage;
