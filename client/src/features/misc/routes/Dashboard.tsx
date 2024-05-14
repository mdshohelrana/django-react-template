import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { ContentLayout } from '@/components/Layout';
import { useUser } from '@/lib/auth';
import { useUserStore } from '@/stores/userStore';
import ParkingReport from '../components/SolarReport';
import {
  SolarProductionData,
  SolarPriceData,
  BatteryChart,
} from '../components/Charts';

export const Dashboard = () => {
  const { t } = useTranslation();
  const user = useUser();
  const setUser: any = useUserStore((state) => state.setUser);

  useEffect(() => {
    setUser(user.data);
  }, [user.data]);

  return (
    <ContentLayout title="Dashboard" showTitle>
      <div className="flex flex-col gap-8 w-full mt-4">
        <ParkingReport />
        <div className="grid grid-cols-1 desktop:grid-cols-2 gap-8">
          <SolarProductionData />
          <BatteryChart />
        </div>
        <SolarPriceData />
      </div>
    </ContentLayout>
  );
};
