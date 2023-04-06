import { useContextAuthManager } from 'common/authentication';
import GuestRoute from 'common/authentication/guest-route';
import DashboardWrapper from 'common/base-ui/dashboard/wrapper';
import BasePageHeader from 'common/base-ui/layout/ui/base-page-header';
import SectionTitle from 'common/base-ui/layout/ui/section-title';
import ProfileCard from 'common/base-ui/profile-card';
import { useViewModel } from './viewmodel';
import EventCard from 'common/base-ui/event-card';
import EventDetailDrawer from 'common/base-ui/drawer/event-detail-drawer';

const GuestDashboardPage = () => {
  const { userInfo } = useContextAuthManager();

  const {
    events,
    isEventLoading,
    eventDetailDrawerOpen,
    setEventDetailDrawerOpen,
    isGettingEventDetail,
    eventDetail,
    handleViewEventDetail,
  } = useViewModel();

  return (
    <GuestRoute>
      <BasePageHeader action="root" />

      <ProfileCard userInfo={userInfo} />

      <SectionTitle title="อีเวนท์ของคุณ" />

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
        role="user"
        isLoading={isGettingEventDetail}
        event={eventDetail}
        asStaticPreview
      />
    </GuestRoute>
  );
};

export default GuestDashboardPage;
