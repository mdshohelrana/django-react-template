import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { Menu, Transition } from '@headlessui/react';
import { FaUser } from 'react-icons/fa';
import clsx from 'clsx';
import { Option } from '@/components/Form';
import { GrLanguage } from 'react-icons/gr';
import { LuLogOut, LuUser2 } from 'react-icons/lu';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import TRFlag from '@/assets/png/tr.png';
import USFlag from '@/assets/png/us.png';
import { useLogout } from '@/lib/auth';
import { useUserStore } from '@/stores/userStore';
import { AuthUser } from '@/types';
import { useUpdateUserLanguage } from '@/api/updateUserLanguage';

const LANGUAGES: Option[] = [
  {
    id: 1,
    label: 'English',
    value: 'EN',
  },
  {
    id: 2,
    label: 'Finnish',
    value: 'TR',
  },
];

type UserNavigationItem = {
  name: string;
  to: string;
  icon?: React.ReactNode;
  onClick?: () => void;
};

interface UserLanguage {
  id: number;
  language: string;
}

export const UserNavigation = () => {
  const logout = useLogout();
  const profile = useUserStore((state) => state.user);
  const useUpdateUserLanguageMutation = useUpdateUserLanguage();
  const { t } = useTranslation();

  const [name, setName] = useState('');
  const [tooltip, setTooltip] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState({} as any);

  const showTooltip = (profile: AuthUser | null) => {
    if (!profile) return;

    const fullName = `${profile.firstName} ${profile.lastName}`;
    const lang = languages.find((language) => language.id === profile.language);

    if (fullName.length > 20) {
      setName(`${fullName.substring(0, 20)}...`);
      setTooltip(fullName);
    } else {
      setName(fullName);
      setTooltip('');
    }

    setSelectedLanguage(lang);
  };

  useEffect(() => {
    showTooltip(profile);
  }, [profile]);

  const onSelectLanguage = async (lang: any) => {
    i18next.changeLanguage(lang.id);
    setSelectedLanguage(lang);

    const userDataToUpdate: UserLanguage = {
      id: parseInt(profile?.id ?? '0'),
      language: lang.id,
    };

    await useUpdateUserLanguageMutation.mutateAsync(userDataToUpdate);
  };

  const languages = [
    {
      id: LANGUAGES[0].value,
      name: LANGUAGES[0].label,
      flag: USFlag,
    },
    {
      id: LANGUAGES[1].value,
      name: LANGUAGES[1].label,
      flag: TRFlag,
    },
  ];

  const userNavigation = [
    {
      id: 'MY_PROFILE',
      name: t('navigation.profile.change_password'),
      to: '/app/change-password',
      icon: <LuUser2 size={24} className="text-[#53575A]" />,
    },
    {
      id: 'LANGUAGE',
      name: t('form_label.language'),
      to: '#',
      icon: <GrLanguage size={24} className="text-[#53575A]" />,
      onClick: (e: Event) => {
        e.preventDefault();
      },
      languages: languages,
    },
    {
      id: 'LOGOUT',
      name: t('actions.sign_out'),
      to: '',
      icon: <LuLogOut size={24} className="text-[#53575A]" />,
      onClick: () => {
        logout.mutate({});
      },
    },
  ].filter(Boolean) as UserNavigationItem[];

  return (
    <Menu as="div" className="ml-3 relative">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="w-fit p-2 flex items-center text-sm focus:outline-none">
              <span className="sr-only">Open user menu</span>
              <p className="relative group" title={tooltip}>
                {name}
              </p>
              <MdOutlineKeyboardArrowDown
                className={`mt-[1px] mr-[10px] ${open ? 'rotate-180' : 'rotate-0'}`}
                color="#A4AFB7"
                width={12}
                height={7}
              />
              <div className="bg-gray-200 p-1 rounded-full">
                {profile?.photoUrl ? (
                  <img
                    src={profile.photoUrl}
                    alt=""
                    className="w-[30px] h-[30px] rounded-full overflow-hidden object-cover"
                  />
                ) : profile?.firstName ? (
                  <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center bg-gray-400 text-lg text-white">
                    {profile?.firstName[0].toUpperCase()}
                  </div>
                ) : (
                  <FaUser className="w-[30px] h-[30px] bg-gray-500 text-white p-1 rounded-full" />
                )}
              </div>
            </Menu.Button>
          </div>
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
              className="origin-top-right absolute right-0 mt-4 w-56 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            >
              <div className="w-3 h-3 bg-white -top-1 -z-10 absolute right-5 rotate-45"></div>
              {userNavigation.map((item: any) => (
                <Menu.Item key={item.id}>
                  {({ active }) => (
                    <Link
                      onClick={item.onClick}
                      to={item.to}
                      className={clsx(
                        active ? 'bg-gray-100' : '',
                        'border-b border-b-[#E8E8E8] last:border-b-transparent flex gap-x-6 items-center px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      {item.icon && item.icon}
                      {item.id === 'LANGUAGE' ? (
                        <div className="flex items-center justify-between group w-full">
                          {item.name}
                          <div className="relative mr-2">
                            <button
                              className="px-1 bg-[#F3F3F3] text-gray-800 rounded"
                              onClick={(e) => e.preventDefault()}
                            >
                              <span className="flex items-center gap-x-2">
                                <p className="text-[13px]">
                                  {selectedLanguage?.name.slice(0, 3).toUpperCase()}
                                </p>
                                <img
                                  src={selectedLanguage?.flag}
                                  className="w-5 h-[14px] rounded-sm"
                                  alt="us-flag"
                                />
                              </span>
                            </button>
                            <div className="invisible group-hover:visible absolute top-full -right-2 mt-[0.7px] bg-white border border-gray-200 rounded-md shadow-md">
                              <div className="flex flex-col">
                                {item?.languages?.map((lan: any, i: any) => (
                                  <a
                                    key={i}
                                    href="#"
                                    onClick={() => onSelectLanguage(lan)}
                                    className="w-24 px-3 py-0.5 text-gray-800 hover:bg-gray-100"
                                  >
                                    <span className="flex items-center gap-x-2">
                                      <p className="text-[13px]">{lan?.name}</p>
                                      <img src={lan?.flag} className="w-5 h-[14px]" alt="us-flag" />
                                    </span>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        item.name
                      )}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
