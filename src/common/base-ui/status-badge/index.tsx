import { cx } from '@emotion/css';
import { TestStatusEnum } from 'modules/data-contractor';

type StatusBadgeProps = {
  status: TestStatusEnum;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
  if (status === TestStatusEnum.NOT_FOUND || status === TestStatusEnum.ALL)
    return null;

  console.log('status sssss');

  return (
    <span
      className={cx(
        {
          'bg-success-100 text-success-500': status === TestStatusEnum.NEGATIVE,
          'bg-error-100 text-error-500': status === TestStatusEnum.POSITIVE,
        },
        'rounded px-1 py-[1.5px] text-2xs leading-4',
      )}>
      {status === TestStatusEnum.NEGATIVE ? 'ไม่พบเชิ้อ' : 'ติดเชื้อ'}
    </span>
  );
};

export default StatusBadge;
