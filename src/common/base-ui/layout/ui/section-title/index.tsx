import { cx } from '@emotion/css';
import { BaseComponentProps } from 'common/constants/base-component';

type SectionTitleProps = BaseComponentProps & {
  title: string;
  actionButton?: React.ReactNode;
};

const SectionTitle = ({
  className,
  title,
  actionButton,
}: SectionTitleProps) => {
  return (
    <p
      className={cx(
        className,
        actionButton ? 'flex items-center justify-between' : '',
        'mb-2 font-semibold text-lg',
      )}>
      {title}
      {actionButton}
    </p>
  );
};

export default SectionTitle;
