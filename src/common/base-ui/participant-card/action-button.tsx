import User from 'modules/user/model/user';
import Button, { ButtonContainerEnum } from '../buttons/button';
import { TestStatusEnum } from 'modules/data-contractor';
import { VariantEnum } from 'common/types/component';

type ParticipantCardActionButtonProps = {
  user: User;
  setIsReupload: (value: boolean) => void;
  reupload: boolean;
  setApproveAtkDrawerOpen: (value: boolean) => void;
  atkImage: string | undefined;
  atkStatus: TestStatusEnum;
};

const ParticipantCardActionButton = ({
  user,
  setIsReupload,
  reupload,
  setApproveAtkDrawerOpen,
  atkImage,
  atkStatus,
}: ParticipantCardActionButtonProps) => {
  // first atk uploaded && not approve
  if (
    (atkImage && atkStatus === TestStatusEnum.NOT_FOUND) ||
    (atkImage && atkStatus === null)
  ) {
    return (
      <Button
        title={reupload ? 'ตรวจสอบผลอีกครั้ง' : 'ตรวจสอบผล'}
        container={ButtonContainerEnum.SECONDARY}
        onClick={() => {
          setIsReupload(reupload);
          setApproveAtkDrawerOpen(true);
        }}
        className="w-full"
      />
    );
  }

  // negative
  else if (atkStatus === TestStatusEnum.NEGATIVE) {
    return (
      <Button
        title="ไม่พบเชื้อ"
        container={ButtonContainerEnum.OUTLINE}
        variant={VariantEnum.SUCCESS}
        onClick={() => null}
        className="w-full"
        disabled
      />
    );
  }

  // positive
  else if (atkStatus === TestStatusEnum.POSITIVE) {
    return (
      <Button
        title="ติดเชื้อ"
        container={ButtonContainerEnum.OUTLINE}
        variant={VariantEnum.ERROR}
        onClick={() => null}
        className="w-full"
        disabled
      />
    );
  }

  // no atk upload
  return (
    <Button
      title="ยังไม่ได้ส่งผลตรวจ"
      container={ButtonContainerEnum.SECONDARY}
      variant={VariantEnum.NEUTRAL}
      onClick={() => null}
      className="w-full"
      disabled
    />
  );
};

export { ParticipantCardActionButton };
