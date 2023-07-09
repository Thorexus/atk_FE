import Button, { ButtonContainerEnum } from 'common/base-ui/buttons/button';
import Event from 'modules/event/model/event';
import { VariantEnum } from 'common/types/component';
import { detailModalType } from '../../viewmodel';
import { TestStatusEnum } from 'modules/data-contractor';

type UserActionButtonProps = {
  setViewType: (value: detailModalType) => void;
  event: Event;
};

const UserActionButton = ({ setViewType, event }: UserActionButtonProps) => {
  console.log('event', event.getUserAtkStatus(), event?.getUserAtkImage());
  return (
    <>
      {event.getUserAtkStatus() === TestStatusEnum.NOT_FOUND &&
        !event?.getUserAtkImage() && (
          <Button
            title="อัพโหลดผลตรวจ"
            onClick={() => setViewType('atk-upload')}
            className="w-full"
          />
        )}

      {event.getUserAtkStatus() === TestStatusEnum.NOT_FOUND &&
        event?.getUserAtkImage() && (
          <Button
            title="กำลังตรวจสอบ"
            variant={VariantEnum.WARNING}
            container={ButtonContainerEnum.SECONDARY}
            onClick={() => null}
            className="w-full"
          />
        )}

      {event.getUserAtkStatus() === TestStatusEnum.POSITIVE && (
        <Button
          title="ติดเชื้อ"
          variant={VariantEnum.ERROR}
          container={ButtonContainerEnum.OUTLINE}
          onClick={() => null}
          className="w-full"
        />
      )}

      {event.getUserAtkStatus() === TestStatusEnum.NEGATIVE && (
        <Button
          title="ไม่พบเชื้อ"
          variant={VariantEnum.SUCCESS}
          container={ButtonContainerEnum.OUTLINE}
          onClick={() => null}
          className="w-full"
        />
      )}
    </>
  );
};

export default UserActionButton;
