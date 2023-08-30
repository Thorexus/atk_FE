import Button, { ButtonContainerEnum } from 'common/base-ui/buttons/button';
import { VariantEnum } from 'common/types/component';
import { TestStatusEnum } from 'modules/data-contractor';
import { detailModalType } from '../../viewmodel';

type UserAtkActionButtonProps = {
  atkImage: string | undefined;
  atkStatus: TestStatusEnum | undefined;
  reupload?: boolean;
  setViewType: (value: detailModalType) => void;
  isAtkUploadable: () => boolean;
  isAtkUpdated: boolean;
  isAtkUpdatable: boolean;
};

const UserAtkActionButton = ({
  atkImage,
  atkStatus,
  reupload = false,
  setViewType,
  isAtkUploadable,
  isAtkUpdated,
  isAtkUpdatable,
}: UserAtkActionButtonProps) => {
  //upload
  if (
    (!reupload && !atkImage && atkStatus === null) ||
    (!reupload && !atkImage && atkStatus === TestStatusEnum.NOT_FOUND)
  ) {
    return (
      <Button
        title="อัพโหลดผลตรวจ"
        onClick={() => setViewType('atk-upload')}
        className="w-full"
        disabled={!isAtkUploadable()}
      />
    );
  }

  //reupload
  if (
    (reupload &&
      !atkImage &&
      atkStatus === null &&
      isAtkUpdated &&
      isAtkUpdatable) ||
    (reupload &&
      !atkImage &&
      atkStatus === TestStatusEnum.NOT_FOUND &&
      isAtkUpdated &&
      isAtkUpdatable)
  ) {
    return (
      <Button
        title="แก้ไขผลตรวจ"
        onClick={() => setViewType('update-atk-upload')}
        className="mb-2 w-full"
        variant={VariantEnum.NEUTRAL}
        container={ButtonContainerEnum.OUTLINE}
      />
    );
  }

  //pending
  if (
    (!reupload && atkStatus === TestStatusEnum.NOT_FOUND && atkImage) ||
    (!reupload && atkStatus === null && atkImage)
  ) {
    return (
      <Button
        title="กำลังตรวจสอบ"
        variant={VariantEnum.WARNING}
        container={ButtonContainerEnum.SECONDARY}
        onClick={() => null}
        className="w-full"
      />
    );
  }

  //positive
  if (atkStatus === TestStatusEnum.POSITIVE) {
    return (
      <Button
        title="ติดเชื้อ"
        variant={VariantEnum.ERROR}
        container={ButtonContainerEnum.OUTLINE}
        onClick={() => null}
        className="w-full"
      />
    );
  }

  //negative
  if (atkStatus === TestStatusEnum.NEGATIVE) {
    return (
      <Button
        title="ไม่พบเชื้อ"
        variant={VariantEnum.SUCCESS}
        container={ButtonContainerEnum.OUTLINE}
        onClick={() => null}
        className="w-full"
      />
    );
  }

  return null;
};

export { UserAtkActionButton };
