import * as React from 'react'
import AccountCircle from '@mui/icons-material/AccountCircle'
import Password from '@mui/icons-material/Password'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Paper from '@mui/material/Paper'
import { useNavigate } from 'react-router-dom'
import { useSignIn, useIsAuthenticated } from 'react-auth-kit'
import axios from 'axios'
import { notification } from '../../Utils'
import { Toaster } from 'react-hot-toast'
import { API } from '../../../config/config'
import ProjectInfoItem from '../../Components/items/ProjectInfoItem'

export default function Login() {
	// Setups
	const navigate = useNavigate()
	const signIn = useSignIn()
	const isAuthenticated = useIsAuthenticated()

	// States
	const [login, setLogin] = React.useState('')
	const [password, setPassword] = React.useState('')

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
		})

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
			<Paper sx={{ position: 'absolute', top: 0, width: '100%' }} elevation={1} square>
				<ProjectInfoItem />
			</Paper>
			<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column' }}>
				<Card>
					<CardContent>
						<Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: 0.5 }}>
							<AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
							<TextField id="input-login" label="Логин" variant="standard" onChange={handleLoginChange} />
						</Box>
						<Box sx={{ display: 'flex', alignItems: 'flex-end', marginTop: 0.5 }}>
							<Password sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
							<TextField id="input-password" label="Пароль" variant="standard" type="password" onChange={handlePasswordChange} />
						</Box>
					</CardContent>
					<CardActions>
						<Button id='loginbtn' onClick={userSignIn} size="small">Войти</Button>
						<Button onClick={() => { navigate('/register') }} size="small">Регистрация</Button>
					</CardActions>
				</Card>
			</div>
		</>
	)
}