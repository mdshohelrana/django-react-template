import {
  EyeIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { FC } from 'react';

type IconProps = {
  name: string;
  color?: string;
  size?: number;
  className?: string;
  strokeWidth?: number;
};
export const HeroIcon: FC<IconProps> = ({
  name,
  className,
  color = 'white',
  strokeWidth,
}: IconProps) => {
  const getIcon = () => {
    switch (name) {
      case 'plus':
        return <PlusIcon className={className} color={color} />;

      case 'edit':
        return <PencilSquareIcon className={className} color={color} />;

      case 'search':
        return (
          <MagnifyingGlassIcon className={className} color={color} strokeWidth={strokeWidth} />
        );

      case 'eye':
        return <EyeIcon className={className} color={color} strokeWidth={strokeWidth} />;

      default:
        return null;
    }
  };
  return <div>{getIcon()}</div>;
};
