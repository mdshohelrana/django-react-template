import { GiClockwiseRotation } from 'react-icons/gi';
import { GiCheckMark } from 'react-icons/gi';
import { PiMapPinLine } from 'react-icons/pi';
import { FaXmark } from 'react-icons/fa6';
import { SolarReportItemProps } from '../types';

const SolarReportItems: React.FC<SolarReportItemProps> = ({ icon, label, value, color }) => {
  const IconComponent = icon;
  return (
    <div className="bg-white rounded-[10px] px-8 desktop:px-6 mid-desktop:px-8 py-6 flex items-center justify-between space-x-3">
      <div className="flex flex-col gap-1.5 text-xl">
        <p className="text-3xl font-extrabold whitespace-nowrap">{value}</p>
        <p className="text-[#606568] whitespace-nowrap desktop:text-sm text-lg 2xl:text-lg">
          {label}
        </p>
      </div>
      <div
        style={{ backgroundColor: `${color}1A` }}
        className="w-[65px] h-[65px] p-[18px] rounded-full"
      >
        {IconComponent && (
          <IconComponent style={{ color: color }} className="h-full w-full" aria-hidden="true" />
        )}
      </div>
    </div>
  );
};

const ParkingReport = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 desktop:grid-cols-4 mid-desktop:grid-cols-4 items-center justify-between gap-8">
      <SolarReportItems icon={PiMapPinLine} label="Avg. production" value={`${333}MWh/h`} color="#00B7C8" />
      <SolarReportItems icon={GiCheckMark} label="Avg. Battery charge" value={`${40}%`} color="#008000" />
      <SolarReportItems icon={FaXmark} label="Avg. Electricity Price" value={`${20}€`} color="#ff0000" />
      <SolarReportItems
        icon={GiClockwiseRotation}
        label="Consumption rate"
        value={`${55}%`}
        color="#ffa500"
      />
    </div>
  );
};

export default ParkingReport;
