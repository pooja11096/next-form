// components/Dropdown.tsx
import React from 'react';

interface DropdownProps {
  name: string;
  options: string[];
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ name, options, selectedValue, onChange }) => {
  return (
    <select name={name} value={selectedValue} onChange={onChange} className="dropdown">
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
