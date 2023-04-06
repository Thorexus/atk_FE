import { ATK_STATUS } from 'common/types/atk-status';
import { useSelect } from 'downshift';
import { forEach } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { useField, useFormState } from 'react-final-form';
import { ItemDropdownType } from '../field-dropdown';

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
  const { dirtyFieldsSinceLastSubmit } = useFormState();
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

  const hasDirtySinceLastSubmit = useMemo(() => {
    let isDirty = false;
    forEach(dirtyFieldsSinceLastSubmit, isFieldDirty => {
      if (isFieldDirty) {
        isDirty = true;
      }
    });

    return isDirty;
  }, [dirtyFieldsSinceLastSubmit]);

  const isShowError = useMemo(() => {
    if (!meta.error && !meta.submitError) {
      return false;
    }

    return meta.submitFailed && !hasDirtySinceLastSubmit;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta]);

  const errorMessage = meta.error ?? meta.submitError;

  useEffect(() => {
    switch (input.value) {
      case ATK_STATUS.NEGATIVE:
        setSelectedItem({
          label: ATK_STATUS.NEGATIVE,
          value: ATK_STATUS.NEGATIVE,
        });
        break;
      case ATK_STATUS.POSITIVE:
        setSelectedItem({
          label: ATK_STATUS.POSITIVE,
          value: ATK_STATUS.POSITIVE,
        });
        break;
      case ATK_STATUS.ERROR:
        setSelectedItem({
          label: ATK_STATUS.ERROR,
          value: ATK_STATUS.ERROR,
        });
        break;
      case ATK_STATUS.NOT_UPLOAD:
        setSelectedItem({
          label: ATK_STATUS.NOT_UPLOAD,
          value: ATK_STATUS.NOT_UPLOAD,
        });
        break;
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
