import { axios } from '@/lib/axios';
import { UserResponse } from '../types';
import { AuthUser } from '@/types';

const REGISTER = '/app/auth/register/';

export type RegisterCredentialsDTO = {
  firstName: string;
  email: string;
  password: string;
};

export const registerWithEmailAndPassword = async (
  data: RegisterCredentialsDTO
): Promise<UserResponse> => {
  try {
    const response: any = await axios.post(REGISTER, data);
    const responseData = response.data;
    localStorage.setItem('ep_refresh_token', responseData.refresh);

    const user: AuthUser = {
      id: '',
      email: responseData.user.email,
      firstName: responseData.user.first_name,
      lastName: responseData.user.last_name,
    };

    const userResponse: UserResponse = {
      access: responseData.access,
      user: user,
    };

    return userResponse;
  } catch (error) {
    console.error('Register error:', error);
    throw new Error('Failed to register');
  }
};
