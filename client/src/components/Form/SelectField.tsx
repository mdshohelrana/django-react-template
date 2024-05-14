import clsx from 'clsx';
import * as React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import Select from 'react-select';

import './css/style.css';
import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

export type Option = {
  id?: string | number;
  label: React.ReactNode;
  value: string | number | string[];
};

type SelectFieldProps = FieldWrapperPassThroughProps & {
  options: Option[];
  className?: string;
  defaultValue?: string | string[];
  placeholder?: string;
  multiple?: boolean;
  isSearchable?: boolean;
  registration?: Partial<UseFormRegisterReturn>;
  isDisableSelectPlaceholder?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectField = (props: SelectFieldProps) => {
  const {
    label,
    options,
    error,
    className,
    defaultValue = '',
    registration,
    placeholder,
    required,
    multiple = false,
    isSearchable = false,
    isDisableSelectPlaceholder = false,
    onChange,
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onChange) {
      onChange(e);
    }

    if (registration?.onChange) {
      registration.onChange(e);
    }
  };

  return (
    <FieldWrapper label={label} error={error} required={required}>
      {isSearchable ? (
        <Select options={options} defaultValue={options[1]} onChange={handleChange} />
      ) : (
        <select
          className={clsx(
            'block w-full pl-3 pr-10 py-2 border-[#606568]/60 focus:outline focus:outline-[0.5px] focus:outline-offset-0 focus:ring-0 focus:border-primary-turquoise focus:outline-primary-turquoise sm:text-sm rounded-5px disabled:text-gray-400 text-gray-600',
            `${multiple ? 'h-24' : 'h-12'}`,
            className
          )}
          defaultValue={defaultValue}
          multiple={multiple}
          {...registration}
          onChange={handleChange}
        >
          {placeholder && (
            <option value="" disabled={isDisableSelectPlaceholder}>
              {placeholder}
            </option>
          )}
          {options.map(({ label, value }) => (
            <option
              key={label?.toString()}
              value={value}
              selected={value === defaultValue}
              className="text-black"
            >
              {label}
            </option>
          ))}
        </select>
      )}
    </FieldWrapper>
  );
};
