import { useSelect } from 'downshift';
import { useEffect, useMemo, useState } from 'react';
import { useField } from 'react-final-form';
import { ItemDropdownType } from '.';

export const useViewModel = ({
  name,
  options,
}: {
  name: string;
  options: ItemDropdownType[];
}) => {
  const [selectedItem, setSelectedItem] = useState<ItemDropdownType>(
    {} as ItemDropdownType,
  );

  const onSelectItem = (currentItem: ItemDropdownType) => {
    setSelectedItem(currentItem);
  };

  const { input, meta } = useField(name);

  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    items: options,
    onSelectedItemChange: change => {
      onSelectItem(change.selectedItem as ItemDropdownType);
      input.onChange(change.selectedItem?.value);
    },
  });

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

  useEffect(() => {
    if (input.value) {
      const findMatchOption = options.find(
        (option: any) => option.value === input.value,
      );

      if (findMatchOption) {
        setSelectedItem(findMatchOption);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getItemProps,
    input,
    isShowError,
    errorMessage,
  };
};
