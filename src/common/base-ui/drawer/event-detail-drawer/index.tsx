import EventAttribute from 'common/base-ui/event-detail-card/event-attribute';
import BottomDrawer, { BaseBottomDrawerProps } from '../bottom-drawer';
import { AppIconEnum } from 'common/base-ui/icon-component/viewmodel';
import ConfirmationDrawerContainer from '../confirmation-drawer-container';
import Event from 'modules/event/model/event';
import EventDetailDrawerLoading from './loading';
import isEmpty from 'lodash/isEmpty';
import { detailModalType, useViewModel } from './viewmodel';
import UploadAtkContainer from './upload-atk-container';
import AdminActionButton from './upload-atk-container/action-buttons/admin-action-button';
import OwnerActionButton from './upload-atk-container/action-buttons/ower-action-button';
import UserActionButton from './upload-atk-container/action-buttons/user-action-button';
import StatusBadge from 'common/base-ui/status-badge';
import UpdateAtkContainer from './update-atk-container';

type EventDetailDrawerProps = BaseBottomDrawerProps & {
  initViewType?: detailModalType;
  role?: 'user' | 'owner' | 'admin';
  isLoading?: boolean;
  event: Event;
  fetchParentData?: () => void;
  asStaticPreview?: boolean;
};

const EventDetailDrawer = ({
  isOpen,
  setIsOpen,
  initViewType = 'detail',
  role,
  isLoading,
  event,
  fetchParentData,
  asStaticPreview = false,
}: EventDetailDrawerProps) => {
  const { viewType, setViewType, handleRemoveEvent, isRemovingEvent } =
    useViewModel({ initViewType, fetchParentData, isOpen, setIsOpen });

  return (
    <BottomDrawer isOpen={isOpen} setIsOpen={setIsOpen}>
      {viewType === 'detail' && (
        <div>
          {isLoading ? (
            <EventDetailDrawerLoading
              useActionButton={role === 'admin'}
              asStaticPreview={asStaticPreview}
            />
          ) : null}
          {!isLoading && !isEmpty(event) ? (
            <>
              <>{console.log('event.getTime()', event.getTime())}</>
              <div className="mb-4">
                <p className="font-semibold text-primary-500 line-clamp-1">
                  {`${event.getDate()} ${event.getTime()} ถึง ${event.getDateClose()} ${event.getTimeClose()}`}
                </p>

                <p className="h-[64px] font-semibold text-xl text-neutral-900 line-clamp-2">
                  {event.getName()}
                </p>
                <p className="h-[50px] font-semibold text-neutral-800 line-clamp-2">
                  {event.getDescription()}
                </p>
                <div className="flex justify-between gap-x-2">
                  <p className="mt-1 text-xs text-neutral-700 line-clamp-1">
                    {event.getLocation()}
                  </p>
                  <StatusBadge status={event.getEventStatus()} />
                </div>
              </div>
              <div className="mb-6 flex flex-col gap-y-2">
                <EventAttribute
                  title="จำนวนผู้เข้าร่วม"
                  detail={event.getParticipants()}
                  icon={AppIconEnum.USER_ALT}
                />
                <EventAttribute
                  title="สถานะ"
                  detail={event.getPassCheckParticipants()}
                  icon={AppIconEnum.CLIPBOARD_NOTES}
                />
              </div>
              {role === 'admin' ? (
                <AdminActionButton setViewType={setViewType} event={event} />
              ) : role === 'owner' ? (
                <OwnerActionButton event={event} />
              ) : (
                <UserActionButton setViewType={setViewType} event={event} />
              )}
            </>
          ) : null}
        </div>
      )}

      {viewType === 'remove' && (
        <ConfirmationDrawerContainer
          title="ยืนยันการลบอีเวนท์"
          message={`แน่ใจว่าต้องการลบอีเวนท์? \n เมือยืนยัน อีเวนท์จะถูกลบออกจากระบบ`}
          confirmButtonTitle="ยืนยัน"
          confirmButtonClick={() =>
            handleRemoveEvent ? handleRemoveEvent(event.getId()) : null
          }
          cancelButtonTitle="ยกเลิก"
          cancelButtonClick={() => setViewType('detail')}
          isLoading={isRemovingEvent}
        />
      )}

      {viewType === 'atk-upload' && (
        <UploadAtkContainer
          setViewType={setViewType}
          event={event}
          setIsOpen={setIsOpen}
        />
      )}

      {viewType === 'update-atk-upload' && (
        <UpdateAtkContainer
          setViewType={setViewType}
          event={event}
          setIsOpen={setIsOpen}
        />
      )}
    </BottomDrawer>
  );
};

EventDetailDrawer.Loading = ({
  useActionButton,
  asStaticPreview,
}: {
  useActionButton?: boolean;
  asStaticPreview?: boolean;
}) => (
  <EventDetailDrawerLoading
    useActionButton={useActionButton}
    asStaticPreview={asStaticPreview}
  />
);

export default EventDetailDrawer;
