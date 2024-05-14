import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { useLogin } from '@/lib/auth';

import { LoginFormProps, LoginValues, loginSchema } from '../types';

export const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const login = useLogin();
  const { t } = useTranslation();

  return (
    <div>
      <Form<LoginValues>
        onSubmit={async (values) => {
          await login.mutateAsync(values);
          onSuccess();
        }}
        schema={loginSchema}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="email"
              label={t('form_label.email')}
              error={formState.errors['email']}
              registration={register('email')}
              autoComplete="email"
            />
            <InputField
              type="password"
              label={t('form_label.password')}
              error={formState.errors['password']}
              registration={register('password')}
              autoComplete="current-password"
            />
            <div>
              <Button
                isLoading={login.isLoading}
                type="submit"
                className="w-full bg-[#2A2F32] text-[18px] font-bold uppercase h-12 mt-1"
              >
                {t('actions.sign_in')}
              </Button>
            </div>
            <div>
              Don&apos;t have any account?{' '}
              <Link
                to="/register"
                className="font-bold text-primary-dark-gray hover:underline heading italic"
              >
                Register here
              </Link>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};
