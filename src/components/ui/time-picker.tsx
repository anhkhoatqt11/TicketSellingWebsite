/** @format */

import { Input } from '@components/ui/input';

const TimePicker = ({ value, setValue }) => {
  return (
    <Input
      value={value}
      type='time'
      onChange={e => {
        setValue(e.target.value);
      }}
    />
  );
};

export { TimePicker };
