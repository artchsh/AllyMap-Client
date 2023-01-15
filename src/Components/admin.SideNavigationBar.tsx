import * as React from 'react'

import PersonIcon from '@mui/icons-material/Person'
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined'
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined'
import Home from '@mui/icons-material/Home'
import LocationCityIcon from '@mui/icons-material/LocationCity'

import { useNavigate } from 'react-router-dom'
import { useAuthUser } from 'react-auth-kit'
import { themeColor } from '../Utils/colors'
import { axiosAuth as axios, notification } from '../Utils'
import { API } from '../../config/config'

const pages: Array<Array<String>> = [
    ['Comments', '/admin/comments'],
    ['Users', '/admin/user-control'],
    ['Institutions', '/admin/institution-control'],
    ['Requests', '/admin/request-institution-control'],

]

const pages2: Array<Array<String>> = [
    ['Main', '/admin'],
    ['Settings', '/admin/settings'],
    ['Home', '/']
]

const pagesPaths: Array<String> = [
    '/admin/comments',
    '/admin/user-control',
    '/admin/institution-control',
    '/admin/request-institution-control',

]

const pagesPaths2: Array<String> = [
    '/admin',
    '/admin/settings',
    '/'
]

export default function NavigationBar() {
    // States
    const [currentPageIndex, setCurrentPageIndex] = React.useState<number>(0)
    const [currentPageIndex2, setCurrentPageIndex2] = React.useState<number>(0)

    // Setups
    const navigate = useNavigate()
    const authStateUser = useAuthUser()
    const user: { _id?: string } | null = authStateUser() || {}

    // Functions
    function fetchAdmins() {
        axios.get(`${API.baseURL}/config/`).then((response) => {
            if (!response.data.err) {
                const ADMINS = response.data.admins
                const isAdmin = ADMINS.includes(user._id)
                if (!isAdmin) { navigate('/') }
            } else {
                notification.custom.error(response.data.err)
            }
        })
    }

    function activeStyle(index: number, currentPageIndex: number) {
        // if (index == parseInt(page)) {
        if (index == currentPageIndex) {
            return { backgroundColor: themeColor[5], borderRadius: 16, paddingLeft: 12, paddingRight: 12 }
        } else {
            return {}
        }
    }

    function activeStyle2(index: number, currentPageIndex: number) {
        // if (index == parseInt(page)) {
        if (index == currentPageIndex) {
            return { backgroundColor: themeColor[5], borderRadius: 16, paddingLeft: 12, paddingRight: 12 }
        } else {
            return {}
        }
    }

    React.useEffect(() => {
        fetchAdmins()
        setCurrentPageIndex(pagesPaths.indexOf(location.pathname))
        setCurrentPageIndex2(pagesPaths2.indexOf(location.pathname))
    }, [])

    return (
        <>
            <div className='fixed top-0 left-0 right-0 w-scree z-50' style={{ height: 76, backgroundColor: themeColor[3] }}>
                <div className='flex flex-row items-center justify-around h-full'>
                    {pages.map((page: string[], index: number) => (
                        <button key={index} onClick={() => { navigate(page[1]) }}>
                            <div className='flex flex-col justify-center items-center'>
                                <div style={activeStyle(index, currentPageIndex)}>
                                    {index == 0 && <CommentOutlinedIcon />}
                                    {index == 1 && <PersonIcon />}
                                    {index == 2 && <LocationCityIcon />}
                                    {index == 3 && <LibraryAddCheckOutlinedIcon />}
                                </div>
                                <label>{page[0]}</label>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className='fixed bottom-0 left-0 right-0 w-scree z-50' style={{ height: 76, backgroundColor: themeColor[3] }}>
                <div className='flex flex-row items-center justify-around h-full'>
                    {pages2.map((page: string[], index: number) => (
                        <button key={index} onClick={() => { navigate(page[1]) }}>
                            <div className='flex flex-col justify-center items-center'>
                                <div style={activeStyle2(index, currentPageIndex2)}>
                                    {index == 0 && <Home />}
                                    {index == 1 && <SettingsOutlinedIcon />}
                                    {index == 2 && <ArrowBackOutlinedIcon />}
                                </div>
                                <label>{page[0]}</label>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}