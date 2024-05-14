import clsx from 'clsx';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type InputFieldProps = FieldWrapperPassThroughProps & {
  type?: 'text' | 'number' | 'email' | 'password' | 'file' | 'date' | 'time' | 'datetime-local';
  defaultValue?: string | number;
  passedValue?: string | number;
  className?: string;
  registration?: Partial<UseFormRegisterReturn>;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  haveFieldSign?: boolean;
  fieldSignPosition?: string;
  fieldSign?: string;
  step?: string;
  maxLength?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputField = (props: InputFieldProps) => {
  const {
    type = 'text',
    defaultValue,
    passedValue,
    label,
    className,
    registration,
    error,
    required = false,
    placeholder,
    readOnly = false,
    disabled = false,
    autoFocus,
    step,
    maxLength,
    autoComplete,
    haveFieldSign = false,
    fieldSignPosition = '',
    fieldSign = '',
    onChange,
    onFocus,
  } = props;

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }

    if (registration?.onChange) {
      registration.onChange(e);
    }
  };
  const handleFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onFocus) {
      onFocus(e);
    }
  };

  return (
    <FieldWrapper label={label} error={error} required={required}>
      <div className="relative">
        {haveFieldSign && fieldSignPosition !== '' && (
          <div
            className={`absolute w-10 h-full shadow-lg flex flex-col justify-center items-center ${
              fieldSignPosition === 'left' ? 'left-0 top-0 rounded-l-5px' : 'right-10'
            }`}
          >
            <span className="">{fieldSign}</span>
          </div>
        )}
        <input
          type={showPassword ? 'text' : type}
          defaultValue={defaultValue}
          value={passedValue}
          onWheel={(e) => {
            if (type === 'number') {
              (e.target as HTMLElement).blur();
            }
          }}
          autoFocus={autoFocus}
          disabled={disabled}
          className={clsx(
            'appearance-none block w-full px-3 py-2 h-[48px] rounded-5px placeholder-[#B0B0B0] border border-[#606568]/60 focus:outline-[0.5px] focus:outline-offset-0 focus:border-primary-turquoise focus:ring-0 focus:outline-primary-turquoise sm:text-sm',
            `${disabled ? 'bg-gray-100 text-gray-500' : 'text-gray-600'} ${
              haveFieldSign && fieldSignPosition === 'left' && 'pl-12'
            }`,
            className
          )}
          readOnly={readOnly}
          placeholder={placeholder}
          autoComplete={autoComplete}
          step={step}
          maxLength={maxLength}
          {...registration}
          onChange={handleChange}
          onFocus={handleFocus}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={handleShowPassword}
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
          >
            {showPassword ? <FiEye /> : <FiEyeOff />}
          </button>
        )}
      </div>
    </FieldWrapper>
  );
};
