import React, { ChangeEvent } from 'react';
import clsx from 'clsx';
interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  value: string;
  className?: string;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, value, onChange, className }) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      className={clsx(
        'w-full pl-2 pr-[30px] py-1 rounded-5px border border-[#00B7C8] focus:border-[#00B7C8] focus:outline-[1px] focus:outline-[#00B7C8] focus:outline-offset-0 focus:ring-0 focus:ring-offset-0 bg-[#00B7C8]/10 text-[#00B7C8] placeholder:text-[#00B7C8] h-12 truncate',
        className
      )}
      value={value}
      onChange={handleChange}
    >
      {options.map((option) => (
        <option className="text-black" key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
