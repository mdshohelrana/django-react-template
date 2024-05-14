import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';
import { Password, PasswordDTO } from '../types';

const UPDATE_PASSWORD_URL = `/app/auth/reset-password/`;

const updatePassword = async (password: Password): Promise<Password> => {
  try {
    const passwordDto: PasswordDTO = {
      current_password: password.currentPassword,
      new_password: password.newPassword,
      confirm_password: password.confirmPassword,
    };

    const { data } = await axios.post<PasswordDTO>(UPDATE_PASSWORD_URL, passwordDto);

    const passwordData: Password = {
      currentPassword: data.current_password,
      newPassword: data.new_password,
      confirmPassword: data.confirm_password,
    };

    return passwordData;
  } catch (error) {
    console.error('Error occurred while updating password:', error);
    throw new Error('Failed to update password password');
  }
};

type UseUpdatePasswordOptions = {
  config?: MutationConfig<typeof updatePassword>;
};

export const useUpdatePassword = ({ config }: UseUpdatePasswordOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['passwords'] });
      addNotification({
        type: 'success',
        title: 'Your changes have been successfully saved.',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error updating password',
        message: error.message || 'There was an error attempting to update the password.',
      });
    },
    ...config,
  });
};
