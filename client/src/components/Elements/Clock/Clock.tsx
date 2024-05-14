import * as React from 'react';
import { FaClock } from 'react-icons/fa';

export const Clock = () => {
  const [currentTime, setCurrentTime] = React.useState(new Date());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDay = currentTime.toLocaleDateString(undefined, { weekday: 'long' });
  const formattedDate = currentTime.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex gap-x-2 items-center text-xs md:text-sm lg:text-base">
      <FaClock className="text-[22px]" />
      <p className="text-sm">
        {formattedTime}, {formattedDay}, {formattedDate}
      </p>
    </div>
  );
};
