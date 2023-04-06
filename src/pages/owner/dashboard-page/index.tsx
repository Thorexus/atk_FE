import OwnerRoute from '../../../common/authentication/owner-route';
import BasePageHeader from 'common/base-ui/layout/ui/base-page-header';
import ProfileCard from 'common/base-ui/profile-card';
import SectionTitle from 'common/base-ui/layout/ui/section-title';
import DashboardWrapper from 'common/base-ui/dashboard/wrapper';
import { useContextAuthManager } from 'common/authentication';
import { useViewModel } from './viewmodel';
import EventCard from 'common/base-ui/event-card';
import EventDetailDrawer from 'common/base-ui/drawer/event-detail-drawer';

const OwnerDashboardPage = () => {
  const {
    isEventLoading,
    handleViewEventDetail,
    events,
    eventDetailDrawerOpen,
    setEventDetailDrawerOpen,
    eventDetail,
    isGettingEventDetail,
    handleLoadEventAfterDelete,
  } = useViewModel();
  const { userInfo } = useContextAuthManager();

  return (
    <OwnerRoute>
      <BasePageHeader action="root" />

      <ProfileCard userInfo={userInfo} />

      <SectionTitle title="อีเวนท์ของคุณ" className="mb-0" />

      <DashboardWrapper className="flex-1" isLoading={isEventLoading}>
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
            />
          ))
        )}
      </DashboardWrapper>

      <EventDetailDrawer
        isOpen={eventDetailDrawerOpen}
        setIsOpen={setEventDetailDrawerOpen}
        role="owner"
        isLoading={isGettingEventDetail}
        event={eventDetail}
        fetchParentData={handleLoadEventAfterDelete}
      />
    </OwnerRoute>
  );
};

export default OwnerDashboardPage;
