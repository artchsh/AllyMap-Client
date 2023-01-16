import React from "react"
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import { API } from "../../../config/config"
import { useEffect, useState } from 'react'
import { axiosAuth as axios, notification } from '../../Utils'

export default function ProjectInfoItem() {
    // States
    const [NAME, setName] = useState<string>('')
    const [VERSION, setVersion] = useState<string>('')

    // Functions
    function fetchSettings() {
        axios.get(`${API.baseURL}/config/`).then((response) => {
            if (!response.data.err) {
                setName(response.data.name)
                setVersion(response.data.version)
            } else {
                notification.custom.error(response.data.err)
            }
        })
    }

    useEffect(() => {
        fetchSettings()
    }, [])

    return (
        <div style={{ display: 'flex', flexDirection: 'row', margin: 10 }}>
            {/* <Avatar src={AuthorIcon} /> */}
            <Avatar>{NAME[0]}</Avatar>
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                {NAME}
                <Typography variant='body2' color='text.secondary'>
                    {VERSION}
                </Typography>
            </div>
        </div>
    )
}

