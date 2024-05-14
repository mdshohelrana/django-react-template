import { Bars3Icon } from '@heroicons/react/24/outline';
import React from 'react';
import { FaMoon } from 'react-icons/fa';
import { IoIosSunny } from 'react-icons/io';
import { useThemeStore } from '@/stores/themeStore';
import { Clock } from '../Elements/Clock';
import { MobileSidebar, Sidebar } from '../LayoutComponents';
import { Notifications } from '../LayoutComponents/Notifications';
import { UserNavigation } from '../LayoutComponents/UserNavigation';

type MainLayoutProps = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: MainLayoutProps) => {
  const toggleTheme = useThemeStore((state) => state.toggleTheme);
  const theme = useThemeStore((state) => state.theme);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="h-screen flex overflow-hidden bg-white">
      <MobileSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className={`${theme === 'dark' ? 'bg-dark ' : 'bg-white'} shadow z-[100]`}>
        <Sidebar />
      </div>
      <div className="relative flex flex-col w-0 flex-1 overflow-hidden bg-gray-100">
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white">
          <button
            className={`px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden`}
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className=" h-6 w-6" aria-hidden="true" />
          </button>
          <div
            className={`flex-1 px-4 flex items-center justify-end shadow-sm bg-white text-[#53575A]`}
          >
            <div className="hidden md:block">
              <Clock />
            </div>
            <div className="ml-4 flex items-center justify-center md:ml-6 gap-x-6">
              <div className="w-[1.5px] h-8 bg-[#EBEBF2]"></div>
              {theme === 'dark' ? (
                <IoIosSunny onClick={toggleTheme} className="text-2xl cursor-pointer" />
              ) : (
                <FaMoon onClick={toggleTheme} className="text-2xl cursor-pointer" />
              )}
              <div className="w-[1.5px] h-8 bg-[#EBEBF2]"></div>
              <Notifications />
              <div className="w-[1.5px] h-8 bg-[#EBEBF2]"></div>
              <UserNavigation />
            </div>
          </div>
        </div>
        <main className="flex-1 relative overflow-y-auto focus:outline-none bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};
