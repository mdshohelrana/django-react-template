import i18next from 'i18next';
import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

import { Login } from '@/features/auth/routes/Login';
import { Register } from '@/features/auth/routes/Register';
import { NotFound } from '@/features/misc';
import { useUser } from '@/lib/auth';
import { useUserStore } from '@/stores/userStore';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const user = useUser();
  const setUser: any = useUserStore((state) => state.setUser);

  useEffect(() => {
    const storedLanguage = localStorage.getItem('i18nextLng');
    const lang = user.data?.language || 'EN';

    if (storedLanguage !== lang) {
      i18next.changeLanguage(lang);
    }

    setUser(user.data);
  }, [user.data]);

  const commonRoutes = [
    { path: '/', element: <Login /> },
    { path: '/register', element: <Register /> },
  ];
  const routes = user.data ? protectedRoutes : publicRoutes;

  const element = useRoutes([
    ...routes,
    ...commonRoutes,
    user.data ? { path: '/*', element: <NotFound /> } : { path: '/', element: <Login /> },
  ]);

  return <>{element}</>;
};
