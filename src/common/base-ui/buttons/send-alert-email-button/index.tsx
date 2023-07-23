import { VariantEnum } from 'common/types/component';
import Button, { ButtonContainerEnum } from '../button';
import SendAlertEmailModal from './send-alert-email-modal';
import { useState } from 'react';

type SendAlertEmailButtonProps = {
  eventId: number;
};

const SendAlertEmailButton = ({ eventId }: SendAlertEmailButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <Button
        title="แจ้งเตือนผู้เข้าร่วม"
        onClick={() => setIsOpen(true)}
        variant={VariantEnum.ERROR}
        container={ButtonContainerEnum.OUTLINE}
        className="mb-3 w-full"
      />

      <SendAlertEmailModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        eventId={eventId}
      />
    </div>
  );
};

export default SendAlertEmailButton;
