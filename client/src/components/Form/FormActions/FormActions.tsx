import { Button } from '../../Elements/Button';
import { ConfirmationDialog } from '../../Elements/ConfirmationDialog';
import { IoMdSave } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { MdOutlineDoNotDisturb } from 'react-icons/md';
import { IoCheckmarkOutline } from 'react-icons/io5';

interface ValidatorButtonProps {
  isDirty: boolean;
  isSubmitting: boolean;
  closeModal?: () => void;
}

const FormActions: React.FC<ValidatorButtonProps> = ({ isDirty, isSubmitting, closeModal }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center justify-end gap-x-2">
      {isDirty ? (
        <ConfirmationDialog
          icon="danger"
          title="Are you sure?"
          body={<p>You have unsaved changes. Are you sure you want to close?</p>}
          triggerButton={
            <button type="button" disabled={isSubmitting} className="cancel-button">
              <MdOutlineDoNotDisturb className="h-6 w-6 mr-1 text-red-600" />
              <span>Cancel</span>
            </button>
          }
          confirmButton={
            <Button type="button" className="bg-red-600" onClick={closeModal}>
              <IoCheckmarkOutline className="h-5 w-5 mr-1" />
              <span>Yes</span>
            </Button>
          }
        />
      ) : (
        <button
          type="button"
          disabled={isSubmitting}
          className="cancel-button"
          onClick={closeModal}
        >
          <MdOutlineDoNotDisturb className="h-6 w-6 mr-1 text-red-600" />
          <span>{t('actions.cancel')}</span>
        </button>
      )}
      <button disabled={isSubmitting || !isDirty} type="submit" className="button-filled">
        <IoMdSave className="h-8 w-6 mr-1" />
        <span>{isSubmitting ? `${t('actions.saving')}` : `${t('actions.save')}`}</span>
      </button>
    </div>
  );
};

export default FormActions;
