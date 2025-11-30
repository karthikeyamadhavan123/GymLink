import { InputProps } from '@/types';
import React from 'react';

const Input: React.FC<InputProps> = ({ type, handleChange, value, placeholder, required, name,className }) => {
  return (
    <div className="w-full">
      <input
        type={type}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
        required={required}
        className={className}
        name={name}
      />
    </div>
  );
};

export default Input;