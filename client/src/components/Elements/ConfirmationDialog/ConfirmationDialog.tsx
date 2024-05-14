import {
  ExclamationCircleIcon,
  InformationCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import * as React from 'react';
import { MdOutlineDoNotDisturb } from 'react-icons/md';
import { Button } from '@/components/Elements/Button';
import { Dialog, DialogTitle } from '@/components/Elements/Dialog';
import { useDisclosure } from '@/hooks/useDisclosure';

export type ConfirmationDialogProps = {
  triggerButton: React.ReactElement;
  confirmButton: React.ReactElement;
  title: string;
  body?: React.ReactNode | string;
  cancelButtonText?: string | React.ReactNode;
  icon?: 'danger' | 'info' | 'delete';
  isDone?: boolean;
};

export const ConfirmationDialog = ({
  triggerButton,
  confirmButton,
  title,
  body = '',
  cancelButtonText = (
    <>
      <MdOutlineDoNotDisturb className="h-6 w-6 mr-1 text-red-600" />
      <span>Cancel</span>
    </>
  ),
  icon = 'danger',
  isDone = false,
}: ConfirmationDialogProps) => {
  const { close, open, isOpen } = useDisclosure();

  const cancelButtonRef = React.useRef(null);

  React.useEffect(() => {
    if (isDone) {
      close();
    }
  }, [isDone, close]);

  const trigger = React.cloneElement(triggerButton, {
    onClick: open,
  });

  return (
    <>
      {trigger}
      <Dialog isOpen={isOpen} onClose={close} initialFocus={cancelButtonRef}>
        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:py-8 sm:px-8 max-w-[400px]">
          <div className="flex flex-col items-center space-y-2">
            <div>
              {icon === 'danger' && (
                <div className="mx-auto flex-shrink-0 flex items-center justify-center rounded-full h-24 w-24">
                  <ExclamationCircleIcon
                    className="h-full w-full text-red-600"
                    aria-hidden="true"
                  />
                </div>
              )}

              {icon === 'info' && (
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-24 w-24">
                  <InformationCircleIcon
                    className="h-full-w-full text-blue-600"
                    aria-hidden="true"
                  />
                </div>
              )}

              {icon === 'delete' && (
                <div className="mx-auto flex-shrink-0 flex items-center justify-center border-4 border-red-600 rounded-full p-2 h-20 w-20 mb-2">
                  <TrashIcon className="w-full h-full text-red-600" aria-hidden="true" />
                </div>
              )}
            </div>
            <div className="text-center">
              <DialogTitle as="h3" className="text-2xl leading-6 font-medium text-gray-900">
                {title}
              </DialogTitle>
              {body && (
                <div className="mb-4 mt-10 max-w-[400px]">
                  <div className="text-sm text-gray-500">{body}</div>
                </div>
              )}
            </div>
            <div className="mt-4 flex space-x-2 justify-center sm:justify-end">
              <Button
                type="button"
                variant="inverse"
                className="flex items-center rounded-md whitespace-nowrap bg-white !px-5 h-12 text-lg font-medium text-red-600 border border-red-600 focus:outline focus:outline-0 focus:outline-offset-0 transition-all duration-300 focus-visible:ring-white/75"
                onClick={close}
                ref={cancelButtonRef}
              >
                {cancelButtonText}
              </Button>
              {confirmButton}
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};
