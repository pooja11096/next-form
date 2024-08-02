// components/Input.tsx
import React from 'react';

interface InputProps {
  type?: string;
  name: string;
  value: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  readOnly?: boolean;
  min?: number; // Add this line
}

const Input: React.FC<InputProps> = ({ type = 'text', name, value, onChange, placeholder, readOnly, min }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      readOnly={readOnly}
      min={min} // Add this line
      className="input"
    />
  );
};

export default Input;
