import { useQuery } from '@tanstack/react-query';
import { axios } from '@/lib/axios';
import { ExtractFnReturnType, QueryConfig } from '@/lib/react-query';
import { SolarPrice, SolarPriceDTO } from '../types';

const SOLAR_PRODUCTION_URL = '/solar-panel/charging-prices/';

export const getSolarPriceData = async (): Promise<SolarPrice[]> => {
  try {
    const { data } = await axios.get<SolarPrice[]>(SOLAR_PRODUCTION_URL);

    const items = data.map((item: any) => {
      const {
        time_duration: timeDuration,
        dk1_eur: dk1Eur,
        dk2_eur: dk2Eur,
        fi_eur: fiEur,
        no1_eur: no1Eur,
      } = item;

      return {
        timeDuration,
        dk1Eur,
        dk2Eur,
        fiEur,
        no1Eur,
      };
    });

    return items;
  } catch (error) {
    console.error('Error occurred while fetching solar production data:', error);
    throw new Error('Failed to fetch solar production data');
  }
};

type QueryFnType = typeof getSolarPriceData;

type useSolarPriceChartOptions = {
  config?: QueryConfig<QueryFnType>;
};

export const useSolarPriceChart = ({ config }: useSolarPriceChartOptions = {}) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    ...config,
    queryKey: ['solar-price'],
    queryFn: getSolarPriceData,
  });
};
