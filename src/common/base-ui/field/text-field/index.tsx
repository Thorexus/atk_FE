import { cx } from '@emotion/css';
import { BaseComponentProps } from 'common/constants/base-component';
import HintMessage, { HINT_MESSAGE_VARIANT } from '../../hint-message';
import Label from '../../label';
import { useViewModel } from './viewmodel';

type TextFieldProps = BaseComponentProps & {
  name: string;
  type?: 'text' | 'password';
  label?: string;
  placeholder: string;
  disabled?: boolean;
  children?: React.ReactNode;
  maxLength?: number;
};

const TextField = ({
  className,
  name,
  type = 'text',
  label,
  placeholder,
  disabled = false,
  maxLength,
}: TextFieldProps) => {
  const { input, isShowError, errorMessage } = useViewModel({
    name,
    type,
  });

  return (
    <div className={cx(className, 'flex w-full flex-col')}>
      {label && <Label>{label}</Label>}
      <input
        {...input}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className={cx(
          isShowError && errorMessage && '!border-error-500 bg-error-50',
          input.value && !isShowError && '!border-primary-700',
          'rounded-lg border border-neutral-200 px-4 py-2 font-medium text-lg outline-0 placeholder:text-neutral-600 focus:border-primary-300',
        )}
      />
      <HintMessage variant={HINT_MESSAGE_VARIANT.ERROR}>
        {isShowError && errorMessage}
      </HintMessage>
    </div>
  );
};

export default TextField;
