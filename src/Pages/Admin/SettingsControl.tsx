import React from 'react'
import { useState, useEffect } from 'react'
import { API } from '../../../config/config'
import { axiosAuth as axios, notification } from '../../Utils'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import AdminControlPanelLayout from '../../Layouts/AdminControlPanel.layout'

export default function SettingsControl() {
    // States
    const [name, setName] = useState<string>('')
    const [version, setVersion] = useState<string>('')
    const [admins, setAdmins] = useState<string[]>([])
    const [disableSaveButton, setDisableSaveButton] = useState<boolean>(true)

    // Functions
    function getConfig() {
        axios.get(`${API.baseURL}/config/`).then((res) => {
            if (!res.data.err) {
                setName(res.data.name)
                setVersion(res.data.version)
                setAdmins(res.data.admins)
            } else {
                notification.custom.error(res.data.err)
            }
        })
    }

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        let adminsE: Array<string> = data.get('admins').toString().split(',')
        if (adminsE.includes('639f32ed1e7c8b26f1bceaac')) { } else {
            adminsE.push('639f32ed1e7c8b26f1bceaac')
        }
        axios.post(`${API.baseURL}/config/update`, {
            name: data.get('name'),
            version: data.get('version'),
            admins: adminsE
        }).then((res) => {
            if (!res.data.err) {
                location.reload()
            } else {
                notification.custom.error(res.data.err)
            }
        })
    }

    function loadInputs() {
        let adminsString = ''
        for (let i = 0; i < admins.length; i++) {
            if (i == admins.length - 1) {
                adminsString += admins[i]
            } else {
                adminsString += admins[i] + ','
            }
        }
        document.getElementById('name').value = name
        document.getElementById('version').value = version
        document.getElementById('admins').value = adminsString
        setDisableSaveButton(false)
    }

    useEffect(() => {
        getConfig()
    }, [])

    return (
        <AdminControlPanelLayout>
            <Box component="form" noValidate onSubmit={handleSubmit} className='p-4'>
                <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Имя проекта"
                    name="name"
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    required
                    fullWidth
                    name="version"
                    label="Версия"
                    type="version"
                    id="version"
                />
                <TextField
                    InputLabelProps={{ shrink: true }}
                    margin="normal"
                    required
                    fullWidth
                    name="admins"
                    label="Админы (перечислите ID пользователей через запятые без пробелов)"
                    type="admins"
                    id="admins"
                />
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <Button
                        type="submit"
                        color="success"
                        fullWidth
                        variant="contained"
                        size='small'
                        sx={{ mt: 2, mb: 2 }}
                        disabled={disableSaveButton}>
                        Сохранить
                    </Button>
                    <Button type="button" fullWidth variant="contained" onClick={() => { loadInputs() }} sx={{ mt: 2, mb: 2, ml: 1 }} >
                        Загрузить текущие настройки...
                    </Button>
                </div>
            </Box>
        </AdminControlPanelLayout>
    )
}