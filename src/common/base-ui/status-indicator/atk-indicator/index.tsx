import { cx } from '@emotion/css';
import BaseStatusIndicator from '../base-status-indicator';
import { TestStatusEnum } from 'modules/data-contractor';

const AtkStatusIndicator = ({ status }: { status: TestStatusEnum }) => {
  return (
    <BaseStatusIndicator
      className={cx(
        status === TestStatusEnum.POSITIVE && 'bg-error-500',
        status === TestStatusEnum.NEGATIVE && 'bg-success-500',
      )}
    />
  );
};

export default AtkStatusIndicator;
