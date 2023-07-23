import EventAttribute from './event-attribute';
import { AppIconEnum } from '../icon-component/viewmodel';
import Event from 'modules/event/model/event';
import isEmpty from 'lodash/isEmpty';
import EventDetailDrawer from '../drawer/event-detail-drawer';
import StatusBadge from '../status-badge';

const EventDetailCard = ({
  event,
  useActionButton,
  asStaticPreview,
}: {
  event: Event;
  useActionButton?: boolean;
  asStaticPreview?: boolean;
}) => {
  return (
    <div className="drop-shadow-large mb-6 rounded-lg bg-white p-4">
      {isEmpty(event) ? (
        <EventDetailDrawer.Loading
          useActionButton={useActionButton}
          asStaticPreview={asStaticPreview}
        />
      ) : (
        <>
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div className="flex gap-x-1">
                <p className="font-semibold text-primary-500">
                  {event.getDate()}
                </p>
                <p className="font-semibold text-primary-500">
                  {event.getTime()}
                </p>
              </div>
              <StatusBadge status={event.getEventStatus()} />
            </div>

            <p className="h-[64px] font-semibold text-xl line-clamp-2">
              {event.getName()}
            </p>
            <p className="mb-1 h-[50px] font-semibold text-neutral-800 line-clamp-2">
              {event.getDescription()}
            </p>

            <p className="text-xs text-neutral-700">{event.getLocation()}</p>
          </div>
          <div className="flex flex-col gap-y-2">
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
        </>
      )}
    </div>
  );
};

export default EventDetailCard;
