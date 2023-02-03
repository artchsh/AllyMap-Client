// System
import React, { Suspense } from 'react';
import { AuthProvider, RequireAuth } from 'react-auth-kit';
import { useRoutes } from 'react-router-dom';

import type { RouteObject } from 'react-router-dom';
import './i18.js';

// Layouts
import MainLayout from '@/Layouts/Main.layout';
import AdminControlPanelLayout from '@/Layouts/AdminControlPanel.layout';

// Pages
import Main from '@/Pages/Main';
import Login from '@/Pages/Authentication/Login';
import Register from '@/Pages/Authentication/Register';
import Settings from '@/Pages/Settings';
import Request from '@/Pages/Request';
import Disclaimer from './Pages/Disclaimer.js';

// Admin pages
import RequestInstitutionControl from '@/Pages/Admin/RequestInstitutionsControl';
import InstitutionControl from '@/Pages/Admin/InstitutionsControl';
import AdminIndex from '@/Pages/Admin';
import UsersControl from '@/Pages/Admin/UsersControl';
import SettingsControl from '@/Pages/Admin/SettingsControl';
import CommentsControl from '@/Pages/Admin/CommentsControl';

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
    },
    {
      path: '/admin',
      element: <RequireAuth loginPath={loginPage}><AdminControlPanelLayout /></RequireAuth>,
      children: [
        {
          index: true,
          element: <AdminIndex />,
        },
        {
          path: '/admin/institution-control',
          element: <InstitutionControl />,
        },
        {
          path: '/admin/request-institution-control',
          element: <RequestInstitutionControl />,
        },
        {
          path: '/admin/user-control',
          element: <UsersControl />,
        },
        {
          path: '/admin/settings',
          element: <SettingsControl />,
        },
        {
          path: '/admin/comments',
          element: <CommentsControl />,
        },
      ],
    },
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
