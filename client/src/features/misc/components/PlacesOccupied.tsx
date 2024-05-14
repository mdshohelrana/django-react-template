import { LineChart } from '@/components/Elements/Chart';
import { BarChart } from '@/components/Elements/Chart/BarChart';
import { useEffect, useState } from 'react';
import { useLineChartPlacesOccupied } from '../api/getLineChartPlacesOccupied';
import { LineChartPlacesOccupied } from '../types';
import { useBarChartPlacesOccupied } from '../api/getBarChartPlacesOccupied';

const PlacesOccupied = () => {
  const getMutation = useLineChartPlacesOccupied();
  const { data: barChartData } = useBarChartPlacesOccupied();
  const [selected, setSelected] = useState<string>('daily');
  const [data, setData] = useState<LineChartPlacesOccupied>({
    time: [],
    values: [],
  });

  const handleSelected = (selected: string) => {
    setSelected(selected);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getMutation.mutateAsync(selected);
        data &&
          setData({
            time: data.time.map((time: number) => time + 1),
            values: data.values.map((value: number) => Number(value.toFixed(2))),
          });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selected]);

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg flex flex-col overflow-hidden py-4 px-7">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">Places occupied</h3>
          <div className="flex space-x-1">
            <button
              className={`rounded-full px-3 py-1 text-sm ${
                selected === 'monthly'
                  ? 'bg-[#00B7C81A] text-primary-turquoise font-bold'
                  : 'text-[#60656880]/50 font-medium'
              }`}
              onClick={() => handleSelected('monthly')}
            >
              Monthly
            </button>
            <button
              className={`rounded-full px-3 py-1 text-sm ${
                selected === 'weekly'
                  ? 'bg-[#00B7C81A] text-primary-turquoise font-bold'
                  : 'text-[#60656880]/50 font-medium'
              }`}
              onClick={() => handleSelected('weekly')}
            >
              Weekly
            </button>
            <button
              className={`rounded-full px-3 py-1 text-sm ${
                selected === 'daily'
                  ? 'bg-[#00B7C81A] text-primary-turquoise font-bold'
                  : 'text-[#60656880]/50 font-medium'
              }`}
              onClick={() => handleSelected('daily')}
            >
              Today
            </button>
          </div>
        </div>
        <div className="min-h-[335px]">
          <LineChart
            categories={data.time}
            series={[
              {
                name: 'places occupied',
                data: data?.values,
              },
            ]}
          />
        </div>
      </div>
      <div className="relative bg-white rounded-lg shadow-lg flex flex-col overflow-hidden py-4 px-7">
        <h3 className="font-bold text-lg absolute top-4 left-7">Places occupied</h3>
        <BarChart
          categories={[
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ]}
          seriesData={[
            {
              name: 'Subscriber',
              data: barChartData?.subscribers,
              color: '#F54B32',
            },
            {
              name: 'Non Subscribers',
              data: barChartData?.nonSubscribers,
              color: '#FFCC5A',
            },
            {
              name: 'Short Term Parking',
              data: barChartData?.shortTermParking,
              color: '#00B7C8',
            },
          ]}
        />
      </div>
    </>
  );
};

export default PlacesOccupied;
