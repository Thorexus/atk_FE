import DashboardWrapper from 'common/base-ui/dashboard/wrapper';
import BasePageHeader from 'common/base-ui/layout/ui/base-page-header';
import SectionTitle from 'common/base-ui/layout/ui/section-title';
import EventDetailPlaceholder from 'pages/admin/event-detail-page/event-detail-placeholder';
import { participantDashboardTabList } from 'common/constants/participant-dashboaord-tab-list';
import OwnerRoute from 'common/authentication/owner-route';
import { OWNER_ROUTE } from 'common/constants/route-path';
import { useNavigate } from 'react-router-dom';
import { useViewModel } from './viewmode';
import ParticipantCard from 'common/base-ui/participant-card';
import EventDetailCard from 'common/base-ui/event-detail-card';
import { cx } from '@emotion/css';
import SendAlertEmailButton from 'common/base-ui/buttons/send-alert-email-button';
import { isEmpty } from 'lodash';

const OwnerEventDetailPage = () => {
  const {
    event,
    isGettingParticipant,
    currentTab,
    setCurrentTab,
    participantList,
    tabDataAmount,
    getParticipants,
    getEventDetail,
  } = useViewModel();

  const navigate = useNavigate();

  return (
    <OwnerRoute>
      <BasePageHeader
        action="child"
        onBack={() => navigate(OWNER_ROUTE.DASHBOARD)}
      />

      <EventDetailCard event={event} asStaticPreview />

      {!isEmpty(event) ? (
        <SendAlertEmailButton eventId={event.getId()} />
      ) : null}

      <SectionTitle title="รายชื่อผู้เข้าร่วม" />

      <DashboardWrapper
        tabList={participantDashboardTabList}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentTabDataAmount={tabDataAmount}
        className="flex flex-1 flex-col"
        childContainerClassName={cx(
          participantList.length === 0 && 'grid place-items-center',
          'flex-1',
        )}>
        {isGettingParticipant ? (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <ParticipantCard.Loading key={index} />
            ))}
          </>
        ) : (
          <>
            {participantList.length > 0 ? (
              participantList.map(item => (
                <ParticipantCard
                  key={item.getId()}
                  user={item}
                  event={event}
                  fetchParentData={() => {
                    getEventDetail();
                    getParticipants();
                  }}
                />
              ))
            ) : (
              <>
                {participantList.length === 0 ? (
                  <p className="text-neutral-600">ไม่มีข้อมูลในสถานะนี้</p>
                ) : (
                  <EventDetailPlaceholder
                    setCreatePaticipantDrawerOpen={() => false}
                    hideButton
                  />
                )}
              </>
            )}
          </>
        )}
      </DashboardWrapper>
    </OwnerRoute>
  );
};

export default OwnerEventDetailPage;
