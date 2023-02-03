// System
import React, { Suspense } from 'react';
import { AuthProvider, RequireAuth } from 'react-auth-kit';
import { useRoutes } from 'react-router-dom';

import type { RouteObject } from 'react-router-dom';
import './i18.js';

// Layouts
import MainLayout from '@/Layouts/Main.layout';

// Pages
import Main from '@/Pages/Main';
import Login from '@/Pages/Authentication/Login';
import Register from '@/Pages/Authentication/Register';
import Settings from '@/Pages/Settings';
import Request from '@/Pages/Request';
import Disclaimer from './Pages/Disclaimer.js';

export default function App() {
  const loginPage: string = '/login';

  const routes: RouteObject[] = [
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/disclaimer',
      element: <Disclaimer />
    },
    {
      path: '/',
      element: <RequireAuth loginPath={loginPage}><MainLayout /></RequireAuth>,
      children: [
        {
          index: true,
          element: <Main />,
        },
        {
          path: '/request',
          element: <Request />,
        },
        {
          path: '/settings',
          element: <Settings />,
        },
      ],
    }
  ];

  const router = useRoutes(routes);

  return (
    <Suspense fallback={null}>
      <AuthProvider authType="localstorage" authName="_auth">
        {router}
      </AuthProvider>
    </Suspense>
  );
}
