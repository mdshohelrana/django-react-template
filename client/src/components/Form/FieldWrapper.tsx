import clsx from 'clsx';
import * as React from 'react';
import { FieldError } from 'react-hook-form';

type FieldWrapperProps = {
  label?: string;
  className?: string;
  children: React.ReactNode;
  error?: FieldError | undefined;
  description?: string;
  required?: boolean;
  type?:
    | 'text'
    | 'number'
    | 'email'
    | 'password'
    | 'checkbox'
    | 'file'
    | 'checkbox'
    | 'date'
    | 'time'
    | 'datetime-local';
  uploadType?: 'icon' | 'image';
};

export type FieldWrapperPassThroughProps = Omit<FieldWrapperProps, 'className' | 'children'>;

export const FieldWrapper = (props: FieldWrapperProps) => {
  const { label, className, error, children, required = false, type } = props;
  return (
    <div className="relative">
      <div
        className={`${type === 'checkbox' ? 'flex items-center gap-x-1' : 'flex flex-col gap-y-1'}`}
      >
        <label className={clsx('block text-sm font-medium text-gray-700', className)}>
          {label}
          {required && <span className="text-bold !text-red-500">*</span>}
        </label>
        <div>{children}</div>
      </div>

      {error?.message && (
        <div
          role="alert"
          aria-label={error.message}
          className="text-xs font-semibold text-red-500 mt-1 max-w-[455px] text-left"
        >
          {error.message}
        </div>
      )}
    </div>
  );
};
