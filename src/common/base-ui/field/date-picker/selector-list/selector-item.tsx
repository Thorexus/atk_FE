import { cx } from '@emotion/css';
import Icon, { IconSizeEnum } from 'common/base-ui/icon-component';
import { AppIconEnum } from '../../../icon-component/viewmodel';

type SelectItemProps = {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
};

const SelectorItem = ({ children, isActive, onClick }: SelectItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        isActive ? 'bg-primary-200' : 'bg-white',
        'pointer-cursor text-neutral-20 flex w-full items-center gap-x-2 px-4 py-2 font-sukhumvit leading-6 tracking-[0.5px]',
      )}>
      {isActive ? (
        <Icon icon={AppIconEnum.CHECK} iconSize={IconSizeEnum.SMALL} />
      ) : (
        <div className="h-4 w-4" />
      )}
      {children}
    </button>
  );
};

export default SelectorItem;
