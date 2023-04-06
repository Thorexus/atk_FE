import { cx } from '@emotion/css';
import { useViewModel } from './viewmodel';
import { ReactComponent as ChevronDownIcon } from 'assets/icons/chevron-down.svg';
import AtkStatusIndicator from '../../status-indicator/atk-indicator';
import { translateAtkStatus } from 'common/utils/translate-atk-status';
import { TestStatusEnum } from 'modules/data-contractor';

type FieldAtkStatusDropdownProps = {
  name: string;
  wrapperClassName?: string;
  disabled?: boolean;
};

const dropdownOptions = [
  { label: 'ไม่พบเชื้อ', value: TestStatusEnum.NEGATIVE },
  { label: 'ติดเชื่อ', value: TestStatusEnum.POSITIVE },
];

const FieldAtkStatusDropdown = ({
  name,
  wrapperClassName,
  disabled,
}: FieldAtkStatusDropdownProps) => {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    isShowError,
  } = useViewModel({
    name,
    options: dropdownOptions,
  });

  return (
    <div className={cx('relative', wrapperClassName)}>
      <div className="flex w-full flex-col">
        <button
          aria-label="toggle menu"
          className={cx(
            isShowError && 'border-error-500',
            selectedItem.value ? 'border-primary-700' : '',
            disabled && 'pointer-events-none border-neutral-50 bg-neutral-100',
            'border-neutral--500 flex h-[42px] items-center justify-between rounded-lg border bg-white px-4',
          )}
          type="button"
          {...getToggleButtonProps()}>
          <div
            className={cx(
              selectedItem.value ? 'gap-x-2' : '',
              'flex items-center',
            )}>
            <div>
              {selectedItem.value ? (
                <AtkStatusIndicator
                  status={
                    selectedItem.value === TestStatusEnum.NEGATIVE
                      ? TestStatusEnum.NEGATIVE
                      : TestStatusEnum.POSITIVE
                  }
                />
              ) : null}
            </div>
            <span
              className={cx(
                selectedItem.label ? 'text-neutral-900' : 'text-neutral-600',
              )}>
              {translateAtkStatus(selectedItem.value as TestStatusEnum) ||
                'เลือกผลตรวจ'}
            </span>
          </div>
          <ChevronDownIcon
            className={cx(
              isOpen && 'rotate-180',
              disabled && 'text-neutral-500',
              'h-4 w-4 text-neutral-900',
            )}
          />
        </button>
      </div>
      <ul
        {...getMenuProps()}
        className={cx(
          isOpen && 'mt-1 border border-neutral-200',
          'absolute z-10 max-h-[246px] w-full overflow-scroll rounded-lg bg-white shadow-md',
        )}>
        {isOpen &&
          dropdownOptions.map((item, index) => (
            <li
              className={cx(
                dropdownOptions.length - 1 !== index &&
                  'border-b border-neutral-100',
                selectedItem.value === item.value &&
                  'bg-primary-500 text-white hover:!bg-primary-500',
                'flex cursor-pointer flex-col py-2 px-3 hover:bg-primary-100',
              )}
              key={`${item.value}${index}`}
              {...getItemProps({ item, index })}>
              <div className="flex items-center gap-x-2">
                <div>
                  <AtkStatusIndicator status={item.value as TestStatusEnum} />
                </div>
                <span className="flex-shrink-0">{item.label}</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default FieldAtkStatusDropdown;
