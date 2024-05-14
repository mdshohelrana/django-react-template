import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillAppstore } from 'react-icons/ai';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa6';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate, NavLink } from 'react-router-dom';

import { useLogout } from '@/lib/auth';
import { useThemeStore } from '@/stores/themeStore';

type NavLinkItem = {
  name: string;
  to: string;
  subMenu?: NavLinkItem[];
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
};

export const NavLinks = ({ isSidebarOpen }: { isSidebarOpen?: boolean }) => {
  const logout = useLogout();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const theme = useThemeStore((state) => state.theme);

  const navigation = [
    { name: t('navigation.sidebar.dashboard'), to: '.', icon: AiFillAppstore },
    { name: t('navigation.sidebar.menu_1'), to: '', icon: AiFillAppstore },
    { name: t('navigation.sidebar.menu_2'), to: '', icon: AiFillAppstore },
    { name: t('navigation.sidebar.menu_3'), to: '', icon: AiFillAppstore },
    { name: t('navigation.sidebar.menu_4'), to: '', icon: AiFillAppstore },
    { name: t('navigation.sidebar.menu_5'), to: '', icon: AiFillAppstore },
    { name: t('navigation.sidebar.menu_6'), to: '', icon: AiFillAppstore },
  ].filter(Boolean) as NavLinkItem[];

  const handleRoute = (menuItem: string) => {
    if (menuItem) {
      navigate(menuItem);
    }
  };

  return (
    <>
      {navigation.map((item, navIndex) => (
        <div key={navIndex} className="relative z-50">
          <NavLink
            end={navIndex === 0}
            key={item.name}
            to={item.to}
            onClick={(e) => !item.to && e.preventDefault()}
            className={({ isActive }) =>
              clsx(
                `relative group ${
                  theme === 'dark' ? 'text-white' : 'text-primary-dark-gray'
                } hover:text-primary-turquoise`,
                'group flex items-center py-2 pl-4 text-base font-medium rounded-r-md',
                isActive &&
                  item.to &&
                  'bg-gradient-to-r from-primary-turquoise/30 from-10% via-transparent via-80% to-transparent to-10% !text-primary-turquoise'
              )
            }
          >
            <item.icon className={clsx('mr-4 flex-shrink-0 h-6 w-6')} aria-hidden="true" />
            <div className={`w-full flex items-center justify-between whitespace-nowrap group`}>
              <p className="md:hidden">{item.name}</p>
              {isSidebarOpen && (
                <>
                  <p>{item.name}</p>
                  {item?.subMenu?.length && item?.subMenu?.length > 0 && (
                    <div className="pr-4">
                      <FaChevronDown size={10} className="group-hover:hidden" />
                      <FaChevronRight size={10} className="hidden group-hover:block" />
                    </div>
                  )}
                </>
              )}
            </div>

            {item?.subMenu?.length && item?.subMenu?.length > 0 && (
              <div
                className={`${
                  theme === 'dark'
                    ? '!text-white bg-dark'
                    : 'text-black bg-white border-1 border-opacity-90 border-gray-400 shadow-lg'
                } transition-colors duration-300 cursor-default absolute ${
                  navIndex < navigation.length - 2 ? 'top-0' : 'bottom-0'
                } -right-[270px] hidden hover:block group-hover:block rounded-xl gap-y-5 w-[250px]`}
              >
                {item?.subMenu?.map((menuItem, index) => (
                  <div key={index}>
                    <div onClick={() => handleRoute(menuItem.to)} key={index}>
                      <div className="relative z-[500] group">
                        {index ===
                          (navIndex < navigation.length - 2
                            ? 0
                            : item.subMenu
                            ? item.subMenu.length - 1
                            : 0) && (
                          <div
                            className={`${
                              theme === 'dark' ? 'bg-dark' : 'bg-white'
                            } absolute top-4 -left-[6px] w-3 h-3 rotate-45`}
                          ></div>
                        )}
                        <div
                          className={`absolute z-10 top-0 -left-7 w-7 h-full bg-transparent`}
                        ></div>
                        <p
                          className={`${
                            theme === 'dark'
                              ? 'hover:bg-white/20 text-white'
                              : 'hover:bg-gray-200 text-gray-600'
                          } relative z-20 py-2 px-5 cursor-pointer font-normal border-transparent  ${
                            index === 0
                              ? 'rounded-t-xl'
                              : index === (item?.subMenu?.length as number) - 1
                              ? 'rounded-b-xl'
                              : ''
                          }`}
                        >
                          {menuItem.name}
                        </p>
                      </div>
                    </div>
                    {item && item.subMenu && index !== item?.subMenu?.length - 1 && (
                      <hr className={`${theme === 'dark' ? "'bg-white" : 'bg-gray-100'} h-[1px]`} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </NavLink>
        </div>
      ))}
      <button
        className={` ${
          theme === 'dark' ? 'text-red-500' : 'text-primary-dark-gray'
        }  hover:text-primary-turquoise flex items-center py-2 pl-4 flex-nowrap text-base font-medium`}
        onClick={() => logout.mutate({})}
      >
        <FiLogOut className="mr-4 flex-shrink-0 h-6 w-6" />
        {isSidebarOpen && <span className="whitespace-nowrap">{t('actions.sign_out')}</span>}
      </button>
    </>
  );
};
