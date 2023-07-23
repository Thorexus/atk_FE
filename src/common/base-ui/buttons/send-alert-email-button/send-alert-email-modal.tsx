import TextArea from 'common/base-ui/field/text-area';
import BaseModal from 'common/base-ui/modal';
import { Form } from 'react-final-form';
import Button, { ButtonContainerEnum } from '../button';
import { VariantEnum } from 'common/types/component';
import * as yup from 'yup';
import useValidationSchema from 'common/libs/validation';
import AdminRepository from 'modules/admin/admin.repository';
import AdminService from 'modules/admin/admin.service';
import SendAlertEmailDTO from 'modules/admin/dto/send-alert-email.dto';
import { useState } from 'react';
import { toaster } from 'common/base-ui/toast/toaster';

type SendAlertEmailModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  eventId: number;
};

const SendAlertEmailModal = ({
  isOpen,
  setIsOpen,
  eventId,
}: SendAlertEmailModalProps) => {
  const [isSending, setIsSending] = useState(false);

  const sendAlertEmailSchema = yup.object({
    description: yup.string().required('โปรดกรอกคำอธิบาย'),
  });

  const sendEmailValidation = useValidationSchema(sendAlertEmailSchema);

  const handleSubmitEmail = (values: { description: string }) => {
    setIsSending(true);
    const adminRepository = new AdminRepository(new AdminService());

    const sendAlertEmailPayload = new SendAlertEmailDTO({
      id: eventId,
      description: values.description,
    });

    adminRepository
      .sendAlertEmail(sendAlertEmailPayload)
      .then(res => {
        if (res) {
          toaster(
            'success',
            'ส่งการแจ้งเตือนสำเร็จ',
            'อีเมลถูกส่งหาผู้เข้าร่วม',
          );

          setIsOpen(false);
          setIsSending(false);
        }
      })
      .catch(_ => {
        toaster('error', 'ส่งการแจ้งเตือนไม่สำเร็จ', 'กรุณาลองใหม่อีกครั้ง');

        setIsSending(false);
      });
  };

  return (
    <BaseModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className="h-[480px] w-full">
      <div className="flex h-full flex-1 flex-col">
        <p className="mb-4 text-left font-semibold text-lg leading-[28px]">
          แจ้งเตือนผู้เข้าร่วม
        </p>

        <Form
          onSubmit={handleSubmitEmail}
          validate={sendEmailValidation}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="flex flex-1 flex-col">
              <TextArea
                name="description"
                placeholder="รายละเอียดการแจ้งเตือน"
              />
              <div className="flex flex-col gap-y-2">
                <Button
                  title="ยกเลิก"
                  onClick={() => setIsOpen(false)}
                  variant={VariantEnum.NEUTRAL}
                  container={ButtonContainerEnum.TERTIARY}
                />
                <Button
                  type="submit"
                  title="ยืนยัน"
                  onClick={() => null}
                  isLoading={isSending}
                />
              </div>
            </form>
          )}
        />
      </div>
    </BaseModal>
  );
};

export default SendAlertEmailModal;
