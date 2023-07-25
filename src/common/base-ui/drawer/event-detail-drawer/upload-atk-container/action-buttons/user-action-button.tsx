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
  const eventDate = parseInt(event.getDate().split(' ')[1]);
  const today = new Date().getDate();

  const isAtkUploadable = () => {
    const startUploadDate = eventDate - 1;
    const lastUploadDate = eventDate;

    if (today >= startUploadDate && today <= lastUploadDate) return false;

    return true;
  };

  const isAtkEditable = () => {
    if (
      event.getUserAtkImage() &&
      event.getUserAtkStatus() !== TestStatusEnum.NOT_FOUND &&
      today >= eventDate &&
      today <= eventDate + 13
    )
      return true;

    return false;
  };

  return (
    <>
      {isAtkEditable() ? (
        <Button
          title="แก้ไขผลตรวจ"
          onClick={() => setViewType('update-atk-upload')}
          className="mb-2 w-full"
          variant={VariantEnum.NEUTRAL}
          container={ButtonContainerEnum.TERTIARY}
        />
      ) : null}

      {event.getUserAtkStatus() === TestStatusEnum.NOT_FOUND &&
        !event?.getUserAtkImage() && (
          <Button
            title="อัพโหลดผลตรวจ"
            onClick={() => setViewType('atk-upload')}
            className="w-full"
            disabled={!isAtkUploadable()}
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
