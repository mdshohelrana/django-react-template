import clsx from 'clsx';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { CiImageOn } from 'react-icons/ci';
import { FaUser } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import edit_profile from '@/assets/svgs/edit_profile.svg';
import { FieldWrapper, FieldWrapperPassThroughProps } from './FieldWrapper';

type InputImageFieldProps = FieldWrapperPassThroughProps & {
  src?: string;
  type?: 'file';
  className?: string;
  registration: Partial<UseFormRegisterReturn>;
  uploadType?: string;
};

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];

export const InputImageField = (props: InputImageFieldProps) => {
  const { t } = useTranslation();
  const {
    src,
    type = 'file',
    label,
    className,
    registration,
    error,
    required = false,
    uploadType = 'image',
  } = props;
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>(src || '');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        if (ACCEPTED_IMAGE_TYPES.includes(file.type)) setImagePreviewUrl(e.target.result as string);
      };

      reader.readAsDataURL(file);
      if (registration?.onChange) {
        registration.onChange(event);
      }
    }
  };

  return (
    <FieldWrapper label={label} error={error} required={required} type={type}>
      <div className="relative w-full">
        <div className="flex w-full items-center justify-center">
          <div className="relative w-fit flex items-center justify-center">
            {imagePreviewUrl ? (
              <img
                src={imagePreviewUrl}
                alt="image"
                className="w-[100px] h-[100px] border rounded-full"
              />
            ) : (
              <>
                {uploadType === 'image' ? (
                  <FaUser className="w-[100px] h-[100px] border rounded-full p-3 bg-gray-500 text-white" />
                ) : (
                  <CiImageOn className="w-[100px] h-[100px] border rounded-full p-3 bg-gray-500 text-white" />
                )}
              </>
            )}

            <div className="absolute left-[70%] top-0">
              <div className="relative hover:shadow rounded-full">
                <img src={edit_profile} alt="logo" className="w-6 h-6 rounded-full" />
                <input
                  type={type}
                  accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                  className={clsx(
                    'absolute z-20 top-0 w-6 h-6 opacity-0 rounded-full cursor-pointer',
                    className
                  )}
                  {...registration}
                  onChange={onChange}
                />
              </div>
            </div>
          </div>
        </div>
        <p className="my-2 text-center text-primary-light-gray">
          {t('placeholder.allowed_file_types')}
        </p>
      </div>
    </FieldWrapper>
  );
};
