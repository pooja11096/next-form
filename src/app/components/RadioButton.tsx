import React from 'react';

interface RadioButtonGroupProps {
  name: string;
  options: { value: string; label: string }[];
  selectedValue: string;
  onChange: (value: string) => void;
}

const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({ name, options, selectedValue, onChange }) => {
  return (
    <div>
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={() => onChange(option.value)}
          /> {option.label}
        </label>
      ))}
    </div>
  );
};

export default RadioButtonGroup;
