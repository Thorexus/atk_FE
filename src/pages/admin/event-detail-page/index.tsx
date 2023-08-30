import AdminRoute from 'common/authentication/admin-route';
import DashboardWrapper from 'common/base-ui/dashboard/wrapper';
import EventDetailCard from 'common/base-ui/event-detail-card';
import BasePageHeader from 'common/base-ui/layout/ui/base-page-header';
import SectionTitle from 'common/base-ui/layout/ui/section-title';
import EventDetailPlaceholder from './event-detail-placeholder';
import CreatePaticipantDrawer from 'common/base-ui/drawer/create-paticipant-drawer';
import { useState } from 'react';
import { useViewModel } from './viewmodel';
import { participantDashboardTabList } from 'common/constants/participant-dashboaord-tab-list';
import Button, { ButtonContainerEnum } from 'common/base-ui/buttons/button';
import { VariantEnum } from 'common/types/component';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTE } from 'common/constants/route-path';
import ParticipantCard from 'common/base-ui/participant-card';
import { cx } from '@emotion/css';
import SendAlertEmailButton from 'common/base-ui/buttons/send-alert-email-button';
import { isEmpty } from 'lodash';

const AdminEventDetailPage = () => {
  const [createPaticipantDrawerOpen, setCreatePaticipantDrawerOpen] =
    useState(false);

  const {
    event,
    isGettingParticipant,
    currentTab,
    setCurrentTab,
    participantList,
    tabDataAmount,
    getParticipants,
    participants,
    getEventDetail,
  } = useViewModel();

  const navigate = useNavigate();

  return (
    <AdminRoute>
      <BasePageHeader
        action="child"
        onBack={() => navigate(ADMIN_ROUTE.DASHBOARD)}
      />

      <EventDetailCard event={event} asStaticPreview />

      {!isEmpty(event) ? (
        <SendAlertEmailButton eventId={event.getId()} />
      ) : null}

      <SectionTitle
        title="รายชื่อผู้เข้าร่วม"
        actionButton={
          participants.length > 0 ? (
            <Button
              title="แก้ไขผู้เข้าร่วม"
              variant={VariantEnum.WARNING}
              container={ButtonContainerEnum.SECONDARY}
              onClick={() => setCreatePaticipantDrawerOpen(true)}
            />
          ) : null
        }
      />

      <DashboardWrapper
        tabList={participantDashboardTabList}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentTabDataAmount={tabDataAmount}
        className="flex flex-1 flex-col"
        childContainerClassName={cx(
          participantList.length === 0 && 'grid place-items-center',
          'flex-1 ',
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
                  useActionButton
                />
              ))
            ) : (
              <>
                {participants.length === 0 ? (
                  <EventDetailPlaceholder
                    setCreatePaticipantDrawerOpen={
                      setCreatePaticipantDrawerOpen
                    }
                  />
                ) : (
                  <>
                    {participantList.length === 0 ? (
                      <p className="text-neutral-600">ไม่มีข้อมูลในสถานะนี้</p>
                    ) : null}
                  </>
                )}
              </>
            )}
          </>
        )}
      </DashboardWrapper>

      <CreatePaticipantDrawer
        isOpen={createPaticipantDrawerOpen}
        setIsOpen={setCreatePaticipantDrawerOpen}
        event={event}
        fetchParentData={getParticipants}
      />
    </AdminRoute>
  );
};

export default AdminEventDetailPage;
