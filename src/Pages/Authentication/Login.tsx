import React from 'react'

import AccountCircle from '@mui/icons-material/AccountCircle'
import Password from '@mui/icons-material/Password'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useNavigate, Link } from 'react-router-dom'
import { useSignIn, useIsAuthenticated } from 'react-auth-kit'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'
import { motion as m } from 'framer-motion'

import { notification } from '@utils'
import { API } from '@config'
import { themeColor } from '@colors'

export default function Login() {

	// Setups
	const navigate = useNavigate()
	const signIn = useSignIn()
	const isAuthenticated = useIsAuthenticated()

	// States
	const [login, setLogin] = React.useState<string>('')
	const [password, setPassword] = React.useState<string>('')

	// Handlers 
	const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(event.target.value)
	}
	const handleLoginChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLogin(event.target.value)
	}

	// Functions
	const userSignIn = () => {
		axios.post(`${API.baseURL}/users/login`, {
			login,
			password
		}).then((response) => {
			if (!response.data.err) {
				if (signIn({
					token: response.data.token,
					expiresIn: response.data.expiresIn,
					tokenType: "Bearer",
					authState: response.data.docs,
				})) {
					location.reload()
					notification.login.success()
				} else {
					notification.server.internalError()
				}
			} else {
				const error = response.data.err
				notification.custom.error(error)
			}
		}).catch((r) => { notification.custom.error('Слишком часто! Попробуйте еще раз через 5 минут') })
	}

	React.useEffect(() => {
		if (isAuthenticated()) {
			navigate('/')
		}

		window.addEventListener("keypress", function (event) {
			if (event.key === "Enter") {
				event.preventDefault()
				let loginButton = document.getElementById("loginbtn")
				loginButton.click()
			}
		})
	}, [])
	return (
		<>
			<Toaster />
			<m.div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
				<div>
					<div className='mb-2'>
						<h1 className='text-2xl'>Вход</h1>
						<p className='text-sm'>Или <Link className='' style={{ color: themeColor[7] }} to={'/register'}>создать новый аккаунт</Link></p>
					</div>
					<div className='flex flex-end items-center mb-2'>
						<AccountCircle className='mr-2' />
						<TextField label="Логин" variant="outlined" onChange={handleLoginChange} />
					</div>
					<div className='flex flex-end items-center mb-4'>
						<Password className='mr-2' />
						<TextField label="Пароль" variant="outlined" type="password" onChange={handlePasswordChange} />
					</div>
					<Button id='loginbtn'
						sx={{ borderColor: themeColor[12], color: themeColor[7], borderRadius: 9999, fontWeight: 500, width: '100%', border: 1 }}
						onClick={userSignIn}>
						Войти
					</Button>
				</div>
			</m.div>
		</>
	)
}