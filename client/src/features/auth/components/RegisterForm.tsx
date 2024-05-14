import { Link } from 'react-router-dom';
import { Button } from '@/components/Elements';
import { Form, InputField } from '@/components/Form';
import { useRegister } from '@/lib/auth';
import { useTranslation } from 'react-i18next';
import { RegisterFormProps, RegisterValues, registerSchema } from '../types';

export const RegisterForm = ({ onSuccess }: RegisterFormProps) => {
  const registerMutation = useRegister();
  const { t } = useTranslation();

  return (
    <div>
      <Form<RegisterValues>
        onSubmit={async (values) => {
          await registerMutation.mutateAsync(values);
          onSuccess();
        }}
        schema={registerSchema}
        options={{
          shouldUnregister: true,
        }}
      >
        {({ register, formState }) => (
          <>
            <InputField
              type="text"
              label={t('form_label.name')}
              error={formState.errors['first_name']}
              registration={register('first_name')}
            />
            <InputField
              type="email"
              label={t('form_label.email')}
              error={formState.errors['email']}
              registration={register('email')}
            />
            <InputField
              type="password"
              label={t('form_label.password')}
              error={formState.errors['password']}
              registration={register('password')}
            />

            <div>
              <Button
                isLoading={registerMutation.isLoading}
                type="submit"
                className="w-full bg-[#2A2F32] text-[18px] font-bold uppercase"
              >
                Register
              </Button>
            </div>

            <div>
              Already registered?{' '}
              <Link
                to="/auth/login"
                className="text-primary-dark-gray hover:underline font-bold  heading italic"
              >
                Sign in
              </Link>
            </div>
          </>
        )}
      </Form>
    </div>
  );
};
