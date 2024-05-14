import { axios } from '@/lib/axios';
import { AuthUser } from '@/types';

const AUTH_ME = '/app/users/me/';

export const getUser = async (): Promise<AuthUser> => {
  try {
    const response: any = await axios.get(AUTH_ME);
    const responseData = response.data;

    const user: AuthUser = {
      id: responseData.id,
      email: responseData.email,
      firstName: responseData.first_name,
      lastName: responseData?.last_name,
      photoUrl: responseData?.userextended?.photo,
      bio: responseData?.userextended?.bio,
      organization: responseData?.userextended?.organization,
      mobileNo: responseData?.userextended?.mobile_no,
      phoneNo: responseData?.userextended?.phone_no,
      country: responseData?.userextended?.country,
      state: responseData?.userextended?.state,
      city: responseData?.userextended?.city,
      address: responseData?.userextended?.address,
      gender: responseData?.userextended?.gender,
      genderName: responseData?.userextended?.gender_name,
      language: responseData?.userextended?.language,
      languageName: responseData?.userextended?.language_name,
      timeZone: responseData?.userextended?.time_zone,
    };

    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Failed to login');
  }
};
