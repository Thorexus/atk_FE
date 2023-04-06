import { cx } from '@emotion/css';

const BaseStatusIndicator = ({ className }: { className: string }) => {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className={cx(className, 'h-4 w-4 rounded-full')} />
    </div>
  );
};

export default BaseStatusIndicator;
