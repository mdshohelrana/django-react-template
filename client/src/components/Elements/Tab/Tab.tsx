import { Tab } from '@headlessui/react';
import React, { useState } from 'react';

interface TabProps {
  headers: string[];
  handleTabClick: (header: string) => void;
  children: React.ReactNode;
}

export const Tabs: React.FC<TabProps> = ({ headers, handleTabClick, children }) => {
  const [selectedTab, setSelectedTab] = useState('Daily');

  const handleClick = (header: string) => {
    setSelectedTab(header);
    handleTabClick(header);
  };

  return (
    <Tab.Group>
      <Tab.List className="flex text-lg font-bold gap-x-2">
        {headers.map((header, index) => (
          <Tab
            key={index}
            onClick={() => handleClick(header)}
            className={
              selectedTab === header
                ? 'focus:outline-0 focus:border-none font-bold text-primary-turquoise px-8 py-2 rounded-full bg-[#00B7C81A]/10'
                : 'text-[#60656880] px-8 py-2'
            }
          >
            {header}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {headers.map((_, index) => (
          <Tab.Panel key={index}>{React.Children.toArray(children)}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};
