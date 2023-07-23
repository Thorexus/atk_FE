import { cx } from '@emotion/css';
import { BaseComponentProps } from 'common/constants/base-component';
import { VariantEnum } from 'common/types/component';
import { ReactComponent as LoaderIcon } from 'assets/icons/loader.svg';

export enum ButtonContainerEnum {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
  OUTLINE = 'outline',
}

type ButtonProps = BaseComponentProps & {
  type?: 'button' | 'submit' | 'reset';
  title: string;
  onClick: () => void;
  variant?: VariantEnum;
  container?: ButtonContainerEnum;
  isLoading?: boolean;
  disabled?: boolean;
};

const Button = ({
  className,
  type = 'button',
  title,
  onClick,
  variant = VariantEnum.PRIMARY,
  container = ButtonContainerEnum.PRIMARY,
  isLoading = false,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cx(
        className,
        container === ButtonContainerEnum.PRIMARY && {
          'bg-primary-500': variant === VariantEnum.PRIMARY,
        },
        container === ButtonContainerEnum.PRIMARY &&
          'text-white disabled:bg-neutral-100 disabled:text-neutral-400',

        container === ButtonContainerEnum.SECONDARY && {
          'bg-primary-100 text-primary-500': variant === VariantEnum.PRIMARY,
          'bg-warning-100 text-warning-500': variant === VariantEnum.WARNING,
          'bg-neutral-100 text-neutral-600': variant === VariantEnum.NEUTRAL,
        },

        container === ButtonContainerEnum.TERTIARY && {
          'text-neutral-600': variant === VariantEnum.NEUTRAL,
        },

        container === ButtonContainerEnum.OUTLINE && {
          'border-success-200 bg-success-50 text-success-500':
            variant === VariantEnum.SUCCESS,
          'border-error-200 bg-error-50 text-error-500':
            variant === VariantEnum.ERROR,
          'border-warning-200 bg-warning-50 text-warning-500':
            variant === VariantEnum.WARNING,
        },

        container !== ButtonContainerEnum.OUTLINE && 'border-transparent',

        'flex items-center justify-center rounded-lg border px-4 py-2 font-semibold',
      )}>
      {isLoading ? <LoaderIcon className="h-6 w-6 animate-spin" /> : title}
    </button>
  );
};

export default Button;
