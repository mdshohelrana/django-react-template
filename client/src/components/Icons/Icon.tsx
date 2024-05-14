import { FC } from 'react';

import clock_icon from '@/assets/svgs/clock.svg';

type IconProps = {
  name: string;
  className?: string;
};
export const HeroIcon: FC<IconProps> = ({ name, className }: IconProps) => {
  const getIcon = () => {
    switch (name) {
      case 'clock':
        return <img src={clock_icon} className={className} alt="" />;

      default:
        return null;
    }
  };
  return <div>{getIcon()}</div>;
};
