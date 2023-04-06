import { cx } from '@emotion/css';
import SelectorNavigateButton from './selector-navigate-button';

type SelectorButtonProps = {
  onPrev: () => void;
  disabledOnPrev?: boolean;
  onNext: () => void;
  disabledOnNext?: boolean;
  onClick: () => void;
  text: string;
  hideNavigation: boolean;
  disabled?: boolean;
};

const SelectorButton = ({
  onPrev,
  disabledOnPrev = false,
  onNext,
  disabledOnNext = false,
  onClick,
  text,
  hideNavigation,
  disabled = false,
}: SelectorButtonProps) => {
  return (
    <div className="flex items-center">
      <SelectorNavigateButton
        onClick={onPrev}
        disabled={disabledOnPrev}
        action="prev"
        hideNavigation={hideNavigation || disabled}
      />

      <button
        type="button"
        onClick={onClick}
        className={cx(
          disabled && 'pointer-events-none',
          'flex items-center gap-x-2 px-2 py-[10px] font-sukhumvit font-medium text-sm leading-5',
        )}>
        {text}
      </button>

      <SelectorNavigateButton
        onClick={onNext}
        disabled={disabledOnNext}
        action="next"
        hideNavigation={hideNavigation || disabled}
      />
    </div>
  );
};

export default SelectorButton;
