import { InputProps } from '@/types';
import React from 'react';

const Input: React.FC<InputProps> = ({ type, handleChange, value, placeholder, required, name }) => {
  return (
    <div className="w-full">
      <input
        type={type}
        onChange={handleChange}
        value={value}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 
                   bg-gray-800 border border-gray-700 
                   rounded-lg text-white 
                   placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-lime-400 
                   transition duration-200"
        name={name}
      />
    </div>
  );
};

export default Input;