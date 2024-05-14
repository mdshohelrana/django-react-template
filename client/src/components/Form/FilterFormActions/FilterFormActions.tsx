import React from 'react';
import { Button } from '@/components/Elements';
import { HeroIcon } from '@/components/Icons/HeroIcon';
import { GrPowerReset } from 'react-icons/gr';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';

interface FilterFormActionsProps {
  isDirty: boolean;
  formState: ReturnType<typeof useForm>['formState'];
  handleClick: () => void;
  onReset: () => void;
}

export const FilterFormActions: React.FC<FilterFormActionsProps> = ({
  isDirty,
  formState,
  handleClick,
  onReset,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex space-x-2 items-center w-full">
      <Button
        disabled={!isDirty || formState.isSubmitting}
        className="bg-[#00B7C8] h-12 !p-0 text-lg font-medium w-full disabled:opacity-60"
        type="submit"
        onClick={() => handleClick()}
      >
        <div className="flex items-center space-x-2">
          <HeroIcon name="search" className="w-6 h-6" strokeWidth={1.8} />
          <span>{t('actions.apply')}</span>
        </div>
      </Button>
      <Button
        disabled={formState.isSubmitting}
        className="bg-red-600 !p-0 text-lg font-medium text-white h-12 w-full disabled:opacity-60"
        type="button"
        onClick={onReset}
      >
        <div className="flex items-center space-x-2">
          <GrPowerReset className="w-5 h-5" />
          <span>{t('actions.reset')}</span>
        </div>
      </Button>
    </div>
  );
};
