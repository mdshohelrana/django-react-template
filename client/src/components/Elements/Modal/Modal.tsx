import clsx from 'clsx';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';
import { IoCheckmarkOutline } from 'react-icons/io5';
import { Button } from '../Button';
import { ConfirmationDialog } from '../ConfirmationDialog';

interface Modal {
  title: string | ReactNode;
  children: ReactNode;
  isOpen: boolean;
  isDirty?: boolean;
  extraClassName?: string;
  onClose: () => void;
}
const Modal = ({ title, children, isOpen, onClose, isDirty, extraClassName }: Modal) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[1000]" onClose={() => {}} static>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative w-full max-w-fll  sm:min-w-[700px] sm:max-w-fit transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all">
                <div className="sticky top-0 z-10 bg-[#606568] flex justify-between pl-4 pr-2 py-[14px]">
                  <Dialog.Title as="h3" className="text-2xl font-bold text-white">
                    {title}
                  </Dialog.Title>
                  {isDirty ? (
                    <ConfirmationDialog
                      icon="danger"
                      title="Are you sure?"
                      body={
                        <>
                          <p>You have unsaved changes. Are you sure you want to close?</p>
                        </>
                      }
                      triggerButton={
                        <button>
                          <IoClose
                            aria-hidden="true"
                            className="w-[36px] h-[36px]"
                            color="#FFBF3C"
                          />
                        </button>
                      }
                      confirmButton={
                        <Button type="button" className="bg-red-600" onClick={onClose}>
                          <IoCheckmarkOutline className="h-5 w-5 mr-1" />
                          <span>Yes</span>
                        </Button>
                      }
                    />
                  ) : (
                    <button onClick={onClose}>
                      <IoClose aria-hidden="true" className="w-[36px] h-[36px]" color="#FFBF3C" />
                    </button>
                  )}
                </div>
                <div className={clsx('px-10 py-8 max-h-[80vh] overflow-y-auto', extraClassName)}>
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
