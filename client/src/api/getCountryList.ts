import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { DropdownEntity } from '@/types';

const COUNTRY_URL = '/definition/countries/';

type CountryListDTO = {
  id: number;
  name: string;
};

export const getCountryList = async (): Promise<DropdownEntity[]> => {
  try {
    const { data } = await axios.get<CountryListDTO[]>(COUNTRY_URL);

    const countryList = data.map((countryListDto: CountryListDTO) => {
      const { id, name: label } = countryListDto;

      return {
        id,
        label,
        value: id.toString(),
      };
    });

    return countryList;
  } catch (error) {
    console.error('Error occurred while fetching country list:', error);
    throw new Error('Failed to fetch country list');
  }
};

type QueryFnType = typeof getCountryList;

type UseDesignationsOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useCountryList = ({ config }: UseDesignationsOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['country-list'],
    queryFn: () => getCountryList(),
  });
};
