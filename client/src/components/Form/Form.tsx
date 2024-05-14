import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useEffect } from 'react';
import { FieldValues, SubmitHandler, UseFormProps, UseFormReturn, useForm } from 'react-hook-form';
import { ZodType } from 'zod';

type FormProps<TFormValues extends FieldValues, Schema> = {
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options?: UseFormProps<TFormValues>;
  schema?: Schema;
  className?: string;
  id?: string;
  onSubmit: SubmitHandler<TFormValues>;
  onDirty?: (isDirty: boolean) => void;
};

export const Form = <
  TFormValues extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<unknown> = ZodType<unknown>
>({
  children,
  className,
  options,
  id,
  schema,
  onSubmit,
  onDirty,
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({
    ...options,
    resolver: schema ? zodResolver(schema) : undefined,
  });

  useEffect(() => {
    onDirty?.(methods.formState.isDirty);
  }, [methods.formState.isDirty, onDirty]);

  return (
    <form
      className={clsx('space-y-6', className)}
      onSubmit={methods.handleSubmit(onSubmit)}
      id={id}
    >
      {children(methods)}
    </form>
  );
};
