import * as React from 'react';

import { Head } from '../Head';

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
  showTitle?: boolean;
};

export const ContentLayout = ({ children, title, showTitle = false }: ContentLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <div className="py-5">
        {showTitle && (
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-5 italic heading">{title}</h1>
          </div>
        )}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 md:px-[30px]">{children}</div>
      </div>
    </>
  );
};
