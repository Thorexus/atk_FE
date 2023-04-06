import { cx } from '@emotion/css';

type BaseToastProps = {
  variant: 'success' | 'error';
  title: string;
  description?: string;
};

const BaseToast = ({ variant, title, description }: BaseToastProps) => {
  return (
    <div
      className={cx(
        'flex h-full items-center gap-x-2 px-2 py-2 font-sukhumvit',
      )}>
      <div
        className={cx(
          variant === 'success' && 'bg-success-600',
          variant === 'error' && 'bg-error-500',
          'h-full w-1 rounded-lg ',
        )}
      />

      <div className="flex flex-col gap-1">
        <div className="font-semibold text-neutral-800">{title}</div>
        <div className="text-sm text-neutral-600">{description}</div>
      </div>
    </div>
  );
};

export default BaseToast;
