import { Route, Routes } from 'react-router-dom';
import NotFoundPage from '../pages/not-found';
import {
  ADMIN_ROUTE,
  GUEST_ROUTE,
  PUBLIC_ROUTE,
} from 'common/constants/route-path';
import LoginPage from 'pages/login';
import AdminDashboardPage from 'pages/admin/dashboard-page';
import AdminCreateEventPage from 'pages/admin/create-event-page';
import AdminEventDetailPage from 'pages/admin/event-detail-page';
import { OWNER_ROUTE } from '../common/constants/route-path';
import OwnerDashboardPage from 'pages/owner/dashboard-page';
import OwnerEventDetailPage from 'pages/owner/event-detail-page';
import GuestDashboardPage from 'pages/guest/dashboard-page';
import AdminUpdateEventPage from 'pages/admin/update-event-page';
import AdminUpdateUserPage from 'pages/admin/update-user-page';

const AppRouter = () => {
  return (
    <Routes>
      <Route path={PUBLIC_ROUTE.LOGIN} element={<LoginPage />} />

      <Route path={GUEST_ROUTE.DASHBOARD} element={<GuestDashboardPage />} />

      <Route path={OWNER_ROUTE.DASHBOARD} element={<OwnerDashboardPage />} />
      <Route
        path={OWNER_ROUTE.EVENT_DETAIL}
        element={<OwnerEventDetailPage />}
      />

      <Route path={ADMIN_ROUTE.DASHBOARD} element={<AdminDashboardPage />} />
      <Route
        path={ADMIN_ROUTE.CREATE_EVENT}
        element={<AdminCreateEventPage />}
      />
      <Route
        path={ADMIN_ROUTE.UPDATE_EVENT}
        element={<AdminUpdateEventPage />}
      />
      <Route
        path={ADMIN_ROUTE.EVENT_DETAIL}
        element={<AdminEventDetailPage />}
      />
      <Route path={ADMIN_ROUTE.UPDATE_USER} element={<AdminUpdateUserPage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
