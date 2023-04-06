import { cx } from '@emotion/css';

export enum HINT_MESSAGE_VARIANT {
  HINT = 'hint',
  ERROR = 'error',
}

type HintMessageProps = {
  children: React.ReactNode;
  variant?: HINT_MESSAGE_VARIANT;
};

const HintMessage = ({
  children,
  variant = HINT_MESSAGE_VARIANT.HINT,
}: HintMessageProps) => {
  return (
    <div className="h-6 text-left text-sm">
      <span
        className={cx(
          variant === HINT_MESSAGE_VARIANT.ERROR && 'text-error-500',
        )}>
        {children}
      </span>
    </div>
  );
};

export default HintMessage;
