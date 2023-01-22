import React from 'react'

import PersonIcon from '@mui/icons-material/Person'
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined'
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import Home from '@mui/icons-material/Home'
import { useNavigate } from 'react-router-dom'
import { useAuthUser } from 'react-auth-kit'

import { axiosAuth as axios, notification } from '@utils'
import { API } from '@config'
import { themeColor } from '@colors'

const pages: Array<Array<String>> = [['Главная', '/'], ['Запросы', '/request'], ['Профиль', '/settings']]
const pagesPaths: Array<String> = ['/', '/request', '/settings']

export default function NavigationBar() {

	// States
	const [ADMINS, setADMINS] = React.useState<string[]>([])
	const [currentPageIndex, setCurrentPageIndex] = React.useState<number>(0)
	const [count, setCount] = React.useState<number>(0)

	// Setups
	const navigate = useNavigate()
	const authStateUser = useAuthUser()
	const user: { _id?: string } | null = authStateUser()
	if (user == null) {
		navigate('/login')
	}
	const isAdmin: boolean = ADMINS.includes(user._id)

	// Functions
	function fetchAdmins() {
		axios.get(`${API.baseURL}/config/`).then((response) => {
			if (!response.data.err) {
				let admins: string[] = response.data.admins
				setADMINS(admins)
			} else {
				notification.custom.error(response.data.err)
			}
		})

	}

	function activeStyle(index: number, currentPageIndex: number) {
		if (index == currentPageIndex) {
			return { backgroundColor: themeColor[5] }
		} else {
			return {}
		}
	}

	function activeClasses(index: number, currentPageIndex: number) {
		if (index == currentPageIndex) {
			return 'rounded-2xl px-3 transition ease-in-out'
		} else {
			return 'rounded-2xl px-3 transition ease-in-out bg-none'
		}
	}

	React.useEffect(() => {
		fetchAdmins()
		setCurrentPageIndex(pagesPaths.indexOf(location.pathname))
	}, [count])

	return (
		<header className='fixed bottom-0 left-0 right-0 w-screen z-50 backdrop-blur' style={{ height: 76, backgroundColor: themeColor[3] + 'ef' }}>
			<div className='flex flex-row items-center justify-around h-full'>
				{pages.map((page: string[], index: number) => (
					<button key={index} onClick={() => { navigate(page[1]); setCount(count + 1) }}>
						<div className='flex flex-col justify-center items-center'>
							<div style={activeStyle(index, currentPageIndex)} className={activeClasses(index, currentPageIndex)}>
								{index == 0 && <Home />}
								{index == 1 && <PostAddOutlinedIcon />}
								{index == 2 && <PersonIcon />}
							</div>
							<label>{page[0]}</label>
						</div>
					</button>
				))}
				{isAdmin &&
					<button onClick={() => { navigate('/admin'); setCount(count + 1) }}>
						<div className='flex flex-col justify-center items-center'>
							<div style={activeStyle(3, currentPageIndex)} className={activeClasses(3, currentPageIndex)}>
								<AdminPanelSettingsOutlinedIcon />
							</div>
							<label>Админ</label>
						</div>
					</button>}
			</div>
		</header>
	)
}