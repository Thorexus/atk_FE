import Event from 'modules/event/model/event';
import EventCardLoading from './loading';
import Icon from '../icon-component';
import { AppIconEnum } from '../icon-component/viewmodel';
import { useNavigate } from 'react-router-dom';
import { ADMIN_SUB_ROUTE } from 'common/constants/route-path';

type EventCardProps = {
  event: Event;
  onClick: () => void;
  role?: 'admin' | 'owner' | 'guest';
};

const EventCard = ({ event, onClick, role = 'guest' }: EventCardProps) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={onClick}
      className="relative rounded-lg border border-neutral-200 p-3">
      <div className="flex gap-x-1">
        <p className="font-semibold text-xs text-primary-500">
          {event.getDate()}
        </p>
        <p className="font-semibold text-xs text-primary-500">
          {event.getTime()}
        </p>
      </div>

      <p className="font-semibold line-clamp-1">{event.getName()}</p>
      <p className="text-neuteal-800 mb-1 text-xs line-clamp-2">
        {event.getDescription()}
      </p>
      <p className="text-xs text-neutral-700">{event.getLocation()}</p>

      {role === 'admin' ? (
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            navigate(`${ADMIN_SUB_ROUTE.UPDATE_EVENT}/${event.getId()}`);
          }}
          className="absolute top-2 right-4">
          <Icon icon={AppIconEnum.PEN} className="text-warning-500" />
        </button>
      ) : null}
    </div>
  );
};

EventCard.Loading = () => <EventCardLoading />;

export default EventCard;
