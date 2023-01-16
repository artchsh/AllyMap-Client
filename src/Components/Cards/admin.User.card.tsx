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
    id: string,
    login: string,
    inviteCode: string,
    acceptCode: string
}

export default function UserCard({ id, login, inviteCode, acceptCode }: Props) {
    // States
    const [loading, setLoading] = useState<boolean>(false)

    // Functions
    function remove() {
        axios.post(`${API.baseURL}/users/remove`, { query: { id: id } }).then((res) => {
            if (!res.data.err) {
                location.reload()
            } else {
                notification.custom.error(res.data.err)
            }
        })
    }

    useEffect(() => {
        setLoading(false)
    }, [])
    return (
        <>
            <Card sx={{ width: '95vw', maxWidth: 250 }} square>
                <CardHeader title={login} />
                <CardContent>
                    <Typography variant='body2' color='text.secondary'>
                        ID: {id}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Invite Code: {inviteCode}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Accept Code: {acceptCode}
                    </Typography>
                </CardContent>
                <CardActions>
                    <LoadingButton color='error' size='small' variant='contained' fullWidth loading={loading} onClick={() => { remove() }}>Удалить</LoadingButton>
                </CardActions>
            </Card>
        </>
    )
}
UserCard.propTypes = {
    id: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    inviteCode: PropTypes.string.isRequired,
    acceptCode: PropTypes.string.isRequired
}