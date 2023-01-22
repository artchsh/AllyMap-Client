// System
import React from 'react'

import NavigationBar from '@/Components/NavigationBar'

// import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createBrowserRouter, RouterProvider, Outlet, Link, useRoutes, useParams } from "react-router-dom"
import { RequireAuth } from 'react-auth-kit'
import type { RouteObject } from "react-router-dom"

// Layouts
import MainLayout from '@/Layouts/Main.layout'

// Pages
import Main from '@/Pages/Main'
import Login from '@/Pages/Authentication/Login'
import Register from '@/Pages/Authentication/Register'
import Settings from '@/Pages/Settings'
import Request from '@/Pages/Request'

// Admin pages
import RequestInstitutionControl from '@/Pages/Admin/RequestInstitutionsControl'
import InstitutionControl from '@/Pages/Admin/InstitutionsControl'
import AdminIndex from '@/Pages/Admin'
import UsersControl from '@/Pages/Admin/UsersControl'
import SettingsControl from '@/Pages/Admin/SettingsControl'
import CommentsControl from '@/Pages/Admin/CommentsControl'

// export default function RoutesComponent() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path={'/login'} element={<Login />} />
//         <Route path={'/register'} element={<Register />} />
//         <Route path={'/'} element={<RequireAuth loginPath={'/login'}><Main /></RequireAuth>} />
//         <Route path={'/request'} element={<RequireAuth loginPath={'/login'}><Request /></RequireAuth>} />
//         <Route path={'/settings'} element={<RequireAuth loginPath={'/login'}><Settings /></RequireAuth>} />
//         <Route path={'/admin'} element={<RequireAuth loginPath={'/login'}><AdminIndex /></RequireAuth>} />
//         <Route path={'/admin/institution-control'} element={<RequireAuth loginPath={'/login'}><InstitutionControl /></RequireAuth>} />
//         <Route path={'/admin/request-institution-control'} element={<RequireAuth loginPath={'/login'}><RequestInstitutionControl /></RequireAuth>} />
//         <Route path={'/admin/user-control'} element={<RequireAuth loginPath={'/login'}><UsersControl /></RequireAuth>} />
//         <Route path={'/admin/settings'} element={<RequireAuth loginPath={'/login'}><SettingsControl /></RequireAuth>} />
//         <Route path={'/admin/comments'} element={<RequireAuth loginPath={'/login'}><CommentsControl /></RequireAuth>} />
//       </Routes>
//     </BrowserRouter>
//   )
// }



// export default function RoutesComponent() {
//   return (
//     <RouterProvider router={routes} />
//   )
// }

export 