import Button, { ButtonContainerEnum } from 'common/base-ui/buttons/button';
import Event from 'modules/event/model/event';
import { VariantEnum } from 'common/types/component';
import { detailModalType } from '../../viewmodel';
import { TestStatusEnum } from 'modules/data-contractor';
import { DateTime } from 'luxon';
import { UserAtkActionButton } from './user-atk-action-button';

type UserActionButtonProps = {
  setViewType: (value: detailModalType) => void;
  event: Event;
};

const UserActionButton = ({ setViewType, event }: UserActionButtonProps) => {
  const day = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();

  const today = DateTime.fromISO(
    `${year}-${month > 10 ? month + 1 : `0${month + 1}`}-${day}`,
  );

  const hour = new Date().getHours();
  const minute = new Date().getMinutes();

  const curTime = `${hour}:${minute}:00`;
  const endTime = `${event.getHourClose()}:${event.getMinuteClose()}:00`;

  const startDate = DateTime.fromISO(event.getRawDate());
  const endDate = DateTime.fromISO(event.getRawCloseDate());

  const isAtkUploadable = () => {
    const rawMinUploadDate = new Date(event.getRawDate());
    rawMinUploadDate.setDate(rawMinUploadDate.getDate() - 1);

    const minUploadDate = DateTime.fromISO(
      `${rawMinUploadDate.getFullYear()}-${
        rawMinUploadDate.getMonth() > 10
          ? rawMinUploadDate.getMonth() + 1
          : `0${rawMinUploadDate.getMonth() + 1}`
      }-${rawMinUploadDate.getDate()}`,
    );

    if (today === endDate && curTime <= endTime) return true;
    else if (today >= minUploadDate && today <= endDate) return true;
    else return false;
  };

  const isAtkUpdatable = () => {
    const rawLastUpdateDate = new Date(event.getRawDate());
    rawLastUpdateDate.setDate(rawLastUpdateDate.getDate() + 14);

    const lastUpdateDate = DateTime.fromISO(
      `${rawLastUpdateDate.getFullYear()}-${
        rawLastUpdateDate.getMonth() > 10
          ? rawLastUpdateDate.getMonth() + 1
          : `0${rawLastUpdateDate.getMonth() + 1}`
      }-${rawLastUpdateDate.getDate()}`,
    );

    if (
      event.getUserAtkStatus() &&
      event.getUserAtkStatus() !== TestStatusEnum.NOT_FOUND &&
      event.getReUploadAtkImage() === null &&
      today >= startDate &&
      today <= lastUpdateDate
    ) {
      return true;
    }

    return false;
  };

  const isAtkUpdated = event.getReUploadAtkImage() === null;

  return (
    <>
      <UserAtkActionButton
        atkImage={event.getReUploadAtkImage()}
        atkStatus={event.getReUploadAtkStatus()}
        setViewType={setViewType}
        isAtkUploadable={isAtkUploadable}
        isAtkUpdated={isAtkUpdated}
        isAtkUpdatable={isAtkUpdatable()}
        reupload
      />

      {!event.getReUploadAtkStatus() ||
      event.getReUploadAtkStatus() === TestStatusEnum.NOT_FOUND ? (
        <UserAtkActionButton
          atkImage={event.getUserAtkImage()}
          atkStatus={event.getUserAtkStatus()}
          setViewType={setViewType}
          isAtkUploadable={isAtkUploadable}
          isAtkUpdated={isAtkUpdated}
          isAtkUpdatable={isAtkUpdatable()}
        />
      ) : null}
    </>
  );

  // return (
  //   <>
  //     {isAtkEdited && isAtkUpdatable() ? (
  //       <Button
  //         title="แก้ไขผลตรวจ"
  //         onClick={() => setViewType('update-atk-upload')}
  //         className="mb-2 w-full"
  //         variant={VariantEnum.NEUTRAL}
  //         container={ButtonContainerEnum.OUTLINE}
  //       />
  //     ) : null}

  //     {(event.getUserAtkStatus() === TestStatusEnum.NOT_FOUND &&
  //       !event?.getUserAtkImage()) ||
  //       (event.getUserAtkStatus() === null && !event?.getUserAtkImage() && (
  //         <Button
  //           title="อัพโหลดผลตรวจ"
  //           onClick={() => setViewType('atk-upload')}
  //           className="w-full"
  //           disabled={!isAtkUploadable()}
  //         />
  //       ))}

  //     {(event.getUserAtkStatus() === TestStatusEnum.NOT_FOUND &&
  //       event?.getUserAtkImage()) ||
  //       (event.getUserAtkStatus() === null && event?.getUserAtkImage() && (
  //         <Button
  //           title="กำลังตรวจสอบ"
  //           variant={VariantEnum.WARNING}
  //           container={ButtonContainerEnum.SECONDARY}
  //           onClick={() => null}
  //           className="w-full"
  //         />
  //       ))}

  //     {event.getUserAtkStatus() === TestStatusEnum.POSITIVE ||
  //       (event.getReUploadAtkStatus() === TestStatusEnum.POSITIVE && (
  //         <Button
  //           title="ติดเชื้อ"
  //           variant={VariantEnum.ERROR}
  //           container={ButtonContainerEnum.OUTLINE}
  //           onClick={() => null}
  //           className="w-full"
  //         />
  //       ))}

  //     {event.getUserAtkStatus() === TestStatusEnum.NEGATIVE ||
  //       (event.getReUploadAtkStatus() === TestStatusEnum.NEGATIVE && (
  //         <Button
  //           title="ไม่พบเชื้อ"
  //           variant={VariantEnum.SUCCESS}
  //           container={ButtonContainerEnum.OUTLINE}
  //           onClick={() => null}
  //           className="w-full"
  //         />
  //       ))}
  //   </>
  // );
};

export default UserActionButton;
