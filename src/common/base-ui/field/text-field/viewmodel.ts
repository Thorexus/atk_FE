import { useMemo } from 'react';
import { useField } from 'react-final-form';

export const useViewModel = ({
  name,
  type,
}: {
  name: string;
  type: string;
}) => {
  const { input, meta } = useField(name, { type });

  const handleClearField = () => {
    input.onChange('');
  };

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

  return { input, meta, errorMessage, isShowError, handleClearField };
};
