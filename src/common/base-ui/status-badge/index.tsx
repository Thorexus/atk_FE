import { cx } from '@emotion/css';
import { TestStatusEnum } from 'modules/data-contractor';

type StatusBadgeProps = {
  status: TestStatusEnum;
  action?: 'self' | 'event';
};

const StatusBadge = ({ status, action = 'event' }: StatusBadgeProps) => {
  if (status === TestStatusEnum.NOT_FOUND || status === TestStatusEnum.ALL)
    return null;

  return (
    <span className="flex items-center gap-x-2">
      <p className="text-xs text-neutral-700">
        {action === 'self' ? 'สถานะของคุณ' : 'สถานะของอีเวนท์'}
      </p>
      <span
        className={cx(
          {
            'bg-success-100 text-success-500':
              status === TestStatusEnum.NEGATIVE,
            'bg-error-100 text-error-500': status === TestStatusEnum.POSITIVE,
          },
          'rounded px-1 py-[1.5px] text-xs leading-4',
        )}>
        {status === TestStatusEnum.NEGATIVE ? 'ไม่พบเชิ้อ' : 'ติดเชื้อ'}
      </span>
    </span>
  );
};

export default StatusBadge;
