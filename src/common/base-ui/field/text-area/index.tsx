import { cx } from '@emotion/css';
import { BaseComponentProps } from 'common/constants/base-component';
import { useViewModel } from './viewmodel';
import Label from 'common/base-ui/label';
import HintMessage, { HINT_MESSAGE_VARIANT } from 'common/base-ui/hint-message';

type TextAreaProps = BaseComponentProps & {
  name: string;
  type?: 'text' | 'password';
  label?: string;
  placeholder: string;
  disabled?: boolean;
  children?: React.ReactNode;
};

const TextArea = ({
  className,
  name,
  type = 'text',
  label,
  placeholder,
  disabled = false,
}: TextAreaProps) => {
  const { input, isShowError, errorMessage } = useViewModel({
    name,
    type,
  });

  return (
    <div className={cx(className, 'flex w-full flex-1 flex-col')}>
      {label && <Label>{label}</Label>}
      <textarea
        {...input}
        placeholder={placeholder}
        disabled={disabled}
        className={cx(
          isShowError && errorMessage && '!border-error-500 bg-error-50',
          input.value && !isShowError && '!border-primary-700',
          'h-full flex-1 rounded-lg border border-neutral-200 px-4 py-2 font-medium text-lg outline-0 placeholder:text-neutral-600 focus:border-primary-300',
        )}
      />
      <HintMessage variant={HINT_MESSAGE_VARIANT.ERROR}>
        {isShowError && errorMessage}
      </HintMessage>
    </div>
  );
};

export default TextArea;
