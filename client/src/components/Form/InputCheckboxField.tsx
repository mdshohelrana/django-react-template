import clsx from 'clsx';
import { nanoid } from 'nanoid';
import { UseFormRegisterReturn } from 'react-hook-form';

import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type InputCheckboxFieldProps = FieldWrapperPassThroughProps & {
  className?: string;
  checked?: boolean;
  registration: Partial<UseFormRegisterReturn>;
  variant?: 'checkbox' | 'switch';
};

export const InputCheckboxField = (props: InputCheckboxFieldProps) => {
  const {
    label,
    checked,
    className,
    registration,
    error,
    required = false,
    variant = 'checkbox',
  } = props;

  const id = nanoid();

  return (
    <FieldWrapper label={label} error={error} required={required} type="checkbox">
      <div className={`${variant === 'switch' ? 'flex items-center gap-x-[20px]' : ''}`}>
        <input
          defaultChecked={checked}
          id={`switch-${id}`}
          type="checkbox"
          className={clsx(
            'bg-gray-200 switch hover:bg-gray-300 cursor-pointer w-4 h-4 border-3 border-black-500 rounded-sm checked:bg-primary-turquoise checked:hover:bg-primary-turquoise checked:focus:bg-primary-turquoise ml-0.5 focus:outline-0 focus:ring-0 focus:ring-offset-0',
            className
          )}
          {...registration}
        />
        {variant === 'switch' && <label htmlFor={`switch-${id}`}>Toggle</label>}
      </div>
    </FieldWrapper>
  );
};
