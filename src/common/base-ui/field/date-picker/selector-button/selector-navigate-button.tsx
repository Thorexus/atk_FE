import { cx } from '@emotion/css';
import Icon from 'common/base-ui/icon-component';
import { AppIconEnum } from '../../../icon-component/viewmodel';

type SelectorNavigateButtonProps = {
  onClick: () => void;
  disabled: boolean;
  action: 'prev' | 'next';
  hideNavigation: boolean;
};

const SelectorNavigateButton = ({
  onClick,
  disabled,
  action,
  hideNavigation,
}: SelectorNavigateButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cx(
        (hideNavigation || disabled) && 'pointer-events-none',
        'flex h-10 w-10 items-center justify-center p-2',
      )}>
      {!hideNavigation && (
        <Icon
          icon={AppIconEnum.ANGLE_LEFT}
          className={action === 'next' ? 'rotate-180' : ''}
        />
      )}
    </button>
  );
};

export default SelectorNavigateButton;
