import ButtonGroup from 'common/base-ui/buttons/button-group';
import SectionTitle from 'common/base-ui/layout/ui/section-title';
import { VariantEnum } from '../../../types/component';
import { ButtonContainerEnum } from 'common/base-ui/buttons/button';

type ConfirmationDrawerContainerProps = {
  title: string;
  message: string;
  confirmButtonTitle: string;
  cancelButtonTitle: string;
  confirmButtonClick: () => void;
  cancelButtonClick: () => void;
  isLoading?: boolean;
};

const ConfirmationDrawerContainer = ({
  title,
  message,
  confirmButtonTitle,
  cancelButtonTitle,
  confirmButtonClick,
  cancelButtonClick,
  isLoading = false,
}: ConfirmationDrawerContainerProps) => {
  return (
    <div className="flex flex-col gap-y-4">
      <SectionTitle title={title} className="mb-0" />

      <p className="whitespace-pre-line font-medium text-sm">{message}</p>

      <ButtonGroup
        confirmButtonTitle={confirmButtonTitle}
        confirmButtonClick={confirmButtonClick}
        cancelButtonTitle={cancelButtonTitle}
        cancelButtonClick={cancelButtonClick}
        confirmButtonVariant={VariantEnum.ERROR}
        confirmButtonContainer={ButtonContainerEnum.OUTLINE}
        isLoading={isLoading}
      />
    </div>
  );
};

export default ConfirmationDrawerContainer;
