import { Dialog, Transition } from '@headlessui/react';
import React from 'react';
import { RiContractLeftLine } from 'react-icons/ri';
import { useThemeStore } from '@/stores/themeStore';
import { NavLinks } from '../LayoutComponents';
import { Link } from 'react-router-dom';
import logo from '@/assets/svgs/login_logo.svg';
import logo_menu_collapse from '@/assets/svgs/logo_menu_collapse.svg';
import logo_white from '@/assets/svgs/logo_white.svg';
import logo_white_menu_collapse from '@/assets/svgs/logo_white_menu_collapse.svg';
import logo_hytrade from '@/assets/png/login_logo.png';
import logo_hytrade_dark from '@/assets/png/logo_hytrade_dark.png';

const Logo = ({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen?: boolean;
  setIsSidebarOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <div className="relative w-full flex items-center justify-between">
      {theme === 'dark' ? (
        <Link className="pl-0.5 flex items-center" to="/app">
          <img
            className={`h-12 w-auto hidden md:block`}
            src={isSidebarOpen ? logo_hytrade_dark : logo_white_menu_collapse}
            alt="Dashboard"
          />
        </Link>
      ) : (
        <Link className="pl-0.5 flex items-center" to="/app">
          <img
            className={`h-12 w-auto hidden md:block`}
            src={isSidebarOpen ? logo_hytrade : logo_menu_collapse}
            alt="Dashboard"
          />
        </Link>
      )}
      <button
        type="button"
        className={`${
          theme === 'dark' ? 'bg-dark border-gray-400' : 'bg-white border-gray-200'
        } hidden w-8 h-8 md:flex items-center justify-center cursor-pointer absolute -right-[15px] border rounded-lg shadow-sm hover:shadow-xl`}
        onClick={() => setIsSidebarOpen && setIsSidebarOpen((prev) => !prev)}
      >
        <RiContractLeftLine
          size={10}
          className={`${
            theme === 'dark' ? 'text-white' : 'text-primary-light-gray'
          } w-3/4 h-3/4 hover:text-primary-turquoise transition-transform duration-300 ${
            isSidebarOpen ? 'rotate-0' : 'rotate-180'
          }`}
        />
      </button>
    </div>
  );
};

type MobileSidebarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const MobileSidebar = ({ sidebarOpen, setSidebarOpen }: MobileSidebarProps) => {
  const theme = useThemeStore((state) => state.theme);

  return (
    <Transition.Root show={sidebarOpen} as={React.Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 flex z-40 md:hidden"
        open={sidebarOpen}
        onClose={setSidebarOpen}
      >
        <Transition.Child
          as={React.Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
        </Transition.Child>
        <Transition.Child
          as={React.Fragment}
          enter="transition ease-in-out duration-300 transform"
          enterFrom="-translate-x-full"
          enterTo="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leaveFrom="translate-x-0"
          leaveTo="-translate-x-full"
        >
          <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-gray-800">
            <Transition.Child
              as={React.Fragment}
              enter="ease-in-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="absolute top-0 right-0 -mr-12 pt-2">
                <button
                  type="button"
                  className={`${
                    theme === 'dark' ? 'bg-dark border-gray-400' : 'bg-white border-gray-200'
                  }  w-10 h-10 flex items-center justify-center cursor-pointer absolute right-7 border rounded-lg shadow-sm hover:shadow-xl`}
                  onClick={() => setSidebarOpen && setSidebarOpen((prev) => !prev)}
                >
                  <RiContractLeftLine
                    size={9}
                    className={`${
                      theme === 'dark' ? 'text-white' : 'text-primary-light-gray'
                    } w-3/4 h-3/4 hover:text-primary-turquoise transition-transform duration-300 ${
                      sidebarOpen ? 'rotate-0' : 'rotate-180'
                    }`}
                  />
                </button>
              </div>
            </Transition.Child>
            <div className="flex-shrink-0 flex items-center px-4">
              <Logo />
            </div>
            <div className="mt-5 flex-1 h-0">
              <nav className="px-2 space-y-1">
                <NavLinks />
              </nav>
            </div>
          </div>
        </Transition.Child>
        <div className="flex-shrink-0 w-14" aria-hidden="true"></div>
      </Dialog>
    </Transition.Root>
  );
};

export const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const theme = useThemeStore((state) => state.theme);

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div
        className={`flex flex-col transition-all ease-out duration-300 ${
          isSidebarOpen ? 'w-60' : 'w-14'
        }`}
      >
        <div className="flex flex-col h-0 flex-1">
          <div
            className={`${
              theme === 'dark' ? 'bg-dark' : 'bg-white'
            } flex items-center h-16 flex-shrink-0 pl-4`}
          >
            <Logo isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          </div>
          <div className="flex-1 flex flex-col">
            <nav className="flex-1 py-4 space-y-1 rounded-br-xl">
              <NavLinks isSidebarOpen={isSidebarOpen} />
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};
