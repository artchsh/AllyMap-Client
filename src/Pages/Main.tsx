import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useAuthUser, useIsAuthenticated, useAuthHeader, useSignOut } from 'react-auth-kit'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import Autocomplete from "@mui/material/Autocomplete"
import TextField from '@mui/material/TextField'
import { styled as styledMUI, alpha } from '@mui/material/styles'
import { motion as m, AnimatePresence } from "framer-motion"

import InstitutionCard from '@/Components/Cards/Institution.card'
import { themeColor } from '@colors'
import { API } from '@config'
import { Institution_Data } from '@declarations'
import { axiosAuth as axios, notification } from '@utils'

const Search = styledMUI('div')(({ theme }) => ({
	marginTop: 10,
	width: '95vw',
	maxWidth: 500,
	position: 'relative',
	borderRadius: 15,
	height: 55,
	// backgroundColor: alpha(theme.palette.common.white, 0.15),
	backgroundColor: themeColor[9],
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}))


const SearchIconWrapper = styledMUI('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: themeColor[6]
}))

const StyledInputBase = styledMUI(InputBase)(({ theme }) => ({
	color: themeColor[6],
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 1),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		height: '100%',
		display: 'flex',
		alignItems: 'center'
	},
	height: '100%'
}))

const cities: string[] = ['Алматы', 'Астана', 'Шымкент']

export default function Main() {

	// Setups
	const isAuthenticated = useIsAuthenticated()
	const navigate = useNavigate()
	const authStateUser = useAuthUser()
	const user = authStateUser() || {}
	const signout = useSignOut()
	const authHeader = useAuthHeader()

	// States
	const [institutions, setInstitutions] = useState<Array<Institution_Data>>([])
	const [filter, setFilter] = useState<string>('')
	const [city, setCity] = useState<string>('')

	// Handlers
	function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
		setFilter(e.target.value)
	}

	// Functions
	function fetchInstitutions() {
		notification.custom.promise(
			axios.post(`${API.baseURL}/institutions/find`, {}).then((res) => {
				if (!res.data.err) {
					setInstitutions(res.data)
				} else {
					notification.custom.error(res.data.err)
				}
			}))
	}

	function checkToken() {
		const token = `${localStorage.getItem('_auth_type')} ${localStorage.getItem('_auth')}`
		const isEqualTokens = authHeader() == token
		if (!isEqualTokens) {
			signout()
		}
	}

	useEffect(() => {
		if (isAuthenticated()) {
			fetchInstitutions()
			checkToken()
		} else {
			navigate('/login')
		}
	}, [])

	return (
		<>
			<m.div className='flex justify-center items-center flex-row mx-2 mb-1' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
				<Search className='mr-2'>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
						placeholder="Поиск..."
						inputProps={{ 'aria-label': 'поиск' }}
						onChange={handleFilterChange}
						sx={{ width: '100%' }}
					/>
				</Search>
				<Autocomplete
					options={cities}
					onInputChange={(event, newInputValue) => { setCity(newInputValue) }}
					className='mt-3 w-full rounded-3xl'
					renderInput={(params) => <TextField variant='outlined' {...params} label="Город" />} />
			</m.div>

			<div className='flex justify-center flex-wrap'>
				{institutions.map((institution, index: number) => (
					institution?.city?.includes(city) && (
						institution?.title.includes(filter) && (
							<InstitutionCard
								key={index}
								imagePath={institution.imagePath}
								name={institution.title}
								status={institution.status}
								description={institution.description}
								address={institution.address}
								id={institution._id}
								link={institution.link}
								userID={user._id}
								city={institution.city}
							/>
						)
					)

				))}
			</div>
		</>
	)
}