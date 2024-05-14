import { useQuery } from '@tanstack/react-query';

import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { DropdownEntity } from '@/types';

const TIMEZONE_URL = '/app/time-zones/';

type TimeZoneDTO = {
  id: number;
  utc: any[];
  text: string;
};

export const getTimeZoneList = async (): Promise<DropdownEntity[]> => {
  try {
    const { data } = await axios.get<TimeZoneDTO[]>(TIMEZONE_URL);

    const timeZones = data.map((timezoneDto: TimeZoneDTO) => {
      const { id, text: label, utc } = timezoneDto;

      return {
        id,
        label,
        value: utc[0],
      };
    });

    return timeZones;
  } catch (error) {
    console.error('Error occurred while fetching time zone list:', error);
    throw new Error('Failed to fetch time zone list');
  }
};

type QueryFnType = typeof getTimeZoneList;

type UseTimeZoneOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useTimeZoneList = ({ config }: UseTimeZoneOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['time-zone-List'],
    queryFn: () => getTimeZoneList(),
  });
};
