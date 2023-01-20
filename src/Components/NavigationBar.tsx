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
import { NavigationBar_Props } from '@declarations'

const pages: Array<Array<String>> = [['Главная', '/'], ['Запросы', '/request'], ['Профиль', '/settings']]
const pagesPaths: Array<String> = ['/', '/request', '/settings']

export default function NavigationBar(props: NavigationBar_Props) {

	// States
	const [ADMINS, setADMINS] = React.useState<string[]>([])
	const [currentPageIndex, setCurrentPageIndex] = React.useState<number>(0)

	// Setups
	const navigate = useNavigate()
	const authStateUser = useAuthUser()
	const user: { _id?: string } | null = authStateUser()
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
			return { backgroundColor: themeColor[5], borderRadius: 16, paddingLeft: 12, paddingRight: 12 }
		} else {
			return {}
		}
	}

	React.useEffect(() => {
		fetchAdmins()
		setCurrentPageIndex(pagesPaths.indexOf(location.pathname))
	}, [])

	return (
		<>
			<header className='fixed bottom-0 left-0 right-0 w-screen z-50 backdrop-blur' style={{ height: 76, backgroundColor: themeColor[3] + 'ef' }}>
				<div className='flex flex-row items-center justify-around h-full'>
					{pages.map((page: string[], index: number) => (
						<button key={index} onClick={() => { navigate(page[1]) }}>
							<div className='flex flex-col justify-center items-center'>
								<div style={activeStyle(index, currentPageIndex)}>
									{index == 0 && <Home />}
									{index == 1 && <PostAddOutlinedIcon />}
									{index == 2 && <PersonIcon />}
								</div>
								<label>{page[0]}</label>
							</div>
						</button>
					))}
					{isAdmin &&
						<button onClick={() => { navigate('/admin') }}>
							<div className='flex flex-col justify-center items-center'>
								<div style={activeStyle(3, currentPageIndex)}>
									<AdminPanelSettingsOutlinedIcon />
								</div>
								<label>Админ</label>
							</div>
						</button>}
				</div>
			</header>
			{props.children}
		</>
	)
}