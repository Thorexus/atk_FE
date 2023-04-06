import AdminRoute from 'common/authentication/admin-route';
import PrimaryButton from 'common/base-ui/buttons/button';
import DashboardWrapper from 'common/base-ui/dashboard/wrapper';
import BasePageHeader from 'common/base-ui/layout/ui/base-page-header';
import SectionTitle from 'common/base-ui/layout/ui/section-title';
import ProfileCard from 'common/base-ui/profile-card';
import { ADMIN_ROUTE } from 'common/constants/route-path';
import EventCard from 'common/base-ui/event-card';
import { useNavigate } from 'react-router-dom';
import EventDetailDrawer from 'common/base-ui/drawer/event-detail-drawer';
import { useContextAuthManager } from 'common/authentication';
import { useViewmModel } from './viewmodel';
import { useEventDetail } from './use-event-detail';

const AdminDashboardPage = () => {
  const navigate = useNavigate();

  const { userInfo } = useContextAuthManager();

  const {
    events,
    handleLoadMoreEvent,
    canLoadMoreEvent,
    isLoadingMoreEvent,
    isEventLoading,
    handleLoadEventAfterDelete,
  } = useViewmModel();

  const {
    eventDetailDrawerOpen,
    setEventDetailDrawerOpen,
    handleViewEventDetail,
    isGettingEventDetail,
    eventDetail,
  } = useEventDetail();

  return (
    <AdminRoute>
      <BasePageHeader action="root" />

      <ProfileCard userInfo={userInfo} />

      <div className="mb-2 flex items-center justify-between">
        <SectionTitle title="อีเวนท์ทั้งหมด" className="mb-0" />
        <PrimaryButton
          title="สร้างอีเวนท์"
          onClick={() => navigate(ADMIN_ROUTE.CREATE_EVENT)}
        />
      </div>

      <DashboardWrapper
        className="flex-1"
        useLoadMoreButton={canLoadMoreEvent}
        onLoadMoreClick={handleLoadMoreEvent}
        isLoading={isEventLoading}
        isLoadingMore={isLoadingMoreEvent}>
        {isEventLoading ? (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <EventCard.Loading key={index} />
            ))}
          </>
        ) : (
          events.map(item => (
            <EventCard
              key={item.getId()}
              event={item}
              onClick={() => handleViewEventDetail(item.getId())}
              role="admin"
            />
          ))
        )}

        {isLoadingMoreEvent ? (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <EventCard.Loading key={index} />
            ))}
          </>
        ) : null}
      </DashboardWrapper>

      <EventDetailDrawer
        isOpen={eventDetailDrawerOpen}
        setIsOpen={setEventDetailDrawerOpen}
        role="admin"
        isLoading={isGettingEventDetail}
        event={eventDetail}
        fetchParentData={handleLoadEventAfterDelete}
      />
    </AdminRoute>
  );
};

export default AdminDashboardPage;
