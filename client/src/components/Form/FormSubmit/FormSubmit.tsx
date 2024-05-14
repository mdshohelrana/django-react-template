import React from 'react';
import { IoMdSave } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface FormSubmitProps {
  formState: ReturnType<typeof useForm>['formState'];
  handleSubmit: ReturnType<typeof useForm>['handleSubmit'];
  onSubmit: any;
  reset: any;
  setIsDirty: (value: boolean) => void;
  isDirty: boolean;
}

const FormSubmit: React.FC<FormSubmitProps> = ({
  formState,
  handleSubmit,
  onSubmit,
  reset,
  setIsDirty,
  isDirty,
}) => {
  const { t } = useTranslation();

  const handleButtonClick = async () => {
    await onSubmit();
    reset({}, { keepValues: true });
    setIsDirty(false);
  };

  return (
    <button
      type="submit"
      disabled={!isDirty || formState.isSubmitting}
      className="ml-auto flex items-center justify-center rounded-md whitespace-nowrap bg-primary-turquoise w-[90px] h-12 text-lg font-medium text-white hover:bg-primary-turquoise/80 focus:outline-none focus-visible:ring-2 transition-all duration-300 focus-visible:ring-white/75  disabled:opacity-50 disabled:hover:bg-primary-turquoise disabled:cursor-not-allowed"
      onClick={handleSubmit(handleButtonClick)}
    >
      <IoMdSave className="h-8 w-6 mr-1" />
      <span>{formState.isSubmitting ? `${t('actions.saving')}` : `${t('actions.save')}`}</span>
    </button>
  );
};

export default FormSubmit;
