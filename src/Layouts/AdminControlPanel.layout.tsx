import React from 'react'

import SideNavigationBar from '@/Components/admin.SideNavigationBar'
import { Toaster } from 'react-hot-toast'

export default function AdminControlPanelLayout(props) {

    return (
        <>
            <Toaster />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <SideNavigationBar />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '80vh', width: '100%', flexWrap: 'wrap', marginTop: 76 }}>
                    {props.children}
                    <div style={{ width: 1, height: 1, marginTop: 76 }} />
                </div>
            </div>
        </>
    )
}