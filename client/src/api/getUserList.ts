import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';

const USER_LIST_URL = '/app/users/';

type userList = {
  id: number;
  label: string;
  value: string;
  userGroups: string[];
};

type userListDTO = {
  id: number;
  is_active: boolean;
  first_name: string;
  last_name: string;
  user_groups: string[];
};

export const getUserList = async (): Promise<userList[]> => {
  try {
    const { data } = await axios.get<userListDTO[]>(USER_LIST_URL);

    const userList = data
      .filter((userListDto: userListDTO) => userListDto.is_active)
      .map((dropdownData: userListDTO) => {
        const { id, first_name, last_name, user_groups: userGroups } = dropdownData;

        return {
          id,
          label: `${first_name} ${last_name}`,
          value: id.toString(),
          userGroups,
        };
      });

    return userList;
  } catch (error) {
    console.error('Error occurred while fetching user list', error);
    throw new Error('Failed to fetch user list');
  }
};

type QueryFnType = typeof getUserList;

type UseUserListOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useUserList = ({ config }: UseUserListOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['user-list'],
    queryFn: () => getUserList(),
  });
};
