import { FC } from 'react';

type IconProps = {
  name: string;
  color?: string;
  size?: number;
  className?: string;
};
export const DXHIcon: FC<IconProps> = ({ name }) => {
  const getIcon = () => {
    switch (name) {
      default:
        return null;
    }
  };
  return <div>{getIcon()}</div>;
};
