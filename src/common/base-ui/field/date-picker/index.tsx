/* eslint-disable @typescript-eslint/no-non-null-assertion */
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './date-picker-style.css';
import { useViewModel } from './viewmodel';
import { css, cx } from '@emotion/css';
import SelectorButton from './selector-button';
import SelectorList from './selector-list';
import { baseColor } from 'common/utils/theme/style';
import Label from 'common/base-ui/label';
import { BaseComponentProps } from 'common/constants/base-component';
import HintMessage, { HINT_MESSAGE_VARIANT } from 'common/base-ui/hint-message';
import Icon, { IconSizeEnum } from 'common/base-ui/icon-component';
import { AppIconEnum } from '../../icon-component/viewmodel';

type FieldDatePickerProps = BaseComponentProps & {
  name: string;
  label?: string;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  showPlaceholder?: boolean;
  hint?: string;
  wrapperClassName?: string;
  showOnlyThisYear?: boolean;
};

const FieldDatePicker = ({
  name,
  label,
  disabled,
  readOnly,
  placeholder,
  showPlaceholder,
  hint,
  className,
  wrapperClassName,
  showOnlyThisYear,
}: FieldDatePickerProps) => {
  const {
    input,
    isMonthSelect,
    setIsMonthSelect,
    selector,
    setSelector,
    parentHeight,
    isYearSelect,
    setIsYearSelect,
    months,
    shortMonths,
    years,
    isShowError,
    errorMessage,
  } = useViewModel({ name, showOnlyThisYear });

  return (
    <div className={cx(wrapperClassName, 'w-full')}>
      <Label>{label}</Label>
      <div className="relative w-full">
        <DatePicker
          {...input}
          renderCustomHeader={({
            date,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
            changeYear,
            increaseYear,
            decreaseYear,
            prevYearButtonDisabled,
            nextYearButtonDisabled,
          }) => {
            setSelector(date);
            return (
              <div
                style={{
                  padding: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                }}>
                <div className="flex w-full min-w-[320px] max-w-[328px] items-center justify-center">
                  <SelectorButton
                    onPrev={decreaseMonth}
                    disabledOnPrev={prevMonthButtonDisabled}
                    onNext={increaseMonth}
                    disabledOnNext={nextMonthButtonDisabled}
                    onClick={() => {
                      setIsYearSelect(false);
                      setIsMonthSelect(!isMonthSelect);
                    }}
                    text={shortMonths[date.getMonth()]}
                    hideNavigation={isMonthSelect}
                    disabled={isYearSelect}
                  />
                  <SelectorButton
                    onPrev={decreaseYear}
                    disabledOnPrev={prevYearButtonDisabled}
                    onNext={increaseYear}
                    disabledOnNext={nextYearButtonDisabled}
                    onClick={() => {
                      setIsMonthSelect(false);
                      setIsYearSelect(!isYearSelect);
                    }}
                    text={date.getFullYear().toString()}
                    hideNavigation={isYearSelect || showOnlyThisYear!}
                    disabled={isMonthSelect}
                  />
                </div>

                {isMonthSelect || isYearSelect ? (
                  <SelectorList
                    options={
                      isMonthSelect
                        ? months
                        : years.map(item => item.toString())
                    }
                    value={
                      isMonthSelect
                        ? selector?.getMonth()
                        : selector?.getFullYear()
                    }
                    onClickAction={isMonthSelect ? changeMonth : changeYear}
                    onClick={() =>
                      isMonthSelect
                        ? setIsMonthSelect(false)
                        : setIsYearSelect(false)
                    }
                    parentHeight={parentHeight}
                    selectType={isMonthSelect ? 'month' : 'year'}
                  />
                ) : null}
              </div>
            );
          }}
          className={cx(
            className,
            isShowError && errorMessage && '!border-error-500 bg-error-50',
            input.value
              ? 'border-primary-700 focus:border-primary-700'
              : 'focus:border-primary-300',
            'w-full rounded-lg border border-neutral-200 px-4 py-2 placeholder:text-neutral-600',
            'font-sukhumvit font-medium text-lg',
            'w-full cursor-pointer focus:!outline-none focus:ring-0',
          )}
          calendarClassName={cx(
            'drop-shadow-large',
            (isMonthSelect || isYearSelect) && 'relative',
            (isMonthSelect || isYearSelect) &&
              css`
                .react-datepicker__header {
                  border-bottom: 1px solid ${baseColor.primary[600]};
                }
                .react-datepicker__day-names {
                  visibility: hidden;
                }
                .react-datepicker__month {
                  visibility: hidden;
                }
                .react-datepicker__month-container {
                  position: relative;
                }
              `,
          )}
          placeholderText={placeholder}
          dateFormat="dd/MM/yyyy"
          name={name}
          selected={input?.value && new Date(input.value!)}
          onChange={e => {
            input.onChange(e);
          }}
          onBlur={() => {
            setIsMonthSelect(false);
          }}
          onCalendarOpen={() => {
            setIsMonthSelect(false);
            setIsYearSelect(false);
          }}
          onKeyDown={e => {
            e.preventDefault();
          }}
          shouldCloseOnSelect={(!isMonthSelect || !isYearSelect) ?? true}
          disabledKeyboardNavigation
        />

        <button type="button" className="absolute right-4 top-[14px]">
          <Icon icon={AppIconEnum.CALENDAR_ALT} iconSize={IconSizeEnum.SMALL} />
        </button>
      </div>
      <HintMessage
        variant={
          isShowError ? HINT_MESSAGE_VARIANT.ERROR : HINT_MESSAGE_VARIANT.HINT
        }>
        {isShowError && errorMessage ? errorMessage : hint}
      </HintMessage>
    </div>
  );
};

export default FieldDatePicker;
