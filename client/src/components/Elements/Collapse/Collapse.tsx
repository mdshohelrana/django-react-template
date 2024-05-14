import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { ReactNode, useState } from 'react';

interface CollapseProps {
  data: {
    title: string;
    content: ReactNode;
  }[];
}
export const Collapse = ({ data }: CollapseProps) => {
  const [isOpen, setIsOpen] = useState<number>(-1);
  const accordionsData = data;

  const toggle = (idx: number) => {
    setIsOpen((prevIdx) => (prevIdx === idx ? -1 : idx));
  };

  return (
    <div className="rounded-lg font-sans">
      {accordionsData?.map((PerAccordion, idx) => (
        <div key={idx} className="border-b border-gray-500 last-of-type:border-none">
          <button
            type="button"
            onClick={() => toggle(idx)}
            className="flex h-full w-full items-center justify-between py-4 text-left font-medium"
          >
            <p>{PerAccordion.title}</p>
            <span className="rounded-full">
              <ChevronDownIcon
                width={15}
                height={15}
                className={`text-gray-500transition-all duration-300  ${
                  isOpen === idx && '!rotate-180'
                }`}
              />
            </span>
          </button>
          <div
            className={`grid overflow-hidden text-gray-800 transition-all duration-300 ease-in-out dark:text-gray-400 ${
              isOpen === idx ? 'grid-rows-[1fr] pb-3 opacity-100' : 'grid-rows-[0fr] opacity-0'
            }`}
          >
            <div className="overflow-hidden pr-4">{PerAccordion.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
};
