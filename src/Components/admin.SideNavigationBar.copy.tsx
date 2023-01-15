import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { axiosAuth as axios, notification } from '../Utils'
import { useAuthUser } from 'react-auth-kit'
import { API } from '../../config/config'
import styled from 'styled-components'
import HomeIcon from '@mui/icons-material/Home'
import PersonIcon from '@mui/icons-material/Person'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import CommentIcon from '@mui/icons-material/Comment'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import SettingsIcon from '@mui/icons-material/Settings'
import ProjectInfoItem from './items/ProjectInfoItem'

const LeftSpacer = styled.div`
    width: 1px;
    height: 1px;
    margin: 129px;
`

export default function SideNavigationBar() {
    // Setups
    const navigate = useNavigate()
    const user = useAuthUser()

    // Functions
    function navigateAdminPanel(value: number) {
        switch (value) {
            case 0:
                navigate('/admin')
                break
            case 1:
                navigate('/admin/user-control')
                break
            case 2:
                navigate('/admin/institution-control')
                break
            case 3:
                navigate('/admin/request-institution-control')
                break
            case 4:
                navigate('/admin/comments')
                break
            case 5:
                navigate('/admin/settings')
                break
            case 6:
                navigate('/')
                break
        }
    }

    function fetchAdmins() {
        axios.get(`${API.baseURL}/config/`).then((response) => {
            if (!response.data.err) {
                const ADMINS = response.data.admins
                const isAdmin = ADMINS.includes(user()._id)
                if (!isAdmin) { navigate('/') }
            } else {
                notification.custom.error(response.data.err)
            }
        })
    }

    useEffect(() => {
        fetchAdmins()
    }, [])
    return (
        <>
            <LeftSpacer />
            <Paper sx={{ height: '100vh', position: 'fixed', left: 0, top: 0 }} elevation={4} square>
                <ProjectInfoItem />
                <ListItemButton onClick={() => { navigateAdminPanel(0) }}>
                    <ListItemIcon>
                        <HomeIcon />
                    </ListItemIcon>
                    <ListItemText primary="Главная" />
                </ListItemButton>
                <ListItemButton onClick={() => { navigateAdminPanel(1) }}>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Пользователи" />
                </ListItemButton>
                <ListItemButton onClick={() => { navigateAdminPanel(2) }}>
                    <ListItemIcon>
                        <LocationCityIcon />
                    </ListItemIcon>
                    <ListItemText primary="Заведения" />
                </ListItemButton>
                <ListItemButton onClick={() => { navigateAdminPanel(3) }}>
                    <ListItemIcon>
                        <LocationCityIcon />
                    </ListItemIcon>
                    <ListItemText primary="Запросы на заведения" />
                </ListItemButton>
                <ListItemButton onClick={() => { navigateAdminPanel(4) }}>
                    <ListItemIcon>
                        <CommentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Комментарии" />
                </ListItemButton>
                <ListItemButton onClick={() => { navigateAdminPanel(5) }}>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Настройки" />
                </ListItemButton>
                <ListItemButton onClick={() => { navigateAdminPanel(6) }}>
                    <ListItemIcon>
                        <ArrowBackIcon />
                    </ListItemIcon>
                    <ListItemText primary="Назад" />
                </ListItemButton>

            </Paper>
        </>
    )

}