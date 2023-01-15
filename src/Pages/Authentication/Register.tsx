import React from 'react'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Password from '@mui/icons-material/Password'
import Celebration from '@mui/icons-material/Celebration'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useIsAuthenticated } from 'react-auth-kit'
import { useNavigate, Link } from 'react-router-dom'
import { API } from '../../../config/config'
import axios from 'axios'
import { notification } from '../../Utils'
import { Toaster } from 'react-hot-toast'
import { themeColor } from '../../Utils/colors'


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
			<div className='flex justify-center items-center h-screen flex-col'>
				<div>
					<div className='mb-2'>
						<h1 className='text-2xl'>Регистрация</h1>
						<p className='text-sm'>Уже есть аккаунт? <Link className='' style={{ color: themeColor[7] }} to={'/login'}>Войти</Link></p>
					</div>
					<div className='flex flex-end items-center mb-2'>
						<AccountCircle className='mr-2'/>
						<TextField label="Логин" variant="outlined" onChange={handleLoginChange} onBlur={handleOnBlurLoginInput} />
					</div>
					<div className='flex flex-end items-center mb-2'>
						<Password className='mr-2'/>
						<TextField label="Пароль" variant="outlined" type="password" onChange={handlePasswordChange} onBlur={handleOnBlurPasswordInput} />
					</div>
					<div className='flex flex-end items-center mb-2'>
						<Celebration className='mr-2' />
						<TextField label="Инвайт-код" variant="outlined" onChange={handleInviteChange} onBlur={handleOnBlurInviteCodeInput} />
					</div>
					<div className='flex justify-center items-center' style={{ marginTop: 12 }}>
						<Button 
						onClick={register} 
						sx={{ borderColor: themeColor[12], color: themeColor[7], borderRadius: 9999, fontWeight: 500, width: '100%', border: 1 }} 
						variant='outlined' 
						fullWidth 
						disabled={registerButtonDisabled}>
							Зарегистрироваться</Button>
					</div>
				</div>
			</div>
		</>
	)
}