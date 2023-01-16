import { useState, useEffect } from 'react'
import React from 'react'
import PropTypes from 'prop-types'
import { API } from '../../../config/config'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import LoadingButton from '@mui/lab/LoadingButton'
import Typography from '@mui/material/Typography'
import { axiosAuth as axios, notification } from '../../Utils'

type Props = {
    commentID: string,
    userID: string,
    institutionID: string,
    text: string,
    rate: string
}

export default function AdminCommentCard({ commentID, userID, institutionID, text, rate }: Props) {
    // States
    const [loading, setLoading] = useState<boolean>(false)
    const [user, setUser] = useState<string>('')

    // Functions
    function remove() {
        axios.post(`${API.baseURL}/comments/remove`, { query: { _id: commentID } }).then((res) => {
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
        <>
            <Card sx={{ width: '95vw', maxWidth: 250, margin: 1 }}>
                <CardHeader title={user} />
                <CardContent>
                    <Typography variant='body2' color='text.secondary'>
                        Rate: {rate}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Comment ID: {commentID}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        User ID: {userID}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Institution ID: {institutionID}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Comment Text: {text}
                    </Typography>
                </CardContent>
                <CardActions>
                    <LoadingButton color='error' size='small' variant='contained' fullWidth loading={loading} onClick={() => { remove() }}>Удалить</LoadingButton>
                </CardActions>
            </Card>
        </>
    )
}
AdminCommentCard.propTypes = {
    commentID: PropTypes.string.isRequired,
    userID: PropTypes.string.isRequired,
    institutionID: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
}