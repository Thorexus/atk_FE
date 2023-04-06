import Button from 'common/base-ui/buttons/button';
import { ButtonContainerEnum } from '../../../common/base-ui/buttons/button/index';

const EventDetailPlaceholder = ({
  setCreatePaticipantDrawerOpen,
  hideButton,
}: {
  setCreatePaticipantDrawerOpen: (value: boolean) => void;
  hideButton?: boolean;
}) => {
  return (
    <div>
      <p className="mb-2 font-medium text-sm text-neutral-700">
        ยังไม่มีผู้เข้าร่วมในอีเวนท์นี้
      </p>
      {!hideButton ? (
        <Button
          title="เพิ่มผู้เข้าร่วม"
          container={ButtonContainerEnum.SECONDARY}
          onClick={() => setCreatePaticipantDrawerOpen(true)}
          className="mx-auto"
        />
      ) : null}
    </div>
  );
};

export default EventDetailPlaceholder;
