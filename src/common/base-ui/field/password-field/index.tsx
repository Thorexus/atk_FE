import React, { useState } from 'react';
import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { ReactComponent as EyeOffIcon } from 'assets/icons/eye-off.svg';
import { cx } from '@emotion/css';
import { BaseComponentProps } from 'common/constants/base-component';
import Label from '../../label';
import { useViewModel } from './viewmodel';
import HintMessage, { HINT_MESSAGE_VARIANT } from '../../hint-message';

type TextFieldProps = BaseComponentProps & {
  label: string;
  name: string;
  placeholder: string;
  disabled?: boolean;
};

const PassWordField = ({
  className,
  label,
  name,
  placeholder,
  disabled = false,
}: TextFieldProps) => {
  const [isShowPassword, setIsShowPassword] = useState(true);

  const { input, isShowError, errorMessage } = useViewModel({
    name,
    type: isShowPassword ? 'password' : 'text',
  });

  return (
    <div className={cx(className, 'flex w-full flex-col')}>
      <Label>{label}</Label>
      <div className="relative">
        <input
          {...input}
          placeholder={placeholder}
          disabled={disabled}
          className={cx(
            isShowError && errorMessage && '!border-error-500 bg-error-50',
            input.value && !isShowError && '!border-primary-700',
            'w-full rounded-lg border border-neutral-200 py-2 px-4 font-medium text-lg outline-0 placeholder:text-neutral-600 focus:border-primary-300',
          )}
        />
        <button
          type="button"
          onClick={() => setIsShowPassword(!isShowPassword)}
          className="absolute top-0 right-4 h-full text-neutral-700">
          {isShowPassword ? <EyeIcon /> : <EyeOffIcon />}
        </button>
      </div>
      <HintMessage variant={HINT_MESSAGE_VARIANT.ERROR}>
        {isShowError && errorMessage}
      </HintMessage>
    </div>
  );
};

export default PassWordField;
