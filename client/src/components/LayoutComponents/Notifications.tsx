import useWebSocket from '@/hooks/useWebSocket';
import storage from '@/utils/storage';
import { WS_URL } from '@/config';
import React, { useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BiSolidBell } from 'react-icons/bi';
import { TfiEmail } from 'react-icons/tfi';
import dayjs from 'dayjs';

export const Notifications = () => {
  const token = storage.getToken();
  const { receivedMessage } = useWebSocket(`${WS_URL}?token=${token}`);

  const [notifications, setNotifications] = useState<any>([]);
  const [unreadNotificationsCount, setUnreadNotificationsCount] = useState(0);

  useEffect(() => {
    setNotifications(receivedMessage?.data);
    if (receivedMessage?.data) {
      setUnreadNotificationsCount(1);
    }
  }, [receivedMessage]);

  return (
    <>
      <Menu as="div" className="relative">
        {({ open }) => (
          <>
            <Menu.Button className="w-fit flex items-center text-sm focus:outline-none">
              <span className="sr-only">Open user menu</span>
              <div className="relative">
                <BiSolidBell className="h-5 w-5" />
                {unreadNotificationsCount > 0 && (
                  <div className="absolute -top-[3px] -right-[3px] h-3 w-3 rounded-full bg-primary-turquoise flex items-center justify-center">
                    <p className="text-white text-[8px]">{unreadNotificationsCount}</p>
                  </div>
                )}
              </div>
            </Menu.Button>
            <Transition
              show={open}
              as={React.Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className="origin-top-right absolute -right-4 mt-[34px] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <div className="w-3 h-3 bg-white -top-1 z-10 absolute right-5 rotate-45"></div>
                <h3 className="text-xl font-bold px-4 pt-4">Notifications</h3>
                <hr className="mt-3" />
                <div className="w-[400px] h-[415px] overflow-auto">
                  {notifications ? (
                    <div className="flex items-center py-3 hover:bg-gray-200 cursor-pointer px-4">
                      <TfiEmail className="text-gray-500 h-6 w-6" />
                      <span className="block h-8 w-[1px] bg-gray-300 mx-4"></span>
                      <Menu.Item>
                        <>
                          <p>{notifications}</p>
                          <span className="text-[11px] mt-0.5">
                            {/* {dayjs(notification.createdAt).format('DD.MM.YYY hh:mm A')} */}
                          </span>
                        </>
                      </Menu.Item>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center mt-5">
                      <p>No notification found</p>
                    </div>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
};
