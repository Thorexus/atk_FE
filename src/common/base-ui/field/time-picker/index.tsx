import Label from 'common/base-ui/label';
import { hours, minutes } from 'common/constants/time-list';
import TimeDropdown from './time-dropdown';
import { useField } from 'react-final-form';
import { useMemo, useState } from 'react';
import HintMessage from 'common/base-ui/hint-message';

type FieldTimePickerProps = {
  name: string;
  label: string;
  hint?: string;
};
const FieldTimePicker = ({ name, label, hint }: FieldTimePickerProps) => {
  const { input } = useField(name, { type: 'text' });

  const [hour, setHour] = useState(input.value.hour || '12');
  const [minute, setMinute] = useState(input.value.minute || '00');

  useMemo(() => {
    input.onChange({ hour: hour, minute: minute });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour, minute]);

  return (
    <div>
      <Label>{label}</Label>
      <input type="text" className="invisible absolute h-0 w-0" {...input} />
      <div className="flex items-center gap-x-1">
        <TimeDropdown options={hours} onChange={setHour} initialValue={hour} />
        :
        <TimeDropdown
          options={minutes}
          onChange={setMinute}
          initialValue={minute}
        />
      </div>
      <HintMessage>{hint}</HintMessage>
    </div>
  );
};

export default FieldTimePicker;
