import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { useSolarProductionChart } from '../api/getSolarProductionData';
import { useSolarPriceChart } from '../api/getSolarPriceData';

const SolarProductionData: React.FC = () => {
  const { data: solarProduction } = useSolarProductionChart();
  const [solarData, setSolarData] = useState<any>();

  useEffect(() => {
    if (solarProduction) {
      const mappedData = solarProduction.map((item) => ({
        x: new Date(item.startTime).getTime(),
        y: Number(item.value).toFixed(2),
      }));
      setSolarData(mappedData);
    }
  }, [solarProduction]);

  const options: ApexOptions = {
    chart: {
      id: 'solar-production-data',
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'datetime',
      title: {
        text: 'Time',
      },
    },
    yaxis: {
      title: {
        text: 'MWh/h',
      },
    },
    title: { text: 'Production data of the solar panel' },
    stroke: { curve: 'smooth' },
    legend: { show: true, itemMargin: { vertical: 20 } },
  };
  const series = [
    {
      name: 'Solar Production',
      data: solarData,
    },
  ];
  return <Chart options={options} series={series} type="line" height="480" />;
};

const BatteryChart: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      id: 'battery-charging-recommendations',
      zoom: {
        enabled: true,
      },
    },
    xaxis: {
      categories: Array.from({ length: 111 }, (_, i) => i),
      title: {
        text: 'Battery Level (%)',
      },
      tickAmount: 10,
      labels: {
        maxHeight: 40,
      },
    },
    yaxis: {
      title: {
        text: 'Charging Target (%)',
      },
    },
    title: {
      text: 'Battery Charging Recommendations',
    },
  };

  const calculateCharge = (batteryLevel: number): number => {
    if (batteryLevel < 5) return 0;
    if (batteryLevel >= 105) return 100;
    return 95 - batteryLevel > 0 ? 95 : batteryLevel;
  };

  const series = [
    {
      name: 'Charging Target',
      data: Array.from({ length: 111 }, (_, i) => calculateCharge(i)),
    },
  ];

  return <Chart options={options} series={series} type="line" height="480" />;
};

const SolarPriceData: React.FC = () => {
  const { data: solarPrice } = useSolarPriceChart();
  const [series, setSeries] = useState([]);

  useEffect(() => {
    if (solarPrice) {
      const newSeries: any = Object.keys(solarPrice[0])
        .filter((key) => key !== 'timeDuration')
        .map((key) => ({
          name: key,
          data: solarPrice.map((item: any) => item[key]),
        }));
      setSeries(newSeries);
    }
  }, [solarPrice]);

  const options: ApexOptions = {
    chart: {
      id: 'solar-price',
      zoom: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      type: 'category',
      categories: solarPrice && solarPrice.map((item) => item.timeDuration),
      title: {
        text: 'Time Duration',
      },
      labels: {
        maxHeight: 82,
      },
    },
    yaxis: {
      title: {
        text: 'Price/h',
      },
    },
    title: { text: 'Electricity prices' },
    legend: {
      show: true,
      itemMargin: {
        vertical: 15,
      },
    },
  };

  return <Chart options={options} series={series} type="bar" height="580" />;
};

export { SolarProductionData, BatteryChart, SolarPriceData };
