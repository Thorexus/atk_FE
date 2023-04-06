import { RouteProps, Navigate } from 'react-router-dom';
import { useContextAuthManager } from '.';

type IRouteProps = RouteProps;

const PublicRoute = ({ path, children, ...props }: IRouteProps) => {
  const { isLoggedIn, privatePath } = useContextAuthManager();

  if (!privatePath) {
    throw new Error('You need to provide "privatePath" prop for AuthManger');
  }

  if (isLoggedIn) {
    return <Navigate to={privatePath} />;
  }

  return children as JSX.Element;
};

export default PublicRoute;
