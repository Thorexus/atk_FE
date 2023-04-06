import { VariantEnum } from 'common/types/component';
import Button, { ButtonContainerEnum } from '../button';
import { BaseComponentProps } from 'common/constants/base-component';
import { cx } from '@emotion/css';

type ButtonGroupProps = BaseComponentProps & {
  confirmButtonTitle: string;
  confirmButtonClick?: () => void;
  confirmButtonVariant?: VariantEnum;
  confirmButtonContainer?: ButtonContainerEnum;
  confirmButtonType?: 'button' | 'submit' | 'reset';
  cancelButtonTitle: string;
  cancelButtonClick: () => void;
  cancelButtonVariant?: VariantEnum;
  cancelButtonContainer?: ButtonContainerEnum;
  isLoading?: boolean;
  confirmButtonDisable?: boolean;
};

const ButtonGroup = ({
  className,
  confirmButtonTitle,
  confirmButtonClick,
  confirmButtonVariant = VariantEnum.PRIMARY,
  confirmButtonContainer = ButtonContainerEnum.PRIMARY,
  confirmButtonType = 'button',
  cancelButtonTitle,
  cancelButtonClick,
  cancelButtonVariant = VariantEnum.NEUTRAL,
  cancelButtonContainer = ButtonContainerEnum.TERTIARY,
  isLoading = false,
  confirmButtonDisable = false,
}: ButtonGroupProps) => {
  return (
    <div className={cx(className, 'flex w-full flex-col gap-y-2')}>
      <Button
        title={cancelButtonTitle}
        onClick={cancelButtonClick}
        variant={cancelButtonVariant}
        container={cancelButtonContainer}
      />
      <Button
        type={confirmButtonType}
        title={confirmButtonTitle}
        onClick={() => (confirmButtonClick ? confirmButtonClick() : null)}
        variant={confirmButtonVariant}
        container={confirmButtonContainer}
        isLoading={isLoading}
        disabled={confirmButtonDisable}
      />
    </div>
  );
};

export default ButtonGroup;
