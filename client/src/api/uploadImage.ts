import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { queryClient } from '@/lib/react-query';
import { useNotificationStore } from '@/stores/notifications';

export type ImageUpload = {
  image?: string;
};

export type ImageUploadDTO = {
  file_path?: string;
};

const IMAGE_URL = (param: string) => `/app/image-upload/?value=${param}`;

const uploadImage = async (values: { image: File; param: string }): Promise<ImageUpload> => {
  const { image, param } = values;
  try {
    const formData = new FormData();
    formData.append('image', image);

    const { data } = await axios.post<ImageUploadDTO>(IMAGE_URL(param), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const imageData: ImageUpload = {
      image: data.file_path,
    };

    return imageData;
  } catch (error) {
    console.error('Error occurred while uploading image:', error);
    throw new Error('Failed to upload image');
  }
};

type UseImageUploadOptions = {
  config?: Parameters<typeof useMutation>;
};

export const useImageUpload = ({ config }: UseImageUploadOptions = {}) => {
  const { addNotification } = useNotificationStore();

  return useMutation({
    mutationFn: uploadImage,
    onSuccess: () => {
      queryClient.invalidateQueries(['image']);
    },
    onError: (error: Error) => {
      addNotification({
        type: 'error',
        title: 'Error uploading image',
        message: error.message || 'There was an error attempting to upload image.',
      });
    },
    ...config,
  });
};
