import React from 'react'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Password from '@mui/icons-material/Password'
import Celebration from '@mui/icons-material/Celebration'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import { useIsAuthenticated } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'
import { API } from '../../../config/config'
import axios from 'axios'
import { notification } from '../../Utils'
import { Toaster } from 'react-hot-toast'
import ProjectInfoItem from '../../Components/items/ProjectInfoItem'
import Typography from '@mui/material/Typography'

export default function Register() {
	// Setups
	const navigate = useNavigate()
	const isAuthenticated = useIsAuthenticated()

	// States
	const [login, setLogin] = React.useState('')
	const [password, setPassword] = React.useState('')
	const [inviteCode, setInviteCode] = React.useState('')
	const [registerButtonDisabled, setRegisterButtonDisabled] = React.useState(false)

	// States
	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value)
		setRegisterButtonDisabled(false)
	}
	const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLogin(event.target.value)
		setRegisterButtonDisabled(false)
	}
	const handleInviteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInviteCode(event.target.value)
		setRegisterButtonDisabled(false)
	}

	// Functions
	const register = () => {
		if (login == '' || password == '' || inviteCode == '') {
			notification.custom.error('Заполните все поля')
			setRegisterButtonDisabled(true)
			return null
		}
		axios.post(`${API.baseURL}/users/register`, {
			login,
			password,
			inviteCode
		}).then((response: { data: { err: string } }) => {
			if (!response.data.err) {
				navigate('/login')
			} else {
				notification.custom.error(response.data.err)
			}
			return null
		})
	}

	function handleOnBlurLoginInput() {
		axios.post(`${API.baseURL}/users/find`, { query: { login } }).then((res) => {
			if (!res.data.err) {
				if (res.data.login == login) {
					notification.custom.error('Такой логин уже существует')
					setRegisterButtonDisabled(true)
				}
			} else {
				notification.custom.success('Этот логин можно использовать')
			}
		})
	}

	function handleOnBlurPasswordInput() {
		if (password.length < 7 || password == '') {
			notification.custom.error('Пароль слишком короткий')
			setRegisterButtonDisabled(true)
		}
	}

	function handleOnBlurInviteCodeInput() {
		if (inviteCode.length != 8 || inviteCode == '') {
			notification.custom.error('Неверный инвайт-код')
			setRegisterButtonDisabled(true)
		}
	}

	React.useEffect(() => {
		if (isAuthenticated()) {
			navigate('/')
		}
	}, [])
	return (
		<>
			<Toaster />
			<Paper sx={{ position: 'absolute', top: 0, width: '100%' }} elevation={1} square>
				<ProjectInfoItem />
			</Paper>
			<Paper className='flex justify-center items-center h-screen flex-col'>
				<div>
					<Typography variant='h5' gutterBottom className='bg-zinc-800 rounded-md flex justify-center p-3'>Регистрация</Typography>
					<Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: 0.5 }}>
						<AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
						<TextField id="input-login" label="Логин" variant="standard" onChange={handleLoginChange} onBlur={handleOnBlurLoginInput} />
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: 0.5 }}>
						<Password sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
						<TextField id="input-password" label="Пароль" variant="standard" type="password" onChange={handlePasswordChange} onBlur={handleOnBlurPasswordInput} />
					</Box>
					<Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: 0.5 }}>
						<Celebration sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
						<TextField id="input-invite-code" label="Инвайт-код" variant="standard" onChange={handleInviteChange} onBlur={handleOnBlurInviteCodeInput} />
					</Box>
					<div className='flex justify-center items-center' style={{ marginTop: 12 }}>
						<Button onClick={register} size="small" variant='contained' fullWidth disabled={registerButtonDisabled}>Зарегистрироваться</Button>
					</div>
				</div>
			</Paper>
		</>
	)
}