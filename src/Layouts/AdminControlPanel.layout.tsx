import React from 'react';

import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import SideNavigationBar from '@/Components/admin.SideNavigationBar';

export default function AdminControlPanelLayout() {
  return (
    <>
      <Toaster />
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideNavigationBar />
        <div style={{
          display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '80vh', width: '100%', flexWrap: 'wrap', marginTop: 76,
        }}
        >
          {/* {props.children} */}
          <Outlet />
          <div style={{ width: 1, height: 1, marginTop: 76 }} />
        </div>
      </div>
    </>
  );
}
