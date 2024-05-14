import { useQuery } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { SolarProduction } from '../types';

const SOLAR_PRODUCTION_URL = '/solar-panel/production/';

export const getSolarProductionData = async (): Promise<SolarProduction[]> => {
  try {
    const { data } = await axios.get<SolarProduction[]>(SOLAR_PRODUCTION_URL);

    const items = data.map((item: SolarProduction) => {
      const { startTime, value } = item;

      return {
        startTime,
        value,
      };
    });

    return items;
  } catch (error) {
    console.error('Error occurred while fetching solar production data:', error);
    throw new Error('Failed to fetch solar production data');
  }
};

type QueryFnType = typeof getSolarProductionData;

type UseSolarProductionChartOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useSolarProductionChart = ({ config }: UseSolarProductionChartOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['solar-production'],
    queryFn: getSolarProductionData,
  });
};
