// components/DatePicker.tsx
import React from 'react';

interface DatePickerProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DatePickerComponent: React.FC<DatePickerProps> = ({ name, value, onChange }) => {
  return (
    <input
      type="date"
      name={name}
      value={value}
      onChange={onChange}
      className="datepicker"
    />
  );
};

export default DatePickerComponent;
