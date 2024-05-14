import React from 'react';
import clsx from 'clsx';

import { HeroIcon } from '@/components/Icons/HeroIcon';

interface SearchProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  searchLabel?: string;
  placeholder?: string;
  showSearchIcon?: boolean;
}

const Search: React.FC<SearchProps> = ({
  value,
  onChange,
  className,
  searchLabel = '',
  placeholder = 'Search',
  showSearchIcon = true,
}) => {
  return (
    <div className={`relative ${className}`}>
      <label className={clsx('block font-medium text-gray-700', className)}>{searchLabel}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={clsx(
          'w-full pl-10 pr-2 py-1 rounded-5px border border-[#00B7C8] focus:border-[#00B7C8] focus:outline-[1px] focus:outline-[#00B7C8] focus:outline-offset-0 focus:ring-0 focus:ring-offset-0 bg-[#00B7C8]/10 text-[#00B7C8] placeholder:text-[#00B7C8] h-12',
          className
        )}
        placeholder={placeholder}
      />
      {showSearchIcon && (
        <span className="absolute inset-y-0 left-3 flex items-center pr-3">
          <HeroIcon name="search" className="w-5 h-5" color="#00b7c8" size={5} strokeWidth={2.5} />
        </span>
      )}
    </div>
  );
};

export default Search;
