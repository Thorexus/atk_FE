import { useMemo, useState } from 'react';
import { useField } from 'react-final-form';

export const useViewModel = ({
  name,
  showOnlyThisYear,
}: {
  name: string;
  showOnlyThisYear?: boolean;
}) => {
  const [isMonthSelect, setIsMonthSelect] = useState(false);
  const [isYearSelect, setIsYearSelect] = useState(false);
  const [selector, setSelector] = useState<Date | undefined>(undefined);
  const [parentHeight, setParentHeight] = useState(0);

  const months = [
    'มกราคม',
    'กุมภาพันธ์',
    'มีนาคม',
    'เมษายน',
    'พฤษภาคม',
    'มิถุนายน',
    'กรกฎาคม',
    'สิงหาคม',
    'กันยายน',
    'ตุลาคม',
    'พฤศจิกายน',
    'ธันวาคม',
  ];

  const shortMonths = [
    'ม.ค.',
    'ก.พ.',
    'มี.ค.',
    'เม.ย.',
    'พ.ค.',
    'มิ.ย.',
    'ก.ค.',
    'ส.ค.',
    'ก.ย.',
    'ต.ค.',
    'พ.ย.',
    'ธ.ค.',
  ];

  const range = (start: number, end: number) => {
    return new Array(end + 1 - start).fill(null).map((d, i) => i + start);
  };

  const years = showOnlyThisYear
    ? [new Date().getFullYear()]
    : range(1980, new Date().getFullYear());

  const elements = document.querySelector('.react-datepicker');

  useMemo(() => {
    if (elements) {
      setParentHeight(elements.clientHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elements, isMonthSelect, isYearSelect]);

  const { input, meta } = useField(name, { type: 'text' });

  const isShowError = useMemo(() => {
    if (
      (meta.error && meta.dirty) ||
      (meta.error && meta.touched) ||
      (meta.submitError && !meta.touched && !meta.dirtySinceLastSubmit)
    ) {
      return true;
    }

    return false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta]);

  const errorMessage = meta.error ?? meta.submitError;

  return {
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
  };
};
