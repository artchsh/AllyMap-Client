import React from 'react'
import RoutesComponent from './Routes/routes'
import { AuthProvider } from 'react-auth-kit'

export default function App() {
  return (
    <AuthProvider authType={'localstorage'} authName={'_auth'}>
      <RoutesComponent />
    </AuthProvider>
  )
}

