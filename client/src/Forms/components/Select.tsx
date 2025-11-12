import { SelectProps } from '@/types';
import React from 'react';

const Select: React.FC<SelectProps> = ({ handleChange, value, required, data, id, name }) => {
  return (
    <div className="w-full">
      <select
        onChange={handleChange}
        value={value}
        required={required}
        className="w-full px-4 py-3 
                   bg-gray-800 border border-gray-700 
                   rounded-lg text-white 
                   placeholder-gray-400
                   focus:outline-none focus:ring-2 focus:ring-lime-400 
                   transition duration-200"
        id={id}
        name={name}
      >
        <option>Select your {name}</option>
        {
          data?.map((d, index) => (
            <option key={index}>
              {d?.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;