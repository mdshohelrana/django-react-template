import { useMutation } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

interface UserLanguage {
  id: number;
  language: string;
}

interface UserLanguageDTO {
  id: UserLanguage['id'];
  userextended: {
    language: UserLanguage['language'];
  };
}

const UPDATE_USER_LANGUAGE_URL = (id: number) => `/app/users/${id}/update/`;

const updateUserLanguage = async (user: UserLanguage): Promise<UserLanguageDTO> => {
  try {
    const userDto: UserLanguageDTO = {
      id: user.id,
      userextended: {
        language: user.language,
      },
    };

    const { data } = await axios.patch<UserLanguageDTO>(
      UPDATE_USER_LANGUAGE_URL(userDto.id),
      userDto
    );

    return data;
  } catch (error) {
    console.error('Error occurred while updating user:', error);
    throw new Error('Failed to update user');
  }
};

type UseUpdateUserLanguageOptions = {
  config?: MutationConfig<typeof updateUserLanguage>;
};

export const useUpdateUserLanguage = ({ config }: UseUpdateUserLanguageOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: updateUserLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      addNotification({
        type: 'success',
        title: 'Your changes have been successfully saved.',
      });
    },
    onError: (error) => {
      addNotification({
        type: 'error',
        title: 'Error updating user',
        message: error.message || 'There was an error attempting to update the user.',
      });
    },
    ...config,
  });
};
