import { cx } from '@emotion/css';

type TabItemProps = {
  title: string;
  value: string;
  isActive?: boolean;
  onClick?: () => void;
  amount?: number;
};

const TabItem = ({ title, value, isActive, onClick, amount }: TabItemProps) => {
  return (
    <div
      onClick={() => (onClick ? onClick() : null)}
      className={cx(
        isActive ? 'bg-neutral-100' : 'bg-white',
        'relative flex h-[38px] flex-shrink-0 items-center gap-x-1 px-4',
      )}>
      <p
        className={cx(
          isActive ? 'text-neutral-900' : 'text-neutral-600',
          'flex-shrink-0 font-medium text-xs',
        )}>
        {title}
      </p>
      <p
        className={cx(
          isActive ? 'text-neutral-600' : 'text-neutral-600',
          'w-[38px] text-center font-medium',
        )}>
        {amount ? `(${amount})` : `(0)`}
      </p>

      <hr
        className={cx(
          isActive ? 'h-[2px] bg-primary-500' : 'h-[1px] bg-neutral-300',
          'absolute bottom-0 left-0 w-full border-0',
        )}
      />
    </div>
  );
};

export default TabItem;
