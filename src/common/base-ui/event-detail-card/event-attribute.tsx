import Icon, { IconSizeEnum } from '../icon-component';
import { AppIconEnum } from '../icon-component/viewmodel';

type EventAttributeProps = { title: string; detail: string; icon: AppIconEnum };

const EventAttribute = ({ title, detail, icon }: EventAttributeProps) => {
  return (
    <div className="flex items-center gap-x-2">
      <div className="grid place-items-center rounded-lg bg-neutral-50 p-2">
        <Icon icon={icon} iconSize={IconSizeEnum.LARGE} />
      </div>
      <div>
        <p className="font-semibold text-xs">{title}</p>
        <p className="text-2xs text-neutral-700">{detail}</p>
      </div>
    </div>
  );
};

export default EventAttribute;
