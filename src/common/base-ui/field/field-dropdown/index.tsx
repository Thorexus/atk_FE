import { cx } from '@emotion/css';
import Label from '../../label';
import { useViewModel } from './viewmodel';
import { ReactComponent as ChevronDownIcon } from 'assets/icons/chevron-down.svg';
import HintMessage, { HINT_MESSAGE_VARIANT } from '../../hint-message';

export type ItemDropdownType = {
  label: string | number;
  value: string | number | boolean;
};

type FieldDropdownProps = {
  name: string;
  label: string;
  placeholder: string;
  options: ItemDropdownType[];
  wrapperClassName?: string;
};

const FieldDropdown = ({
  name,
  label,
  placeholder,
  options,
  wrapperClassName,
}: FieldDropdownProps) => {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
    isShowError,
    errorMessage,
  } = useViewModel({
    name,
    options,
  });

  return (
    <div className={cx('relative', wrapperClassName)}>
      <div className="flex w-full flex-col">
        <Label {...getLabelProps()}>{label}</Label>
        <button
          aria-label="toggle menu"
          className={cx(
            isShowError
              ? 'border-error-500 bg-error-50'
              : 'border-neutral-300 bg-white',
            selectedItem.label ? '!border-primary-700' : '',
            'flex items-center justify-between rounded-lg border py-2 px-4 font-medium text-lg placeholder:text-neutral-600',
          )}
          type="button"
          {...getToggleButtonProps()}>
          <span
            className={cx(
              selectedItem.label ? 'text-neutral-900' : 'text-neutral-600',
            )}>
            {selectedItem.label || placeholder}
          </span>
          <ChevronDownIcon
            className={cx(isOpen && 'rotate-180', 'h-4 w-4 text-neutral-900')}
          />
        </button>
      </div>
      <ul
        {...getMenuProps()}
        className={cx(
          isOpen && 'mt-1 border border-neutral-200',
          'drop-shadow-medium absolute z-10 max-h-[220px] w-full overflow-scroll rounded-lg bg-white',
        )}>
        {isOpen &&
          options.map((item, index) => (
            <li
              className={cx(
                options.length - 1 !== index && 'border-b border-neutral-100',
                selectedItem.label === item.label &&
                  'bg-primary-500 text-white hover:!bg-primary-500',
                'flex cursor-pointer flex-col py-2 px-3 hover:bg-primary-100',
              )}
              key={`${item.label}${index}`}
              {...getItemProps({ item, index })}>
              <span>{item.label}</span>
            </li>
          ))}
      </ul>
      <HintMessage variant={HINT_MESSAGE_VARIANT.ERROR}>
        {isShowError && errorMessage}
      </HintMessage>
    </div>
  );
};

export default FieldDropdown;
