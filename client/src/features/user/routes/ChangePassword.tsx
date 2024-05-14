import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ContentLayout } from '@/components/Layout';
import { useUser } from '@/lib/auth';
import { Button } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { IoMdSave } from 'react-icons/io';
import { useUpdatePassword } from '../api/updatePassword';
import { Password, passwordSchema } from '../types';

export type Tab = 'Overview' | 'Settings' | 'Password';

export const ChangePassword = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState<Tab>('Overview');
  const user = useUser();

  const updateMutation = useUpdatePassword();
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const onSubmit = async (inputValues: Password) => {
    try {
      await updateMutation.mutateAsync({ ...inputValues });
    } catch (error) {
      setError(true);
      console.error(error);
    }
  };

  if (!user.data) {
    return null;
  }

  return (
    <ContentLayout title={t('navigation.profile.account_overview')} showTitle>
      <div className="mt-4 w-full">
        <div className="rounded-md overflow-hidden">
          <Form<Password>
            onSubmit={onSubmit}
            schema={passwordSchema}
            onDirty={(e) => setIsDirty(e)}
          >
            {({ handleSubmit, register, formState, reset }) => (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="flex flex-col  gap-y-6 w-full h-full">
                    <InputField
                      type="password"
                      label={t('form_label.current_password')}
                      placeholder={t('placeholder.enter_current_password')}
                      error={formState.errors['currentPassword']}
                      registration={register('currentPassword')}
                      autoComplete="currentPassword"
                    />
                    <InputField
                      type="password"
                      label={t('form_label.new_password')}
                      placeholder={t('placeholder.enter_new_password')}
                      error={formState.errors['newPassword']}
                      registration={register('newPassword')}
                      autoComplete="newPassword"
                    />
                    <InputField
                      type="password"
                      label={t('form_label.confirm_new_password')}
                      placeholder={t('placeholder.enter_confirm_new_password')}
                      error={formState.errors['confirmPassword']}
                      registration={register('confirmPassword')}
                      autoComplete="confirmPassword"
                    />
                    <div className="w-full flex items-center justify-end">
                      <Button
                        disabled={!isDirty || formState.isSubmitting}
                        onClick={handleSubmit(async (values) => {
                          await onSubmit(values);
                          reset();
                          setIsDirty(false);
                        })}
                        type="submit"
                        className="button-filled !px-4"
                      >
                        <IoMdSave className="h-8 w-6 mr-1" />
                        <span>
                          {formState.isSubmitting
                            ? `${t('actions.saving')}`
                            : `${t('actions.save')}`}
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    </ContentLayout>
  );
};
