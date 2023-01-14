import React from 'react'
import { Toaster } from 'react-hot-toast'
import NavigationBar from '../Components/NavigationBar'

export default function MainLayout(props) {
    return (
        <>
            <Toaster />
            <NavigationBar />
            <main>
                {props.children}
            </main>
        </>
    )
}