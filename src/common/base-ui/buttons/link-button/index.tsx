import { cx } from '@emotion/css';
import Icon from 'common/base-ui/icon-component';
import { AppIconEnum } from 'common/base-ui/icon-component/viewmodel';

type LinkButtonProps = {
  title: string;
  onClick: () => void;
  icon?: AppIconEnum;
};

export const LinkButton = ({ title, onClick, icon }: LinkButtonProps) => {
  return (
    <button
      type="button"
      className={cx(
        icon && 'flex items-center gap-x-2',
        'font-500 text-xs text-primary-500',
      )}
      onClick={onClick}>
      {icon ? <Icon icon={icon} /> : null}
      {title}
    </button>
  );
};
