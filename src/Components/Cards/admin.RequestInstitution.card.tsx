import { useState, useEffect } from 'react'
import React from 'react'
import PropTypes from 'prop-types'
import { API } from '../../../config/config'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import LoadingButton from '@mui/lab/LoadingButton'
import Typography from '@mui/material/Typography'
import { axiosAuth as axios, notification } from '../../Utils'

type Props = {
    id: string,
    name: string,
    address: string,
    description: string,
    link: string,
    imagePath: string,
    userID: string
}

export default function AdminRequestInstitutionCard({ id, name, address, description, link, imagePath, userID }: Props) {

    // States
    const [loading, setLoading] = useState<boolean>(false)

    // Functions
    function acceptRequest() {
        setLoading(true)
        axios.post(`${API.baseURL}/institutions/request/accept`, {
            query: {
                _id: id
            }
        }).then((res) => {
            if (!res.data.err) {
                window.location.reload()
            } else {
                notification.custom.error(res.data.err)
            }
        })
    }

    function declineRequest() {
        setLoading(true)
        axios.post(`${API.baseURL}/institutions/request/decline`, {
            query: {
                _id: id
            }
        }).then((res) => {
            if (!res.data.err) {
                window.location.reload()
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
            <Card sx={{ width: '95vw', maxWidth: 500 }} square>
                <CardHeader title={name} subheader={`ID пользователя: ${userID}`} />
                {imagePath != undefined && imagePath != '' && <CardMedia component='img' height="240" image={imagePath} />}
                <CardContent>
                    <Typography variant='body2' color='text.secondary'>
                        Адрес: {address}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        {description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <LoadingButton size='small' variant='contained' onClick={() => { window.open(link, '_blank') }}>ССЫЛКА</LoadingButton>
                    <>
                        <LoadingButton color='success' size='small' variant='contained' loading={loading} onClick={() => { acceptRequest() }}>Принять</LoadingButton>
                        <LoadingButton color='error' size='small' variant='contained' loading={loading} onClick={() => { declineRequest() }}>Отклонить</LoadingButton>
                    </>
                </CardActions>
            </Card>
        </>
    )
}
AdminRequestInstitutionCard.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    address: PropTypes.any,
    description: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    imagePath: PropTypes.string,
    userID: PropTypes.string
}