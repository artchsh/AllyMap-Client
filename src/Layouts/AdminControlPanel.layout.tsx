import React from 'react'
import SideNavigationBar from '../Components/admin.SideNavigationBar'
import { Toaster } from 'react-hot-toast'

export default function AdminControlPanelLayout(props) {
    return (
        <>
            <Toaster />
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <SideNavigationBar />
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%', flexWrap: 'wrap' }}>
                    {props.children}
                </div>
            </div>
        </>
    )
}