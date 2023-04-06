import { css, cx } from '@emotion/css';
import SelectorItem from './selector-item';

type SelectListProps = {
  options: string[];
  value: number | undefined;
  onClick: () => void;
  onClickAction: (val: number) => void;
  parentHeight: number;
  selectType: 'month' | 'year';
};

const SelectorList = ({
  options,
  value,
  onClick,
  onClickAction,
  parentHeight,
  selectType,
}: SelectListProps) => {
  return (
    <ul
      className={cx(
        'absolute top-[40px] z-[2] min-h-0 min-w-[320px] max-w-[330px] overflow-y-auto',
        css`
          height: calc(${parentHeight}px - 70px);
        `,
      )}>
      {options.map((option, index) => (
        <SelectorItem
          key={option}
          isActive={
            selectType === 'month'
              ? index === value
              : parseInt(option) === value
          }
          onClick={() => {
            onClick();
            onClickAction(selectType === 'month' ? index : parseInt(option));
          }}>
          {option}
        </SelectorItem>
      ))}
    </ul>
  );
};

export default SelectorList;
