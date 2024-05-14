import { axios } from '@/lib/axios';
import { AuthUser } from '@/types';

import { UserResponse } from '../types';

const LOGIN = '/app/auth/login/';

export type LoginCredentialsDTO = {
  email: string;
  password: string;
};

export const loginWithEmailAndPassword = async (
  data: LoginCredentialsDTO
): Promise<UserResponse> => {
  try {
    const response: any = await axios.post(LOGIN, data);
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
    console.error('Login error:', error);
    throw new Error('Failed to login');
  }
};
