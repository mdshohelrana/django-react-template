import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { DropdownEntity } from '@/types';

const DESIGNATION_URL = '/definition/designations/';

type DesignationListDTO = {
  id: number;
  name: string;
};

export const getDesignationList = async (): Promise<DropdownEntity[]> => {
  try {
    const { data } = await axios.get<DesignationListDTO[]>(DESIGNATION_URL);

    const designationList = data.map((designationListDto: DesignationListDTO) => {
      const { id, name } = designationListDto;

      return {
        id,
        label: name,
        value: id.toString(),
      };
    });

    return designationList;
  } catch (error) {
    console.error('Error occurred while fetching designation list:', error);
    throw new Error('Failed to fetch designation list');
  }
};

type QueryFnType = typeof getDesignationList;

type UseDesignationsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useDesignationList = ({ config }: UseDesignationsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['designation-ist'],
    queryFn: () => getDesignationList(),
  });
};
