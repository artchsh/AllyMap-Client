import React, { useEffect, useState } from 'react'

import { useAuthUser, useSignOut } from 'react-auth-kit'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import ListItemText from '@mui/material/ListItemText'
import FileCopy from '@mui/icons-material/FileCopy'
import Logout from '@mui/icons-material/Logout'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import styled from "@emotion/styled"
import ListItemAvatar from '@mui/material/ListItemAvatar'
import { motion as m } from 'framer-motion'

import { axiosAuth as axios, notification } from '@utils'
import { API } from '@config'
import PatreonIcon from '@/Images/patreon-app-icon.png'
import MainLayout from '@/Layouts/Main.layout'
import AuthorIcon from '@/Images/author_picture.png'

const Link = styled.a`
    text-decoration: none;
    color: white;
`

export default function Settings() {

    // Setups
    const authStateUser = useAuthUser()
    const signout = useSignOut()
    const user = authStateUser() || {}

    // States
    const [inviteCode, setInviteCode] = useState<string>('')
    const [usersInstututions, setUsersInstututions] = useState<number>(0)
    const [userRequestedInstututions, setUserRequestedInstututions] = useState<number>(0)

    // Functions
    function getAllInstitutions() {
        axios.post(`${API.baseURL}/institutions/find`)
            .then((res) => {
                if (!res.data.err) {
                    let AcceptedInstitutions = []
                    let array = res.data
                    array.map((inst: { userID: string }) => {
                        if (inst.userID == user._id) {
                            AcceptedInstitutions.push(inst)
                        }
                    })
                    setUsersInstututions(AcceptedInstitutions.length)
                } else {
                    notification.custom.error(res.data.err)
                }
            })
        axios.post(`${API.baseURL}/institutions/request/find`)
            .then((res) => {
                if (!res.data.err) {
                    let AcceptedInstitutions = []
                    let array = res.data
                    array.map((inst: { userRequestID: string }) => {
                        if (inst.userRequestID == user._id) {
                            AcceptedInstitutions.push(inst)
                        }
                    })
                    setUserRequestedInstututions(AcceptedInstitutions.length)
                } else {
                    notification.custom.error(res.data.err)
                }
            })
    }

    useEffect(() => {
        setInviteCode(user.inviteCode)
        getAllInstitutions()
    }, [])
    return (
        <m.div className='flex justify-center w-full' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className='max-w-xl'>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => { window.open('https://www.patreon.com/charlzWeb/membership', '_blank') }}>
                            <ListItemIcon>
                                <Avatar src={PatreonIcon} />
                            </ListItemIcon>
                            <ListItemText primary={'Patreon'} secondary='Поддержать проект' />
                        </ListItemButton>
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <ListItemIcon>
                                <FileCopy />
                            </ListItemIcon>
                        </ListItemAvatar>
                        <ListItemText primary={inviteCode} secondary='Инвайт-код для друга' />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <ListItemIcon>
                                <LocationCityIcon />
                            </ListItemIcon>
                        </ListItemAvatar>
                        <ListItemText primary={usersInstututions} secondary='Количество одобренных заведений' />
                    </ListItem>
                    <ListItem>
                        <ListItemAvatar>
                            <ListItemIcon>
                                <LocationCityIcon />
                            </ListItemIcon>
                        </ListItemAvatar>
                        <ListItemText primary={userRequestedInstututions} secondary='Количество заведений в рассмотрении' />
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => { signout() }} sx={{ color: '#eb4034' }}>
                            <ListItemIcon>
                                <Logout color='error' />
                            </ListItemIcon>
                            <ListItemText primary='Выйти из аккаунта' />
                        </ListItemButton>
                    </ListItem>
                </List>
                <div className='flex justify-center items-center mt-5' style={{ marginBottom: 76 }}>
                    <Paper elevation={0} sx={{ background: 'none' }}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', margin: 10, background: 'none' }}>
                                <Avatar src={AuthorIcon} />
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                                    <Link href='https://github.com/bogdanshelest' target="_blank">Charlz</Link>
                                    <Typography variant='body2' color='text.secondary'>
                                        Разработчик и автор проекта
                                    </Typography>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', margin: 10, background: 'none' }}>
                                <Avatar>S</Avatar>
                                <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                                    <Link target="_blank">Senrik_miele</Link>
                                    <Typography variant='body2' color='text.secondary'>
                                        Помощник и тестер сайта
                                    </Typography>
                                </div>
                            </div>
                        </div>
                    </Paper>
                </div>
            </div>
        </m.div>
    )
}