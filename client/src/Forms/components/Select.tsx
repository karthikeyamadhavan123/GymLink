import { SelectProps } from '@/types';
import React from 'react';

const Select: React.FC<SelectProps> = ({ handleChange, value, required, data, id, name,className }) => {
  return (
    <div className="w-full">
      <select
        onChange={handleChange}
        value={value}
        required={required}
        className={className}
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