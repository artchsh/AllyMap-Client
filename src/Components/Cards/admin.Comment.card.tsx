import React, { useState, useEffect } from 'react'

import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import LoadingButton from '@mui/lab/LoadingButton'
import Typography from '@mui/material/Typography'

import { axiosAuth as axios, notification } from '@utils'
import { Comment_Props } from '@declarations'
import { API } from '@config'

export default function AdminCommentCard({ _id, userID, institutionID, content, rate }: Comment_Props) {

    // States
    const [loading, setLoading] = useState<boolean>(false)
    const [user, setUser] = useState<string>('')

    // Functions
    function remove() {
        axios.post(`${API.baseURL}/comments/remove`, { query: { _id } }).then((res) => {
            if (!res.data.err) {
                window.location.reload()
            } else {
                notification.custom.error(res.data.err)
            }

        })
    }

    function getUser() {
        const query: { query: { _id: string } } = { query: { _id: userID } }
        axios.post(`${API.baseURL}/users/find`, query)
            .then((response) => {
                if (!response.data.err) {
                    setUser(response.data.login)
                } else {
                    notification.custom.error(response.data.err)
                }
            })
    }

    useEffect(() => {
        setLoading(false)
        getUser()
    }, [])

    return (
        <Card sx={{ width: '95vw', maxWidth: 250, margin: 1 }}>
            <CardHeader title={user} />
            <CardContent>
                <Typography variant='body2' color='text.secondary'>
                    Rate: {rate}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    Comment ID: {_id}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    User ID: {userID}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    Institution ID: {institutionID}
                </Typography>
                <Typography variant='body2' color='text.secondary'>
                    Comment Text: {content}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton color='error' size='small' variant='contained' fullWidth loading={loading} onClick={() => { remove() }}>Удалить</LoadingButton>
            </CardActions>
        </Card>
    )
}