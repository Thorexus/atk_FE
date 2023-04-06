import { Navigate, RouteProps } from 'react-router-dom';
import { useContextAuthManager } from '.';
import { UserRoleEnum } from 'modules/user/dao/user.dao';

type IRouteProps = RouteProps;

const OwnerRoute = ({ path, children, ...props }: IRouteProps) => {
  const { isLoggedIn, publicPath, userInfo } = useContextAuthManager();

  if (!publicPath) {
    throw new Error('You need to provide "publicPath" prop for AuthManager');
  }

  if (!isLoggedIn || userInfo.getRole() !== UserRoleEnum.OWNER) {
    return <Navigate to={publicPath} />;
  }

  return children as JSX.Element;
};

export default OwnerRoute;
