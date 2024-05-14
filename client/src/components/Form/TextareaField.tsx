import clsx from 'clsx';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type TextAreaFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  registration: Partial<UseFormRegisterReturn>;
};

export const TextAreaField = (props: TextAreaFieldProps) => {
  const {
    label,
    className,
    registration,
    error,
    placeholder,
    required = false,
    disabled = false,
  } = props;
  return (
    <FieldWrapper label={label} error={error} required={required}>
      <textarea
        className={clsx(
          'appearance-none block w-full px-3 py-2 border-[0.5px] border-[#606568]/60 rounded-5px shadow-sm placeholder-[#B0B0B0] focus:outline focus:outline-[0.5px] focus:outline-offset-0 focus:border-primary-turquoise focus:ring-0 focus:outline-primary-turquoise sm:text-sm ',
          `${disabled ? 'bg-gray-100 text-gray-500' : 'text-gray-600'}`,
          className
        )}
        rows={4}
        disabled={disabled}
        placeholder={placeholder}
        {...registration}
      />
    </FieldWrapper>
  );
};
