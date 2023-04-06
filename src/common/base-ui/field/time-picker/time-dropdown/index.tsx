import { cx } from '@emotion/css';
import { ItemDropdownType } from 'common/base-ui/field/field-dropdown';
import { useSelect } from 'downshift';

type TimeDropdownProsp = {
  options: ItemDropdownType[];
  onChange: (value: string) => void;
  initialValue: string;
};

const TimeDropdown = ({
  options,
  onChange,
  initialValue,
}: TimeDropdownProsp) => {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: options,
    onSelectedItemChange: e => {
      onChange(e?.selectedItem?.value as unknown as string);
    },
  });

  return (
    <div>
      <div
        className={cx(
          selectedItem || initialValue
            ? 'border-primary-700 focus:border-primary-700'
            : 'border-neutral-300',
          'rounded-lg border px-4 py-2 text-lg focus:!outline-none',
        )}
        {...getToggleButtonProps()}>
        <span>{selectedItem ? selectedItem.label : initialValue}</span>
      </div>
      <ul
        className={`drop-shadow-medium absolute mt-1 max-h-[220px] w-[55px] overflow-scroll rounded-lg bg-white ${
          !isOpen && 'hidden'
        }`}
        {...getMenuProps()}>
        {isOpen &&
          options.map((item, index) => (
            <li
              className={cx(
                highlightedIndex === index && 'bg-blue-300',
                'flex flex-col items-center py-2 px-3 text-lg shadow-sm',
              )}
              key={`${item.value}${index}`}
              {...getItemProps({ item, index })}>
              <span>{item.label}</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default TimeDropdown;
