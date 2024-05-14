import { lazyImport } from '@/utils/lazyImport';

const { Login } = lazyImport(() => import('@/features/auth/routes/Login'), 'Login');

export const publicRoutes = [
  {
    path: 'auth/*',
    element: <Login />,
  },
];
